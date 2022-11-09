import { render, screen } from '@testing-library/react';
import FullHeightLayout from './FullHeightLayout';

describe('<FullHeightLayout />', () => {
  it('should render', () => {
    render(<FullHeightLayout />);

    expect(screen.getByRole('main')).toHaveClass(
      'container mx-auto flex h-full flex-col justify-center px-4 md:px-8',
    );
  });

  it('should render children', () => {
    const child = 'My Children';
    render(<FullHeightLayout>{child}</FullHeightLayout>);

    expect(screen.getByText(child)).toBeInTheDocument();
  });
});
