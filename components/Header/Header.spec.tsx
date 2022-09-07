import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Theme } from '../../constants/theme';

const mockTheme = {
  theme: Theme.Light,
  setTheme: jest.fn(),
};

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => mockTheme),
}));

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
