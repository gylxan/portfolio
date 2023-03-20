import Title, { TitleProps } from 'components/title/title';
import { render } from '@testing-library/react';

describe('<Title />', () => {
  const props: TitleProps = {
    children: 'My title',
  };

  it('should render title', () => {
    const { container } = render(<Title {...props} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h1')?.textContent).toBe(props.children);
  });
});
