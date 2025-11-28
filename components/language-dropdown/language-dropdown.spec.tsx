import { NextRouter, useRouter } from 'next/router';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageDropdown } from 'components';
import * as cookieUtils from 'utils/cookie';
import * as AppContext from 'contexts/app-context';
import { initialState } from 'contexts/app-context';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('next-sanity')
vi.mock('use-intl')

const mockUseRouter = vi.mocked(useRouter);
vi.mock('next/router', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useRouter: vi.fn(),
  };
});
vi.mock('utils/cookie', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    setCookie: vi.fn(),
  };
});

vi.mock('contexts/app-context', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useAppContext: vi.fn(),
  };
});

describe('<LanguageDropdown />', () => {
  const router = {
    locale: 'de',
    locales: ['en', 'de'],
    asPath: '/test',
  } as unknown as NextRouter;

  const setCookieSpy = vi.spyOn(cookieUtils, 'setCookie');
  const useAppContextSpy = vi.spyOn(AppContext, 'useAppContext');
  const setAppContextDataMock = vi.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue(router);
    setCookieSpy.mockClear();
    useAppContextSpy.mockReturnValue({
      data: initialState,
      setData: setAppContextDataMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render', () => {
    render(<LanguageDropdown />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe(
      `language.${router.locale}`,
    );
    expect(screen.getAllByRole('option')).toHaveLength(
      router.locales?.length ?? 0,
    );
    expect(
      document
        .querySelector(`a[lang=${router.locale}]`)
        ?.getAttribute('aria-selected'),
    ).toBeTruthy();
  });

  it('should not render, when there are no available languages', () => {
    mockUseRouter.mockReturnValue({
      locale: 'en',
      locales: [],
      asPath: '/test',
    } as unknown as NextRouter);

    render(<LanguageDropdown />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render with invalid button text, when locale is not defined', () => {
    mockUseRouter.mockReturnValue({
      locales: ['en', 'de'],
      asPath: '/test',
    } as unknown as NextRouter);
    render(<LanguageDropdown />);

    expect(screen.getByRole('button').textContent).toBe('language.');
  });

  it('sets the cookie for the language and context data to initial, when clicked on a link', () => {
    render(<LanguageDropdown />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getAllByRole('option')[0]);

    expect(setCookieSpy).toHaveBeenCalledWith('NEXT_LOCALE', 'en', 31536000);
    expect(setAppContextDataMock).toHaveBeenCalledWith(initialState);
  });
});
