import { vi } from 'vitest';

export const fetchMock: <R>(
  query: string,
  params: Record<string, never> | undefined,
) => Promise<R> = vi.fn();
export const groq = vi
  .fn()
  .mockImplementation((stringLiteral: string) => stringLiteral);
const client = {
  fetch: fetchMock,
  groq,
};

export const createClient = vi.fn(() => client);
