import { isTooDark } from '../color';

describe('Color utils', () => {
  describe('isTooDark', () => {
    it('should return true, if the color value is less then lumination value', () => {
      expect(isTooDark('#000000', 128)).toBeTruthy();
    });

    it('should return false, if the color value is higher then lum value', () => {
      expect(isTooDark('#ffffff', 128)).toBeFalsy();
    });
  });
});
