import * as i18nUtils from 'utils/i18n';
import { renderHook } from '@testing-library/react';
import { usePath } from 'hooks/usePath';
import { routerConfig } from '__mocks__/next/router';

jest.mock('utils/i18n', () => {
  return {
    ...jest.requireActual('utils/i18n'),
    isDefaultLanguage: jest.fn(),
  };
});

describe('usePath', () => {
  const isDefaultLanguageSpy = jest.spyOn(i18nUtils, 'isDefaultLanguage');

  beforeEach(() => {
    isDefaultLanguageSpy.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('returns the curren path', () => {
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
