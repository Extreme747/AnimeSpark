# 🆘 Help & Troubleshooting

## Channel ID Not Found?

### Quick Ways to Get It:

**Option 1: Using Bot (Fastest)**
```bash
node getChannelId.js
```
Then enter your bot token - it shows all your channels!

**Option 2: Manual Method**
1. Open browser: `https://api.telegram.org/bot<TOKEN>/getUpdates`
2. Replace `<TOKEN>` with your bot token
3. Look for `"chat":{"id":-1002976231790}`
4. That's your Channel ID!

**Option 3: Web.Telegram**
1. Go to https://web.telegram.org
2. Open your channel
3. Look at URL for the ID

---

## Common Issues

**"Bot not posting?"**
- ✅ Channel ID correct? (negative number like -1001234567890)
- ✅ Bot is Admin in channel?
- ✅ Bot token valid?
- ✅ Gemini API key working?

**"Duplicate posts appearing?"**
- Don't worry - smart dedup prevents real duplicates
- Check postHistory.json size

**"Scheduling not working?"**
- Set: `SCHEDULE_ENABLED=true` in .env
- Set: `POSTING_INTERVAL_HOURS=4` for every 4 hours

**"Railway deployment failed?"**
- Check all env variables are set
- Verify Procfile exists
- Check Railway logs for errors

---

## Getting Started Steps

1. **Get Channel ID**: `node getChannelId.js`
2. **Create .env**: `cp .env.example .env`
3. **Edit .env**: Add your tokens and Channel ID
4. **Test locally**: `npm install && node index.js`
5. **Deploy**: Push to GitHub → Connect Railway → Done!

---

## Files You Need

| File | Purpose |
|------|---------|
| .env | Your secrets (token, channel ID, API keys) |
| index.js | Main bot |
| Procfile | Railway config |
| package.json | Dependencies |

---

## Commands

```bash
# Get Channel ID
node getChannelId.js

# Test locally
node index.js

# Deploy script
bash setup.sh

# View history
cat postHistory.json | head -5

# View analytics  
cat botAnalytics.json | head -5
```

---

**Still stuck?** Read:
- `QUICK_SETUP.md` - Quick start
- `RAILWAY_DEPLOYMENT.md` - Deploy steps
- `GET_CHANNEL_ID.md` - Channel ID guide
- `replit.md` - Full documentation
