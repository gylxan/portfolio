import { getFormattedMonthAndYear, getFormattedPostDate } from 'utils/date';

describe('Date utils', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-11-22'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getFormattedPostDate', () => {
    it('returns date with long month and day', () => {
      expect(getFormattedPostDate('2022-12-22')).toBe('22. December 2022');
    });
  });

  describe('getFormattedMonthAndYear', () => {
    it('returns date with long month and year for given date', () => {
      expect(getFormattedMonthAndYear('2022-12-22')).toBe('December 2022');
    });

    it('returns date with long month and year for today, when not date given', () => {
      expect(getFormattedMonthAndYear()).toBe('November 2022');
    });
  });
});
