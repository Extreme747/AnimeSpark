#!/usr/bin/env node
console.log('🚀 Starting Anime Posting Bot...');
console.log('========================================');

// Simple menu for starting the bot
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🤖 Anime Bot Commands:

📍 Start Options:
  node start.js          → Start scheduled posting (every 4 hours)
  node start.js --test   → Send one test post
  node start.js --once   → Send one post and exit

🎯 Quick Start: Just run 'node start.js' and your bot will begin!
`);
    process.exit(0);
}

console.log('🎨 Loading AI capabilities...');
console.log('📱 Connecting to Telegram...');

// Start the main bot
require('./index.js');