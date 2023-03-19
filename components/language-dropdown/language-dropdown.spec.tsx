import { NextRouter, useRouter } from 'next/router';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageDropdown } from 'components';
import * as cookieUtils from 'utils/cookie';

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
jest.mock('next/router', () => {
  const router = jest.requireActual('next/router');
  return {
    ...router,
    useRouter: jest.fn(),
  };
});
jest.mock('utils/cookie', () => {
  const utils = jest.requireActual('utils/cookie');
  return {
    ...utils,
    setCookie: jest.fn(),
  };
});

describe('<LanguageDropdown />', () => {
  const router = {
    locale: 'de',
    locales: ['en', 'de'],
    asPath: '/test',
  } as NextRouter;

  const setCookieSpy = jest.spyOn(cookieUtils, 'setCookie');

  beforeEach(() => {
    mockUseRouter.mockReturnValue(router);
    setCookieSpy.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
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

    expect(screen.getByRole('button').textContent).toBe(
        'language.',
    );
  });

  it('sets the cookie for the language, when clicked on a link', () => {
    render(<LanguageDropdown />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getAllByRole('option')[0]);

    expect(setCookieSpy).toHaveBeenCalledWith('NEXT_LOCALE', 'en', 31536000);
  });
});
