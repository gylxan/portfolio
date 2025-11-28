import { vi } from 'vitest';

export const fetchMock: <R = any>(query: string, params: any) => Promise<R> =
  vi.fn();
export const groq = vi
  .fn()
  .mockImplementation((stringLiteral: string) => stringLiteral);
const client = {
  fetch: fetchMock,
  groq,
};

export const createClient = vi.fn(() => client);
