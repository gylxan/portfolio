export const setCookie = (key: string, value: string, maxAge?: number) => {
  document.cookie = `${key}=${value};${
    maxAge ? ` max-age=${maxAge};` : ''
  } path=/`;
};
