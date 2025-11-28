import { vi } from 'vitest';

export const useTranslations = vi.fn(
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
