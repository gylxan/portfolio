import { render, screen } from '@testing-library/react';
import Link from 'components/link/link';
import { describe, expect, it } from 'vitest';

describe('<Link />', () => {
  it('should render', () => {
    render(<Link href="/about">test</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').getAttribute('ref')).toBeNull();
  });

  it('should render external link, when href does not start with "/"', () => {
    render(<Link href="https://google.com">test</Link>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
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
});
