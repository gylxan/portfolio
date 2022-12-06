import { render, screen } from '@testing-library/react';
import MenuButton from 'components/menu-button/menuButton';

describe('<menu-button />', () => {
  it('should render', () => {
    render(<MenuButton open={true} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toHaveClass('open');
    expect(document.querySelectorAll('.line').length).toBe(3);
  });

  it('should render closed', () => {
    render(<MenuButton open={false} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toHaveClass('open');
    expect(document.querySelectorAll('.line').length).toBe(3);
  });

  it('should render className', () => {
    render(<MenuButton open={true} className="MyClass" />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toHaveClass('open', 'MyClass');
    expect(document.querySelectorAll('.line').length).toBe(3);
  });
});
