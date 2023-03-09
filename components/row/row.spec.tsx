import Row from 'components/row/row';
import { render, screen } from '@testing-library/react';

describe('<Row />', () => {
  const children = <span data-testid="children">test</span>;

  it('should render', () => {
    const { container } = render(<Row>{children}</Row>);

    expect(container.querySelector('div')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should render with space', () => {
    const space = 8;
    const { container } = render(<Row space={space} />);

    expect(container.querySelector('div')).toHaveClass(`gap-${space}`);
  });
});
