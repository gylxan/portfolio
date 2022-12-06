import { fireEvent, render, screen } from '@testing-library/react';
import Menu, { MD_WIDTH } from 'components/menu/menu';

describe('<Menu />', () => {
  const originalInnerWidth = global.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should render', () => {
    render(<Menu />);

    expect(document.querySelector('.list')).toBeInTheDocument();
    expect(document.querySelector('.burgerMenu')).toBeInTheDocument();
    expect(document.querySelector('.burgerMenuList')).toBeInTheDocument();
  });

  it('should open burger menu on click on menu button', () => {
    render(<Menu />);

    fireEvent.click(screen.getByRole('button'));

    expect(document.querySelector('body')).toHaveClass('menu-open');
    expect(document.querySelector('.burgerMenu')).toHaveClass('open');
  });

  it('should close burger menu on second click on menu button', () => {
    render(<Menu />);

    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).toHaveClass('menu-open');
    expect(document.querySelector('.burgerMenu')).toHaveClass('open');

    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).not.toHaveClass('menu-open');
    expect(document.querySelector('.burgerMenu')).not.toHaveClass('open');
  });

  it('removes the menu-open class on resize for md and up screens', () => {
    render(<Menu />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).toHaveClass('menu-open');

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: MD_WIDTH,
    });
    global.dispatchEvent(new Event('resize'));

    expect(document.querySelector('body')).not.toHaveClass('menu-open');
  });

  it('adds the menu-open class on resize for below md screens, when it was open before', () => {
    render(<Menu />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).toHaveClass('menu-open');

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: MD_WIDTH - 1,
    });
    global.dispatchEvent(new Event('resize'));

    expect(document.querySelector('body')).toHaveClass('menu-open');
  });

  it('closes the burger menu and redirects on click on link in burger menu', () => {
    render(<Menu />);
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(document.querySelectorAll('.burgerMenuListItem a')[0]);

    expect(document.querySelector('body')).not.toHaveClass('menu-open');
    expect(document.querySelector('.burgerMenu')).not.toHaveClass('open');
  });
});
