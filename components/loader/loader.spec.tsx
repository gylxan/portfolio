import Loader from 'components/loader/loader';
import { render, screen } from '@testing-library/react';

describe('<Loader />', () => {
  it('renders', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
