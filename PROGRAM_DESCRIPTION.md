# AI Interview Tool - Program Description

## Overview
This is a web-based interview tool that offers two types of interviews:
1. AI Agent Interview - Helps users discover how an AI agent could benefit them professionally
2. Mental Health Interview - Supports users with a mental health check-in

## Files
- `index.html` - Main HTML structure with tabbed interface for selecting interview type
- `style.css` - Styling for the application
- `script.js` - Main application logic handling:
  - Interview questions for both modes
  - Chat interface with bot and user messages
  - Tab switching functionality
  - Response processing and suggestion generation
  - Initialization of chat sessions

## Current Behavior
- Application loads directly into AI Agent Interview mode
- Users can switch between AI Agent and Mental Health interviews using tabs
- Each interview consists of 5 questions with follow-ups
- After completing all questions, personalized suggestions are generated
- Mental Health tab appears to be functional but may need verification

## Intended Behavior (After Fixes)
- Application loads showing a menu asking which questionnaire to start
- User selects either AI Agent Interview or Mental Health Interview
- Selected interview interface is displayed
- Both interviews function correctly from start to completion