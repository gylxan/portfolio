import {
  queryAllByRole,
  queryByTestId,
  render,
  screen,
} from '@testing-library/react';
import Footer from 'components/Footer/Footer';

describe('<Footer />', () => {
  const originalProcess = process.env;

  afterEach(() => {
    process.env = originalProcess;
  });

  it('should render links and location and year', () => {
    const { container } = render(<Footer />);

    expect(queryAllByRole(container, 'link').length).toBe(0);
    expect(queryByTestId(container, 'copyright')).not.toBeInTheDocument();
  });

  it('should render LinkedIn URL, when env var is set', () => {
    process.env.NEXT_PUBLIC_LINKEDIN_URL = 'https://example.com';

    render(<Footer />);

    expect(
      screen.getByLabelText('Link to LinkedIn account'),
    ).toBeInTheDocument();
  });

  it('should render Github URL, when env var is set', () => {
    process.env.NEXT_PUBLIC_GITHUB_URL = 'https://example.com';

    render(<Footer />);

    expect(screen.getByLabelText('Link to Github account')).toBeInTheDocument();
  });

  it('should render Github URL, when env var is set', () => {
    process.env.NEXT_PUBLIC_SPOTIFY_URL = 'https://example.com';

    render(<Footer />);

    expect(
      screen.getByLabelText('Link to Spotify account'),
    ).toBeInTheDocument();
  });

  it('should render the copyright, when set per env var', () => {
    process.env.NEXT_PUBLIC_COPYRIGHT = '(c) By me';

    render(<Footer />);

    expect(screen.getByTestId('copyright')).toBeInTheDocument();
    expect(screen.getByTestId('copyright').textContent).toBe(process.env.NEXT_PUBLIC_COPYRIGHT);
  });
});
