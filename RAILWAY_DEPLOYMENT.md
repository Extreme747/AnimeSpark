# 🚀 Railway Deployment Guide

## Step-by-Step Deployment

### 1. **Create Railway Account**
- Go to https://railway.app
- Sign up with GitHub

### 2. **Push Code to GitHub**
```bash
git init
git add .
git commit -m "Anime bot ready for Railway"
git remote add origin your_github_repo_url
git push -u origin main
```

### 3. **Deploy on Railway**
1. Click "New Project" on Railway dashboard
2. Select "Deploy from GitHub"
3. Choose your anime-bot repository
4. Railway auto-detects Node.js

### 4. **Add Environment Variables**
In Railway dashboard → Settings → Variables, add:

```
TELEGRAM_BOT_TOKEN=your_token
CHANNEL_ID=your_channel_id
GEMINI_API_KEY=your_gemini_key
SCHEDULE_ENABLED=true
POLLING_ENABLED=true
ADMIN_IDS=your_telegram_id
```

### 5. **Configure as Worker**
1. Railway recognizes `Procfile`
2. Sets worker as: `node index.js`
3. Bot runs 24/7 continuously

### 6. **Enable Auto-Posting (Optional)**
Set in Railway variables:
```
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=4
```

Bot will automatically post every 4 hours!

---

## What Railway Gives You

✅ **24/7 Uptime** - Bot always running  
✅ **Auto Restart** - If bot crashes, Railway restarts it  
✅ **Easy Logs** - View bot logs in dashboard  
✅ **Secrets Storage** - Safe API key management  
✅ **Cost Effective** - Free tier available  

---

## Monitoring

In Railway Dashboard:
- **Logs** - See all bot activity & posts
- **Metrics** - CPU, memory usage
- **Deployments** - Version history

---

## Troubleshooting

**Bot not posting?**
- Check Telegram token is correct
- Verify bot is admin in channel
- Look at Railway logs for errors

**Duplicates appearing?**
- Check `postHistory.json` size
- Analytics file might be full
- Clear old history if needed

**Crashes?**
- Railway auto-restarts
- Check logs for error messages
- Verify all env variables set

---

## Success! 🎉

Your anime bot is now:
- **Running 24/7** on Railway
- **Auto-posting** every 4 hours
- **Zero downtime** deployment
- **Easy to monitor** via dashboard

Enjoy your automated anime content! 🤖
