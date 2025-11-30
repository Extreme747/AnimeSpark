require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { generateAnimePost } = require('./postGenerator');
const { addToHistory } = require('./historyManager');
const { trackPost, loadAnalytics, printAnalytics } = require('./analytics');
const config = require('./config');
const { startScheduler, stopScheduler } = require('./scheduler');
const { handleAdminMessage, isAdmin } = require('./admin');
const fs = require('fs');

console.log('🚀 Anime Bot Starting...');
console.log('🎨 Preparing AI magic...');

// Load analytics
loadAnalytics();

// Bot configuration
const token = config.TELEGRAM_BOT_TOKEN;
const channels = config.CHANNELS;

if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not found in environment variables!');
    process.exit(1);
}

if (!channels || channels.length === 0) {
    console.error('❌ CHANNEL_ID not found in environment variables!');
    process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(token, { polling: process.env.POLLING_ENABLED === 'true' });

// Enable polling if needed for admin commands
if (process.env.POLLING_ENABLED === 'true') {
    bot.on('message', async (msg) => {
        if (msg.text && msg.text.startsWith('/')) {
            if (isAdmin(msg.from.id)) {
                await handleAdminMessage(bot, msg);
            }
        }
    });
}

// Function to post to channel
async function postToChannel() {
    try {
        console.log('🎨 Generating AI-powered post...');
        const post = await generateAnimePost();
        
        if (post.imagePath && fs.existsSync(post.imagePath)) {
            // Send image with caption
            console.log('🖼️ Sending with AI-generated image...');
            await bot.sendPhoto(channels[0], post.imagePath, {
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
            await bot.sendMessage(channels[0], post.text, {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true
            });
        }
        
        // Save to history
        addToHistory(post);
        
        // Track post for analytics
        trackPost(post);
        
        console.log(`✅ Posted successfully: ${post.type}`);
        console.log(`🎯 Anime: ${post.anime}`);
        console.log(`📝 Content: ${post.text.substring(0, 50)}...`);
        console.log(`💾 Saved to history: ${post.contentKey}`);
        if (post.imagePath) {
            console.log(`🖼️ Image: ${post.imageCaption || 'Generated'}`);
        }
        
        return post;
        
    } catch (error) {
        console.error('❌ Error posting to channel:', error.message);
        
        // If MarkdownV2 fails, try with HTML
        try {
            console.log('🔄 Trying HTML fallback...');
            const fallbackPost = await generateAnimePost();
            
            if (fallbackPost.imagePath && fs.existsSync(fallbackPost.imagePath)) {
                await bot.sendPhoto(channels[0], fallbackPost.imagePath, {
                    caption: fallbackPost.textHTML,
                    parse_mode: 'HTML'
                });
            } else {
                await bot.sendMessage(channels[0], fallbackPost.textHTML, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                });
            }
            // Save fallback post to history too
            addToHistory(fallbackPost);
            console.log('✅ Posted with HTML fallback');
            console.log(`💾 Saved to history: ${fallbackPost.contentKey}`);
            return fallbackPost;
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError.message);
            return null;
        }
    }
}

// Main function
async function main() {
    console.log(`📢 Posting to: ${channels.join(', ')}`);
    console.log('🎯 Generating amazing content...');
    
    // Post immediately if configured
    if (config.POST_AT_STARTUP) {
        await postToChannel();
    }
    
    // Start scheduler if enabled
    if (config.SCHEDULE_ENABLED) {
        console.log('\n⏰ Starting automatic scheduler...');
        startScheduler();
        console.log('🎉 Bot is now running on schedule!');
        console.log('✨ Press Ctrl+C to stop the bot.');
    } else {
        console.log('🎉 Post sent successfully!');
        console.log('✨ Bot finished! You can stop it now.');
    }
}

// Start the bot immediately
main().catch(error => {
    console.error('❌ Bot failed:', error.message);
    process.exit(1);
});

// Export for use in other modules
module.exports = { bot, postToChannel };