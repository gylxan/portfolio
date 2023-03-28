import * as i18nUtils from 'utils/i18n';
import {
  getLanguageUrlPrefix,
  getPathsFromSlug,
  getUrlFromSlugs,
  isSlugMatchingCurrentUrl,
} from 'utils/url';
jest.mock('utils/i18n', () => {
  const originalI18n = jest.requireActual('utils/i18n');
  return {
    ...originalI18n,
    isDefaultLanguage: jest.fn(),
  };
});
describe('URL utils', () => {
  const isDefaultLanguageSpy = jest.spyOn(i18nUtils, 'isDefaultLanguage');

  beforeEach(() => {
    isDefaultLanguageSpy.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getUrlFromSlugs', () => {
    it('should return a url from the given locale and slugs without locale prefix', () => {
      expect(getUrlFromSlugs('en', ['slug1', 'slug2'])).toBe('/slug1/slug2');
    });

    it('should return a localized url, when the given locale is not default language', () => {
      isDefaultLanguageSpy.mockReturnValueOnce(false);
      expect(getUrlFromSlugs('en', ['slug1', 'slug2'])).toBe('/en/slug1/slug2');
    });

    it('should return "/", when locale is default language and no slugs are specified', () => {
      expect(getUrlFromSlugs('en', [])).toBe('/');
    });
  });

  describe('getPathsFromSlug', () => {
    it('returns an empty array, when URL is ("/de")', () => {
      expect(getPathsFromSlug('/', 'en')).toStrictEqual([]);
    });

    it('returns an empty array, when URL is language specific root ("/en")', () => {
      expect(getPathsFromSlug('/en', 'en')).toStrictEqual([]);
    });

    it('returns an array with paths', () => {
      expect(getPathsFromSlug('/test/test2', 'en')).toStrictEqual([
        'test',
        'test2',
      ]);
    });

    it('returns an array without language specific root', () => {
      expect(getPathsFromSlug('/de/test/test2', 'de')).toStrictEqual([
        'test',
        'test2',
      ]);
    });
  });

  describe('isSlugMatchingCurrentUrl', () => {
    it('should return true, when slug matches non-locale url', () => {
      expect(isSlugMatchingCurrentUrl('test-slug', undefined, '/test-slug'));
    });

    it('should return true, when slug matches localized url', () => {
      expect(isSlugMatchingCurrentUrl('en/test-slug', 'en', '/test-slug'));
    });

    it('should return true, when slug starts with slash and matches non-localized url', () => {
      expect(isSlugMatchingCurrentUrl('/test-slug', undefined, '/test-slug'));
    });

    it('should return true, when slug starts with slash and matches localized url', () => {
      expect(isSlugMatchingCurrentUrl('/en/test-slug', 'en', '/test-slug'));
    });
  });

  describe('getLanguageUrlPrefix', () => {
    it('returns an empty string, when language is default language', () => {
      expect(getLanguageUrlPrefix('en')).toBe('')
    });


    it('returns /language, when language is not default language', () => {
      isDefaultLanguageSpy.mockReturnValue(false);

      expect(getLanguageUrlPrefix('de')).toBe('/de')
    });
  });
});
