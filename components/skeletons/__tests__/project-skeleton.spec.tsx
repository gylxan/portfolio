import { render } from '@testing-library/react';
import { ProjectSkeleton } from 'components';

describe('<ProjectSkeleton />', () => {
  it('renders pulsing elements', () => {
    render(<ProjectSkeleton />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
