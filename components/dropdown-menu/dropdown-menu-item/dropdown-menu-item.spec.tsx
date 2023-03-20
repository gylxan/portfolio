import DropdownMenuItem, {
  DropdownMenuItemProps,
} from 'components/dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { render, screen } from '@testing-library/react';

describe('<DropdownMenuItem />', () => {
  const props: DropdownMenuItemProps = {
    value: 'value',
  };

  it('should render a link with content', () => {
    render(<DropdownMenuItem {...props}>My value</DropdownMenuItem>);

    expect(screen.getByRole('option')).toBeInTheDocument();
    expect(screen.getByRole('option').textContent).toBe('My value');
    expect(screen.getByRole('option').getAttribute('data-value')).toBe(
      props.value,
    );
    expect(screen.getByRole('option').getAttribute('href')).toBe('#');
    expect(
      screen.getByRole('option').getAttribute('aria-selected'),
    ).toBeFalsy();
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  });

  it('should render a checkmark, when item is selected', () => {
    render(
      <DropdownMenuItem {...props} selected>
        My value
      </DropdownMenuItem>,
    );

    expect(
      screen.getByRole('option').getAttribute('aria-selected'),
    ).toBeTruthy();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('should render with specified href property', () => {
    const href = '/test';
    render(
      <DropdownMenuItem {...props} href={href}>
        My value
      </DropdownMenuItem>,
    );

    expect(screen.getByRole('option').getAttribute('href')).toBe(href);
  });
});
