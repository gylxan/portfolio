import { render } from '@testing-library/react';
import { PostListItemSkeleton } from 'components';

describe('<PostListItemSkeleton />', () => {
  it('renders pulsing elements', () => {
    render(<PostListItemSkeleton />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
