export const useTranslation = () => {
  return {
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: () => Promise.resolve(),
    },
  };
};

export const Trans = ({ children }: { children: any }) => children;
