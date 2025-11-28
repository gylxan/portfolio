import { render, screen } from '@testing-library/react';
import MenuButton from 'components/menu-button/menu-button';
import { describe, expect, it, vi } from 'vitest';

vi.mock('use-intl');
describe('<MenuButton />', () => {
  it('should render', () => {
    render(<MenuButton open={true} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'open');
    expect(screen.getByLabelText('menu.close_menu')).toBeInTheDocument();
  });

  it('should render closed', () => {
    render(<MenuButton open={false} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'closed');
    expect(screen.getByLabelText('menu.open_menu')).toBeInTheDocument();
  });

  it('should render className', () => {
    render(<MenuButton open={true} className="MyClass" />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toHaveClass('MyClass');
  });
});
