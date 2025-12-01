import { fireEvent, render, screen } from '@testing-library/react';
import Header, { HeaderProps } from 'components/header/header';
import { mockSiteConfig } from 'constants/mock';
import useSanityImage from 'hooks/useSanityImage';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity');
vi.mock('next/router');
vi.mock('use-intl');

const mockUseSanityImage = vi.mocked(useSanityImage);

describe('<Header />', function () {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

  const props: HeaderProps = {
    menuLinks: mockSiteConfig.menuLinks,
    logo: mockSiteConfig.logo,
  };

  beforeEach(() => {
    mockUseSanityImage.mockReturnValue({
      src: 'https://domain/image.png',
      loader: vi.fn().mockReturnValue('https://domain.image.com?w=123'),
      width: 123,
      height: 123,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('renders', async () => {
    render(<Header {...props} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('menu', { hidden: true })).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem', { hidden: true }).length).toBe(
      props.menuLinks.length,
    );
  });

  it('renders no logo, when useSanityImage returns null', async () => {
    mockUseSanityImage.mockReturnValue(null);
    render(<Header {...props} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders a shadow, when scrolling down', async () => {
    render(<Header {...props} />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(screen.getByRole('banner').className).toContain('shadow-lg');
  });

  it('registers event listener for scrolling', () => {
    render(<Header {...props} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.anything(),
    );
  });

  it('unregisters event listener for scrolling on unmount', () => {
    const { unmount } = render(<Header {...props} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.anything(),
    );
  });
});
