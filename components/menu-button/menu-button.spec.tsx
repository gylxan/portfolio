import { render, screen } from '@testing-library/react';
import MenuButton from 'components/menu-button/menu-button';

describe('<MenuButton />', () => {
  it('should render', () => {
    render(<MenuButton open={true} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toHaveClass('open');
    expect(screen.getByLabelText('menu.close_menu')).toBeInTheDocument()
    expect(document.querySelectorAll('.line').length).toBe(3);
  });

  it('should render closed', () => {
    render(<MenuButton open={false} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toHaveClass('open');
    expect(screen.getByLabelText('menu.open_menu')).toBeInTheDocument()
    expect(document.querySelectorAll('.line').length).toBe(3);
  });

  it('should render className', () => {
    render(<MenuButton open={true} className="MyClass" />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toHaveClass('open', 'MyClass');
    expect(document.querySelectorAll('.line').length).toBe(3);
  });
});
