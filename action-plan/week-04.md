# Week 04: Scenario & Roleplay Expansion

## 🎯 Goal
Expand roleplay scenarios from 11 to 50, covering all essential real-life situations Indians encounter.

## 📋 Tasks

### Day 1: Scenario Framework
- [ ] Enhance scenario schema with:
  - Multiple dialogue paths (branching conversations)
  - Difficulty progression within scenarios
  - Cultural tips and common mistakes
  - Audio pronunciation guides
- [ ] Add scenario completion tracking
- [ ] Create scenario recommendation engine

### Day 2-3: Professional Scenarios (15 new)
- [ ] **Job Interview - Technical Round** (तकनीकी इंटरव्यू)
- [ ] **Salary Negotiation** (वेतन वार्ता)
- [ ] **Giving a Presentation** (प्रेजेंटेशन देना)
- [ ] **Team Meeting Participation** (टीम मीटिंग में भाग लेना)
- [ ] **Asking for Leave** (छुट्टी मांगना)
- [ ] **Handling Customer Complaints** (ग्राहक शिकायत संभालना)
- [ ] **Business Phone Call** (बिजनेस फोन कॉल)
- [ ] **Email Follow-up Discussion** (ईमेल फॉलो-अप चर्चा)
- [ ] **Performance Review** (परफॉर्मेंस रिव्यू)
- [ ] **Networking at Events** (इवेंट में नेटवर्किंग)
- [ ] **Client Meeting** (क्लाइंट मीटिंग)
- [ ] **Explaining Technical Issues** (तकनीकी समस्या समझाना)
- [ ] **Onboarding New Employee** (नए कर्मचारी को ट्रेनिंग)
- [ ] **Resignation Conversation** (इस्तीफा बातचीत)
- [ ] **Freelance Project Discussion** (फ्रीलांस प्रोजेक्ट चर्चा)

### Day 4-5: Daily Life Scenarios (15 new)
- [ ] **Ordering Food Online** (ऑनलाइन खाना ऑर्डर करना)
- [ ] **Complaining to Landlord** (मकान मालिक से शिकायत)
- [ ] **At the Gym** (जिम में)
- [ ] **Booking a Cab** (कैब बुक करना)
- [ ] **Parent-Teacher Meeting** (पैरेंट-टीचर मीटिंग)
- [ ] **At the Salon/Barber** (सैलून में)
- [ ] **Returning a Product** (प्रोडक्ट वापस करना)
- [ ] **Asking for Directions** (रास्ता पूछना)
- [ ] **At the Pharmacy** (दवाई की दुकान पर)
- [ ] **Neighbor Introduction** (पड़ोसी से परिचय)
- [ ] **Electricity Bill Complaint** (बिजली बिल शिकायत)
- [ ] **Wedding Invitation** (शादी का निमंत्रण)
- [ ] **Discussing with Mechanic** (मैकेनिक से बात)
- [ ] **At the Tailor** (दर्जी के पास)
- [ ] **Booking a Hotel** (होटल बुक करना)

### Day 6: Travel & Emergency Scenarios (9 new)
- [ ] **Airport Check-in** (एयरपोर्ट चेक-इन)
- [ ] **Lost Luggage** (सामान खो जाना)
- [ ] **Visa Interview** (वीज़ा इंटरव्यू)
- [ ] **Police Station Report** (पुलिस स्टेशन रिपोर्ट)
- [ ] **Hospital Emergency** (अस्पताल इमरजेंसी)
- [ ] **Insurance Claim** (बीमा क्लेम)
- [ ] **Embassy Visit** (दूतावास जाना)
- [ ] **Currency Exchange** (करेंसी एक्सचेंज)
- [ ] **Tourist Guide Interaction** (टूरिस्ट गाइड से बात)

### Day 7: Testing & Polish
- [ ] Test all dialogue flows
- [ ] Verify Hindi translations
- [ ] Add pronunciation hints
- [ ] Mobile UI testing
- [ ] Add scenario difficulty ratings

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Professional Scenarios | 15 new | P0 |
| Daily Life Scenarios | 15 new | P0 |
| Travel Scenarios | 5 new | P0 |
| Emergency Scenarios | 4 new | P1 |
| Dialogue turns per scenario | 8-12 | P0 |
| Cultural tips | 1-2 per scenario | P1 |

## 🔧 Enhanced Scenario Structure
```typescript
interface Scenario {
  id: number;
  title: string;
  titleHindi: string;
  category: 'professional' | 'daily_life' | 'travel' | 'emergency';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  yourRole: string;
  yourRoleHindi: string;
  partnerRole: string;
  partnerRoleHindi: string;
  context: string;           // Situation description
  contextHindi: string;
  dialogues: DialogueTurn[];
  culturalTips: string[];
  commonMistakes: string[];
  keyPhrases: Phrase[];
  xpReward: number;
}

interface DialogueTurn {
  speaker: 'you' | 'partner';
  text: string;
  textHindi: string;
  alternatives?: string[];   // Other acceptable responses
  hint?: string;
}
```

## ✅ Success Criteria
- [ ] 50 total scenarios (39 new + 11 existing)
- [ ] All scenarios have complete Hindi support
- [ ] Each scenario has 8-12 dialogue turns
- [ ] Cultural tips included where relevant
- [ ] Scenarios cover diverse Indian contexts

## 🚧 Blockers & Risks
- Risk: Dialogue naturalness - Mitigation: Test with native speakers
- Risk: Too many scenarios overwhelming users - Mitigation: Smart recommendations

## 📝 Notes
- Focus on situations where Indians commonly struggle
- Include formal and informal register variations
- Add "what not to say" examples
- Consider regional variations in some scenarios
