require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { generateAnimePost } = require('./postGenerator');
const { addToHistory } = require('./historyManager');
const fs = require('fs');

console.log('🚀 Anime Bot Starting...');
console.log('🎨 Preparing AI magic...');

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
        
        // Save to history
        addToHistory(post);
        
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

// Main function - just post and finish
async function main() {
    console.log(`📢 Posting to: ${channelId}`);
    console.log('🎯 Generating amazing content...');
    
    await postToChannel();
    
    console.log('🎉 Post sent successfully!');
    console.log('✨ Bot finished! You can stop it now.');
}

// Start the bot immediately
main().catch(error => {
    console.error('❌ Bot failed:', error.message);
    process.exit(1);
});