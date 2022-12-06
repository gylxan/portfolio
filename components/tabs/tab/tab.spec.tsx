import { render, screen } from '@testing-library/react';
import Tab from 'components/tabs/tab/tab';

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
    render(<Tab active={false}>test</Tab>);

    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });
});
