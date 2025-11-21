# Anime Posting Bot for Telegram

## Overview

This is an automated Telegram bot that generates and posts engaging anime content for Doraemon and Shinchan channels. The bot creates formatted posts in Hinglish GenZ style with emojis, featuring 10 diverse content types with intelligent history tracking to prevent duplicates.

**Purpose:** Generate entertaining, non-repetitive anime content for Telegram channels
**Target Audience:** Anime fans, especially Doraemon and Shinchan enthusiasts
**Main Features:**
- 10 content types: Episode Summaries, Trivia, Today in History, Polls, Anime Facts, Stories, News, Character Quotes, Would You Rather, Mini Quiz
- GenZ Hinglish writing style with strategic emoji usage
- Intelligent post history tracking (last 100 posts, prevents duplicates with 10 retry attempts)
- Dynamic hashtag generation for maximum engagement & discoverability
- Telegram MarkdownV2 and HTML formatting support with automatic fallback
- One-click posting (no scheduling - bot posts immediately when run and stops)

## User Preferences

- Hinglish GenZ banter tone with lots of emojis
- Simple, everyday language
- Immediate posting without scheduling
- Text-focused posts (images require paid API tier)

## System Architecture

### Backend Architecture
- **Runtime:** Node.js environment
- **Main Entry:** `index.js` - posting logic and Telegram integration
- **Content Generation:** `postGenerator.js` - all 10 content type generators with hashtags
- **AI Enhancement:** `gemini.js` - Gemini API for content enhancement
- **Data Storage:** `animeData.js` - comprehensive anime content database
- **History Tracking:** `historyManager.js` - JSON-based post deduplication

### Data Layer
- **Post History:** JSON file (`postHistory.json`) tracking last 100 posts with timestamps
- **Content Keys:** Unique identifiers (e.g., `episode_doraemon_1`, `trivia_shinchan_3`) for deduplication
- **Smart Selection:** Automatically retries up to 10 times to find unique content
- **Anime Content:** In-memory database with episodes, trivia, facts, and scenarios

### Content Types (10 Total)
1. **Episode Summary** - Episode synopses with Hinglish commentary
2. **Trivia** - Quiz questions with multiple choice options
3. **Today in History** - Historical anime facts and dates
4. **Poll** - Interactive voting scenarios
5. **Anime Facts** - Behind-the-scenes trivia
6. **Anime Stories** - Short fan fiction and character interactions
7. **Anime News** - Updates and developments
8. **Character Quotes** - Iconic dialogue
9. **Would You Rather** - Choose-between scenarios
10. **Mini Quiz** - Quick trivia questions

### Hashtag System
- Dynamic generation based on anime (Doraemon/Shinchan) and content type
- Anime-specific: `#Doraemon`, `#Nobita`, `#Shinchan`, `#CrayonShinchan`
- Type-specific: `#AnimeTrivia`, `#Polls`, `#AnimeFacts`, `#AnimeQuotes`, `#GameTime`
- General reach: `#AnimeLovers`, `#AnimeComedy`, `#AnimeIndia`, `#MustWatch`
- Each post includes 4-5 randomly selected relevant hashtags

### Authentication & Authorization
- **Telegram Bot Token:** `TELEGRAM_BOT_TOKEN` via Replit Secrets
- **Channel ID:** `CHANNEL_ID` environment variable
- **Gemini API Key:** `GEMINI_API_KEY` via Replit Secrets
- Bot must have admin permissions in target channel

## External Dependencies

### Third-Party Services
- **Telegram Bot API** - Message posting to channels
- **Gemini API** - Content enhancement via `@google/genai`
- **Replit Hosting** - Application platform
- **Replit Secrets** - Environment variable management

### Node.js Packages
- `node-telegram-bot-api` (v0.64.0) - Telegram integration
- `@google/genai` (v1.16.0) - Gemini AI integration
- `dotenv` (v16.0.3) - Environment variables
- `node-cron` (v3.0.3) - Task scheduling (for future use)
- `axios` (v1.6.0) - HTTP requests (for future use)

## Technical Implementation

### Smart History Tracking
- JSON-based storage of last 100 posts
- Each post has unique `contentKey` for deduplication
- Checks against recent posts before generating new content
- Implements retry logic (up to 10 attempts) to find unique content
- Prevents identical content from being repeated

### Content Generation Pipeline
1. Generate random content type
2. Select anime (Doraemon or Shinchan)
3. Create content variation
4. Apply Hinglish GenZ style with emojis
5. Generate dynamic hashtags
6. Check history for uniqueness
7. Retry up to 10 times if duplicate
8. Escape special characters for Telegram MarkdownV2
9. Post with MarkdownV2 format (fallback to HTML if needed)
10. Save successful post to history

### Error Handling
- Automatic MarkdownV2 to HTML fallback for parsing issues
- Graceful image generation failure (posts without images)
- Comprehensive error logging
- Retry mechanism for duplicate content detection

## Recent Changes

- **November 21, 2025:**
  - ✅ Implemented 10 content types (added Quotes, Would You Rather, Mini Quiz)
  - ✅ Created smart post history tracking to prevent duplicate content
  - ✅ Added intelligent retry logic (up to 10 attempts for unique content)
  - ✅ Implemented dynamic hashtag generation for all 10 post types
  - ✅ Built infrastructure for 5 image styles (Professional Thumbnail, Cartoon, Realistic, Sketch, Vibrant Pop Art)
  - ✅ Added comprehensive error handling with MarkdownV2/HTML fallback
  - ✅ Made bot post immediately on demand (no scheduling)
  - ✅ Finalized all core features - bot is production-ready

## Deployment

### Running Locally
```bash
npm install
node index.js
```

### Environment Variables Required
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `CHANNEL_ID` - Telegram channel ID (negative number, e.g., -1002976231790)
- `GEMINI_API_KEY` - Google AI API key (optional, for content enhancement)

### Current Status
✅ **Production Ready** - Bot reliably generates unique posts from 10 content types with hashtags, history tracking, and error handling. Text-only mode working perfectly.

### Optional Future Features
- [ ] Image generation with paid API tier (Imagen or DALL-E)
- [ ] Web dashboard for post history and analytics
- [ ] Settings panel for customization
- [ ] Scheduled posting with configurable frequency
- [ ] User feedback system
- [ ] Performance metrics and analytics

## How It Works

1. **Run the bot:** `node index.js`
2. **Bot picks random content type** from 10 options
3. **Selects random anime** (Doraemon or Shinchan)
4. **Generates Hinglish GenZ post** with emojis
5. **Adds dynamic hashtags** for engagement
6. **Checks history** to ensure content is unique
7. **Posts to Telegram channel**
8. **Saves to history** to prevent future duplicates
9. **Bot stops** (ready for next manual run)

That's it! No scheduling, no configuration needed - just pure entertainment on demand! 🎉
