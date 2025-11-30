const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, 'postHistory.json');
const MAX_HISTORY = 100; // Keep last 100 posts

// Initialize history file if it doesn't exist
function initHistory() {
    if (!fs.existsSync(HISTORY_FILE)) {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify({ posts: [] }, null, 2));
    }
}

// Read post history
function getHistory() {
    initHistory();
    try {
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('⚠️ Error reading history, creating new file');
        return { posts: [] };
    }
}

// Add post to history
function addToHistory(postData) {
    const history = getHistory();
    
    const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: postData.type,
        anime: postData.anime,
        contentKey: postData.contentKey, // Unique identifier for this specific content
        preview: postData.text ? postData.text.substring(0, 100) : '',
        success: true
    };
    
    history.posts.unshift(entry); // Add to beginning
    
    // Keep only last MAX_HISTORY posts
    if (history.posts.length > MAX_HISTORY) {
        history.posts = history.posts.slice(0, MAX_HISTORY);
    }
    
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    return entry;
}

// Check if content was recently posted - NOW WITH DATE/TIME AWARENESS!
function wasRecentlyPosted(contentKey, withinLast = 50) {
    const history = getHistory();
    const recentPosts = history.posts.slice(0, withinLast);
    const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
    
    // Check if same contentKey posted TODAY (within same date)
    const postedToday = recentPosts.some(post => {
        const postDate = post.timestamp.split('T')[0]; // Extract date from ISO timestamp
        return post.contentKey === contentKey && postDate === today;
    });
    
    return postedToday;
}

// Get last post time for interval checking
function getLastPostTime() {
    const history = getHistory();
    if (history.posts.length === 0) return null;
    return new Date(history.posts[0].timestamp);
}

// Get today's posts count
function getTodaysPostCount() {
    const history = getHistory();
    const today = new Date().toISOString().split('T')[0];
    return history.posts.filter(post => post.timestamp.split('T')[0] === today).length;
}

// Get all posts from today with timestamps for display
function getTodaysPosts() {
    const history = getHistory();
    const today = new Date().toISOString().split('T')[0];
    return history.posts.filter(post => post.timestamp.split('T')[0] === today);
}

// Get statistics
function getStats() {
    const history = getHistory();
    const total = history.posts.length;
    
    const byType = {};
    const byAnime = {};
    
    history.posts.forEach(post => {
        byType[post.type] = (byType[post.type] || 0) + 1;
        byAnime[post.anime] = (byAnime[post.anime] || 0) + 1;
    });
    
    return {
        totalPosts: total,
        byType,
        byAnime,
        lastPost: history.posts[0] || null,
        recentPosts: history.posts.slice(0, 10)
    };
}

// Clear old history (keep only last N posts)
function trimHistory(keepLast = 50) {
    const history = getHistory();
    history.posts = history.posts.slice(0, keepLast);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    return history.posts.length;
}

module.exports = {
    initHistory,
    getHistory,
    addToHistory,
    wasRecentlyPosted,
    getLastPostTime,
    getTodaysPostCount,
    getTodaysPosts,
    getStats,
    trimHistory
};
