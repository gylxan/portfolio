import { act, fireEvent, render, screen } from '@testing-library/react';
import Menu, { MD_WIDTH, MenuProps } from 'components/menu/menu';
import { mockSanityFile, mockSiteConfig } from 'constants/mock';
import { UseOutsideClickProps } from 'hooks/useOutsideClick';

let useOutsideClickProps: Partial<UseOutsideClickProps> = {};
jest.mock('hooks/useOutsideClick', () =>
  jest.fn().mockImplementation((props) => {
    useOutsideClickProps = props;
  }),
);

describe('<Menu />', () => {
  const originalInnerWidth = global.innerWidth;
  const props: MenuProps = {
    links: mockSiteConfig.menuLinks,
  };

  beforeEach(() => {
    useOutsideClickProps = {};
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should render', () => {
    render(<Menu {...props} />);

    expect(screen.getByRole('menu', { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem', { hidden: true }).length).toBe(
      props.links.length,
    );
    expect(screen.queryByTestId('resume-button')).not.toBeInTheDocument();
  });

  it('should render button with link to resume, when specified', () => {
    render(<Menu {...props} resume={mockSanityFile} />);

    expect(screen.getByTestId('resume-button')).toBeInTheDocument();
  });

  it('should open burger menu on click on menu button', () => {
    render(<Menu {...props} />);

    fireEvent.click(screen.getByRole('button'));

    expect(document.querySelector('body')).toHaveClass('menu-open');
    expect(document.querySelector('.menu')).toHaveClass('open');
  });

  it('should close burger menu on second click on menu button', () => {
    render(<Menu {...props} />);

    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).toHaveClass('menu-open');
    expect(document.querySelector('.menu')).toHaveClass('open');

    fireEvent.click(screen.getByRole('button'));
    expect(document.querySelector('body')).not.toHaveClass('menu-open');
    expect(document.querySelector('.menu')).not.toHaveClass('open');
  });

  it('removes the menu-open class on resize for md and up screens', () => {
    render(<Menu {...props} />);
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
    render(<Menu {...props} />);
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
    render(<Menu {...props} />);
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getAllByRole('menuitem')[0]);

    expect(document.querySelector('body')).not.toHaveClass('menu-open');
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveClass('open');
  });

  it('should close the burger menu, when useOutsideClick is triggered', () => {
    render(<Menu {...props} />);
    fireEvent.click(screen.getByRole('button'));

    expect(document.querySelector('body')).toHaveClass('menu-open');
    expect(document.querySelector('.menu')).toHaveClass('open');

    act(() => {
      useOutsideClickProps.callback();
    });

    expect(document.querySelector('body')).not.toHaveClass('menu-open');
    expect(document.querySelector('.menu')).not.toHaveClass('open');
  });
});
