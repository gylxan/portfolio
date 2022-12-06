import Title, { AnimatedTitleProps } from 'components/title/title';
import { render, screen } from '@testing-library/react';

describe('<title />', () => {
  const props: AnimatedTitleProps = {
    children: 'My title',
  };

  it('should render title', () => {
    const { container } = render(<Title {...props} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelectorAll('span').length).toBe(
      (props.children as string).split('').length,
    );
  });

  it('should render not animated, when animated is false', () => {
    const { container } = render(<Title {...props} animated={false} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelectorAll('span')).toHaveLength(0);
    expect(screen.getByText(props.children as string)).toBeInTheDocument();
  });

  it('should render not animated, when children is not string', () => {
    const { container } = render(
      <Title {...props}>
        <div>My Title</div>
      </Title>,
    );

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelectorAll('span')).toHaveLength(0);
    expect(screen.getByText('My title')).toBeInTheDocument();
  });
});
