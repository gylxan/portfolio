import { render, screen } from '@testing-library/react';
import React from 'react';
import { Projects } from 'components';
import { mockProjects } from 'constants/mock';

jest.mock('react-intersection-observer', () => {
  const actual = jest.requireActual('react-intersection-observer');
  return {
    ...actual,
    useInView: jest.fn().mockReturnValue({
      ref: jest.fn(),
      inView: false,
    }),
  };
});
describe('<Projects />', () => {
  const props = {
    projects: mockProjects,
  };
  it('should render projects', () => {
    render(<Projects {...props} />);

    expect(screen.getAllByTestId('project')).toHaveLength(
      props.projects.length,
    );
  });
});
