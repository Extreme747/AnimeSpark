// Admin commands for bot control
const { getAnalyticsSummary } = require('./analytics');
const { loadAnalytics } = require('./analytics');

const adminCommands = {
    '/stats': {
        description: 'Show bot analytics and performance metrics',
        handler: async (bot, message) => {
            try {
                const summary = getAnalyticsSummary();
                await bot.sendMessage(message.chat.id, summary, { parse_mode: 'Markdown' });
            } catch (error) {
                await bot.sendMessage(message.chat.id, `❌ Error getting stats: ${error.message}`);
            }
        }
    },
    
    '/status': {
        description: 'Show bot status and configuration',
        handler: async (bot, message) => {
            const config = require('./config');
            const scheduler = require('./scheduler');
            const schedulerStatus = scheduler.getSchedulerStatus();
            
            const status = `
🤖 **BOT STATUS** 🤖
═══════════════════════════════════
✅ Bot: Online and Ready
⏰ Schedule: ${config.SCHEDULE_ENABLED ? '✅ Enabled' : '❌ Disabled'}
📅 Interval: Every ${config.POSTING_INTERVAL_HOURS} hours
🎯 Channels: ${config.CHANNELS.length}
📊 Analytics: ${config.ENABLE_ANALYTICS ? '✅ Enabled' : '❌ Disabled'}
═══════════════════════════════════
            `.trim();
            
            await bot.sendMessage(message.chat.id, status, { parse_mode: 'Markdown' });
        }
    },
    
    '/help': {
        description: 'Show available commands',
        handler: async (bot, message) => {
            const help = `
📋 **AVAILABLE COMMANDS** 📋
═══════════════════════════════════
/stats - Show analytics & metrics
/status - Check bot status
/help - Show this help message
═══════════════════════════════════
            `.trim();
            
            await bot.sendMessage(message.chat.id, help, { parse_mode: 'Markdown' });
        }
    }
};

// Handle admin messages
async function handleAdminMessage(bot, message) {
    const command = message.text.split(' ')[0];
    
    if (adminCommands[command]) {
        await adminCommands[command].handler(bot, message);
    }
}

// Check if user is admin
function isAdmin(userId) {
    const adminIds = (process.env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);
    return adminIds.includes(userId);
}

module.exports = {
    adminCommands,
    handleAdminMessage,
    isAdmin
};
