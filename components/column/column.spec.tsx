import { render, screen } from '@testing-library/react';
import React from 'react';
import Column from 'components/column/column';

describe('<Column />', () => {
  const children = <span data-testid="children">test</span>;

  it('should render', () => {
    const { container } = render(<Column>{children}</Column>);

    expect(container.querySelector('div')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should render with space', () => {
    const space = 8;
    const { container } = render(<Column space={space} />);

    expect(container.querySelector('div')).toHaveClass(`gap-${space}`);
  });

  it('should render with alignment', () => {
    const { container } = render(<Column alignment="right" />);

    expect(container.querySelector('div')).toHaveClass(`items-right`);
  });

  it('should not render with row switch size, when value is never', () => {
    const { container } = render(<Column rowSwitchSize="never" />);

    expect(container.querySelector('div')?.className).not.toContain('flex-row');
  });

  it('should render with row switch size', () => {
    const { container } = render(<Column rowSwitchSize="lg" />);

    expect(container.querySelector('div')).toHaveClass(`lg:flex-row`);
  });
});
