# ⏰ Automatic Posting Timing Configuration

Your bot now **automatically posts** on a schedule! Here's how to customize it.

## Default Behavior

Bot posts:
- ✅ **Immediately on startup** 
- ✅ **Every 4 hours** after that
- ✅ **24/7** on Railway

## Timing Options

### Option 1: Post Every 4 Hours (Default)
```env
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=4
POST_AT_STARTUP=true
```
**Schedule:**
- 12:00 AM ➜ 4:00 AM ➜ 8:00 AM ➜ 12:00 PM ➜ 4:00 PM ➜ 8:00 PM ➜ 12:00 AM...

### Option 2: Post Every Hour
```env
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=1
POST_AT_STARTUP=true
```
**24 posts per day!** 🚀

### Option 3: Post Every 12 Hours
```env
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=12
POST_AT_STARTUP=true
```
**Morning & Evening posts**

### Option 4: Post Once Daily
```env
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=24
POST_AT_STARTUP=true
```
**1 post per day at startup + next 24h**

### Option 5: Disable Scheduling (Manual Only)
```env
SCHEDULE_ENABLED=false
POST_AT_STARTUP=true
```
**Bot posts once when you run `node index.js`**

---

## How It Works

1. **Bot starts** → Posts immediately (if `POST_AT_STARTUP=true`)
2. **Timer starts** → Counts down `POSTING_INTERVAL_HOURS`
3. **Time reached** → Posts again automatically
4. **Repeats forever** → 24/7 posting on Railway! 🔄

## What Gets Posted

Every post is:
- ✅ Unique (smart deduplication)
- ✅ Random content type (1 of 10)
- ✅ Hinglish GenZ style with emojis
- ✅ Hashtags for engagement
- ✅ Tracked in analytics

## Monitoring Posts

Check your posts in:
- **Telegram Channel** - See live posts
- **postHistory.json** - See all post history
- **botAnalytics.json** - See statistics

View logs:
```bash
cat botAnalytics.json
```

## Quick Reference

| Setting | Value | Effect |
|---------|-------|--------|
| SCHEDULE_ENABLED | true | Enable auto-posting |
| POSTING_INTERVAL_HOURS | 1 | Post hourly (24/day) |
| POSTING_INTERVAL_HOURS | 4 | Post 6 times/day |
| POSTING_INTERVAL_HOURS | 12 | Post 2 times/day |
| POSTING_INTERVAL_HOURS | 24 | Post daily |
| POST_AT_STARTUP | true | Post when bot starts |

---

## Railway Deployment

On Railway, the bot:
- Runs **24/7** continuously
- Posts on **your schedule** automatically
- **Auto-restarts** if it crashes
- Posts run in the **background**

Just set env variables in Railway dashboard and you're done! 🎉

---

## Example: 6 Posts Per Day

```env
SCHEDULE_ENABLED=true
POSTING_INTERVAL_HOURS=4
POST_AT_STARTUP=true
```

**Timeline:**
```
12:00 AM - Post 1 (startup)
04:00 AM - Post 2
08:00 AM - Post 3
12:00 PM - Post 4
04:00 PM - Post 5
08:00 PM - Post 6
→ Repeats next day
```

---

## Disabling Auto-Posting

If you want to post manually:
```env
SCHEDULE_ENABLED=false
```

Then run: `node index.js` (posts once and stops)

---

**That's it!** Set the env variables and your anime bot posts automatically 24/7! 🚀
