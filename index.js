require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { generateAnimePost } = require('./postGenerator');
const fs = require('fs');

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
        console.log('🎨 Generating AI-powered post...');
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
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError.message);
        }
    }
}

// Manual posting function for testing
async function testPost() {
    console.log('🧪 Testing post generation and sending...');
    await postToChannel();
}

// Schedule posts
function startScheduledPosting() {
    console.log('🚀 Starting Anime Posting Bot...');
    console.log(`📢 Channel: ${channelId}`);
    
    // Post every 4 hours (adjust as needed)
    cron.schedule('0 */4 * * *', () => {
        console.log('⏰ Scheduled post triggered');
        postToChannel();
    });
    
    console.log('⏰ Scheduled to post every 4 hours');
    console.log('🎯 Bot is running! Press Ctrl+C to stop');
}

// Command line arguments
const args = process.argv.slice(2);

if (args.includes('--test')) {
    testPost();
} else if (args.includes('--once')) {
    postToChannel().then(() => process.exit(0));
} else {
    startScheduledPosting();
}