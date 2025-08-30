require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { generateAnimePost } = require('./postGenerator');
const fs = require('fs');

console.log('🚀 Continuous Anime Bot Starting...');
console.log('🎨 AI Magic Ready!');
console.log('💡 This bot runs continuously - you can see it in console!');

// Bot configuration
const token = process.env.TELEGRAM_BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not found in environment variables!');
    process.exit(1);
}

if (!channelId) {
    console.error('❌ CHANNEL_ID not found in environment variables!');
    process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(token, { polling: false });

// Function to post to channel
async function postToChannel() {
    try {
        console.log('\n🎨 Generating AI-powered post...');
        const post = await generateAnimePost();
        
        if (post.imagePath && fs.existsSync(post.imagePath)) {
            // Send image with caption
            console.log('🖼️ Sending with AI-generated image...');
            await bot.sendPhoto(channelId, post.imagePath, {
                caption: post.text,
                parse_mode: 'MarkdownV2'
            });
            
            // Clean up image file after sending
            setTimeout(() => {
                try {
                    fs.unlinkSync(post.imagePath);
                } catch (e) {
                    console.log('Image cleanup skipped');
                }
            }, 5000);
            
        } else {
            // Send text only
            await bot.sendMessage(channelId, post.text, {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true
            });
        }
        
        console.log(`✅ Posted successfully: ${post.type}`);
        console.log(`🎯 Anime: ${post.anime}`);
        console.log(`📝 Content: ${post.text.substring(0, 50)}...`);
        if (post.imagePath) {
            console.log(`🖼️ Image: ${post.imageCaption || 'Generated'}`);
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Error posting to channel:', error.message);
        
        // If MarkdownV2 fails, try with HTML
        try {
            console.log('🔄 Trying HTML fallback...');
            const fallbackPost = await generateAnimePost();
            
            if (fallbackPost.imagePath && fs.existsSync(fallbackPost.imagePath)) {
                await bot.sendPhoto(channelId, fallbackPost.imagePath, {
                    caption: fallbackPost.textHTML,
                    parse_mode: 'HTML'
                });
            } else {
                await bot.sendMessage(channelId, fallbackPost.textHTML, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                });
            }
            console.log('✅ Posted with HTML fallback');
            return true;
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError.message);
            return false;
        }
    }
}

// Continuous mode - keeps bot alive and posts when requested
async function runContinuous() {
    console.log(`📢 Connected to channel: ${channelId}`);
    console.log('🎯 Bot is running continuously...');
    console.log('💡 Commands:');
    console.log('   - Type "post" to send a new anime post');
    console.log('   - Press Ctrl+C to stop the bot\n');
    
    // Handle user input for manual posting
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', async (data) => {
        const input = data.toString().trim().toLowerCase();
        
        if (input === 'post') {
            console.log('\n🎬 Manual post triggered!');
            await postToChannel();
            console.log('\n💡 Type "post" for another, or Ctrl+C to stop');
        } else if (input === 'help') {
            console.log('\n💡 Available commands:');
            console.log('   - post: Generate and send new anime post');
            console.log('   - help: Show this help message');
            console.log('   - Ctrl+C: Stop the bot\n');
        } else if (input !== '') {
            console.log('❓ Unknown command. Type "help" for available commands.');
        }
    });
    
    // Keep the process alive
    process.stdin.resume();
    
    // Auto-post every 4 hours (optional - uncomment if you want)
    // setInterval(async () => {
    //     console.log('\n⏰ Auto-posting time!');
    //     await postToChannel();
    // }, 4 * 60 * 60 * 1000); // 4 hours
    
    console.log('✨ Bot is ready! Type "post" to send an anime post!');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Bot shutting down gracefully...');
    console.log('✨ Thanks for using Anime Bot!');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Bot shutting down gracefully...');
    process.exit(0);
});

// Start continuous mode
runContinuous().catch(error => {
    console.error('❌ Bot failed:', error.message);
    process.exit(1);
});