# 🤝 Contributing to Preet English

Thank you for your interest in contributing to Preet English! We welcome contributions from everyone who wants to help Hindi speakers learn English.

## 🎯 Ways to Contribute

### 1. 🐛 Report Bugs
- Use GitHub Issues
- Describe the bug clearly
- Include steps to reproduce
- Add screenshots if applicable

### 2. 💡 Suggest Features
- Open a GitHub Issue with the "Feature Request" template
- Describe the feature and its benefits
- Provide examples or mockups

### 3. 📚 Add Content
- New lessons across different categories
- Vocabulary words with Hindi translations
- Speaking practice topics
- Conversation scenarios
- Quiz questions

### 4. 💻 Improve Code
- Fix bugs
- Add new features
- Improve performance
- Enhance UI/UX
- Add tests

### 5. 📖 Improve Documentation
- Fix typos and errors
- Add examples and clarifications
- Translate documentation
- Create tutorials

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Basic knowledge of TypeScript and React

### Setup Development Environment

1. **Fork the Repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PREET_ENGLISH.git
   cd PREET_ENGLISH
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Database**
   ```bash
   npm run db:push
   npm run migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   ```
   http://localhost:5000
   ```

## 📝 Content Contribution Guidelines

### Adding Lessons

Use the lesson structure:
```typescript
{
  title: "Lesson Title",
  hindiTitle: "पाठ शीर्षक",
  description: "Brief description",
  hindiDescription: "संक्षिप्त विवरण",
  content: "Markdown content with examples",
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  category: "Category Name",
  order: 1
}
```

**Quality Standards:**
- Accurate English grammar
- Correct Hindi translations
- Appropriate difficulty level
- Engaging examples
- Cultural sensitivity

### Adding Vocabulary

Structure:
```typescript
{
  word: "English word",
  pronunciation: "pronunciation guide",
  definition: "Clear definition",
  example: "Example sentence",
  hindiTranslation: "हिंदी अनुवाद",
  hindiPronunciation: "pronunciation in Hindi"
}
```

### Adding Speaking Topics

Structure:
```typescript
{
  title: "Topic Title",
  hindiTitle: "विषय शीर्षक",
  difficulty: "Easy" | "Medium" | "Hard",
  category: "Category",
  hindiThoughts: ["thought 1", "thought 2"],
  sentenceFrames: ["frame 1", "frame 2"],
  modelAnswer: "Example answer",
  freePrompt: "Practice prompt",
  confidenceTip: "Encouraging tip"
}
```

## 💻 Code Contribution Guidelines

### Code Style

- **TypeScript**: Use strict typing
- **Components**: Functional components with hooks
- **Naming**: Use descriptive names (camelCase for variables, PascalCase for components)
- **Comments**: Add comments for complex logic
- **Formatting**: Code will be auto-formatted on commit

### Project Structure

```
client/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── data/          # Static data files
server/
├── db.ts              # Database configuration
├── routes.ts          # API routes
└── storage.ts         # Database operations
shared/
├── schema.ts          # Database schema
└── routes.ts          # Shared route types
```

### Commit Message Convention

Follow conventional commits:

```
feat: Add new lesson category
fix: Correct Hindi translation in lesson 5
docs: Update README with new features
style: Format code with prettier
refactor: Improve lesson loading performance
test: Add tests for vocabulary component
chore: Update dependencies
```

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments where needed

3. **Test Your Changes**
   ```bash
   npm run check      # TypeScript check
   npm run dev        # Test in browser
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: Your feature description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Describe your changes clearly
   - Reference any related issues
   - Add screenshots for UI changes

## ✅ Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style and conventions
- [ ] TypeScript types are correct (`npm run check` passes)
- [ ] No console errors in browser
- [ ] Tested in development mode
- [ ] README updated (if needed)
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete
- [ ] Related issues are referenced

## 🎓 Content Quality Standards

### Lessons
- ✅ Accurate English grammar and usage
- ✅ Correct and natural Hindi translations
- ✅ Appropriate for the difficulty level
- ✅ Engaging and practical examples
- ✅ Culturally sensitive content
- ✅ Clear learning objectives

### Vocabulary
- ✅ Common and useful words
- ✅ Accurate translations
- ✅ Clear pronunciation guides
- ✅ Practical example sentences
- ✅ Appropriate category

### Speaking Topics
- ✅ Relevant to learners' needs
- ✅ Progressive difficulty
- ✅ Culturally appropriate
- ✅ Encouraging and supportive tone
- ✅ Practical application

## 🐛 Bug Report Guidelines

When reporting bugs, include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Numbered steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: Visual evidence if applicable
- **Environment**: Browser, OS, device information
- **Additional Context**: Any other relevant information

## 💡 Feature Request Guidelines

When requesting features, include:

- **Description**: Clear description of the feature
- **Problem**: What problem does it solve?
- **Solution**: How should it work?
- **Benefits**: Who benefits and how?
- **Examples**: Mockups or examples from other apps
- **Additional Context**: Any other relevant information

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Issues**: Check existing issues first
- **Documentation**: Read the README and guides
- **Community**: Join our discussions

## 🙏 Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors must:

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome people of all backgrounds
- **Be Constructive**: Provide helpful feedback
- **Be Patient**: Help others learn and grow
- **Be Professional**: Maintain professional conduct

### Unacceptable Behavior

- Harassment or discrimination
- Offensive comments or personal attacks
- Trolling or insulting remarks
- Publishing others' private information
- Other unprofessional conduct

## 📄 License

By contributing to Preet English, you agree that your contributions will be licensed under the MIT License.

## 🌟 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Credited in the app (for significant contributions)

## 📊 Contribution Ideas

### For Beginners
- Fix typos in documentation
- Add Hindi translations
- Report bugs
- Suggest improvements
- Add vocabulary words

### For Intermediate
- Add new lessons
- Create speaking topics
- Improve UI components
- Add tests
- Optimize performance

### For Advanced
- Implement new features
- Refactor code
- Add authentication
- Improve architecture
- Create integrations

## 🎯 Current Priorities

Check our [GitHub Issues](https://github.com/YOUR_USERNAME/PREET_ENGLISH/issues) for:
- `good first issue` - Great for beginners
- `help wanted` - Need community help
- `enhancement` - New features
- `bug` - Bugs to fix
- `content` - Content contributions needed

## 📝 Templates

### Lesson Template
See `templates/lesson-template.md` (to be created)

### Vocabulary Template
See `templates/vocabulary-template.md` (to be created)

### Speaking Topic Template
See `templates/speaking-topic-template.md` (to be created)

## 🚀 After Your Contribution

After your PR is merged:
1. Delete your feature branch
2. Pull the latest changes from main
3. Celebrate your contribution! 🎉

## 💖 Thank You!

Every contribution, no matter how small, makes Preet English better for thousands of learners. Thank you for being part of this mission to make English accessible to every Hindi speaker!

---

**Questions?** Open a GitHub Discussion or Issue.

**Ready to contribute?** Fork the repo and start coding!

---

*Prepared on initiative of Mrs. Premlata Jain, AAO, PWD Udaipur*

**Happy Contributing! 🎓✨**
