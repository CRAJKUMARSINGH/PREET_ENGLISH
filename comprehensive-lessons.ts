// Comprehensive lesson database for international market launch
// 500+ REAL, quality lessons for Hindi speakers learning English
import { db } from "./server/db.js";
import { lessons, vocabulary, progress } from "./shared/schema.js";

// Extended word meanings dictionary (200+ words)
const wordMeanings: { [key: string]: string } = {
  // Basic words
  'hello': 'नमस्ते', 'hi': 'हाय', 'good': 'अच्छा', 'morning': 'सुबह', 'evening': 'शाम',
  'night': 'रात', 'afternoon': 'दोपहर', 'how': 'कैसे', 'are': 'हैं', 'you': 'आप', 'fine': 'ठीक',
  'thank': 'धन्यवाद', 'thanks': 'धन्यवाद', 'welcome': 'स्वागत', 'please': 'कृपया',
  'sorry': 'माफी', 'excuse': 'माफ करें', 'help': 'मदद', 'need': 'जरूरत', 'yes': 'हाँ', 'no': 'नहीं',
  'want': 'चाहना', 'like': 'पसंद', 'love': 'प्यार', 'eat': 'खाना', 'drink': 'पीना',
  'water': 'पानी', 'food': 'खाना', 'tea': 'चाय', 'coffee': 'कॉफी', 'milk': 'दूध',
  'bread': 'रोटी', 'rice': 'चावल', 'where': 'कहाँ', 'what': 'क्या', 'when': 'कब',
  'why': 'क्यों', 'who': 'कौन', 'which': 'कौन सा', 'time': 'समय', 'today': 'आज',
  'tomorrow': 'कल', 'yesterday': 'बीता कल', 'now': 'अभी', 'here': 'यहाँ', 'there': 'वहाँ',
  'home': 'घर', 'work': 'काम', 'office': 'दफ्तर', 'school': 'स्कूल', 'hospital': 'अस्पताल',
  'market': 'बाजार', 'shop': 'दुकान', 'money': 'पैसा', 'buy': 'खरीदना', 'sell': 'बेचना',
  'cost': 'कीमत', 'price': 'दाम', 'cheap': 'सस्ता', 'expensive': 'महंगा',
  'family': 'परिवार', 'mother': 'माँ', 'father': 'पिता', 'brother': 'भाई', 'sister': 'बहन',
  'friend': 'दोस्त', 'name': 'नाम', 'age': 'उम्र', 'phone': 'फोन', 'address': 'पता',
  'book': 'किताब', 'pen': 'कलम', 'paper': 'कागज', 'read': 'पढ़ना', 'write': 'लिखना',
  'speak': 'बोलना', 'listen': 'सुनना', 'understand': 'समझना', 'know': 'जानना',
  'learn': 'सीखना', 'teach': 'सिखाना', 'student': 'छात्र', 'teacher': 'शिक्षक',
  'doctor': 'डॉक्टर', 'engineer': 'इंजीनियर', 'driver': 'ड्राइवर', 'farmer': 'किसान',
  'big': 'बड़ा', 'small': 'छोटा', 'new': 'नया', 'old': 'पुराना', 'hot': 'गर्म', 'cold': 'ठंडा',
  'fast': 'तेज', 'slow': 'धीमा', 'easy': 'आसान', 'difficult': 'कठिन', 'happy': 'खुश',
  'sad': 'दुखी', 'angry': 'गुस्सा', 'tired': 'थका', 'sick': 'बीमार', 'healthy': 'स्वस्थ',
  // Verbs
  'i': 'मैं', 'am': 'हूँ', 'is': 'है', 'was': 'था', 'will': 'होगा', 'can': 'सकना',
  'could': 'सकता था', 'should': 'चाहिए', 'would': 'होगा', 'may': 'हो सकता है',
  'hungry': 'भूखा', 'thirsty': 'प्यासा', 'pay': 'भुगतान', 'card': 'कार्ड', 'cash': 'नकद',
  'far': 'दूर', 'near': 'पास', 'left': 'बाएँ', 'right': 'दाएँ', 'straight': 'सीधे',
  'turn': 'मुड़ना', 'go': 'जाना', 'come': 'आना', 'see': 'देखना', 'look': 'देखना',
  'find': 'खोजना', 'lost': 'खोया', 'map': 'नक्शा', 'way': 'रास्ता', 'road': 'सड़क',
  'station': 'स्टेशन', 'airport': 'हवाई अड्डा', 'taxi': 'टैक्सी', 'bus': 'बस',
  'train': 'ट्रेन', 'ticket': 'टिकट', 'reservation': 'आरक्षण',
  'have': 'है', 'has': 'है', 'had': 'था', 'do': 'करना', 'does': 'करता है', 'did': 'किया',
  'get': 'पाना', 'give': 'देना', 'take': 'लेना', 'make': 'बनाना', 'put': 'रखना',
  'call': 'फोन करना', 'tell': 'बताना', 'say': 'कहना', 'ask': 'पूछना', 'answer': 'जवाब',
  'open': 'खोलना', 'close': 'बंद करना', 'start': 'शुरू करना', 'stop': 'रोकना',
  'finish': 'खत्म करना', 'begin': 'शुरू करना', 'end': 'अंत', 'continue': 'जारी रखना',
  'try': 'कोशिश करना', 'use': 'इस्तेमाल करना', 'show': 'दिखाना', 'bring': 'लाना',
  'send': 'भेजना', 'receive': 'पाना', 'wait': 'इंतजार करना', 'stay': 'रहना',
  'leave': 'छोड़ना', 'return': 'वापस आना', 'visit': 'मिलना', 'meet': 'मिलना',
  'talk': 'बात करना', 'walk': 'चलना', 'run': 'दौड़ना', 'sit': 'बैठना', 'stand': 'खड़ा होना',
  'sleep': 'सोना', 'wake': 'जागना', 'rest': 'आराम करना', 'feel': 'महसूस करना',
  'think': 'सोचना', 'remember': 'याद रखना', 'forget': 'भूलना', 'believe': 'विश्वास करना',
  // Numbers
  'one': 'एक', 'two': 'दो', 'three': 'तीन', 'four': 'चार', 'five': 'पाँच',
  'six': 'छह', 'seven': 'सात', 'eight': 'आठ', 'nine': 'नौ', 'ten': 'दस',
  'hundred': 'सौ', 'thousand': 'हजार', 'first': 'पहला', 'second': 'दूसरा', 'third': 'तीसरा',
  // Colors
  'red': 'लाल', 'blue': 'नीला', 'green': 'हरा', 'yellow': 'पीला', 'white': 'सफेद',
  'black': 'काला', 'orange': 'नारंगी', 'pink': 'गुलाबी', 'purple': 'बैंगनी', 'brown': 'भूरा',
  // Body parts
  'head': 'सिर', 'eye': 'आँख', 'ear': 'कान', 'nose': 'नाक', 'mouth': 'मुँह',
  'hand': 'हाथ', 'leg': 'पैर', 'foot': 'पाँव', 'finger': 'उंगली', 'heart': 'दिल',
  // Weather
  'weather': 'मौसम', 'rain': 'बारिश', 'sun': 'सूरज', 'cloud': 'बादल', 'wind': 'हवा',
  'summer': 'गर्मी', 'winter': 'सर्दी', 'spring': 'बसंत', 'autumn': 'पतझड़',
  // Business
  'meeting': 'बैठक', 'project': 'परियोजना', 'deadline': 'समय सीमा', 'report': 'रिपोर्ट',
  'email': 'ईमेल', 'presentation': 'प्रस्तुति', 'client': 'ग्राहक', 'manager': 'प्रबंधक',
  'salary': 'वेतन', 'promotion': 'पदोन्नति', 'interview': 'साक्षात्कार', 'resume': 'बायोडाटा',
  // More common words
  'very': 'बहुत', 'much': 'ज्यादा', 'many': 'बहुत सारे', 'some': 'कुछ', 'any': 'कोई',
  'all': 'सब', 'every': 'हर', 'each': 'प्रत्येक', 'other': 'अन्य', 'another': 'एक और',
  'same': 'समान', 'different': 'अलग', 'important': 'महत्वपूर्ण', 'necessary': 'जरूरी',
  'possible': 'संभव', 'impossible': 'असंभव', 'sure': 'निश्चित', 'certain': 'पक्का',
  'problem': 'समस्या', 'solution': 'समाधान', 'question': 'सवाल', 'reason': 'कारण',
  'example': 'उदाहरण', 'idea': 'विचार', 'plan': 'योजना', 'decision': 'निर्णय',
  'change': 'बदलाव', 'result': 'परिणाम', 'success': 'सफलता', 'failure': 'असफलता',
  'experience': 'अनुभव', 'opportunity': 'अवसर', 'situation': 'स्थिति', 'condition': 'हालत'
};

function getWordMeaning(word: string): string {
  const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
  return wordMeanings[cleanWord] || cleanWord;
}

// Elementary words that learners already know - don't show these
const elementaryWords = new Set([
  'i', 'me', 'my', 'you', 'your', 'we', 'our', 'they', 'their', 'he', 'she', 'it', 'his', 'her',
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might',
  'to', 'for', 'of', 'in', 'on', 'at', 'by', 'with', 'from', 'about', 'into', 'through',
  'and', 'or', 'but', 'if', 'so', 'as', 'than', 'then', 'because',
  'not', 'no', 'yes', 'very', 'much', 'more', 'most', 'some', 'any', 'all', 'each', 'every',
  'what', 'who', 'how', 'when', 'where', 'why', 'which',
  'up', 'down', 'out', 'just', 'now', 'here', 'there', 'also', 'only', 'well',
  'good', 'bad', 'new', 'old', 'big', 'small', 'first', 'last', 'next', 'other',
  'thank', 'thanks', 'please', 'hello', 'hi', 'bye', 'sorry', 'okay',
  'like', 'want', 'need', 'know', 'think', 'see', 'get', 'go', 'come', 'make', 'take', 'give',
  'say', 'tell', 'ask', 'let', 'put', 'try', 'keep', 'call', 'feel', 'seem', 'look',
  'time', 'day', 'year', 'way', 'thing', 'man', 'woman', 'people', 'work', 'life'
]);

function createLessonContent(english: string, hindi: string, category: string): string {
  // Only show vocabulary for words that are NOT elementary
  const words = english.split(' ').filter(w => {
    const cleanWord = w.replace(/[^\w]/g, '').toLowerCase();
    return cleanWord.length > 3 && !elementaryWords.has(cleanWord);
  }).slice(0, 3);
  
  const vocabList = words.map(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    const meaning = getWordMeaning(cleanWord);
    // Only show if we have a proper Hindi meaning (not just the English word)
    if (meaning !== cleanWord.toLowerCase()) {
      return `- **${cleanWord}**: ${meaning}`;
    }
    return '';
  }).filter(item => item).join('\n');

  const hindiWithPeriod = hindi.endsWith('।') || hindi.endsWith('.') || hindi.endsWith('?') || hindi.endsWith('!') 
    ? hindi : hindi + '।';

  // If no vocabulary worth showing, don't include the section
  if (!vocabList) {
    return `# ${english}

## हिंदी अनुवाद
**${hindiWithPeriod}**`;
  }

  return `# ${english}

## हिंदी अनुवाद
**${hindiWithPeriod}**

## मुख्य शब्दावली
${vocabList}`;
}

