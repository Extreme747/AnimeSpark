// Live market & trending updates fetcher
const axios = require('axios');

// Local trending topics
const trendingTopics = {
    tech: [
        { title: "AI Boom Continues", desc: "Latest AI models breaking records daily! 🤖", emoji: "🚀" },
        { title: "Web5 Era Begins", desc: "Decentralized internet gaining momentum! 🌐", emoji: "⛓️" },
        { title: "Quantum Computing", desc: "New quantum chips show massive speed-ups! ⚡", emoji: "🔬" },
        { title: "Crypto Rally", desc: "Bitcoin crosses new ATH! 📈", emoji: "💰" },
        { title: "5G Rollout", desc: "Faster internet everywhere soon! 📡", emoji: "⚡" },
        { title: "Gaming Revolution", desc: "Cloud gaming becomes mainstream! 🎮", emoji: "☁️" }
    ],
    entertainment: [
        { title: "Anime Streaming War", desc: "New platforms joining the battle! 📺", emoji: "🎬" },
        { title: "Manga Sales Soar", desc: "Digital manga overtakes print! 📚", emoji: "📈" },
        { title: "Anime Expo 2025", desc: "Record-breaking attendance! 🎉", emoji: "🎪" },
        { title: "Voice Acting Trends", desc: "Indian VAs breaking into anime! 🎤", emoji: "🌟" }
    ]
};

function getRandomTrendingUpdate() {
    const categories = Object.keys(trendingTopics);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const updates = trendingTopics[randomCategory];
    const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
    return { category: randomCategory, ...randomUpdate };
}

module.exports = { getRandomTrendingUpdate, trendingTopics };
