import * as i18nUtils from 'utils/i18n';
import {getUrl} from "utils/url";
jest.mock('utils/i18n', () => {
  const originalI18n = jest.requireActual('utils/i18n');
  return {
    ...originalI18n,
    isDefaultLanguage: jest.fn(),
  };
});
describe('URL utils', () => {
  describe('getUrl', () => {
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

    it('should return a url from the given locale and slugs without locale prefix', () => {
      expect(getUrl('en', ['slug1', 'slug2'])).toBe('/slug1/slug2');
    });

    it('should return a localized url, when the given locale is not default language', () => {
      isDefaultLanguageSpy.mockReturnValueOnce(false);
      expect(getUrl('en', ['slug1', 'slug2'])).toBe('/en/slug1/slug2');
    });
  });
});
