# ⚡ Quick Setup Guide

## 1️⃣ Get Your Channel ID (5 mins)

Run this helper script:
```bash
node getChannelId.js
```

Or read: [GET_CHANNEL_ID.md](GET_CHANNEL_ID.md)

## 2️⃣ Create Telegram Bot

- Message @BotFather on Telegram
- Type: `/newbot`
- Copy the token

## 3️⃣ Add Bot to Channel

- Create a Telegram channel (or use existing)
- Add bot as Admin
- Send one message to channel

## 4️⃣ Get Gemini API Key

- Go: https://aistudio.google.com/app/apikey
- Create new API key
- Copy it

## 5️⃣ Set Environment Variables

Create `.env` file:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
GEMINI_API_KEY=your_gemini_key_here
SCHEDULE_ENABLED=false
```

## 6️⃣ Run Bot Locally

```bash
npm install
node index.js
```

## 7️⃣ Deploy to Railway

```bash
git push
```

Connect to Railway.app - that's it! 🚀

---

**Documentation:**
- `README.md` - Overview
- `replit.md` - Full docs  
- `RAILWAY_DEPLOYMENT.md` - Deployment steps
- `GET_CHANNEL_ID.md` - Detailed Channel ID guide
