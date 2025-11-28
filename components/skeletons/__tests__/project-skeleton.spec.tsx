import { render, screen } from '@testing-library/react';
import ProjectSkeleton from 'components/skeletons/project-skeleton';
import { describe, expect, it } from 'vitest';

describe('<ProjectSkeleton />', () => {
  it('renders pulsing elements', () => {
    render(<ProjectSkeleton />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
