# Anime Posting Bot for Telegram

## Overview

This is an automated Telegram bot that generates and posts engaging anime content specifically for Doraemon and Shinchan channels. The bot creates formatted posts in Hinglish style with emojis, designed for channel posting rather than user interaction.

**Purpose:** Generate entertaining anime content for Telegram channels
**Target Audience:** Anime fans, especially Doraemon and Shinchan enthusiasts
**Main Features:**
- 4 types of posts: Episode summaries, trivia, today in history, polls
- GenZ Hinglish writing style with emojis
- Automated scheduling (every 4 hours)
- Telegram MarkdownV2 and HTML formatting support

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- Technology stack to be determined based on repository analysis
- Component structure and organization patterns
- State management approach
- Routing and navigation strategy

### Backend Architecture
- Node.js runtime environment
- Telegram Bot API integration using node-telegram-bot-api
- Environment-based configuration (dotenv)
- Scheduled posting using node-cron
- Modular design: index.js (main), postGenerator.js (content), animeData.js (database)

### Data Layer
- In-memory JavaScript objects for anime content storage
- Structured data for Doraemon and Shinchan episodes, trivia, facts, and polls
- No external database required - all content is static
- Content includes episodes, trivia questions, historical facts, and poll topics

### Authentication & Authorization
- Telegram Bot Token authentication via environment variables
- Channel posting permissions (bot must be admin of target channel)
- No user authentication required (channel-only posting)
- Secure credential storage via Replit Secrets

## External Dependencies

### Third-Party Services
- Telegram Bot API for message posting
- Replit hosting and secrets management
- Optional: Gemini API integration for future image generation
- Node-cron for scheduling posts

### APIs and Integrations
- Telegram Bot API for posting messages
- Error handling with MarkdownV2 fallback to HTML formatting
- Rate limiting handled automatically by Telegram Bot API
- Environment variable configuration for secure credential management

### Development Tools
- npm for package management
- Node.js with dotenv, node-telegram-bot-api, node-cron, axios
- Manual testing via command line flags (--test, --once)
- Replit Workflows for automated deployment and scheduling

## Recent Changes
- **August 29, 2025:** Initial bot creation with complete posting functionality
- Created modular architecture with separate files for main logic, post generation, and anime data
- Added comprehensive anime content database for Doraemon and Shinchan
- Implemented Hinglish GenZ writing style with emoji integration
- Added scheduling, testing, and deployment capabilities