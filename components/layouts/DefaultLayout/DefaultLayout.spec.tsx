import { render, screen } from '@testing-library/react';
import DefaultLayout from './DefaultLayout';

describe('<DefaultLayout />', () => {
  it('should render', () => {
    render(<DefaultLayout />);

    expect(screen.getByRole('main')).toHaveClass(
      'container mx-auto flex h-full flex-col justify-center px-4 md:px-8',
    );
  });

  it('should render children', () => {
    const child = 'My Children';
    render(<DefaultLayout>{child}</DefaultLayout>);

    expect(screen.getByText(child)).toBeInTheDocument();
  });
});
