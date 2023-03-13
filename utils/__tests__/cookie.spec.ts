import { setCookie } from 'utils/cookie';

describe('Cookie utils', () => {
  describe('setCookie', () => {
    let cookieValue: string | null = null;
    const originalDocumentCookie = document.cookie;

    beforeAll(() => {
      Object.defineProperty(document, 'cookie', {
        set(v: string) {
          cookieValue = v;
        },
        get(): string | null {
          return cookieValue;
        },
      });
    });

    beforeEach(() => {
      cookieValue = null;
    });

    afterAll(() => {
      document.cookie = originalDocumentCookie;
    });

    it('should set the value for the specified cookie key', () => {
      setCookie('Cookie', 'value');

      expect(cookieValue).toBe('Cookie=value; path=/');
    });

      it('should use the specified maxAge', () => {
          setCookie('Cookie2', 'value2',12);

          expect(cookieValue).toBe('Cookie2=value2; max-age=12; path=/');
      });
  });
});
