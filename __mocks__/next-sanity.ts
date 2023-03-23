
export const fetchMock: <R = any>(query: string, params: any) => Promise<R> = jest.fn();
export const groq = jest.fn().mockImplementation((stringLiteral: string) => stringLiteral);
const client = {
  fetch: fetchMock,
  groq
};

export const createClient = jest.fn(() => client);
