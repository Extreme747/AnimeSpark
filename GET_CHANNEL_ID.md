# How to Get Your Telegram Channel ID

## Method 1: Using Bot (Easiest) ✅

1. **Create a test bot** (if you don't have one):
   - Message @BotFather on Telegram
   - Type `/newbot`
   - Follow steps, copy the token

2. **Add bot to your channel:**
   - Make your channel
   - Add the bot as Admin

3. **Send a test message:**
   - Message your channel with: `/start`
   - Or any message

4. **Get the ID:**
   - Open this link in browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   - Replace `<YOUR_BOT_TOKEN>` with your actual token
   - Look for `"chat":{"id":-1002976231790}` 
   - That negative number is your Channel ID!

## Method 2: Using Web

1. Go to https://web.telegram.org
2. Click your channel
3. Look at URL: `https://web.telegram.org/k/c/1234567890`
4. Add `-100` prefix: Channel ID = `-1001234567890`

## Method 3: Quick Script

Run this in Node.js:
```javascript
const token = "YOUR_BOT_TOKEN";
const fetch = require('node-fetch');

fetch(`https://api.telegram.org/bot${token}/getUpdates`)
  .then(r => r.json())
  .then(d => {
    const chats = d.result.map(m => ({
      id: m.message?.chat?.id,
      title: m.message?.chat?.title
    }));
    console.log(JSON.stringify(chats, null, 2));
  });
```

## Important Notes ⚠️

- Channel ID format: **negative number** (e.g., `-1002976231790`)
- Must add bot as **Admin** to channel first
- Bot needs permission to **post messages**
- If private channel, must have **invitation link**

## Example IDs

```
Group Chat:     -1001234567890
Private Group:  -1001111111111
Channel:        -1002222222222
```

That's it! Once you have the ID, add to .env file and you're ready to deploy! 🚀
