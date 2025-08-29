#!/bin/bash

echo "🚀 Anime Bot Launcher"
echo "===================="
echo ""
echo "Choose your action:"
echo "1) Start bot (continuous posting)"
echo "2) Test one post"
echo "3) Send one post and stop"
echo "4) Show help"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🎯 Starting continuous posting..."
        node index.js
        ;;
    2)
        echo "🧪 Testing one post..."
        node index.js --test
        ;;
    3)
        echo "📤 Sending one post..."
        node index.js --once
        ;;
    4)
        echo "📋 Available commands:"
        echo "  node index.js         → Continuous posting"
        echo "  node index.js --test  → Test one post"
        echo "  node index.js --once  → One post and exit"
        ;;
    *)
        echo "❌ Invalid choice. Starting continuous mode..."
        node index.js
        ;;
esac