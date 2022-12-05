export const fetchMock = jest.fn();
const client = {
  fetch: fetchMock,
};

export const createClient = jest.fn(() => client);
