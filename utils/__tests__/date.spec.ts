import { getFormattedPostDate } from "utils/date";

describe('Date utils', () => {

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-11-22'))
  })

  afterAll(() => {
    jest.useRealTimers();
  })

  describe('getFormattedPostDate', () => {
    it('return date with long month', () => {

      expect(getFormattedPostDate('2022-12-22')).toBe('22. December 2022')
    });
  });
});
