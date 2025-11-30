# Testing Auto-Posting Locally

## Quick Test (5 minutes)

```bash
# 1. Enable scheduler
SCHEDULE_ENABLED=true POSTING_INTERVAL_HOURS=1 node index.js
```

This will:
- Post immediately
- Post every 1 hour
- Run in background

## Full Test Setup

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials:
# TELEGRAM_BOT_TOKEN=your_token
# CHANNEL_ID=your_channel_id
# GEMINI_API_KEY=your_key

# Enable scheduling with 2-minute interval for quick testing:
SCHEDULE_ENABLED=true POSTING_INTERVAL_HOURS=0.033 node index.js
# (0.033 hours = ~2 minutes)
```

## What to Expect

```
🚀 Anime Bot Starting...
📢 Posting to: -1001234567890
⏰ Scheduler started! Posts will be sent every 4 hours
🎉 First post sent!
[Bot waits for next schedule...]
```

## Check It's Working

Look for:
- ✅ First post appears in channel immediately
- ✅ Console shows "Scheduler started!"
- ✅ Next post appears after set interval
- ✅ Analytics updated in botAnalytics.json

## Stop the Bot

Press: `Ctrl + C`

---

## For Railway

Just set environment variables in Railway dashboard:
```
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=4
```

The rest is automatic! 🚀
