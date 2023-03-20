import { isDefaultLanguage, restructureTranslations } from 'utils/i18n';
import { mockTranslationNamespaces } from 'constants/mock';

describe('i18n utils', () => {
  const originalDefaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE = 'en';
  });
  afterAll(() => {
    process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE = originalDefaultLanguage;
  });

  describe('restructureTranslations', () => {
    it('should return an object with namespaces as keys and object with key value pairs as value', () => {
      const restructured = restructureTranslations(mockTranslationNamespaces);

      expect(Object.keys(restructured)).toHaveLength(
        mockTranslationNamespaces.length,
      );
      mockTranslationNamespaces.forEach(({ namespace, translations }) => {
        expect(restructured[namespace]).toBeDefined();
        expect(Object.values(restructured[namespace])).toHaveLength(
          translations.length,
        );
      });
    });
  });

  describe('isDefaultLanguage', () => {
    it('should return true, when specified language is default language from env', () => {
      expect(
        isDefaultLanguage(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as string),
      ).toBeTruthy();
    });

    it('should return false, when specified language is not default language from env', () => {
      expect(isDefaultLanguage('other language')).toBeFalsy();
    });
  });
});
