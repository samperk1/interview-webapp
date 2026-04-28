# AI Interview Tool - Program Description

## Overview
This is a web-based interview tool that offers two types of interactive questionnaires:
1. **AI Agent Interview** - Helps users discover how an AI agent could benefit them professionally
2. **Mental Health Interview** - Provides a supportive mental health check-in experience

## Current Status (As of April 27, 2026)
✅ **Fully functional** - All features working correctly
- Menu screen with two interview options
- AI Agent Interview with 5 questions + follow-ups
- Mental Health Interview with 5 questions + follow-ups
- Personalized suggestions after completion
- Screenshots added to documentation

## Files
- `index.html` - Main HTML with inline JavaScript (menu + interview screens)
- `style.css` - Complete styling for chat interface, buttons, menu
- `script.js` - Backup external JavaScript file
- `server.py` - Simple Python HTTP server script
- `server_control.py` - Server control utilities
- `README.md` - Project documentation with screenshots
- `PROGRAM_DESCRIPTION.md` - This file
- `LICENSE` - Apache 2.0 License
- `.gitignore` - Git ignore rules
- `mainmenu.png` - Screenshot of main menu
- `aichat.png` - Screenshot of AI Agent interview
- `heath.png` - Screenshot of Mental Health interview

## Features
- **Interactive Menu** - Users select interview type from a clean menu interface
- **Chat Interface** - Real-time bot and user messages with auto-scroll
- **Dual Interview Modes** - AI Agent and Mental Health questionnaires
- **Follow-up Questions** - Each main question has a contextual follow-up
- **Personalized Suggestions** - Dynamic suggestions based on user responses
- **Responsive Design** - Clean UI with proper styling

## Technical Details
- Pure client-side application (no backend required)
- Vanilla JavaScript (ES6+)
- HTML5/CSS3 with Flexbox layout
- Event handlers use inline `onclick` attributes for reliability
- All interview data processed in browser session only

## How It Works
1. User loads page → Menu screen appears
2. User clicks interview type → Interview screen displays
3. Chat bot asks questions → User types answers
4. Follow-up questions asked after each main question
5. After all 5 questions complete → Personalized suggestions displayed

## Git Repository
- Initialized with Apache 2.0 license
- Ready for GitHub deployment
- Screenshots included in repo for documentation