import Loader from 'components/loader/loader';
import { render, screen } from '@testing-library/react';

describe('<Loader />', () => {
  it('renders', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders with className', () => {
    const className = 'my-class';
    render(<Loader className={className} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('loader').className).toContain(className);
  });
});
