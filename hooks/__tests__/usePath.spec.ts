import * as i18nUtils from 'utils/i18n';
import { renderHook } from '@testing-library/react';
import { usePath } from 'hooks/usePath';
import { routerConfig } from '__mocks__/next/router';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('next/router');

vi.mock('utils/i18n', async (actualImport) => {
  return {
    ...(await actualImport()),
    isDefaultLanguage: vi.fn(),
  };
});

describe('usePath', () => {
  const isDefaultLanguageSpy = vi.spyOn(i18nUtils, 'isDefaultLanguage');

  beforeEach(() => {
    isDefaultLanguageSpy.mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('returns the current path', () => {
    const { result } = renderHook(() => usePath());

    expect(result.current).toBe(routerConfig.asPath);
  });

  it('returns the curren path with locale as prefix, when not default language', () => {
    isDefaultLanguageSpy.mockReturnValue(false);
    const { result } = renderHook(() => usePath());

    expect(result.current).toBe(
      `/${routerConfig.locale}${routerConfig.asPath}`,
    );
  });
});
