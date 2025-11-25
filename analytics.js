const fs = require('fs');
const path = require('path');
const config = require('./config');

const ANALYTICS_FILE = config.ANALYTICS_FILE;

// Analytics data structure
let analytics = {
    totalPosts: 0,
    startDate: new Date().toISOString(),
    contentTypeStats: {},
    animeStats: { doraemon: 0, shinchan: 0 },
    lastPostTime: null,
    dailyStats: {},
    topContentTypes: []
};

// Load existing analytics
function loadAnalytics() {
    try {
        if (fs.existsSync(ANALYTICS_FILE)) {
            const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
            analytics = JSON.parse(data);
        }
    } catch (error) {
        console.log('📊 Starting fresh analytics...');
    }
    return analytics;
}

// Save analytics to file
function saveAnalytics() {
    try {
        fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));
    } catch (error) {
        console.log(`⚠️ Could not save analytics: ${error.message}`);
    }
}

// Track a new post
function trackPost(post) {
    analytics.totalPosts++;
    analytics.lastPostTime = new Date().toISOString();
    
    // Track by content type
    if (!analytics.contentTypeStats[post.type]) {
        analytics.contentTypeStats[post.type] = 0;
    }
    analytics.contentTypeStats[post.type]++;
    
    // Track by anime
    if (post.anime === 'doraemon') {
        analytics.animeStats.doraemon++;
    } else {
        analytics.animeStats.shinchan++;
    }
    
    // Track daily stats
    const today = new Date().toISOString().split('T')[0];
    if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = 0;
    }
    analytics.dailyStats[today]++;
    
    // Calculate top content types
    analytics.topContentTypes = Object.entries(analytics.contentTypeStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([type, count]) => ({ type, count }));
    
    saveAnalytics();
}

// Get analytics summary
function getAnalyticsSummary() {
    loadAnalytics();
    
    const summary = `
📊 **BOT ANALYTICS SUMMARY** 📊
═══════════════════════════════════
✨ Total Posts: ${analytics.totalPosts}
📅 Active Since: ${new Date(analytics.startDate).toLocaleDateString()}
⏰ Last Post: ${analytics.lastPostTime ? new Date(analytics.lastPostTime).toLocaleString() : 'Never'}

🎬 **Anime Breakdown:**
  • Doraemon: ${analytics.animeStats.doraemon} posts
  • Shinchan: ${analytics.animeStats.shinchan} posts

🎯 **Top 5 Content Types:**
${analytics.topContentTypes.map((ct, i) => `  ${i + 1}. ${ct.type}: ${ct.count} posts`).join('\n') || '  No data yet'}

📈 **Daily Stats (Last 7 Days):**
${Object.entries(analytics.dailyStats)
    .sort()
    .slice(-7)
    .map(([date, count]) => `  ${date}: ${count} posts`)
    .join('\n') || '  No data yet'}
═══════════════════════════════════
    `.trim();
    
    return summary;
}

// Print analytics to console
function printAnalytics() {
    console.log(getAnalyticsSummary());
}

module.exports = {
    loadAnalytics,
    saveAnalytics,
    trackPost,
    getAnalyticsSummary,
    printAnalytics,
    analytics: () => analytics
};
