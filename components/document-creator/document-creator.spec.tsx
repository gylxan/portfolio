import { render, screen } from '@testing-library/react';
import DocumentCreator from 'components/document-creator/document-creator';
import { mockSkills } from 'constants/mock';

describe('<DocumentCreator />', () => {
  const originalWarn = console.warn;

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('should render skills', () => {
    render(<DocumentCreator _type="skills" skills={mockSkills} />);

    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getAllByTestId('skill-icon')).toHaveLength(mockSkills.length);
  });

  it('should render nothing, when _type is not existing', () => {
    console.warn = jest.fn();
    const { container } = render(<DocumentCreator _type="invalid" />);

    expect(container.children).toHaveLength(0);
    expect(console.warn).toHaveBeenCalled();
  });
});