// ============================================
// BEGINNER LESSONS (200 lessons)
// ============================================
const beginnerLessons = [
  // Greetings (20)
  { en: 'Hello, how are you?', hi: 'नमस्ते, आप कैसे हैं?', cat: 'Greetings' },
  { en: 'Good morning!', hi: 'सुप्रभात!', cat: 'Greetings' },
  { en: 'Good afternoon!', hi: 'नमस्कार!', cat: 'Greetings' },
  { en: 'Good evening!', hi: 'शुभ संध्या!', cat: 'Greetings' },
  { en: 'Good night!', hi: 'शुभ रात्रि!', cat: 'Greetings' },
  { en: 'Nice to meet you.', hi: 'आपसे मिलकर खुशी हुई।', cat: 'Greetings' },
  { en: 'How was your day?', hi: 'आपका दिन कैसा रहा?', cat: 'Greetings' },
  { en: 'See you tomorrow.', hi: 'कल मिलते हैं।', cat: 'Greetings' },
  { en: 'Have a good day!', hi: 'आपका दिन शुभ हो!', cat: 'Greetings' },
  { en: 'Thank you very much.', hi: 'बहुत-बहुत धन्यवाद।', cat: 'Greetings' },
  { en: 'You are welcome.', hi: 'आपका स्वागत है।', cat: 'Greetings' },
  { en: 'Excuse me, please.', hi: 'माफ करें, कृपया।', cat: 'Greetings' },
  { en: 'I am sorry.', hi: 'मुझे माफ करें।', cat: 'Greetings' },
  { en: 'No problem.', hi: 'कोई बात नहीं।', cat: 'Greetings' },
  { en: 'Take care.', hi: 'अपना ख्याल रखें।', cat: 'Greetings' },
  { en: 'See you later.', hi: 'बाद में मिलते हैं।', cat: 'Greetings' },
  { en: 'Goodbye!', hi: 'अलविदा!', cat: 'Greetings' },
  { en: 'Have a nice weekend.', hi: 'आपका सप्ताहांत अच्छा हो।', cat: 'Greetings' },
  { en: 'Long time no see.', hi: 'बहुत दिनों बाद मिले।', cat: 'Greetings' },
  { en: 'How have you been?', hi: 'आप कैसे रहे?', cat: 'Greetings' },

  // Self Introduction (15)
  { en: 'My name is...', hi: 'मेरा नाम... है।', cat: 'Introduction' },
  { en: 'What is your name?', hi: 'आपका नाम क्या है?', cat: 'Introduction' },
  { en: 'I am from India.', hi: 'मैं भारत से हूँ।', cat: 'Introduction' },
  { en: 'Where are you from?', hi: 'आप कहाँ से हैं?', cat: 'Introduction' },
  { en: 'I live in Delhi.', hi: 'मैं दिल्ली में रहता हूँ।', cat: 'Introduction' },
  { en: 'I am 25 years old.', hi: 'मेरी उम्र 25 साल है।', cat: 'Introduction' },
  { en: 'How old are you?', hi: 'आपकी उम्र क्या है?', cat: 'Introduction' },
  { en: 'I am a student.', hi: 'मैं एक छात्र हूँ।', cat: 'Introduction' },
  { en: 'What do you do?', hi: 'आप क्या करते हैं?', cat: 'Introduction' },
  { en: 'I work in a company.', hi: 'मैं एक कंपनी में काम करता हूँ।', cat: 'Introduction' },
  { en: 'This is my phone number.', hi: 'यह मेरा फोन नंबर है।', cat: 'Introduction' },
  { en: 'Can I have your number?', hi: 'क्या मुझे आपका नंबर मिल सकता है?', cat: 'Introduction' },
  { en: 'Nice meeting you.', hi: 'आपसे मिलकर अच्छा लगा।', cat: 'Introduction' },
  { en: 'I am learning English.', hi: 'मैं अंग्रेजी सीख रहा हूँ।', cat: 'Introduction' },
  { en: 'I speak Hindi.', hi: 'मैं हिंदी बोलता हूँ।', cat: 'Introduction' },

  // Daily Needs (25)
  { en: 'I need some water.', hi: 'मुझे पानी चाहिए।', cat: 'Daily' },
  { en: 'Where is the bathroom?', hi: 'बाथरूम कहाँ है?', cat: 'Daily' },
  { en: 'What time is it?', hi: 'कितने बजे हैं?', cat: 'Daily' },
  { en: 'I am hungry.', hi: 'मुझे भूख लगी है।', cat: 'Daily' },
  { en: 'I am thirsty.', hi: 'मुझे प्यास लगी है।', cat: 'Daily' },
  { en: 'I am tired.', hi: 'मैं थक गया हूँ।', cat: 'Daily' },
  { en: 'I need help.', hi: 'मुझे मदद चाहिए।', cat: 'Daily' },
  { en: 'Can you help me?', hi: 'क्या आप मेरी मदद कर सकते हैं?', cat: 'Daily' },
  { en: 'I do not understand.', hi: 'मैं समझ नहीं रहा।', cat: 'Daily' },
  { en: 'Please speak slowly.', hi: 'कृपया धीरे बोलें।', cat: 'Daily' },
  { en: 'Can you repeat that?', hi: 'क्या आप दोहरा सकते हैं?', cat: 'Daily' },
  { en: 'I am looking for...', hi: 'मैं... ढूंढ रहा हूँ।', cat: 'Daily' },
  { en: 'Where can I find...?', hi: 'मुझे... कहाँ मिलेगा?', cat: 'Daily' },
  { en: 'Is this correct?', hi: 'क्या यह सही है?', cat: 'Daily' },
  { en: 'I have a question.', hi: 'मेरा एक सवाल है।', cat: 'Daily' },
  { en: 'What does this mean?', hi: 'इसका क्या मतलब है?', cat: 'Daily' },
  { en: 'How do you say...?', hi: '... को कैसे कहते हैं?', cat: 'Daily' },
  { en: 'I forgot my wallet.', hi: 'मैं अपना बटुआ भूल गया।', cat: 'Daily' },
  { en: 'I lost my phone.', hi: 'मेरा फोन खो गया।', cat: 'Daily' },
  { en: 'Can I use your phone?', hi: 'क्या मैं आपका फोन इस्तेमाल कर सकता हूँ?', cat: 'Daily' },
  { en: 'Where is the exit?', hi: 'बाहर निकलने का रास्ता कहाँ है?', cat: 'Daily' },
  { en: 'Is it open today?', hi: 'क्या यह आज खुला है?', cat: 'Daily' },
  { en: 'What are the timings?', hi: 'समय क्या है?', cat: 'Daily' },
  { en: 'I will come back later.', hi: 'मैं बाद में आऊंगा।', cat: 'Daily' },
  { en: 'Please wait a moment.', hi: 'कृपया एक पल रुकें।', cat: 'Daily' },

  // Numbers & Counting (15)
  { en: 'How many do you want?', hi: 'आपको कितने चाहिए?', cat: 'Numbers' },
  { en: 'I want two of these.', hi: 'मुझे इसमें से दो चाहिए।', cat: 'Numbers' },
  { en: 'Give me one more.', hi: 'मुझे एक और दें।', cat: 'Numbers' },
  { en: 'This is my first time.', hi: 'यह मेरी पहली बार है।', cat: 'Numbers' },
  { en: 'I have three brothers.', hi: 'मेरे तीन भाई हैं।', cat: 'Numbers' },
  { en: 'We are five people.', hi: 'हम पाँच लोग हैं।', cat: 'Numbers' },
  { en: 'It costs hundred rupees.', hi: 'इसकी कीमत सौ रुपये है।', cat: 'Numbers' },
  { en: 'I need ten minutes.', hi: 'मुझे दस मिनट चाहिए।', cat: 'Numbers' },
  { en: 'Come at six o clock.', hi: 'छह बजे आना।', cat: 'Numbers' },
  { en: 'The meeting is at four.', hi: 'मीटिंग चार बजे है।', cat: 'Numbers' },
  { en: 'I wake up at seven.', hi: 'मैं सात बजे उठता हूँ।', cat: 'Numbers' },
  { en: 'I sleep at eleven.', hi: 'मैं ग्यारह बजे सोता हूँ।', cat: 'Numbers' },
  { en: 'It takes two hours.', hi: 'इसमें दो घंटे लगते हैं।', cat: 'Numbers' },
  { en: 'I have been waiting for one hour.', hi: 'मैं एक घंटे से इंतजार कर रहा हूँ।', cat: 'Numbers' },
  { en: 'The train comes at nine.', hi: 'ट्रेन नौ बजे आती है।', cat: 'Numbers' },

  // Family (20)
  { en: 'This is my family.', hi: 'यह मेरा परिवार है।', cat: 'Family' },
  { en: 'I have two brothers.', hi: 'मेरे दो भाई हैं।', cat: 'Family' },
  { en: 'My sister is a doctor.', hi: 'मेरी बहन डॉक्टर है।', cat: 'Family' },
  { en: 'I love my parents.', hi: 'मैं अपने माता-पिता से प्यार करता हूँ।', cat: 'Family' },
  { en: 'We live together.', hi: 'हम साथ रहते हैं।', cat: 'Family' },
  { en: 'My father works in a bank.', hi: 'मेरे पिता बैंक में काम करते हैं।', cat: 'Family' },
  { en: 'My mother cooks well.', hi: 'मेरी माँ अच्छा खाना बनाती है।', cat: 'Family' },
  { en: 'I am married.', hi: 'मैं शादीशुदा हूँ।', cat: 'Family' },
  { en: 'I am single.', hi: 'मैं अविवाहित हूँ।', cat: 'Family' },
  { en: 'I have one child.', hi: 'मेरा एक बच्चा है।', cat: 'Family' },
  { en: 'My son is five years old.', hi: 'मेरा बेटा पाँच साल का है।', cat: 'Family' },
  { en: 'My daughter goes to school.', hi: 'मेरी बेटी स्कूल जाती है।', cat: 'Family' },
  { en: 'My grandfather is very old.', hi: 'मेरे दादाजी बहुत बूढ़े हैं।', cat: 'Family' },
  { en: 'My grandmother makes good food.', hi: 'मेरी दादी अच्छा खाना बनाती हैं।', cat: 'Family' },
  { en: 'I miss my family.', hi: 'मुझे अपने परिवार की याद आती है।', cat: 'Family' },
  { en: 'My uncle lives in America.', hi: 'मेरे चाचा अमेरिका में रहते हैं।', cat: 'Family' },
  { en: 'My aunt is a teacher.', hi: 'मेरी चाची शिक्षिका हैं।', cat: 'Family' },
  { en: 'I have many cousins.', hi: 'मेरे बहुत सारे चचेरे भाई-बहन हैं।', cat: 'Family' },
  { en: 'We have a big family.', hi: 'हमारा बड़ा परिवार है।', cat: 'Family' },
  { en: 'Family is very important.', hi: 'परिवार बहुत महत्वपूर्ण है।', cat: 'Family' },

  // Food & Eating (25)
  { en: 'I would like some tea.', hi: 'मुझे चाय चाहिए।', cat: 'Food' },
  { en: 'The food is delicious.', hi: 'खाना स्वादिष्ट है।', cat: 'Food' },
  { en: 'I am vegetarian.', hi: 'मैं शाकाहारी हूँ।', cat: 'Food' },
  { en: 'Can I see the menu?', hi: 'क्या मैं मेन्यू देख सकता हूँ?', cat: 'Food' },
  { en: 'I want spicy food.', hi: 'मुझे तीखा खाना चाहिए।', cat: 'Food' },
  { en: 'This is not spicy enough.', hi: 'यह पर्याप्त तीखा नहीं है।', cat: 'Food' },
  { en: 'Can I have the bill?', hi: 'क्या मुझे बिल मिल सकता है?', cat: 'Food' },
  { en: 'The service is good.', hi: 'सेवा अच्छी है।', cat: 'Food' },
  { en: 'I need a glass of water.', hi: 'मुझे एक गिलास पानी चाहिए।', cat: 'Food' },
  { en: 'Do you have Indian food?', hi: 'क्या आपके पास भारतीय खाना है?', cat: 'Food' },
  { en: 'I want rice and dal.', hi: 'मुझे चावल और दाल चाहिए।', cat: 'Food' },
  { en: 'This is too salty.', hi: 'यह बहुत नमकीन है।', cat: 'Food' },
  { en: 'This is too sweet.', hi: 'यह बहुत मीठा है।', cat: 'Food' },
  { en: 'I do not eat meat.', hi: 'मैं मांस नहीं खाता।', cat: 'Food' },
  { en: 'Can I have more rice?', hi: 'क्या मुझे और चावल मिल सकता है?', cat: 'Food' },
  { en: 'The food is cold.', hi: 'खाना ठंडा है।', cat: 'Food' },
  { en: 'Please heat this.', hi: 'कृपया इसे गर्म करें।', cat: 'Food' },
  { en: 'I am full.', hi: 'मेरा पेट भर गया।', cat: 'Food' },
  { en: 'The breakfast is ready.', hi: 'नाश्ता तैयार है।', cat: 'Food' },
  { en: 'What is for lunch?', hi: 'दोपहर के खाने में क्या है?', cat: 'Food' },
  { en: 'Dinner is at eight.', hi: 'रात का खाना आठ बजे है।', cat: 'Food' },
  { en: 'I like Indian food.', hi: 'मुझे भारतीय खाना पसंद है।', cat: 'Food' },
  { en: 'This tastes good.', hi: 'इसका स्वाद अच्छा है।', cat: 'Food' },
  { en: 'Can I have a fork?', hi: 'क्या मुझे कांटा मिल सकता है?', cat: 'Food' },
  { en: 'I need a spoon.', hi: 'मुझे चम्मच चाहिए।', cat: 'Food' },

  // Shopping (25)
  { en: 'How much does this cost?', hi: 'इसकी कीमत कितनी है?', cat: 'Shopping' },
  { en: 'This is too expensive.', hi: 'यह बहुत महंगा है।', cat: 'Shopping' },
  { en: 'Do you have a discount?', hi: 'क्या आपके पास छूट है?', cat: 'Shopping' },
  { en: 'I want to buy this.', hi: 'मैं यह खरीदना चाहता हूँ।', cat: 'Shopping' },
  { en: 'Can I pay by card?', hi: 'क्या मैं कार्ड से पेमेंट कर सकता हूँ?', cat: 'Shopping' },
  { en: 'Do you accept cash?', hi: 'क्या आप नकद लेते हैं?', cat: 'Shopping' },
  { en: 'I need a bag.', hi: 'मुझे एक बैग चाहिए।', cat: 'Shopping' },
  { en: 'Where is the market?', hi: 'बाजार कहाँ है?', cat: 'Shopping' },
  { en: 'What size do you have?', hi: 'आपके पास कौन सा साइज है?', cat: 'Shopping' },
  { en: 'Can I try this on?', hi: 'क्या मैं इसे पहनकर देख सकता हूँ?', cat: 'Shopping' },
  { en: 'This does not fit me.', hi: 'यह मुझे फिट नहीं है।', cat: 'Shopping' },
  { en: 'Do you have a bigger size?', hi: 'क्या आपके पास बड़ा साइज है?', cat: 'Shopping' },
  { en: 'Do you have a smaller size?', hi: 'क्या आपके पास छोटा साइज है?', cat: 'Shopping' },
  { en: 'I like this color.', hi: 'मुझे यह रंग पसंद है।', cat: 'Shopping' },
  { en: 'Do you have other colors?', hi: 'क्या आपके पास और रंग हैं?', cat: 'Shopping' },
  { en: 'I am just looking.', hi: 'मैं बस देख रहा हूँ।', cat: 'Shopping' },
  { en: 'Can you give me a receipt?', hi: 'क्या आप मुझे रसीद दे सकते हैं?', cat: 'Shopping' },
  { en: 'I want to return this.', hi: 'मैं इसे वापस करना चाहता हूँ।', cat: 'Shopping' },
  { en: 'This is broken.', hi: 'यह टूटा हुआ है।', cat: 'Shopping' },
  { en: 'Can I exchange this?', hi: 'क्या मैं इसे बदल सकता हूँ?', cat: 'Shopping' },
  { en: 'Where is the billing counter?', hi: 'बिलिंग काउंटर कहाँ है?', cat: 'Shopping' },
  { en: 'Is this on sale?', hi: 'क्या इस पर सेल है?', cat: 'Shopping' },
  { en: 'What is the final price?', hi: 'अंतिम कीमत क्या है?', cat: 'Shopping' },
  { en: 'Can you pack this?', hi: 'क्या आप इसे पैक कर सकते हैं?', cat: 'Shopping' },
  { en: 'I will pay in cash.', hi: 'मैं नकद में भुगतान करूंगा।', cat: 'Shopping' },

  // Travel & Directions (30)
  { en: 'Where is the railway station?', hi: 'रेलवे स्टेशन कहाँ है?', cat: 'Travel' },
  { en: 'How do I go to the airport?', hi: 'मैं एयरपोर्ट कैसे जाऊँ?', cat: 'Travel' },
  { en: 'I need a taxi.', hi: 'मुझे टैक्सी चाहिए।', cat: 'Travel' },
  { en: 'Is this the right way?', hi: 'क्या यह सही रास्ता है?', cat: 'Travel' },
  { en: 'How far is it from here?', hi: 'यहाँ से कितनी दूर है?', cat: 'Travel' },
  { en: 'Turn left at the signal.', hi: 'सिग्नल पर बाएँ मुड़ें।', cat: 'Travel' },
  { en: 'Go straight ahead.', hi: 'सीधे आगे जाएँ।', cat: 'Travel' },
  { en: 'I am lost.', hi: 'मैं रास्ता भूल गया हूँ।', cat: 'Travel' },
  { en: 'Can you show me the map?', hi: 'क्या आप मुझे नक्शा दिखा सकते हैं?', cat: 'Travel' },
  { en: 'I want to book a ticket.', hi: 'मैं टिकट बुक करना चाहता हूँ।', cat: 'Travel' },
  { en: 'When does the train leave?', hi: 'ट्रेन कब छूटती है?', cat: 'Travel' },
  { en: 'When does the bus arrive?', hi: 'बस कब आती है?', cat: 'Travel' },
  { en: 'Is this seat available?', hi: 'क्या यह सीट खाली है?', cat: 'Travel' },
  { en: 'Where is the bus stop?', hi: 'बस स्टॉप कहाँ है?', cat: 'Travel' },
  { en: 'How long does it take?', hi: 'कितना समय लगता है?', cat: 'Travel' },
  { en: 'I want a window seat.', hi: 'मुझे खिड़की वाली सीट चाहिए।', cat: 'Travel' },
  { en: 'The train is late.', hi: 'ट्रेन लेट है।', cat: 'Travel' },
  { en: 'Which platform?', hi: 'कौन सा प्लेटफॉर्म?', cat: 'Travel' },
  { en: 'I missed my train.', hi: 'मेरी ट्रेन छूट गई।', cat: 'Travel' },
  { en: 'Where is the metro station?', hi: 'मेट्रो स्टेशन कहाँ है?', cat: 'Travel' },
  { en: 'How much is the fare?', hi: 'किराया कितना है?', cat: 'Travel' },
  { en: 'Please stop here.', hi: 'कृपया यहाँ रुकें।', cat: 'Travel' },
  { en: 'Take me to this address.', hi: 'मुझे इस पते पर ले चलें।', cat: 'Travel' },
  { en: 'Is it walking distance?', hi: 'क्या यह पैदल दूरी पर है?', cat: 'Travel' },
  { en: 'I need to go to the hotel.', hi: 'मुझे होटल जाना है।', cat: 'Travel' },
  { en: 'Where can I get a rickshaw?', hi: 'मुझे रिक्शा कहाँ मिलेगा?', cat: 'Travel' },
  { en: 'The traffic is very heavy.', hi: 'ट्रैफिक बहुत ज्यादा है।', cat: 'Travel' },
  { en: 'Is there a shortcut?', hi: 'क्या कोई शॉर्टकट है?', cat: 'Travel' },
  { en: 'I am in a hurry.', hi: 'मुझे जल्दी है।', cat: 'Travel' },
  { en: 'Please drive carefully.', hi: 'कृपया सावधानी से चलाएं।', cat: 'Travel' },

  // Health (20)
  { en: 'I need a doctor.', hi: 'मुझे डॉक्टर चाहिए।', cat: 'Health' },
  { en: 'I have a headache.', hi: 'मेरे सिर में दर्द है।', cat: 'Health' },
  { en: 'Where is the hospital?', hi: 'अस्पताल कहाँ है?', cat: 'Health' },
  { en: 'Call an ambulance.', hi: 'एम्बुलेंस बुलाएँ।', cat: 'Health' },
  { en: 'I feel better now.', hi: 'अब मैं बेहतर महसूस कर रहा हूँ।', cat: 'Health' },
  { en: 'I have a fever.', hi: 'मुझे बुखार है।', cat: 'Health' },
  { en: 'I have a cold.', hi: 'मुझे सर्दी है।', cat: 'Health' },
  { en: 'My stomach hurts.', hi: 'मेरे पेट में दर्द है।', cat: 'Health' },
  { en: 'I need medicine.', hi: 'मुझे दवाई चाहिए।', cat: 'Health' },
  { en: 'Where is the pharmacy?', hi: 'दवाई की दुकान कहाँ है?', cat: 'Health' },
  { en: 'I am allergic to...', hi: 'मुझे... से एलर्जी है।', cat: 'Health' },
  { en: 'I cannot sleep well.', hi: 'मुझे अच्छी नींद नहीं आती।', cat: 'Health' },
  { en: 'I feel dizzy.', hi: 'मुझे चक्कर आ रहा है।', cat: 'Health' },
  { en: 'I have back pain.', hi: 'मेरी कमर में दर्द है।', cat: 'Health' },
  { en: 'I need to rest.', hi: 'मुझे आराम करना है।', cat: 'Health' },
  { en: 'Take this medicine twice a day.', hi: 'यह दवाई दिन में दो बार लें।', cat: 'Health' },
  { en: 'I am feeling weak.', hi: 'मुझे कमजोरी लग रही है।', cat: 'Health' },
  { en: 'I have a cough.', hi: 'मुझे खांसी है।', cat: 'Health' },
  { en: 'My throat is sore.', hi: 'मेरा गला खराब है।', cat: 'Health' },
  { en: 'I need to see a specialist.', hi: 'मुझे विशेषज्ञ से मिलना है।', cat: 'Health' },

  // Weather (10)
  { en: 'How is the weather today?', hi: 'आज मौसम कैसा है?', cat: 'Weather' },
  { en: 'It is very hot today.', hi: 'आज बहुत गर्मी है।', cat: 'Weather' },
  { en: 'It is very cold.', hi: 'बहुत ठंड है।', cat: 'Weather' },
  { en: 'It is raining.', hi: 'बारिश हो रही है।', cat: 'Weather' },
  { en: 'The sun is shining.', hi: 'धूप निकली है।', cat: 'Weather' },
  { en: 'It might rain today.', hi: 'आज बारिश हो सकती है।', cat: 'Weather' },
  { en: 'The weather is nice.', hi: 'मौसम अच्छा है।', cat: 'Weather' },
  { en: 'It is cloudy today.', hi: 'आज बादल हैं।', cat: 'Weather' },
  { en: 'There is a lot of wind.', hi: 'बहुत हवा चल रही है।', cat: 'Weather' },
  { en: 'Summer is very hot here.', hi: 'यहाँ गर्मी बहुत होती है।', cat: 'Weather' },

  // Colors (10)
  { en: 'What color do you want?', hi: 'आपको कौन सा रंग चाहिए?', cat: 'Colors' },
  { en: 'I like the red one.', hi: 'मुझे लाल वाला पसंद है।', cat: 'Colors' },
  { en: 'Do you have this in blue?', hi: 'क्या यह नीले रंग में है?', cat: 'Colors' },
  { en: 'The sky is blue.', hi: 'आसमान नीला है।', cat: 'Colors' },
  { en: 'The grass is green.', hi: 'घास हरी है।', cat: 'Colors' },
  { en: 'I want a white shirt.', hi: 'मुझे सफेद शर्ट चाहिए।', cat: 'Colors' },
  { en: 'Black is my favorite color.', hi: 'काला मेरा पसंदीदा रंग है।', cat: 'Colors' },
  { en: 'The flower is yellow.', hi: 'फूल पीला है।', cat: 'Colors' },
  { en: 'I painted it orange.', hi: 'मैंने इसे नारंगी रंग किया।', cat: 'Colors' },
  { en: 'She is wearing a pink dress.', hi: 'उसने गुलाबी ड्रेस पहनी है।', cat: 'Colors' },

  // Work & Office (15)
  { en: 'I work in an office.', hi: 'मैं ऑफिस में काम करता हूँ।', cat: 'Work' },
  { en: 'I study computer science.', hi: 'मैं कंप्यूटर साइंस पढ़ता हूँ।', cat: 'Work' },
  { en: 'My job is interesting.', hi: 'मेरा काम दिलचस्प है।', cat: 'Work' },
  { en: 'I work from home.', hi: 'मैं घर से काम करता हूँ।', cat: 'Work' },
  { en: 'I have a meeting today.', hi: 'आज मेरी मीटिंग है।', cat: 'Work' },
  { en: 'I need to finish this work.', hi: 'मुझे यह काम खत्म करना है।', cat: 'Work' },
  { en: 'My boss is very nice.', hi: 'मेरे बॉस बहुत अच्छे हैं।', cat: 'Work' },
  { en: 'I get salary every month.', hi: 'मुझे हर महीने तनख्वाह मिलती है।', cat: 'Work' },
  { en: 'I want to learn new skills.', hi: 'मैं नए कौशल सीखना चाहता हूँ।', cat: 'Work' },
  { en: 'The deadline is tomorrow.', hi: 'समय सीमा कल है।', cat: 'Work' },
  { en: 'I am working on a project.', hi: 'मैं एक प्रोजेक्ट पर काम कर रहा हूँ।', cat: 'Work' },
  { en: 'Can you send me the file?', hi: 'क्या आप मुझे फाइल भेज सकते हैं?', cat: 'Work' },
  { en: 'I will email you.', hi: 'मैं आपको ईमेल करूंगा।', cat: 'Work' },
  { en: 'The office is closed today.', hi: 'आज ऑफिस बंद है।', cat: 'Work' },
  { en: 'I am on leave today.', hi: 'आज मेरी छुट्टी है।', cat: 'Work' },
];

