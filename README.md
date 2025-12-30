# 🇮🇳 Preet English - Professional English Learning Platform

A comprehensive full-stack English learning application designed specifically for Hindi speakers, featuring interactive lessons, progress tracking, and vocabulary management.

## ✨ Features

### 🎓 Learning Experience
- **1625+ Interactive Lessons** across multiple categories
- **Hindi Translations** with accurate pronunciations
- **Progressive Difficulty** from Beginner to Advanced
- **17 Categories** (Greetings, Business, Travel, Technology, etc.)
- **Vocabulary Management** with contextual definitions
- **Conversation Practice** with interactive dialogues
- **Progress Tracking** with completion analytics

### 🏗️ Technical Architecture
- **Full-Stack TypeScript** application
- **SQLite Database** with Drizzle ORM
- **Modern React UI** with Tailwind CSS + shadcn/ui
- **RESTful API** with type-safe routes
- **Real-time Progress** tracking
- **Responsive Design** for all devices

### 🎨 User Interface
- **Beautiful Modern Design** with smooth animations
- **Mobile-First** responsive layout
- **Accessibility** compliant
- **Professional UI Components** from shadcn/ui

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

## 🌟 Key Features in Detail

### Progress Tracking
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for English language learners
- Focused on Hindi-speaking audience
- Community-driven content and improvements

---

**Happy Learning! 🎓✨**