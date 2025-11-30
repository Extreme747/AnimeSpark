#!/usr/bin/env node

// Simple helper to get Telegram Channel ID
const readline = require('readline');
const https = require('https');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fetchChannelInfo(token) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.telegram.org/bot${token}/getUpdates`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(new Error('Invalid response from Telegram API'));
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    console.log('📱 Telegram Channel ID Finder\n');
    
    rl.question('Enter your Telegram Bot Token: ', async (token) => {
        if (!token) {
            console.log('❌ Token required!');
            rl.close();
            return;
        }
        
        try {
            console.log('🔍 Fetching channel info...\n');
            const data = await fetchChannelInfo(token);
            
            if (!data.result || data.result.length === 0) {
                console.log('⚠️  No messages found. Make sure:');
                console.log('1. Bot is added to the channel');
                console.log('2. Bot is Admin in the channel');
                console.log('3. Send a message to the channel first');
                rl.close();
                return;
            }
            
            console.log('📋 Found Channels/Groups:\n');
            const seen = new Set();
            
            data.result.forEach(update => {
                const chat = update.message?.chat || update.channel_post?.chat;
                if (chat && !seen.has(chat.id)) {
                    seen.add(chat.id);
                    console.log(`📢 ${chat.title || 'Chat'}`);
                    console.log(`   ID: ${chat.id}`);
                    console.log(`   Type: ${chat.type}\n`);
                }
            });
            
            console.log('✅ Copy the ID and add to your .env file:');
            console.log('CHANNEL_ID=-1002976231790  (replace with your ID)');
            
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        rl.close();
    });
}

main();
