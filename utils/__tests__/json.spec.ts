import { parseJSON } from 'utils/json';

describe('JSON utils', () => {
  describe('parseJSON', () => {
    const json = '{"attribute": "value"}';
    it('should return the parsed JSON', () => {
      expect(parseJSON(json, {})).toStrictEqual({ attribute: 'value' });
    });

    it('should return the default value, when string is empty', () => {
      expect(parseJSON('', {})).toStrictEqual({});
    });

    it('should return the default value, when string is undefined', () => {
      expect(parseJSON(undefined, {  })).toStrictEqual({});
    });
  });
});
