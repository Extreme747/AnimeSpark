#!/bin/bash

echo "🤖 Anime Bot Setup Script"
echo "========================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env created! Now edit it with your credentials:"
    echo "   - TELEGRAM_BOT_TOKEN (from @BotFather)"
    echo "   - CHANNEL_ID (run: node getChannelId.js)"
    echo "   - GEMINI_API_KEY (from https://aistudio.google.com/app/apikey)"
    echo ""
    echo "📖 Edit .env now, then run: npm install && node index.js"
else
    echo "✅ .env already exists"
fi

echo ""
echo "📋 Quick Checklist:"
echo "1. ✅ Bot code ready"
echo "2. ⏳ .env configured (do this manually)"
echo "3. ⏳ Channel ID obtained (run: node getChannelId.js)"
echo "4. ⏳ npm install"
echo "5. ⏳ node index.js (test locally)"
echo "6. ⏳ Deploy to Railway"
echo ""
echo "For Channel ID help: Read GET_CHANNEL_ID.md"
echo "For Railway deployment: Read RAILWAY_DEPLOYMENT.md"
echo ""
