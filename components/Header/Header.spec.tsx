import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('<Header />', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', async () => {
    render(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
