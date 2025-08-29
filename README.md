# Anime Posting Bot for Telegram 🤖📺

An automated Telegram bot that generates and posts engaging anime content for Doraemon and Shinchan channels.

## Features ✨

- **4 Types of Posts:**
  - 📺 Episode Summaries with humor
  - 🧩 Trivia questions with multiple choice
  - 📅 Today in History anime facts
  - 📊 Interactive polls for engagement

- **GenZ Hinglish Style:** Mix of Hindi/English with trending phrases
- **Emoji Rich:** Fun emojis that match the content
- **Auto Scheduling:** Posts every 4 hours automatically
- **Telegram Formatting:** Perfect MarkdownV2 and HTML support

## Quick Start 🚀

### 1. Set up your Telegram Bot
1. Message @BotFather on Telegram
2. Create new bot with `/newbot`
3. Copy your bot token
4. Add your bot to your channel as admin

### 2. Run the Bot

**Test a single post:**
```bash
node index.js --test
```

**Send one post and exit:**
```bash
node index.js --once
```

**Start scheduled posting:**
```bash
node index.js
```

**Preview posts without sending:**
```bash
node test-posts.js
```

## Configuration ⚙️

The bot uses environment variables:
- `TELEGRAM_BOT_TOKEN` - Your bot token from BotFather
- `CHANNEL_ID` - Your channel username (e.g., @mychannel)

## Post Examples 📝

### Episode Summary
```
*Shinchan's Grocery Shopping Disaster* 🛒
Episode 12 - Shinchan

> "Mom sends Shinchan to buy groceries... he comes back with toys and chaos!"

ekdum mast 😂 Ye episode toh must-watch hai!
Comment your fav scene below! 💭
```

### Trivia
```
🧩 Doraemon Trivia Time! 🤔

What is Doraemon's favorite food?
A) Dorayaki
B) Ice Cream  
C) Ramen

Answer batao comments mein! 🤓
```

## Scheduling 📅

Default schedule: Every 4 hours
- Modify the cron pattern in `index.js` to change timing
- Current: `'0 */4 * * *'` (every 4 hours)

## Content Database 📚

- **Doraemon:** 6 episodes, 4 trivia, 4 facts, 3 polls
- **Shinchan:** 6 episodes, 4 trivia, 4 facts, 3 polls

All content includes:
- Proper Hindi-English mix
- Age-appropriate humor
- Engaging CTAs
- Relevant emojis

## Troubleshooting 🔧

**Bot not posting?**
- Check if bot is added to channel as admin
- Verify TELEGRAM_BOT_TOKEN is correct
- Ensure CHANNEL_ID format (@channelname or -100123456789)

**Formatting issues?**
- Bot tries MarkdownV2 first, falls back to HTML
- All special characters are properly escaped

## Commands 💻

- `--test` - Test with one post
- `--once` - Send one post and exit
- No flags - Start scheduled posting

Have fun with your anime channel! 🎉