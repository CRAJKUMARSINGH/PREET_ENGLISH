# Week 03: Story Expansion

## 🎯 Goal
Expand story library from 5 to 50 bilingual stories with vocabulary, comprehension questions, and cultural relevance.

## 📋 Tasks

### Day 1: Story Framework Enhancement
- [ ] Add story categories: Daily Life, Career, Travel, Family, Culture, Festivals
- [ ] Create story difficulty progression system
- [ ] Add reading time estimates
- [ ] Implement "continue reading" bookmarks
- [ ] Add story completion tracking

### Day 2-3: Beginner Stories (15 new)
- [ ] The First Day at School (स्कूल का पहला दिन)
- [ ] My Best Friend (मेरा सबसे अच्छा दोस्त)
- [ ] A Visit to Grandparents (दादा-दादी से मिलना)
- [ ] The Lost Wallet (खोया हुआ बटुआ)
- [ ] Making Tea (चाय बनाना)
- [ ] The Helpful Rickshaw Driver (मददगार रिक्शावाला)
- [ ] Shopping for Diwali (दिवाली की खरीदारी)
- [ ] A Rainy Day (बारिश का दिन)
- [ ] The New Phone (नया फोन)
- [ ] Cooking with Mom (माँ के साथ खाना बनाना)
- [ ] The Morning Walk (सुबह की सैर)
- [ ] At the Bank (बैंक में)
- [ ] The Birthday Party (जन्मदिन की पार्टी)
- [ ] Visiting the Doctor (डॉक्टर के पास)
- [ ] The Bus Ride (बस की सवारी)

### Day 4-5: Intermediate Stories (20 new)
- [ ] The Job Promotion (नौकरी में तरक्की)
- [ ] Starting a Small Business (छोटा व्यापार शुरू करना)
- [ ] The College Reunion (कॉलेज रीयूनियन)
- [ ] Moving to a New City (नए शहर में जाना)
- [ ] The Wedding Preparation (शादी की तैयारी)
- [ ] Learning to Drive (गाड़ी चलाना सीखना)
- [ ] The Office Meeting (ऑफिस मीटिंग)
- [ ] A Trip to Goa (गोवा की यात्रा)
- [ ] The Power Cut (बिजली कटौती)
- [ ] Negotiating Rent (किराये पर बातचीत)
- [ ] The Cricket Match (क्रिकेट मैच)
- [ ] Online Shopping Gone Wrong (ऑनलाइन शॉपिंग की गड़बड़)
- [ ] The Surprise Visit (अचानक मिलना)
- [ ] Dealing with Traffic (ट्रैफिक से निपटना)
- [ ] The Festival of Holi (होली का त्योहार)
- [ ] Parent-Teacher Meeting (पैरेंट-टीचर मीटिंग)
- [ ] The Gym Experience (जिम का अनुभव)
- [ ] Booking Train Tickets (ट्रेन टिकट बुक करना)
- [ ] The Neighborhood Dispute (पड़ोसियों का झगड़ा)
- [ ] A Day Without Internet (इंटरनेट के बिना एक दिन)

### Day 6: Advanced Stories (10 new)
- [ ] The Startup Journey (स्टार्टअप की यात्रा)
- [ ] Studying Abroad Dreams (विदेश में पढ़ाई के सपने)
- [ ] The Environmental Activist (पर्यावरण कार्यकर्ता)
- [ ] Balancing Work and Family (काम और परिवार का संतुलन)
- [ ] The Political Discussion (राजनीतिक चर्चा)
- [ ] Healthcare in India (भारत में स्वास्थ्य सेवा)
- [ ] The Generation Gap (पीढ़ी का अंतर)
- [ ] Women in Leadership (नेतृत्व में महिलाएं)
- [ ] Digital India Transformation (डिजिटल इंडिया परिवर्तन)
- [ ] The Retirement Plan (सेवानिवृत्ति की योजना)

### Day 7: Quality & Integration
- [ ] Add 5-8 vocabulary words per story
- [ ] Create 3-5 comprehension questions per story
- [ ] Add cultural notes where relevant
- [ ] Test story reader UI
- [ ] Add "read aloud" feature integration

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Beginner Stories | 15 new (20 total) | P0 |
| Intermediate Stories | 20 new | P0 |
| Advanced Stories | 10 new | P1 |
| Vocabulary per story | 5-8 words | P0 |
| Comprehension questions | 3-5 per story | P0 |
| Cultural notes | Where relevant | P1 |

## 🔧 Story Structure
```typescript
interface Story {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;           // English story
  contentHindi: string;      // Hindi translation
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  readingTime: string;       // "5 min"
  vocabulary: VocabItem[];
  comprehensionQuestions: Question[];
  culturalNote?: string;
  culturalNoteHindi?: string;
  xpReward: number;
}
```

## ✅ Success Criteria
- [ ] 50 total stories (45 new + 5 existing)
- [ ] All stories have complete Hindi translations
- [ ] Each story has vocabulary and questions
- [ ] Stories cover diverse Indian contexts
- [ ] Reading experience is smooth on mobile

## 🚧 Blockers & Risks
- Risk: Content quality consistency - Mitigation: Use template structure
- Risk: Hindi translation accuracy - Mitigation: Review by native speaker

## 📝 Notes
- Stories should reflect real Indian life situations
- Include diverse characters (different regions, professions)
- Avoid stereotypes, promote positive values
- Each story should teach practical English usage
