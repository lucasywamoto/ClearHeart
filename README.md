# ClearHeart Web App

🌐 Live Demo: https://clearheart.onrender.com/

## Overview
A web application built for the Javascript Frameworks class that allows users to share their daily moods. The application features 36 different moods categorized across three spectrums: Positive, Neutral, and Negative. Users can share one mood per day along with an optional comment.

## Technologies Used
- Node.js
- Next.js
- React
- MongoDB
- NextAuth.js
- Bootstrap

## Features

### Dashboard
The dashboard provides real-time mood analytics and updates automatically every 30 seconds:
- Today's most shared mood
- Personal weekly mood spectrum history
- Number of users sharing your current mood
- Distribution of today's moods across the three spectrums
- Live feed of recent user entries

### Authentication
- Local registration and login system
- Google OAuth integration via NextAuth.js
- Secure session management

### Profile System
- Google account integration:
  - Automatic profile picture import
  - Username synchronization
- Local accounts:
  - Random avatar generation via Avatar Placeholder API
  - Customizable username

### User Interface
- **Mood Selection**: 36 distinct moods across three spectrums
- **Search Functionality**: Quick mood search feature for easy selection
- **Interactive Tooltips**: Hover-activated mood descriptions powered by Bootstrap
- **Real-time Updates**: Automatic dashboard refresh every 30 seconds

## Technical Implementation

### API Endpoints
The application communicates with the database through RESTful API endpoints.

### Database Schema
MongoDB collections structure:
- User (name, email, password, avatar, oauthProvider, providerId, clearRecords)
- Mood (mood, type, tooltip)
- ClearRecord (user, mood, created, dateCreated, timezone)
- Stats (day, mood, count)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Google OAuth credentials (for Google sign-in)

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with the following:
```
DATABASE_URL=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
```

### Deployment
The application can be deployed to platforms supporting Next.js applications like Vercel or Netlify. Follow the platform-specific deployment instructions and ensure all environment variables are properly configured.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments
- Next.js Documentation
- NextAuth.js
- Bootstrap Documentation
- Avatar Placeholder API
- Background - Modified version from https://codepen.io/walpolea/pen/JjwYaxM
