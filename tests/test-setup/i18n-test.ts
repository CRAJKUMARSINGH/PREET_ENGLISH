import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Add common translations used in tests
          'common.loading': 'Loading...',
          'common.error': 'Error',
          'common.success': 'Success',
          'lesson.complete': 'Complete Lesson',
          'lesson.start': 'Start Lesson',
        },
      },
      hi: {
        translation: {
          'common.loading': 'लोड हो रहा है...',
          'common.error': 'त्रुटि',
          'common.success': 'सफलता',
          'lesson.complete': 'पाठ पूरा करें',
          'lesson.start': 'पाठ शुरू करें',
        },
      },
    },
  })

export default i18n
