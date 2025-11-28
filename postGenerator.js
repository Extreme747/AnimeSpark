// Live market & trending updates fetcher
const axios = require('axios');

// Local trending topics (can be updated manually or via API)
const trendingTopics = {
    tech: [
        { title: "AI Boom Continues", desc: "Latest AI models breaking records daily! 🤖", emoji: "🚀" },
        { title: "Web5 Era Begins", desc: "Decentralized internet gaining momentum! 🌐", emoji: "⛓️" },
        { title: "Quantum Computing Advances", desc: "New quantum chips show massive speed-ups! ⚡", emoji: "🔬" },
        { title: "Crypto Rally", desc: "Bitcoin crosses new ATH! 📈", emoji: "💰" },
        { title: "5G Global Rollout", desc: "Faster internet everywhere soon! 📡", emoji: "⚡" },
        { title: "Gaming Revolution", desc: "Cloud gaming becomes mainstream! 🎮", emoji: "☁️" }
    ],
    entertainment: [
        { title: "Anime Streaming War", desc: "New platforms joining the battle! 📺", emoji: "🎬" },
        { title: "Manga Sales Soar", desc: "Digital manga overtakes print! 📚", emoji: "📈" },
        { title: "Anime Expo 2025", desc: "Record-breaking attendance! 🎉", emoji: "🎪" },
        { title: "Voice Acting Trends", desc: "Indian VAs breaking into anime! 🎤", emoji: "🌟" }
    ],
    general: [
        { title: "Tech Giants Invest in India", desc: "Massive funding flowing in! 💵", emoji: "🇮🇳" },
        { title: "Gen Z Dominates Market", desc: "Young creators reshaping entertainment! 👨‍💻", emoji: "📱" },
        { title: "Social Media Explodes", desc: "New platforms reaching millions! 🚀", emoji: "📲" }
    ]
};

// Get random trending update
function getRandomTrendingUpdate() {
    const categories = Object.keys(trendingTopics);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const updates = trendingTopics[randomCategory];
    const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
    
    return {
        category: randomCategory,
        ...randomUpdate,
        timestamp: new Date().toISOString()
    };
}

// Get multiple trending topics
function getTrendingTopics(count = 3) {
    const allUpdates = Object.values(trendingTopics).flat();
    const shuffled = allUpdates.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Format trending update for Telegram
function formatTrendingUpdate(update) {
    return {
        title: `${update.emoji} ${update.title}`,
        description: update.desc,
        category: update.category,
        emoji: update.emoji
    };
}

// Fetch from external API (optional - for future expansion)
async function fetchFromAPI(apiUrl) {
    try {
        const response = await axios.get(apiUrl, { timeout: 5000 });
        return response.data;
    } catch (error) {
        console.log(`⚠️ API fetch failed: ${error.message}`);
        return null;
    }
}

module.exports = {
    getRandomTrendingUpdate,
    getTrendingTopics,
    formatTrendingUpdate,
    fetchFromAPI,
    trendingTopics
};