// ============================================
// INTERMEDIATE LESSONS (200 lessons)
// ============================================
const intermediateLessons = [
  // Conversations (30)
  { en: 'What do you think about this?', hi: 'इसके बारे में आपका क्या विचार है?', cat: 'Conversation' },
  { en: 'I completely agree with you.', hi: 'मैं आपसे पूरी तरह सहमत हूँ।', cat: 'Conversation' },
  { en: 'I have a different opinion.', hi: 'मेरी राय अलग है।', cat: 'Conversation' },
  { en: 'Let me think about it.', hi: 'मुझे इसके बारे में सोचने दें।', cat: 'Conversation' },
  { en: 'That is a good point.', hi: 'यह एक अच्छी बात है।', cat: 'Conversation' },
  { en: 'I am not sure about that.', hi: 'मुझे इसके बारे में पक्का नहीं है।', cat: 'Conversation' },
  { en: 'Can you explain more?', hi: 'क्या आप और समझा सकते हैं?', cat: 'Conversation' },
  { en: 'What do you mean by that?', hi: 'इससे आपका क्या मतलब है?', cat: 'Conversation' },
  { en: 'I understand your concern.', hi: 'मैं आपकी चिंता समझता हूँ।', cat: 'Conversation' },
  { en: 'Let us discuss this later.', hi: 'इसके बारे में बाद में बात करते हैं।', cat: 'Conversation' },
  { en: 'I would like to add something.', hi: 'मैं कुछ जोड़ना चाहूंगा।', cat: 'Conversation' },
  { en: 'That is an interesting idea.', hi: 'यह एक दिलचस्प विचार है।', cat: 'Conversation' },
  { en: 'I have never thought about it.', hi: 'मैंने इसके बारे में कभी नहीं सोचा।', cat: 'Conversation' },
  { en: 'You make a valid point.', hi: 'आपकी बात सही है।', cat: 'Conversation' },
  { en: 'I see what you mean.', hi: 'मैं समझ रहा हूँ आप क्या कह रहे हैं।', cat: 'Conversation' },
  { en: 'Could you repeat that please?', hi: 'क्या आप कृपया दोहरा सकते हैं?', cat: 'Conversation' },
  { en: 'I did not catch that.', hi: 'मुझे समझ नहीं आया।', cat: 'Conversation' },
  { en: 'What are your thoughts on this?', hi: 'इस पर आपके क्या विचार हैं?', cat: 'Conversation' },
  { en: 'I appreciate your feedback.', hi: 'मैं आपकी प्रतिक्रिया की सराहना करता हूँ।', cat: 'Conversation' },
  { en: 'That sounds reasonable.', hi: 'यह उचित लगता है।', cat: 'Conversation' },
  { en: 'I will keep that in mind.', hi: 'मैं इसे याद रखूंगा।', cat: 'Conversation' },
  { en: 'Let me get back to you.', hi: 'मैं आपको बाद में बताता हूँ।', cat: 'Conversation' },
  { en: 'I need more time to decide.', hi: 'मुझे फैसला करने में और समय चाहिए।', cat: 'Conversation' },
  { en: 'Can we talk about this tomorrow?', hi: 'क्या हम कल इस बारे में बात कर सकते हैं?', cat: 'Conversation' },
  { en: 'I was just about to say that.', hi: 'मैं यही कहने वाला था।', cat: 'Conversation' },
  { en: 'That reminds me of something.', hi: 'इससे मुझे कुछ याद आया।', cat: 'Conversation' },
  { en: 'Speaking of which...', hi: 'इसी बात पर...', cat: 'Conversation' },
  { en: 'By the way, did you know...', hi: 'वैसे, क्या आपको पता है...', cat: 'Conversation' },
  { en: 'I was wondering if...', hi: 'मैं सोच रहा था कि...', cat: 'Conversation' },
  { en: 'To be honest with you...', hi: 'आपसे सच कहूं तो...', cat: 'Conversation' },

  // Business & Professional (35)
  { en: 'I would like to schedule a meeting.', hi: 'मैं एक मीटिंग शेड्यूल करना चाहूंगा।', cat: 'Business' },
  { en: 'Can we reschedule the meeting?', hi: 'क्या हम मीटिंग को दोबारा शेड्यूल कर सकते हैं?', cat: 'Business' },
  { en: 'I am calling regarding your email.', hi: 'मैं आपके ईमेल के संबंध में कॉल कर रहा हूँ।', cat: 'Business' },
  { en: 'Please find the attachment below.', hi: 'कृपया नीचे अटैचमेंट देखें।', cat: 'Business' },
  { en: 'I am following up on our discussion.', hi: 'मैं हमारी चर्चा के बारे में फॉलो अप कर रहा हूँ।', cat: 'Business' },
  { en: 'Could you please confirm the details?', hi: 'क्या आप कृपया विवरण की पुष्टि कर सकते हैं?', cat: 'Business' },
  { en: 'I apologize for the delay.', hi: 'देरी के लिए माफी चाहता हूँ।', cat: 'Business' },
  { en: 'Thank you for your patience.', hi: 'आपके धैर्य के लिए धन्यवाद।', cat: 'Business' },
  { en: 'I look forward to hearing from you.', hi: 'आपके जवाब का इंतजार रहेगा।', cat: 'Business' },
  { en: 'Please let me know if you have any questions.', hi: 'अगर कोई सवाल हो तो बताएं।', cat: 'Business' },
  { en: 'I am available for a call anytime.', hi: 'मैं कभी भी कॉल के लिए उपलब्ध हूँ।', cat: 'Business' },
  { en: 'Can we set up a video conference?', hi: 'क्या हम वीडियो कॉन्फ्रेंस कर सकते हैं?', cat: 'Business' },
  { en: 'I will send you the proposal by tomorrow.', hi: 'मैं कल तक आपको प्रस्ताव भेज दूंगा।', cat: 'Business' },
  { en: 'We need to discuss the budget.', hi: 'हमें बजट पर चर्चा करनी है।', cat: 'Business' },
  { en: 'The project is on track.', hi: 'प्रोजेक्ट सही दिशा में है।', cat: 'Business' },
  { en: 'We are behind schedule.', hi: 'हम समय से पीछे हैं।', cat: 'Business' },
  { en: 'I need your approval on this.', hi: 'मुझे इस पर आपकी मंजूरी चाहिए।', cat: 'Business' },
  { en: 'Let us review the progress.', hi: 'आइए प्रगति की समीक्षा करें।', cat: 'Business' },
  { en: 'I have prepared the report.', hi: 'मैंने रिपोर्ट तैयार कर ली है।', cat: 'Business' },
  { en: 'Can you share the presentation?', hi: 'क्या आप प्रेजेंटेशन शेयर कर सकते हैं?', cat: 'Business' },
  { en: 'We need to meet the deadline.', hi: 'हमें समय सीमा पूरी करनी है।', cat: 'Business' },
  { en: 'I will update you on the status.', hi: 'मैं आपको स्थिति के बारे में अपडेट करूंगा।', cat: 'Business' },
  { en: 'Please review and provide feedback.', hi: 'कृपया समीक्षा करें और प्रतिक्रिया दें।', cat: 'Business' },
  { en: 'I have a few concerns about this.', hi: 'मुझे इसके बारे में कुछ चिंताएं हैं।', cat: 'Business' },
  { en: 'Let us schedule a follow-up meeting.', hi: 'आइए एक फॉलो-अप मीटिंग शेड्यूल करें।', cat: 'Business' },
  { en: 'I am working on the revisions.', hi: 'मैं संशोधनों पर काम कर रहा हूँ।', cat: 'Business' },
  { en: 'The client has approved the design.', hi: 'क्लाइंट ने डिजाइन को मंजूरी दे दी है।', cat: 'Business' },
  { en: 'We need to allocate more resources.', hi: 'हमें और संसाधन आवंटित करने होंगे।', cat: 'Business' },
  { en: 'I will coordinate with the team.', hi: 'मैं टीम के साथ समन्वय करूंगा।', cat: 'Business' },
  { en: 'Please prioritize this task.', hi: 'कृपया इस कार्य को प्राथमिकता दें।', cat: 'Business' },
  { en: 'I am preparing for the interview.', hi: 'मैं इंटरव्यू की तैयारी कर रहा हूँ।', cat: 'Business' },
  { en: 'I have updated my resume.', hi: 'मैंने अपना रिज्यूमे अपडेट कर लिया है।', cat: 'Business' },
  { en: 'I am looking for a new job.', hi: 'मैं नई नौकरी ढूंढ रहा हूँ।', cat: 'Business' },
  { en: 'I got promoted last month.', hi: 'पिछले महीने मेरी पदोन्नति हुई।', cat: 'Business' },
  { en: 'I am negotiating my salary.', hi: 'मैं अपनी सैलरी पर बातचीत कर रहा हूँ।', cat: 'Business' },

  // Hotel & Accommodation (20)
  { en: 'I have a reservation.', hi: 'मेरा आरक्षण है।', cat: 'Hotel' },
  { en: 'I would like to check in.', hi: 'मैं चेक इन करना चाहता हूँ।', cat: 'Hotel' },
  { en: 'I would like to check out.', hi: 'मैं चेक आउट करना चाहता हूँ।', cat: 'Hotel' },
  { en: 'Do you have any rooms available?', hi: 'क्या कोई कमरा खाली है?', cat: 'Hotel' },
  { en: 'I need a room for two nights.', hi: 'मुझे दो रातों के लिए कमरा चाहिए।', cat: 'Hotel' },
  { en: 'What is the room rate?', hi: 'कमरे का किराया क्या है?', cat: 'Hotel' },
  { en: 'Is breakfast included?', hi: 'क्या नाश्ता शामिल है?', cat: 'Hotel' },
  { en: 'Can I see the room first?', hi: 'क्या मैं पहले कमरा देख सकता हूँ?', cat: 'Hotel' },
  { en: 'The room is not clean.', hi: 'कमरा साफ नहीं है।', cat: 'Hotel' },
  { en: 'The air conditioner is not working.', hi: 'एसी काम नहीं कर रहा।', cat: 'Hotel' },
  { en: 'Can I get extra towels?', hi: 'क्या मुझे अतिरिक्त तौलिए मिल सकते हैं?', cat: 'Hotel' },
  { en: 'What time is checkout?', hi: 'चेक आउट का समय क्या है?', cat: 'Hotel' },
  { en: 'Is there WiFi in the room?', hi: 'क्या कमरे में वाईफाई है?', cat: 'Hotel' },
  { en: 'What is the WiFi password?', hi: 'वाईफाई का पासवर्ड क्या है?', cat: 'Hotel' },
  { en: 'Can I extend my stay?', hi: 'क्या मैं अपना ठहराव बढ़ा सकता हूँ?', cat: 'Hotel' },
  { en: 'I need a wake-up call.', hi: 'मुझे वेक-अप कॉल चाहिए।', cat: 'Hotel' },
  { en: 'Where is the restaurant?', hi: 'रेस्टोरेंट कहाँ है?', cat: 'Hotel' },
  { en: 'Can I order room service?', hi: 'क्या मैं रूम सर्विस ऑर्डर कर सकता हूँ?', cat: 'Hotel' },
  { en: 'I left something in my room.', hi: 'मैं कमरे में कुछ छोड़ आया।', cat: 'Hotel' },
  { en: 'Can you call a taxi for me?', hi: 'क्या आप मेरे लिए टैक्सी बुला सकते हैं?', cat: 'Hotel' },

  // Banking & Finance (20)
  { en: 'I want to open a bank account.', hi: 'मैं बैंक खाता खोलना चाहता हूँ।', cat: 'Banking' },
  { en: 'I need to withdraw money.', hi: 'मुझे पैसे निकालने हैं।', cat: 'Banking' },
  { en: 'I want to deposit this check.', hi: 'मैं यह चेक जमा करना चाहता हूँ।', cat: 'Banking' },
  { en: 'What is my account balance?', hi: 'मेरे खाते में कितना बैलेंस है?', cat: 'Banking' },
  { en: 'I need to transfer money.', hi: 'मुझे पैसे ट्रांसफर करने हैं।', cat: 'Banking' },
  { en: 'The ATM is not working.', hi: 'एटीएम काम नहीं कर रहा।', cat: 'Banking' },
  { en: 'I forgot my PIN.', hi: 'मैं अपना पिन भूल गया।', cat: 'Banking' },
  { en: 'I want to apply for a loan.', hi: 'मैं लोन के लिए आवेदन करना चाहता हूँ।', cat: 'Banking' },
  { en: 'What is the interest rate?', hi: 'ब्याज दर क्या है?', cat: 'Banking' },
  { en: 'I need a bank statement.', hi: 'मुझे बैंक स्टेटमेंट चाहिए।', cat: 'Banking' },
  { en: 'My card has been blocked.', hi: 'मेरा कार्ड ब्लॉक हो गया है।', cat: 'Banking' },
  { en: 'I want to change my address.', hi: 'मैं अपना पता बदलना चाहता हूँ।', cat: 'Banking' },
  { en: 'Where is the nearest ATM?', hi: 'सबसे नजदीकी एटीएम कहाँ है?', cat: 'Banking' },
  { en: 'I need to update my phone number.', hi: 'मुझे अपना फोन नंबर अपडेट करना है।', cat: 'Banking' },
  { en: 'Can I get a new debit card?', hi: 'क्या मुझे नया डेबिट कार्ड मिल सकता है?', cat: 'Banking' },
  { en: 'I want to close my account.', hi: 'मैं अपना खाता बंद करना चाहता हूँ।', cat: 'Banking' },
  { en: 'What are the bank timings?', hi: 'बैंक का समय क्या है?', cat: 'Banking' },
  { en: 'I need to pay my credit card bill.', hi: 'मुझे क्रेडिट कार्ड का बिल भरना है।', cat: 'Banking' },
  { en: 'Can I set up online banking?', hi: 'क्या मैं ऑनलाइन बैंकिंग सेट कर सकता हूँ?', cat: 'Banking' },
  { en: 'I received a wrong transaction.', hi: 'मुझे गलत ट्रांजैक्शन मिला।', cat: 'Banking' },

  // Technology (20)
  { en: 'My phone is not working.', hi: 'मेरा फोन काम नहीं कर रहा।', cat: 'Technology' },
  { en: 'The internet is very slow.', hi: 'इंटरनेट बहुत धीमा है।', cat: 'Technology' },
  { en: 'I need to charge my phone.', hi: 'मुझे फोन चार्ज करना है।', cat: 'Technology' },
  { en: 'Can you share your hotspot?', hi: 'क्या आप अपना हॉटस्पॉट शेयर कर सकते हैं?', cat: 'Technology' },
  { en: 'I forgot my password.', hi: 'मैं अपना पासवर्ड भूल गया।', cat: 'Technology' },
  { en: 'How do I download this app?', hi: 'यह ऐप कैसे डाउनलोड करें?', cat: 'Technology' },
  { en: 'My computer has a virus.', hi: 'मेरे कंप्यूटर में वायरस है।', cat: 'Technology' },
  { en: 'I need to update the software.', hi: 'मुझे सॉफ्टवेयर अपडेट करना है।', cat: 'Technology' },
  { en: 'The screen is broken.', hi: 'स्क्रीन टूट गई है।', cat: 'Technology' },
  { en: 'I cannot connect to WiFi.', hi: 'मैं वाईफाई से कनेक्ट नहीं हो पा रहा।', cat: 'Technology' },
  { en: 'My battery is low.', hi: 'मेरी बैटरी कम है।', cat: 'Technology' },
  { en: 'Can you help me with this app?', hi: 'क्या आप इस ऐप में मेरी मदद कर सकते हैं?', cat: 'Technology' },
  { en: 'I need to backup my data.', hi: 'मुझे अपना डेटा बैकअप करना है।', cat: 'Technology' },
  { en: 'The file is too large.', hi: 'फाइल बहुत बड़ी है।', cat: 'Technology' },
  { en: 'I cannot open this file.', hi: 'मैं यह फाइल नहीं खोल पा रहा।', cat: 'Technology' },
  { en: 'Please send me the link.', hi: 'कृपया मुझे लिंक भेजें।', cat: 'Technology' },
  { en: 'I will share it on WhatsApp.', hi: 'मैं इसे व्हाट्सएप पर शेयर करूंगा।', cat: 'Technology' },
  { en: 'Can you take a screenshot?', hi: 'क्या आप स्क्रीनशॉट ले सकते हैं?', cat: 'Technology' },
  { en: 'The video is not playing.', hi: 'वीडियो नहीं चल रहा।', cat: 'Technology' },
  { en: 'I need to restart my phone.', hi: 'मुझे फोन रीस्टार्ट करना है।', cat: 'Technology' },

  // Emotions & Feelings (25)
  { en: 'I am very happy today.', hi: 'मैं आज बहुत खुश हूँ।', cat: 'Emotions' },
  { en: 'I am feeling sad.', hi: 'मैं उदास महसूस कर रहा हूँ।', cat: 'Emotions' },
  { en: 'I am worried about this.', hi: 'मुझे इसकी चिंता है।', cat: 'Emotions' },
  { en: 'I am excited about the trip.', hi: 'मैं यात्रा को लेकर उत्साहित हूँ।', cat: 'Emotions' },
  { en: 'I am nervous about the exam.', hi: 'मुझे परीक्षा की चिंता है।', cat: 'Emotions' },
  { en: 'I am disappointed with the result.', hi: 'मैं परिणाम से निराश हूँ।', cat: 'Emotions' },
  { en: 'I am grateful for your help.', hi: 'आपकी मदद के लिए आभारी हूँ।', cat: 'Emotions' },
  { en: 'I am proud of you.', hi: 'मुझे आप पर गर्व है।', cat: 'Emotions' },
  { en: 'I am confused about this.', hi: 'मैं इसके बारे में भ्रमित हूँ।', cat: 'Emotions' },
  { en: 'I am frustrated with the situation.', hi: 'मैं स्थिति से निराश हूँ।', cat: 'Emotions' },
  { en: 'I am surprised to see you.', hi: 'आपको देखकर हैरान हूँ।', cat: 'Emotions' },
  { en: 'I am bored at home.', hi: 'मैं घर पर बोर हो रहा हूँ।', cat: 'Emotions' },
  { en: 'I am scared of the dark.', hi: 'मुझे अंधेरे से डर लगता है।', cat: 'Emotions' },
  { en: 'I am angry with him.', hi: 'मैं उससे नाराज हूँ।', cat: 'Emotions' },
  { en: 'I am jealous of her success.', hi: 'मुझे उसकी सफलता से जलन है।', cat: 'Emotions' },
  { en: 'I am hopeful about the future.', hi: 'मुझे भविष्य की उम्मीद है।', cat: 'Emotions' },
  { en: 'I am relieved now.', hi: 'अब मुझे राहत मिली।', cat: 'Emotions' },
  { en: 'I am embarrassed about what happened.', hi: 'जो हुआ उससे मुझे शर्म आ रही है।', cat: 'Emotions' },
  { en: 'I am lonely without you.', hi: 'आपके बिना मैं अकेला हूँ।', cat: 'Emotions' },
  { en: 'I am satisfied with my work.', hi: 'मैं अपने काम से संतुष्ट हूँ।', cat: 'Emotions' },
  { en: 'I am curious to know more.', hi: 'मैं और जानने को उत्सुक हूँ।', cat: 'Emotions' },
  { en: 'I am confident about this.', hi: 'मुझे इसके बारे में विश्वास है।', cat: 'Emotions' },
  { en: 'I am uncomfortable here.', hi: 'मुझे यहाँ असहज लग रहा है।', cat: 'Emotions' },
  { en: 'I am relaxed now.', hi: 'अब मैं आराम से हूँ।', cat: 'Emotions' },
  { en: 'I am stressed about work.', hi: 'मुझे काम का तनाव है।', cat: 'Emotions' },

  // Social Situations (25)
  { en: 'Would you like to join us?', hi: 'क्या आप हमारे साथ आना चाहेंगे?', cat: 'Social' },
  { en: 'I am sorry I am late.', hi: 'माफ करें मुझे देर हो गई।', cat: 'Social' },
  { en: 'Congratulations on your success!', hi: 'आपकी सफलता पर बधाई!', cat: 'Social' },
  { en: 'Happy birthday to you!', hi: 'जन्मदिन की शुभकामनाएं!', cat: 'Social' },
  { en: 'Best wishes for your future.', hi: 'आपके भविष्य के लिए शुभकामनाएं।', cat: 'Social' },
  { en: 'I hope you feel better soon.', hi: 'मुझे उम्मीद है आप जल्दी ठीक हो जाएंगे।', cat: 'Social' },
  { en: 'Please accept my condolences.', hi: 'कृपया मेरी संवेदनाएं स्वीकार करें।', cat: 'Social' },
  { en: 'I am sorry for your loss.', hi: 'आपके नुकसान के लिए दुखी हूँ।', cat: 'Social' },
  { en: 'Can I bring something?', hi: 'क्या मैं कुछ लाऊं?', cat: 'Social' },
  { en: 'Thank you for inviting me.', hi: 'मुझे आमंत्रित करने के लिए धन्यवाद।', cat: 'Social' },
  { en: 'I had a great time.', hi: 'मुझे बहुत मजा आया।', cat: 'Social' },
  { en: 'Let us meet again soon.', hi: 'जल्दी फिर मिलते हैं।', cat: 'Social' },
  { en: 'I will miss you.', hi: 'मुझे आपकी याद आएगी।', cat: 'Social' },
  { en: 'Please stay in touch.', hi: 'कृपया संपर्क में रहें।', cat: 'Social' },
  { en: 'It was nice talking to you.', hi: 'आपसे बात करके अच्छा लगा।', cat: 'Social' },
  { en: 'I appreciate your kindness.', hi: 'मैं आपकी दयालुता की सराहना करता हूँ।', cat: 'Social' },
  { en: 'You are very generous.', hi: 'आप बहुत उदार हैं।', cat: 'Social' },
  { en: 'I owe you one.', hi: 'मैं आपका एहसानमंद हूँ।', cat: 'Social' },
  { en: 'Please do not mention it.', hi: 'इसका जिक्र मत करें।', cat: 'Social' },
  { en: 'It is my pleasure.', hi: 'यह मेरी खुशी है।', cat: 'Social' },
  { en: 'I am at your service.', hi: 'मैं आपकी सेवा में हूँ।', cat: 'Social' },
  { en: 'Please make yourself comfortable.', hi: 'कृपया आराम से बैठें।', cat: 'Social' },
  { en: 'Help yourself to the food.', hi: 'खाना खुद ले लें।', cat: 'Social' },
  { en: 'I insist you stay for dinner.', hi: 'मैं जोर देता हूँ कि आप रात के खाने के लिए रुकें।', cat: 'Social' },
  { en: 'You are always welcome here.', hi: 'आपका यहाँ हमेशा स्वागत है।', cat: 'Social' },

  // Making Plans (25)
  { en: 'What are you doing this weekend?', hi: 'इस सप्ताहांत आप क्या कर रहे हैं?', cat: 'Plans' },
  { en: 'Do you have any plans for tomorrow?', hi: 'क्या कल के लिए कोई योजना है?', cat: 'Plans' },
  { en: 'Let us go to the movies.', hi: 'चलो फिल्म देखने चलते हैं।', cat: 'Plans' },
  { en: 'Would you like to have dinner together?', hi: 'क्या आप साथ में खाना खाना चाहेंगे?', cat: 'Plans' },
  { en: 'I am free on Saturday.', hi: 'मैं शनिवार को फ्री हूँ।', cat: 'Plans' },
  { en: 'I am busy this week.', hi: 'इस हफ्ते मैं व्यस्त हूँ।', cat: 'Plans' },
  { en: 'Can we meet next week?', hi: 'क्या हम अगले हफ्ते मिल सकते हैं?', cat: 'Plans' },
  { en: 'What time should we meet?', hi: 'हमें किस समय मिलना चाहिए?', cat: 'Plans' },
  { en: 'Where should we meet?', hi: 'हमें कहाँ मिलना चाहिए?', cat: 'Plans' },
  { en: 'I will pick you up at seven.', hi: 'मैं आपको सात बजे लेने आऊंगा।', cat: 'Plans' },
  { en: 'Let us meet at the coffee shop.', hi: 'कॉफी शॉप पर मिलते हैं।', cat: 'Plans' },
  { en: 'I will be there by six.', hi: 'मैं छह बजे तक वहाँ पहुंच जाऊंगा।', cat: 'Plans' },
  { en: 'I might be a little late.', hi: 'मुझे थोड़ी देर हो सकती है।', cat: 'Plans' },
  { en: 'I have to cancel our plans.', hi: 'मुझे हमारी योजना रद्द करनी होगी।', cat: 'Plans' },
  { en: 'Something came up.', hi: 'कुछ काम आ गया।', cat: 'Plans' },
  { en: 'Can we reschedule?', hi: 'क्या हम दोबारा समय तय कर सकते हैं?', cat: 'Plans' },
  { en: 'I am looking forward to it.', hi: 'मुझे इसका इंतजार है।', cat: 'Plans' },
  { en: 'It sounds like a great plan.', hi: 'यह एक अच्छी योजना लगती है।', cat: 'Plans' },
  { en: 'Count me in.', hi: 'मुझे भी शामिल करो।', cat: 'Plans' },
  { en: 'I will think about it.', hi: 'मैं इसके बारे में सोचूंगा।', cat: 'Plans' },
  { en: 'Let me check my schedule.', hi: 'मुझे अपना शेड्यूल देखने दो।', cat: 'Plans' },
  { en: 'I will let you know.', hi: 'मैं आपको बता दूंगा।', cat: 'Plans' },
  { en: 'That works for me.', hi: 'यह मेरे लिए ठीक है।', cat: 'Plans' },
  { en: 'I cannot make it.', hi: 'मैं नहीं आ पाऊंगा।', cat: 'Plans' },
  { en: 'Maybe next time.', hi: 'शायद अगली बार।', cat: 'Plans' },
];

