import { getFormattedMonthAndYear, getFormattedPostDate } from 'utils/date';

describe('Date utils', () => {

  const originalDefaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE = 'en'
  })

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-11-22'));
  });

  afterAll(() => {
    jest.useRealTimers();
    process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE = originalDefaultLanguage;
  });

  describe('getFormattedPostDate', () => {
    it('returns date with long month and day with base language', () => {
      expect(getFormattedPostDate('2022-12-22')).toBe('22. December 2022');
    });

    it('returns date with long month and day in specified language', () => {
      expect(getFormattedPostDate('2022-12-22', 'de')).toBe('22. Dezember 2022');
    });
  });

  describe('getFormattedMonthAndYear', () => {
    it('returns date with long month and year for given date', () => {
      expect(getFormattedMonthAndYear('2022-12-22')).toBe('December 2022');
    });

    it('returns date with long month and year for given date in specified locale', () => {
      expect(getFormattedMonthAndYear('2022-12-22', 'de')).toBe('Dezember 2022');
    });

    it('returns date with long month and year for today, when not date given', () => {
      expect(getFormattedMonthAndYear()).toBe('November 2022');
    });
  });
});
