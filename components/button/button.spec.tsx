import { render, screen } from '@testing-library/react';
import Button from 'components/button/button';

describe('<Button />', () => {
  it('should render as button', () => {
    const props = { type: 'submit' };

    render(<Button {...props}>My button</Button>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('My button');
  });

  it('should render as link', () => {
    const props = { href: '/' };

    render(<Button {...props}>My link</Button>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe('My link');
  });
});
