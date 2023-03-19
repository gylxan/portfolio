export const useTranslations = jest.fn(
  (namespace: string) =>
    (key: string, params: Record<string, string | number>) =>
      `${namespace}.${key}${
        params
          ? ` (${Object.keys(params)
              .map((key) => `${key}: ${params[key]}`)
              .join(', ')})`
          : ''
      }`,
);
