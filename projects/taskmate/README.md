# TaskMate - Productivity Chatbot

Your AI co-pilot for mission-driven productivity that transforms conversational intent into actionable accountability systems.

## Overview

TaskMate is built using the [Vibe Coding Model Spec (VCMS)](../Vibe_Coding_Model_Spec_v1.0.md) framework. It detects tasks and deadlines in natural conversation and provides intelligent nudges to reduce task drop-off by 70%.

## Quick Start

1. Install dependencies: `npm install` (both frontend and backend)
2. Set up environment variables: Copy `.env.example` to `.env`
3. Start the backend: `npm run server`
4. Start the frontend: `npm start`
5. Open in browser: `http://localhost:3000`

## Project Structure

```
taskmate/
├── README.md          # This file
├── spec.md           # VCMS specification
├── src/              # Source code
│   ├── frontend/     # React application
│   └── backend/      # Node.js server
├── docs/             # Documentation
└── .env.example      # Environment variables template
```

## Core Features

- **Chat Interface (CHAT-01)**: GPT-4 level conversation
- **Task Extraction (TASK-02)**: Detect tasks/deadlines in natural conversation
- **Notification Engine (NOTIFY-03)**: Time/context-triggered reminders
- **Mission System (MISSION-04)**: Break goals into daily checkpoints

## Development

This project follows the VCMS framework:
- **Spec-driven development**: All features are defined in `spec.md`
- **Atomic components**: Each feature is isolated and focused
- **Validation**: Use `../enforcement/validate-spec.py` to validate changes
- **Anti-overreach**: Strict protocols prevent scope creep

## Phase 1 MVP Scope

✅ **In Scope**:
- Chat interface with OpenAI integration
- Task extraction from conversation
- Desktop notifications
- Basic mission system
- Local SQLite storage

❌ **Out of Scope** (Phase 1):
- Calendar integrations
- Team collaboration
- Mobile app
- Cloud sync

## Links

- [VCMS Framework](../Vibe_Coding_Model_Spec_v1.0.md)
- [Validation Tools](../enforcement/)
- [Configuration](../tools/) 
