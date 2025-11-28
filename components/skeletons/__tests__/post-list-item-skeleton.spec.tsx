import { render, screen } from '@testing-library/react';
import PostListItemSkeleton from 'components/skeletons/post-list-item-skeleton';
import { describe, expect, it } from 'vitest';

describe('<PostListItemSkeleton />', () => {
  it('renders pulsing elements', () => {
    render(<PostListItemSkeleton />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
