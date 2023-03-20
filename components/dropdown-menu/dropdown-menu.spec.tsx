import type { DropdownMenuProps } from 'components/dropdown-menu/dropdown-menu';
import { DropdownMenu, DropdownMenuItem } from 'components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<DropdownMenu />', () => {
  const entries = [
    { value: 'value1', label: 'Value 1' },
    { value: 'value2', label: 'Value 2' },
  ];
  const children = entries.map(({ value, label }) => (
    <DropdownMenuItem key={value} value={value}>
      {label}
    </DropdownMenuItem>
  ));
  const props: DropdownMenuProps = {
    value: entries[1].value,
    label: 'My label',
    onChange: jest.fn(),
  };

  it('should render', () => {
    render(<DropdownMenu {...props}>{children}</DropdownMenu>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe(props.label);
    // Menu is initial closed. So no options are shown
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('should render options with selected with open menu', () => {
    render(<DropdownMenu {...props}>{children}</DropdownMenu>);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe(props.label);
    // Menu is initial closed. So no options are shown
    expect(screen.queryAllByRole('option')).toHaveLength(children.length);
    expect(
      screen.getByText(entries[1].label).getAttribute('aria-selected'),
    ).toBeTruthy();
  });

  it('should call onChange, when another option is clicked', () => {
    const onChange = jest.fn();
    render(
      <DropdownMenu {...props} onChange={onChange}>
        {children}
      </DropdownMenu>,
    );
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText(entries[0].label));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(entries[0].value);
  });

  it('should not call onChange, when selected option is clicked', () => {
    const onChange = jest.fn();
    render(
      <DropdownMenu {...props} onChange={onChange}>
        {children}
      </DropdownMenu>,
    );
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText(entries[1].label));

    expect(onChange).not.toHaveBeenCalled();
  });
});
