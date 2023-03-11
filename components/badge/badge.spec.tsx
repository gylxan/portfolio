import Badge from 'components/badge/badge';
import { render, screen } from '@testing-library/react';

describe('<Badge />', () => {
  it('should render badge', () => {
    render(<Badge>text</Badge>);

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