// ============================================
// ADVANCED LESSONS (150 lessons)
// ============================================
const advancedLessons = [
  // Idioms & Expressions (40)
  { en: 'It is raining cats and dogs.', hi: 'बहुत तेज बारिश हो रही है।', cat: 'Idioms' },
  { en: 'Break a leg!', hi: 'शुभकामनाएं! (अच्छा प्रदर्शन करो)', cat: 'Idioms' },
  { en: 'The ball is in your court.', hi: 'अब फैसला आपके हाथ में है।', cat: 'Idioms' },
  { en: 'Do not beat around the bush.', hi: 'घुमा-फिराकर बात मत करो।', cat: 'Idioms' },
  { en: 'It costs an arm and a leg.', hi: 'यह बहुत महंगा है।', cat: 'Idioms' },
  { en: 'Better late than never.', hi: 'देर आए दुरुस्त आए।', cat: 'Idioms' },
  { en: 'Actions speak louder than words.', hi: 'करनी कथनी से बड़ी होती है।', cat: 'Idioms' },
  { en: 'Every cloud has a silver lining.', hi: 'हर मुश्किल में कुछ अच्छा छिपा होता है।', cat: 'Idioms' },
  { en: 'Do not put all your eggs in one basket.', hi: 'सारा दांव एक जगह मत लगाओ।', cat: 'Idioms' },
  { en: 'The early bird catches the worm.', hi: 'जो जल्दी उठता है वो फायदे में रहता है।', cat: 'Idioms' },
  { en: 'When in Rome, do as the Romans do.', hi: 'जैसा देश वैसा भेष।', cat: 'Idioms' },
  { en: 'A penny for your thoughts.', hi: 'क्या सोच रहे हो?', cat: 'Idioms' },
  { en: 'Bite the bullet.', hi: 'मुश्किल का सामना करो।', cat: 'Idioms' },
  { en: 'Hit the nail on the head.', hi: 'बिल्कुल सही बात कही।', cat: 'Idioms' },
  { en: 'Kill two birds with one stone.', hi: 'एक तीर से दो निशाने।', cat: 'Idioms' },
  { en: 'Let the cat out of the bag.', hi: 'राज खोल देना।', cat: 'Idioms' },
  { en: 'Once in a blue moon.', hi: 'कभी-कभार।', cat: 'Idioms' },
  { en: 'Piece of cake.', hi: 'बहुत आसान काम।', cat: 'Idioms' },
  { en: 'Speak of the devil.', hi: 'जिसकी बात करो वो हाजिर।', cat: 'Idioms' },
  { en: 'Time flies when you are having fun.', hi: 'मजे में समय कैसे बीत जाता है पता नहीं चलता।', cat: 'Idioms' },
  { en: 'You cannot judge a book by its cover.', hi: 'दिखावे पर मत जाओ।', cat: 'Idioms' },
  { en: 'A blessing in disguise.', hi: 'छुपा हुआ वरदान।', cat: 'Idioms' },
  { en: 'Add fuel to the fire.', hi: 'आग में घी डालना।', cat: 'Idioms' },
  { en: 'Back to square one.', hi: 'फिर से शुरुआत से।', cat: 'Idioms' },
  { en: 'Burn the midnight oil.', hi: 'रात-रात भर जागकर काम करना।', cat: 'Idioms' },
  { en: 'Cut to the chase.', hi: 'सीधे मुद्दे पर आओ।', cat: 'Idioms' },
  { en: 'Easy as pie.', hi: 'बहुत आसान।', cat: 'Idioms' },
  { en: 'Get out of hand.', hi: 'काबू से बाहर होना।', cat: 'Idioms' },
  { en: 'Give someone the cold shoulder.', hi: 'किसी को नजरअंदाज करना।', cat: 'Idioms' },
  { en: 'Go the extra mile.', hi: 'अतिरिक्त मेहनत करना।', cat: 'Idioms' },
  { en: 'Hang in there.', hi: 'हिम्मत रखो।', cat: 'Idioms' },
  { en: 'Hit the sack.', hi: 'सो जाना।', cat: 'Idioms' },
  { en: 'In the same boat.', hi: 'एक जैसी स्थिति में।', cat: 'Idioms' },
  { en: 'Keep your chin up.', hi: 'हौसला रखो।', cat: 'Idioms' },
  { en: 'Miss the boat.', hi: 'मौका चूक जाना।', cat: 'Idioms' },
  { en: 'On the same page.', hi: 'एक ही राय में।', cat: 'Idioms' },
  { en: 'Pull someone\'s leg.', hi: 'किसी को चिढ़ाना।', cat: 'Idioms' },
  { en: 'Take it with a grain of salt.', hi: 'पूरी तरह विश्वास मत करो।', cat: 'Idioms' },
  { en: 'Under the weather.', hi: 'तबीयत ठीक नहीं।', cat: 'Idioms' },
  { en: 'Wrap your head around something.', hi: 'कुछ समझने की कोशिश करना।', cat: 'Idioms' },

  // Formal Communication (35)
  { en: 'I would like to bring to your attention...', hi: 'मैं आपका ध्यान आकर्षित करना चाहूंगा...', cat: 'Formal' },
  { en: 'Please be advised that...', hi: 'कृपया ध्यान दें कि...', cat: 'Formal' },
  { en: 'I am writing to inquire about...', hi: 'मैं... के बारे में पूछताछ के लिए लिख रहा हूँ।', cat: 'Formal' },
  { en: 'I would appreciate your prompt response.', hi: 'आपके शीघ्र उत्तर की सराहना करूंगा।', cat: 'Formal' },
  { en: 'Please do not hesitate to contact me.', hi: 'कृपया मुझसे संपर्क करने में संकोच न करें।', cat: 'Formal' },
  { en: 'I regret to inform you that...', hi: 'मुझे आपको सूचित करते हुए खेद है कि...', cat: 'Formal' },
  { en: 'I am pleased to announce that...', hi: 'मुझे यह घोषणा करते हुए खुशी है कि...', cat: 'Formal' },
  { en: 'With reference to your letter...', hi: 'आपके पत्र के संदर्भ में...', cat: 'Formal' },
  { en: 'I am writing on behalf of...', hi: 'मैं... की ओर से लिख रहा हूँ।', cat: 'Formal' },
  { en: 'Please find enclosed...', hi: 'कृपया संलग्न देखें...', cat: 'Formal' },
  { en: 'I would be grateful if you could...', hi: 'मैं आभारी रहूंगा अगर आप...', cat: 'Formal' },
  { en: 'Kindly acknowledge receipt of this letter.', hi: 'कृपया इस पत्र की प्राप्ति की पुष्टि करें।', cat: 'Formal' },
  { en: 'I trust this meets with your approval.', hi: 'मुझे विश्वास है यह आपकी स्वीकृति के अनुरूप है।', cat: 'Formal' },
  { en: 'Should you require any further information...', hi: 'यदि आपको कोई और जानकारी चाहिए...', cat: 'Formal' },
  { en: 'I look forward to your favorable reply.', hi: 'आपके अनुकूल उत्तर की प्रतीक्षा है।', cat: 'Formal' },
  { en: 'Please accept my sincere apologies.', hi: 'कृपया मेरी हार्दिक क्षमा स्वीकार करें।', cat: 'Formal' },
  { en: 'I assure you of my best attention.', hi: 'मैं आपको अपना पूरा ध्यान देने का आश्वासन देता हूँ।', cat: 'Formal' },
  { en: 'Your cooperation in this matter is appreciated.', hi: 'इस मामले में आपके सहयोग की सराहना है।', cat: 'Formal' },
  { en: 'I hereby confirm that...', hi: 'मैं इसके द्वारा पुष्टि करता हूँ कि...', cat: 'Formal' },
  { en: 'As per our discussion...', hi: 'हमारी चर्चा के अनुसार...', cat: 'Formal' },
  { en: 'I wish to express my gratitude for...', hi: 'मैं... के लिए अपना आभार व्यक्त करना चाहता हूँ।', cat: 'Formal' },
  { en: 'It has come to my notice that...', hi: 'मेरे ध्यान में आया है कि...', cat: 'Formal' },
  { en: 'I am compelled to bring to your notice...', hi: 'मैं आपके ध्यान में लाने के लिए बाध्य हूँ...', cat: 'Formal' },
  { en: 'Your immediate attention is required.', hi: 'आपके तत्काल ध्यान की आवश्यकता है।', cat: 'Formal' },
  { en: 'I shall be obliged if you could...', hi: 'मैं आभारी रहूंगा अगर आप...', cat: 'Formal' },
  { en: 'Please treat this matter as urgent.', hi: 'कृपया इस मामले को अत्यावश्यक मानें।', cat: 'Formal' },
  { en: 'I await your response at the earliest.', hi: 'मैं जल्द से जल्द आपके उत्तर की प्रतीक्षा करता हूँ।', cat: 'Formal' },
  { en: 'Thanking you in anticipation.', hi: 'अग्रिम धन्यवाद।', cat: 'Formal' },
  { en: 'I remain at your disposal.', hi: 'मैं आपकी सेवा में हूँ।', cat: 'Formal' },
  { en: 'Please convey my regards to...', hi: 'कृपया... को मेरा नमस्कार कहें।', cat: 'Formal' },
  { en: 'I take this opportunity to...', hi: 'मैं इस अवसर का लाभ उठाकर...', cat: 'Formal' },
  { en: 'With due respect, I would like to state...', hi: 'आदरपूर्वक, मैं कहना चाहूंगा...', cat: 'Formal' },
  { en: 'I beg to differ on this point.', hi: 'मैं इस बिंदु पर असहमत हूँ।', cat: 'Formal' },
  { en: 'Allow me to clarify...', hi: 'मुझे स्पष्ट करने दें...', cat: 'Formal' },
  { en: 'I stand corrected.', hi: 'मैं अपनी गलती मानता हूँ।', cat: 'Formal' },

  // Negotiations & Persuasion (25)
  { en: 'I see your point, but...', hi: 'मैं आपकी बात समझता हूँ, लेकिन...', cat: 'Negotiation' },
  { en: 'Let us find a middle ground.', hi: 'आइए बीच का रास्ता निकालें।', cat: 'Negotiation' },
  { en: 'What if we try a different approach?', hi: 'अगर हम अलग तरीका आजमाएं तो?', cat: 'Negotiation' },
  { en: 'I am willing to compromise on this.', hi: 'मैं इस पर समझौता करने को तैयार हूँ।', cat: 'Negotiation' },
  { en: 'Can we meet halfway?', hi: 'क्या हम बीच में मिल सकते हैं?', cat: 'Negotiation' },
  { en: 'That is not acceptable to me.', hi: 'यह मुझे स्वीकार्य नहीं है।', cat: 'Negotiation' },
  { en: 'I need some time to consider this.', hi: 'मुझे इस पर विचार करने के लिए समय चाहिए।', cat: 'Negotiation' },
  { en: 'What are your terms and conditions?', hi: 'आपकी शर्तें क्या हैं?', cat: 'Negotiation' },
  { en: 'I am open to suggestions.', hi: 'मैं सुझावों के लिए खुला हूँ।', cat: 'Negotiation' },
  { en: 'Let us weigh the pros and cons.', hi: 'आइए फायदे और नुकसान देखें।', cat: 'Negotiation' },
  { en: 'I think we can work this out.', hi: 'मुझे लगता है हम इसे सुलझा सकते हैं।', cat: 'Negotiation' },
  { en: 'What would it take to close this deal?', hi: 'इस सौदे को पक्का करने के लिए क्या चाहिए?', cat: 'Negotiation' },
  { en: 'I am prepared to make an offer.', hi: 'मैं एक प्रस्ताव देने को तैयार हूँ।', cat: 'Negotiation' },
  { en: 'This is my final offer.', hi: 'यह मेरा अंतिम प्रस्ताव है।', cat: 'Negotiation' },
  { en: 'I cannot go any lower than this.', hi: 'मैं इससे कम नहीं कर सकता।', cat: 'Negotiation' },
  { en: 'Let us shake hands on this.', hi: 'आइए इस पर हाथ मिलाएं।', cat: 'Negotiation' },
  { en: 'We have a deal.', hi: 'सौदा पक्का।', cat: 'Negotiation' },
  { en: 'I need to consult with my team.', hi: 'मुझे अपनी टीम से सलाह करनी होगी।', cat: 'Negotiation' },
  { en: 'Can you give me a better price?', hi: 'क्या आप बेहतर कीमत दे सकते हैं?', cat: 'Negotiation' },
  { en: 'I appreciate your flexibility.', hi: 'मैं आपके लचीलेपन की सराहना करता हूँ।', cat: 'Negotiation' },
  { en: 'Let us put this in writing.', hi: 'आइए इसे लिखित में करें।', cat: 'Negotiation' },
  { en: 'I will get back to you with a decision.', hi: 'मैं आपको फैसले के साथ वापस आऊंगा।', cat: 'Negotiation' },
  { en: 'This seems like a fair deal.', hi: 'यह एक उचित सौदा लगता है।', cat: 'Negotiation' },
  { en: 'I am not in a position to agree.', hi: 'मैं सहमत होने की स्थिति में नहीं हूँ।', cat: 'Negotiation' },
  { en: 'Let us revisit this later.', hi: 'आइए इस पर बाद में फिर से विचार करें।', cat: 'Negotiation' },

  // Presentations & Public Speaking (25)
  { en: 'Good morning everyone, thank you for joining.', hi: 'सभी को सुप्रभात, शामिल होने के लिए धन्यवाद।', cat: 'Presentation' },
  { en: 'Today I will be presenting on...', hi: 'आज मैं... पर प्रस्तुति दूंगा।', cat: 'Presentation' },
  { en: 'Let me begin by introducing myself.', hi: 'मुझे अपना परिचय देकर शुरू करने दें।', cat: 'Presentation' },
  { en: 'The purpose of this presentation is...', hi: 'इस प्रस्तुति का उद्देश्य है...', cat: 'Presentation' },
  { en: 'I have divided my talk into three parts.', hi: 'मैंने अपनी बात को तीन भागों में बांटा है।', cat: 'Presentation' },
  { en: 'Let us move on to the next slide.', hi: 'आइए अगली स्लाइड पर चलते हैं।', cat: 'Presentation' },
  { en: 'As you can see from this graph...', hi: 'जैसा कि आप इस ग्राफ से देख सकते हैं...', cat: 'Presentation' },
  { en: 'This brings me to my next point.', hi: 'यह मुझे मेरे अगले बिंदु पर लाता है।', cat: 'Presentation' },
  { en: 'I would like to highlight that...', hi: 'मैं इस बात पर जोर देना चाहूंगा कि...', cat: 'Presentation' },
  { en: 'In conclusion, I would like to say...', hi: 'निष्कर्ष में, मैं कहना चाहूंगा...', cat: 'Presentation' },
  { en: 'Are there any questions?', hi: 'क्या कोई सवाल है?', cat: 'Presentation' },
  { en: 'That is an excellent question.', hi: 'यह एक बेहतरीन सवाल है।', cat: 'Presentation' },
  { en: 'Let me address that point.', hi: 'मुझे उस बिंदु पर बात करने दें।', cat: 'Presentation' },
  { en: 'I will get back to you on that.', hi: 'मैं उस पर आपको बाद में बताऊंगा।', cat: 'Presentation' },
  { en: 'Thank you for your attention.', hi: 'आपके ध्यान के लिए धन्यवाद।', cat: 'Presentation' },
  { en: 'I hope this was informative.', hi: 'मुझे उम्मीद है यह जानकारीपूर्ण था।', cat: 'Presentation' },
  { en: 'Please feel free to reach out.', hi: 'कृपया बेझिझक संपर्क करें।', cat: 'Presentation' },
  { en: 'Let me summarize the key points.', hi: 'मुझे मुख्य बिंदुओं का सारांश देने दें।', cat: 'Presentation' },
  { en: 'To put it simply...', hi: 'सरल शब्दों में कहें तो...', cat: 'Presentation' },
  { en: 'For example...', hi: 'उदाहरण के लिए...', cat: 'Presentation' },
  { en: 'On the other hand...', hi: 'दूसरी ओर...', cat: 'Presentation' },
  { en: 'In other words...', hi: 'दूसरे शब्दों में...', cat: 'Presentation' },
  { en: 'As I mentioned earlier...', hi: 'जैसा मैंने पहले कहा...', cat: 'Presentation' },
  { en: 'This is particularly important because...', hi: 'यह विशेष रूप से महत्वपूर्ण है क्योंकि...', cat: 'Presentation' },
  { en: 'Let me give you an example.', hi: 'मुझे आपको एक उदाहरण देने दें।', cat: 'Presentation' },

  // Problem Solving (25)
  { en: 'What seems to be the problem?', hi: 'समस्या क्या लगती है?', cat: 'Problem' },
  { en: 'Let us analyze the situation.', hi: 'आइए स्थिति का विश्लेषण करें।', cat: 'Problem' },
  { en: 'I think I have found the issue.', hi: 'मुझे लगता है मुझे समस्या मिल गई।', cat: 'Problem' },
  { en: 'Here is what we can do.', hi: 'यह है जो हम कर सकते हैं।', cat: 'Problem' },
  { en: 'Let us brainstorm some solutions.', hi: 'आइए कुछ समाधानों पर विचार करें।', cat: 'Problem' },
  { en: 'What are our options?', hi: 'हमारे पास क्या विकल्प हैं?', cat: 'Problem' },
  { en: 'I suggest we try this approach.', hi: 'मेरा सुझाव है कि हम यह तरीका आजमाएं।', cat: 'Problem' },
  { en: 'This might work.', hi: 'यह काम कर सकता है।', cat: 'Problem' },
  { en: 'Let us give it a try.', hi: 'आइए इसे आजमाएं।', cat: 'Problem' },
  { en: 'We need to think outside the box.', hi: 'हमें अलग तरीके से सोचना होगा।', cat: 'Problem' },
  { en: 'What if we look at it differently?', hi: 'अगर हम इसे अलग नजरिए से देखें तो?', cat: 'Problem' },
  { en: 'I have an idea that might help.', hi: 'मेरे पास एक विचार है जो मदद कर सकता है।', cat: 'Problem' },
  { en: 'Let us not jump to conclusions.', hi: 'आइए जल्दबाजी में निष्कर्ष न निकालें।', cat: 'Problem' },
  { en: 'We need more information.', hi: 'हमें और जानकारी चाहिए।', cat: 'Problem' },
  { en: 'Let us take it step by step.', hi: 'आइए इसे कदम दर कदम करें।', cat: 'Problem' },
  { en: 'The root cause seems to be...', hi: 'मूल कारण लगता है...', cat: 'Problem' },
  { en: 'We should prioritize this.', hi: 'हमें इसे प्राथमिकता देनी चाहिए।', cat: 'Problem' },
  { en: 'This is a temporary fix.', hi: 'यह एक अस्थायी समाधान है।', cat: 'Problem' },
  { en: 'We need a long-term solution.', hi: 'हमें दीर्घकालिक समाधान चाहिए।', cat: 'Problem' },
  { en: 'Let us learn from this mistake.', hi: 'आइए इस गलती से सीखें।', cat: 'Problem' },
  { en: 'How can we prevent this in future?', hi: 'भविष्य में इसे कैसे रोक सकते हैं?', cat: 'Problem' },
  { en: 'I take responsibility for this.', hi: 'मैं इसकी जिम्मेदारी लेता हूँ।', cat: 'Problem' },
  { en: 'Let us work together on this.', hi: 'आइए इस पर साथ मिलकर काम करें।', cat: 'Problem' },
  { en: 'We are making progress.', hi: 'हम प्रगति कर रहे हैं।', cat: 'Problem' },
  { en: 'The problem has been resolved.', hi: 'समस्या हल हो गई है।', cat: 'Problem' },
];


