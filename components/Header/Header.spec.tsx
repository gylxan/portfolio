import { render, screen } from '@testing-library/react';
import Header from 'components/Header/Header';

describe('<Header />', function () {
  const originalProcess = process.env;


  beforeEach(() => {
    process.env.NEXT_PUBLIC_LOGO_URL = "https://myurl/logo.png"
  })

  afterEach(() => {
    process.env = originalProcess;
  });

  it('renders', async () => {
    render(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
