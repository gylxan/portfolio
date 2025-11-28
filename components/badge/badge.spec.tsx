import Badge from 'components/badge/badge';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('<Badge />', () => {
  it('should render badge', () => {
    render(<Badge>text</Badge>);

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
