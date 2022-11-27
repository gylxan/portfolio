import { render, screen } from '@testing-library/react';
import Project from './Project';

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

describe('<Project />', () => {
  const props = {
    name: 'Project name',
    description: 'Project description',
    private: false,
    slugs: [],
  };

  it('should render', () => {
    render(<Project {...props} />);

    expect(screen.getByTestId('project')).toBeInTheDocument();
    expect(screen.getByText('Work Project')).toBeInTheDocument();
    expect(screen.queryAllByTestId('badge').length).toBe(0);
    expect(
      screen.queryByLabelText("Link to the Github repository or preview of the project"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Link to Github repository of ${props.name}`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Link to a Preview of ${props.name}`),
    ).not.toBeInTheDocument();
  });

  it('should render background image, when specified', () => {
    const imageUrl = 'http://myimageurl';
    render(<Project {...props} imageUrl={imageUrl} />);

    expect(screen.getByAltText(`Background image of ${props.name} project`)).toBeInTheDocument();
  });

  it('should render as private project, when private is true', () => {
    render(<Project {...props} private={true} />);

    expect(screen.getByTestId('project')).toBeInTheDocument();
    expect(screen.getByText('Private Project')).toBeInTheDocument();
    expect(screen.queryByText('Work Project')).not.toBeInTheDocument();
  });

  it('should render badges for the slugs', () => {
    render(<Project {...props} slugs={['Slug 1', 'Slug 2']} />);

    expect(screen.queryAllByTestId('badge').length).toBe(2);
  });

  it('should render Github Icon with URL', () => {
    render(<Project {...props} githubUrl="https://githuburl" />);

    expect(
      screen.getByLabelText("Link to the Github repository or preview of the project"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Link to Github repository of ${props.name}`),
    ).toBeInTheDocument();
  });

  it('should render External link Icon with URL', () => {
    render(<Project {...props} previewUrl="https://previewUrl" />);

    expect(
      screen.getByLabelText("Link to the Github repository or preview of the project"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Link to a Preview of ${props.name}`),
    ).toBeInTheDocument();
  });
});
