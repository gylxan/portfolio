import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('<Layour />', () => {
  it('should render', () => {
    render(<Layout />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render children', () => {
    const child = 'My Children';
    render(<Layout>{child}</Layout>);

    expect(screen.getByText(child)).toBeInTheDocument();
  });

  it('should apply className', () => {
    const className = 'classname';
    render(<Layout className={className} />);

    expect(screen.getByRole('main')).toHaveClass(className);
  });
});
