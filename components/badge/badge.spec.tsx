import Badge from 'components/badge/badge';
import { render, screen } from '@testing-library/react';

describe('<badge />', () => {
  it('should render badge', () => {
    render(<Badge>text</Badge>);

    expect(screen.findByTestId('badge')).not.toBeNull();
    expect(screen.findByText('text')).not.toBeNull();
  });
});
