import { render, screen } from '@testing-library/react';
import Header from 'components/header/header';

describe('<header />', function () {
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
