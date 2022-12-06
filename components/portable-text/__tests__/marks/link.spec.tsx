import Link, { LinkProps } from 'components/portable-text/marks/link';
import { render, screen } from '@testing-library/react';

describe('<Link />', () => {
  const props: LinkProps = {
    text: 'text',
    markType: 'link',
    children: 'link text',
    renderNode: jest.fn(),
  };

  const value = {
    href: '/about',
    _type: 'link',
    blank: true,
    label: 'Label',
  };

  it('should render', () => {
    render(
      <Link {...props} value={value}>
        {props.children}
      </Link>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').getAttribute('aria-label')).toBe(
      value.label,
    );
    expect(screen.getByRole('link').getAttribute('href')).toBe(value.href);
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank');
  });

  it('should render only children without value', () => {
    render(<Link {...props}>{props.children}</Link>);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText(props.children as string)).toBeInTheDocument();
  });

  it('should render with target=_self when not blank', () => {
    render(
      <Link {...props} value={{ ...value, blank: false }}>
        {props.children}
      </Link>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').getAttribute('target')).toBe('_self');
  });
});
