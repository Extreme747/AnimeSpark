// Bot Configuration
module.exports = {
    // Scheduling options
    SCHEDULE_ENABLED: process.env.SCHEDULE_ENABLED === 'true' || false,
    POSTING_INTERVAL_HOURS: parseInt(process.env.POSTING_INTERVAL_HOURS) || 4, // Post every 4 hours
    POST_AT_STARTUP: process.env.POST_AT_STARTUP === 'true' || true, // Post immediately on startup
    
    // Channel configuration (can add multiple channels as array)
    CHANNELS: (process.env.CHANNELS ? process.env.CHANNELS.split(',').map(c => c.trim()) : [process.env.CHANNEL_ID]).filter(Boolean),
    
    // Analytics
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true' || true,
    ANALYTICS_FILE: 'botAnalytics.json',
    
    // Content preferences
    PRIORITIZE_UNIQUE: true, // Always try to find unique content
    MAX_RETRY_ATTEMPTS: 10, // Retry this many times before allowing duplicates
    HISTORY_LIMIT: 100, // Keep last 100 posts in history
    
    // Hinglish style - adjust emoji usage
    EMOJI_DENSITY: 'high', // low, medium, high
    USE_HASHTAGS: true,
    HASHTAGS_PER_POST: 5,
    
    // API keys
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
