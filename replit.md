# Anime Posting Bot for Telegram

## Overview

This is an automated Telegram bot that generates and posts engaging anime content for Doraemon and Shinchan channels. The bot creates formatted posts in Hinglish GenZ style with emojis, featuring 10 diverse content types with smart history tracking to prevent duplicates.

**Purpose:** Generate entertaining, non-repetitive anime content for Telegram channels
**Target Audience:** Anime fans, especially Doraemon and Shinchan enthusiasts
**Main Features:**
- 10 content types: Episode Summaries, Trivia, Today in History, Polls, Anime Facts, Stories, News, Character Quotes, Would You Rather, Mini Quiz
- GenZ Hinglish writing style with strategic emoji usage
- Intelligent post history tracking (last 100 posts, prevents duplicates with 10 retry attempts)
- Dynamic hashtag generation for maximum engagement
- Telegram MarkdownV2 and HTML formatting support
- One-click posting (no scheduling - bot posts immediately when run and stops)

## User Preferences

- Hinglish GenZ banter tone with lots of emojis
- Simple, everyday language in communication
- Immediate posting without scheduling

## System Architecture

### Frontend Architecture
- No frontend currently implemented
- Potential for future web dashboard to view post history and analytics

### Backend Architecture
- Node.js runtime environment
- Telegram Bot API integration using `node-telegram-bot-api`
- Gemini API integration for content generation (via `@google/genai`)
- Environment-based configuration (dotenv)
- No scheduling - manual execution only
- Modular design: 
  - `index.js` - main entry point and posting logic
  - `postGenerator.js` - all 10 content type generators with hashtags and formatting
  - `gemini.js` - AI content enhancement and caption generation
  - `animeData.js` - comprehensive anime content database
  - `historyManager.js` - smart post history tracking to prevent duplicates

### Data Layer
- **Post History:** JSON file-based storage (`postHistory.json`) tracking last 100 posts with unique content keys
- **Anime Content:** In-memory JavaScript objects for episodes, trivia, facts, and scenarios
- **Smart Selection:** Automatically tries up to 10 times to find unique content before allowing repeats
- **Content Key System:** Unique identifiers like `episode_doraemon_1`, `trivia_shinchan_3` for tracking

### Content Types (10 Types)
1. **Episode Summary** - Synopsis of memorable anime episodes with Hinglish commentary
2. **Trivia** - Fun quiz questions about anime with multiple choice options
3. **Today in History** - Historical anime facts and memorable dates
4. **Poll** - Interactive voting scenarios about anime characters
5. **Anime Facts** - Lesser-known behind-the-scenes facts
6. **Anime Stories** - Short fan fiction and character interactions
7. **Anime News** - Latest updates and interesting developments
8. **Character Quotes** - Iconic dialogue from beloved characters
9. **Would You Rather** - Entertaining "choose between" scenarios
10. **Mini Quiz** - Quick brain teasers about anime trivia

### Hashtag System
Dynamic hashtag generation for each post type:
- Anime-specific: `#Doraemon`, `#Nobita`, `#Shinchan`, `#CrayonShinchan`, etc.
- Type-specific: `#AnimeTrivia`, `#Polls`, `#AnimeFacts`, `#AnimeQuotes`, `#GameTime`, etc.
- General reach: `#AnimeLovers`, `#AnimeComedy`, `#AnimeIndia`, `#MustWatch`, etc.
- Each post includes 4-5 random relevant hashtags for discoverability

### Authentication & Authorization
- Telegram Bot Token authentication via `TELEGRAM_BOT_TOKEN` environment variable
- Gemini API Key via `GEMINI_API_KEY` environment variable
- Channel ID via `CHANNEL_ID` environment variable
- Channel posting permissions (bot must be admin of target channel)
- No user authentication required (channel-only posting)
- Secure credential storage via Replit Secrets

## External Dependencies

### Third-Party Services
- **Telegram Bot API** - For posting messages to channels
- **Gemini API** - For AI-powered content enhancement and caption generation
- **Replit Hosting** - Application hosting
- **Replit Secrets** - Environment variable and API key management

### Node.js Packages
- `node-telegram-bot-api` (v0.64.0) - Telegram integration
- `@google/genai` (v0.4.0) - Gemini AI integration
- `dotenv` (v16.0.3) - Environment variable loading
- `node-cron` (v3.0.3) - Task scheduling (for future use)
- `axios` (v1.6.0) - HTTP requests (for future use)

### APIs and Integrations
- Telegram Bot API for message posting with MarkdownV2 and HTML support
- Gemini 2.5 Flash API for content enhancement
- Error handling with automatic MarkdownV2 to HTML fallback
- Rate limiting handled automatically by Telegram API

## Technical Implementation

### Smart History Tracking
- Maintains JSON file of last 100 posts with timestamps
- Each post has a unique `contentKey` for deduplication
- When generating new content, checks against recent posts
- Implements retry logic (up to 10 attempts) to find unique content
- Prevents identical content from being posted repeatedly

### Content Generation Pipeline
1. Generate random content type
2. Create appropriate anime and content variation
3. Apply Hinglish GenZ style with emojis
4. Generate dynamic hashtags
5. Check post history for uniqueness
6. Retry up to 10 times if content is duplicate
7. Escape special characters for Telegram MarkdownV2
8. Post to channel with MarkdownV2 format
9. Fallback to HTML if MarkdownV2 fails
10. Save successful post to history

### Image Generation (Prepared Infrastructure)
- Infrastructure built for 5 different image styles (Professional Thumbnail, Cartoon, Realistic, Sketch, Vibrant Pop Art)
- Image generation currently disabled (free Gemini API tier doesn't support image generation)
- Can be re-enabled if premium Gemini API access is obtained
- Image processing and caching system implemented but inactive

## Recent Changes

- **November 21, 2025:**
  - ✅ Implemented 10 content types (added Quotes, Would You Rather, Mini Quiz)
  - ✅ Created smart post history tracking system to prevent duplicate content
  - ✅ Added intelligent retry logic (up to 10 attempts for unique content)
  - ✅ Implemented dynamic hashtag generation for all 10 post types
  - ✅ Built 5 image style templates (infrastructure ready, generation disabled)
  - ✅ Added comprehensive error handling with MarkdownV2/HTML fallback
  - ✅ Made bot post immediately on demand (no scheduling)
  - ✅ Finalized all core features and tested end-to-end

## Deployment

### Running Locally
```bash
npm install
node index.js
```

### Environment Variables Required
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `CHANNEL_ID` - Telegram channel ID to post to (negative number, e.g., -1002976231790)
- `GEMINI_API_KEY` - Google AI API key for content enhancement

### Current Status
✅ **Production Ready** - Bot is fully functional with all 10 content types, history tracking, hashtags, and error handling. Works reliably with text-only posts.

### Future Enhancements
- [ ] Web dashboard for post history and analytics
- [ ] Settings panel for bot customization
- [ ] Re-enable image generation with premium API access
- [ ] Scheduled posting with adjustable frequency
- [ ] User feedback system
- [ ] Content analytics and performance metrics
