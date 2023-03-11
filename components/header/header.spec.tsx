import { render, screen } from '@testing-library/react';
import Header, { HeaderProps } from 'components/header/header';
import { mockSiteConfig } from 'constants/mock';
import useSanityImage from 'hooks/useSanityImage';
jest.mock('hooks/useSanityImage');

const mockUseSanityImage = useSanityImage as jest.MockedFunction<
  typeof useSanityImage
>;

describe('<Header />', function () {
  const props: HeaderProps = {
    menuLinks: mockSiteConfig.menuLinks,
    logo: mockSiteConfig.logo,
  };

  beforeEach(() => {
    mockUseSanityImage.mockReturnValue({
      src: 'https://domain/image.png',
      loader: jest.fn(),
      width: 123,
      height: 123,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
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
});
