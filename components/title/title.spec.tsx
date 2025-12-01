import Title, { TitleProps } from 'components/title/title';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/router');
describe('<Title />', () => {
  const props = {
    children: 'My title',
  } as const satisfies TitleProps;

  it('should render title', () => {
    render(<Title {...props} />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(props.children);
  });
});
