import { getShortenedJoinedList } from '../array';

describe('Array utils', () => {
  describe('getShortenedJoinedList', () => {
    const list = ['1', '2', '3', '4', '5'];

    it('should return a shortened joined list, when list length is bigger then maxElements', () => {
      expect(getShortenedJoinedList(list, 3)).toBe('1, 2, 3 + 2 others');
    });

    it('should return the complete list, when list length is lower then maxElements', () => {
        expect(getShortenedJoinedList([list[0], list[1]], 3)).toBe('1, 2');
    });

      it('should return empty string, when list is empty', () => {
          expect(getShortenedJoinedList([], 3)).toBe('');
      });
  });
});
