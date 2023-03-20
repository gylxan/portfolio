import { render, screen } from '@testing-library/react';
import Link from 'components/link/link';

describe('<Link />', () => {
  it('should render', () => {
    render(<Link href="/about">test</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    const classNames = screen.getByRole('link').className.split(' ');
    expect(classNames).toContain('link');
    expect(classNames).toContain('underlined');
    expect(classNames).toContain('hover:text-secondary');
    expect(screen.getByRole('link').getAttribute('ref')).toBeNull();
  });

  it('should apply active className, when active is set', () => {
    render(<Link href="/about" active={true}>test</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    const classNames = screen.getByRole('link').className.split(' ');
    expect(classNames).toContain('active');
  });

  it('should render external link, when href does not start with "/"', () => {
    render(<Link href="https://google.com">test</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    const classNames = screen.getByRole('link').className.split(' ');
    expect(classNames).toContain('link');
    expect(classNames).toContain('underlined');
    expect(classNames).toContain('hover:text-secondary');
    expect(screen.getByRole('link').getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should apply given className', () => {
    const className = 'MyClass';

    render(
      <Link href="https://google.com" className={className}>
        test
      </Link>,
    );

    expect(screen.getByRole('link').className).toContain(className);
  });

  it('should not apply underline class, when underline is false', () => {
    render(
      <Link href="https://google.com" underlined={false}>
        test
      </Link>,
    );

    expect(screen.getByRole('link').className.split(' ')).not.toContain(
      'underline',
    );
  });

  it('should not apply hover text secondary class, when coloredHover is false', () => {
    render(
      <Link href="https://google.com" coloredHover={false}>
        test
      </Link>,
    );

    expect(screen.getByRole('link').className.split(' ')).not.toContain(
      'hover:text-secondary',
    );
  });
});
