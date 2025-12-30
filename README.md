# 🇮🇳 Preet English - Professional English Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made with ❤️ in India](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-India-orange.svg)](https://en.wikipedia.org/wiki/India)

![Preet English Banner](https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=Preet+English+-+Learn+English+with+Hindi+Support)  
*(Replace with custom banner featuring Saraswati mascot)*

A comprehensive full-stack English learning application designed specifically for Hindi speakers, featuring interactive lessons, progress tracking, gamification, and advanced speaking practice.

## ✨ Live Demo

🔗 **[Try Preet English Now](https://preet-english.yourdeploylink.com)** *(Add your deployed link here)*

## 📸 Screenshots

### Dashboard & Progress Tracking
![Dashboard](https://via.placeholder.com/1200x800/4F46E5/FFFFFF?text=Dashboard+with+Gamification)

### Lesson Page with Hindi Translations
![Lesson View](https://via.placeholder.com/1200x800/10B981/FFFFFF?text=Split-View+Lesson+Page)

### Speaking Practice with Video Guide
![Speaking Practice](https://via.placeholder.com/1200x800/F59E0B/FFFFFF?text=4-Step+Speaking+Practice)

### Mobile View - Vocabulary & Categories
![Mobile View](https://via.placeholder.com/600x1200/8B5CF6/FFFFFF?text=Mobile+Responsive+Design)

*(Tip: Replace these placeholders with actual screenshots from your app!)*

## ✨ Features

### 🎓 Learning Experience
- **1625+ Interactive Lessons** across multiple categories
- **Hindi Translations** with accurate pronunciations
- **Progressive Difficulty** from Beginner to Advanced
- **17 Categories** (Greetings, Business, Travel, Technology, etc.)
- **Vocabulary Management** with 88 words across 11 categories
- **Conversation Practice** with 6 interactive dialogue scenarios
- **Enhanced Speaking Practice** with 4-step method:
  - 🧠 **Think** in Hindi
  - 🧩 **Frame** with English sentence structures
  - 🎤 **Speak** with auto-timer recording
  - 🌟 **Feedback** with celebration and stats
- **Video-Assisted Learning** with 45-second guided practice sessions
- **Progress Tracking** with detailed completion analytics

### 🏗️ Technical Architecture
- **Full-Stack TypeScript** application
- **SQLite Database** with Drizzle ORM (15+ tables)
- **Modern React UI** with Tailwind CSS + shadcn/ui
- **RESTful API** with type-safe routes
- **Real-time Progress** tracking
- **Responsive Design** for all devices
- **22+ Reusable Components** for scalability

### 🎨 User Interface
- **Beautiful Modern Design** with smooth animations
- **Mobile-First** responsive layout
- **Dark Mode** support with theme toggle
- **Accessibility** compliant
- **Professional UI Components** from shadcn/ui
- **Saraswati Mascot** for cultural connection
- **Hindi-First Design** with prominent Hindi text

### 🎮 Gamification System
- **XP Points** - Earn points for every activity
- **Level Progression** - Advance through learning levels
- **Achievement Badges** - Unlock 4+ types of achievements
- **Daily Streaks** - Track current and longest streaks
- **Leaderboard** - Compete with other learners
- **Daily Goals** - Set and achieve daily targets
- **Certifications** - Earn certificates at each proficiency level
- **Confidence Dashboard** - Monitor speaking confidence growth

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd preet-english
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# .env file is already configured for local SQLite
DATABASE_URL="file:./preet_english.db"
NODE_ENV="development"
```

4. **Set up the database:**
```bash
npm run db:push
```

5. **Migrate lesson data:**
```bash
npm run migrate           # Basic 110 lessons (quick start)
npm run migrate:full      # 520 lessons (comprehensive)
npm run migrate:complete  # All 1100+ lessons (complete collection)
npm run generate:lessons   # Generate lessons to reach 1625+ (if needed)
```

6. **Start the development server:**
```bash
npm run dev
```

7. **Open your browser:**
Navigate to `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express.js backend
│   ├── db.ts             # Database configuration
│   ├── routes.ts         # API route handlers
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
│   ├── schema.ts         # Database schema
│   └── routes.ts         # API route definitions
├── migrate-all-lessons.ts # Comprehensive lesson migration script
└── preet_english.db      # SQLite database file
```

## 🎯 Learning Categories

- **👋 Greetings** - Basic social interactions
- **💼 Business** - Professional communication
- **🛒 Shopping** - Commerce and transactions
- **✈️ Travel** - Transportation and directions
- **🍽️ Food** - Dining and cuisine
- **🏥 Health** - Medical and wellness
- **🎓 Education** - Academic and learning
- **💻 Technology** - Digital and tech terms
- **🏠 Daily Life** - Everyday conversations
- **📚 Advanced** - Complex expressions and idioms

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes
- `npm run migrate` - Migrate 110 lessons (quick start)
- `npm run migrate:full` - Migrate 520 lessons
- `npm run migrate:complete` - Migrate all 1100+ lessons
- `npm run generate:lessons` - Generate additional lessons to reach 1625+
- `npm run backup:db` - Backup database
- `npm run backup:list` - List available backups

## 🌟 Key Features in Detail

### 🎤 Enhanced Speaking Practice (NEW!)
- **4-Step Method**: 
  1. 🧠 **Think** - Organize thoughts in Hindi
  2. 🧩 **Frame** - Learn English sentence structures with video guide
  3. 🎤 **Speak** - Record with smart auto-timer (30s/60s/90s based on difficulty)
  4. 🌟 **Feedback** - Celebrate completion with stats and positive reinforcement
- **Video-Assisted Learning**: 45-second guided practice videos with 4 segments
- **25 Speaking Topics** across multiple categories
- **Confidence Tips** for every topic
- **Practice Again** option for continuous improvement

### 📚 Vocabulary Builder
- **88 Curated Words** across 11 practical categories
- **Hindi Translations** with pronunciation guides
- **Example Sentences** for context
- **Audio Support** (planned)
- **Flashcard Mode** for quick review

### 💬 Conversation Practice
- **6 Real-Life Scenarios**:
  - Restaurant ordering
  - Doctor visits
  - Job interviews
  - Shopping
  - Travel situations
  - Social interactions
- **Interactive Dialogues** with English and Hindi
- **Role-Play Mode** for practice

### 📊 Progress Tracking
- Individual lesson completion tracking
- Category-wise progress analytics
- Visual progress indicators
- Achievement system

### Vocabulary System
- Word definitions and pronunciations
- Hindi translations
- Example sentences
- Audio pronunciation (planned)

### Lesson Management
- Markdown-based lesson content
- Rich text formatting
- Image support
- Structured learning paths

### User Experience
- Smooth page transitions
- Loading states and error handling
- Toast notifications
- Responsive design

## 🚀 Deployment

### Recommended Platforms
- **Frontend**: Vercel or Netlify (free tier available)
- **Backend + DB**: Render, Fly.io, or Railway
- **Full-stack**: Replit (already configured)
- **Database**: Consider PostgreSQL for production (Supabase, Neon)

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```bash
DATABASE_URL="file:./preet_english.db"
NODE_ENV=production
```

## 🔜 Upcoming Features

- 🔊 **Audio Pronunciation** using Web Speech API
- 🧠 **Interactive Quizzes** with multiple question types
- 👤 **User Authentication** with cloud sync (Clerk/Supabase)
- 🔍 **Global Search** for lessons and vocabulary
- 🏆 **Expanded Gamification** with more achievements
- 📱 **PWA Support** for offline learning
- 🎯 **AI-Powered Feedback** on pronunciation
- 📊 **Advanced Analytics** dashboard
- 🌐 **Multi-language Support** (add more Indian languages)

## 🤝 Contributing

We welcome contributions! Especially:
- **New Lessons** and categories
- **Hindi Translation** improvements
- **Bug Fixes** and feature implementations
- **UI/UX** enhancements
- **Documentation** improvements

### How to Contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌟 Show Your Support

Give a ⭐️ if this project helped you or if you like the idea!

### Share on Social Media:
- Twitter: Share your learning progress
- LinkedIn: Recommend to colleagues
- Facebook: Help friends learn English

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Prepared on Initiative of Mrs. Premlata Jain**, AAO, PWD Udaipur
- Built with modern web technologies
- Designed specifically for Hindi-speaking English learners
- Inspired by the need for accessible language education in India
- Community-driven content and improvements
- Special thanks to all contributors and testers

## 📊 Project Stats

- **1625+ Lessons** across all difficulty levels
- **88 Vocabulary Words** with Hindi translations
- **25 Speaking Topics** with video guides
- **6 Conversation Scenarios** for real-life practice
- **15+ Database Tables** for comprehensive data management
- **22+ React Components** for modular architecture
- **100% TypeScript** for type safety
- **Dark Mode** support included

## 📱 Screenshots Guide

To add your own screenshots:
1. Run the app locally: `npm run dev`
2. Take high-quality screenshots of:
   - Dashboard with gamification features
   - Lesson page with split-view (English/Hindi)
   - Speaking practice with 4-step flow
   - Vocabulary builder page
   - Conversation practice page
   - Mobile responsive views
3. Create a `/screenshots` folder in your repo
4. Upload images and update README links

## 🏷️ GitHub Topics

Add these topics to your repository for better discoverability:
- `english-learning`
- `hindi`
- `language-app`
- `react`
- `typescript`
- `education`
- `fullstack`
- `gamification`
- `learning-platform`
- `india`

## 📦 Release Notes

### v1.0.0 (Current)
- ✅ 1625+ interactive lessons
- ✅ Full gamification system
- ✅ 4-step speaking practice with video guides
- ✅ Vocabulary builder with 88 words
- ✅ 6 conversation scenarios
- ✅ Dark mode support
- ✅ Mobile responsive design
- ✅ Saraswati mascot integration

---

## 💖 Credits

**Prepared on Initiative of Mrs. Premlata Jain**  
AAO, PWD Udaipur

---

**Happy Learning! 🎓✨**

*Making English accessible to every Hindi speaker in India* 🇮🇳