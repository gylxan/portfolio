import Badge from 'components/Badge/Badge';
import { render, screen } from '@testing-library/react';

describe('<Badge />', () => {
  it('should render badge', () => {
    render(<Badge>text</Badge>);

    expect(screen.findByTestId('badge')).not.toBeNull();
    expect(screen.findByText('text')).not.toBeNull();
  });
});
