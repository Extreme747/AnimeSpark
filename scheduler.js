const cron = require('node-cron');
const config = require('./config');
const index = require('./index');

let scheduledJob = null;

// Format interval for display
function formatInterval(hours) {
    if (hours === 1) return '1 hour';
    if (hours === 24) return 'every day';
    if (hours === 12) return 'every 12 hours';
    return `every ${hours} hours`;
}

// Convert hours to cron expression
function hoursToCron(hours) {
    // Use simple interval: */n * * * * (every n hours)
    return `0 */${hours} * * *`; // At minute 0, every nth hour
}

// Start scheduled posting
function startScheduler() {
    if (!config.SCHEDULE_ENABLED) {
        console.log('⏭️ Scheduling is disabled. Bot will run once on demand.');
        return;
    }

    const cronExpression = hoursToCron(config.POSTING_INTERVAL_HOURS);
    
    scheduledJob = cron.schedule(cronExpression, async () => {
        try {
            console.log(`\n🤖 [${ new Date().toLocaleString()}] Scheduled post time!`);
            await index.postToChannel();
        } catch (error) {
            console.error(`❌ Scheduled post failed: ${error.message}`);
        }
    });

    console.log(`⏰ Scheduler started! Posts will be sent ${formatInterval(config.POSTING_INTERVAL_HOURS)}`);
    console.log(`📅 Cron expression: ${cronExpression}`);
}

// Stop scheduler
function stopScheduler() {
    if (scheduledJob) {
        scheduledJob.stop();
        console.log('⏹️ Scheduler stopped');
    }
}

// Get scheduler status
function getSchedulerStatus() {
    return {
        enabled: config.SCHEDULE_ENABLED,
        interval: config.POSTING_INTERVAL_HOURS,
        running: scheduledJob ? true : false,
        nextRun: scheduledJob ? 'Check system logs' : 'Not scheduled'
    };
}

module.exports = {
    startScheduler,
    stopScheduler,
    getSchedulerStatus
};