// ============================================
// MAIN EXECUTION
// ============================================
async function createComprehensiveLessons() {
  console.log('🚀 Creating COMPREHENSIVE lesson database for international market...');
  console.log('📊 Target: 550+ quality lessons across all levels');
  
  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.delete(progress);
    await db.delete(vocabulary);
    await db.delete(lessons);
    
    let order = 1;
    let totalVocab = 0;
    
    // Create Beginner Lessons
    console.log(`\n📗 Creating ${beginnerLessons.length} BEGINNER lessons...`);
    for (const lesson of beginnerLessons) {
      const [newLesson] = await db.insert(lessons).values({
        title: lesson.en,
        slug: `lesson-${order}`,
        description: `सीखें: "${lesson.en}"`,
        content: createLessonContent(lesson.en, lesson.hi, lesson.cat),
        difficulty: 'Beginner',
        order: order++,
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
        hindiTitle: lesson.hi,
        hindiDescription: `${lesson.cat} श्रेणी का पाठ`,
        category: lesson.cat
      }).returning();
      
      // Add vocabulary - only for non-elementary words
      const words = lesson.en.split(' ').filter(w => {
        const cleanWord = w.replace(/[^\w]/g, '').toLowerCase();
        return cleanWord.length > 3 && !elementaryWords.has(cleanWord);
      }).slice(0, 3);
      for (const word of words) {
        const cleanWord = word.replace(/[^\w]/g, '');
        const meaning = getWordMeaning(cleanWord);
        // Only add if we have a proper Hindi meaning
        if (meaning !== cleanWord.toLowerCase()) {
          await db.insert(vocabulary).values({
            lessonId: newLesson.id,
            word: cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1),
            pronunciation: `/${cleanWord.toLowerCase()}/`,
            definition: meaning,
            example: `"${lesson.en}" - ${lesson.hi}`,
            hindiTranslation: meaning,
            hindiPronunciation: lesson.hi,
            audioUrl: null
          });
          totalVocab++;
        }
      }
    }
    console.log(`   ✅ Created ${beginnerLessons.length} beginner lessons`);
    
    // Create Intermediate Lessons
    console.log(`\n📘 Creating ${intermediateLessons.length} INTERMEDIATE lessons...`);
    for (const lesson of intermediateLessons) {
      const [newLesson] = await db.insert(lessons).values({
        title: lesson.en,
        slug: `lesson-${order}`,
        description: `सीखें: "${lesson.en}"`,
        content: createLessonContent(lesson.en, lesson.hi, lesson.cat),
        difficulty: 'Intermediate',
        order: order++,
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
        hindiTitle: lesson.hi,
        hindiDescription: `${lesson.cat} श्रेणी का पाठ`,
        category: lesson.cat
      }).returning();
      
      const words2 = lesson.en.split(' ').filter(w => {
        const cleanWord = w.replace(/[^\w]/g, '').toLowerCase();
        return cleanWord.length > 3 && !elementaryWords.has(cleanWord);
      }).slice(0, 3);
      for (const word of words2) {
        const cleanWord = word.replace(/[^\w]/g, '');
        const meaning = getWordMeaning(cleanWord);
        if (meaning !== cleanWord.toLowerCase()) {
          await db.insert(vocabulary).values({
            lessonId: newLesson.id,
            word: cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1),
            pronunciation: `/${cleanWord.toLowerCase()}/`,
            definition: meaning,
            example: `"${lesson.en}" - ${lesson.hi}`,
            hindiTranslation: meaning,
            hindiPronunciation: lesson.hi,
            audioUrl: null
          });
          totalVocab++;
        }
      }
    }
    console.log(`   ✅ Created ${intermediateLessons.length} intermediate lessons`);
    
    // Create Advanced Lessons
    console.log(`\n📕 Creating ${advancedLessons.length} ADVANCED lessons...`);
    for (const lesson of advancedLessons) {
      const [newLesson] = await db.insert(lessons).values({
        title: lesson.en,
        slug: `lesson-${order}`,
        description: `सीखें: "${lesson.en}"`,
        content: createLessonContent(lesson.en, lesson.hi, lesson.cat),
        difficulty: 'Advanced',
        order: order++,
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800',
        hindiTitle: lesson.hi,
        hindiDescription: `${lesson.cat} श्रेणी का पाठ`,
        category: lesson.cat
      }).returning();
      
      const words3 = lesson.en.split(' ').filter(w => {
        const cleanWord = w.replace(/[^\w]/g, '').toLowerCase();
        return cleanWord.length > 3 && !elementaryWords.has(cleanWord);
      }).slice(0, 3);
      for (const word of words3) {
        const cleanWord = word.replace(/[^\w]/g, '');
        const meaning = getWordMeaning(cleanWord);
        if (meaning !== cleanWord.toLowerCase()) {
          await db.insert(vocabulary).values({
            lessonId: newLesson.id,
            word: cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1),
            pronunciation: `/${cleanWord.toLowerCase()}/`,
            definition: meaning,
            example: `"${lesson.en}" - ${lesson.hi}`,
            hindiTranslation: meaning,
            hindiPronunciation: lesson.hi,
            audioUrl: null
          });
          totalVocab++;
        }
      }
    }
    console.log(`   ✅ Created ${advancedLessons.length} advanced lessons`);
    
    const totalLessons = beginnerLessons.length + intermediateLessons.length + advancedLessons.length;
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 COMPREHENSIVE LESSON DATABASE CREATED!');
    console.log('='.repeat(50));
    console.log(`📊 TOTAL LESSONS: ${totalLessons}`);
    console.log(`   📗 Beginner: ${beginnerLessons.length} lessons`);
    console.log(`   📘 Intermediate: ${intermediateLessons.length} lessons`);
    console.log(`   📕 Advanced: ${advancedLessons.length} lessons`);
    console.log(`📚 TOTAL VOCABULARY: ${totalVocab} words`);
    console.log('='.repeat(50));
    console.log('✅ Ready for INTERNATIONAL MARKET LAUNCH!');
    
  } catch (error) {
    console.error('❌ Creation failed:', error);
    throw error;
  }
}

// Run
console.log('🌍 PREET ENGLISH - International Market Edition');
createComprehensiveLessons()
  .then(() => {
    console.log('\n🚀 Database creation completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed:', error);
    process.exit(1);
  });
