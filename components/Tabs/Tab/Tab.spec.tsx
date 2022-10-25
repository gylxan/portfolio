import { render, screen } from '@testing-library/react';
import Tab from './Tab';

describe('<Tab />', () => {
  it('should render', () => {
    render(<Tab>test</Tab>);

    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel').getAttribute('aria-hidden')).toBe(
      'false',
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('sets hidden properly', () => {
    render(<Tab hidden>test</Tab>);

    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const setRef = jest.fn();
    render(<Tab ref={setRef}>test</Tab>);

    expect(setRef).toHaveBeenCalled();
  });
});
