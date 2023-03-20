import { act, render, screen } from '@testing-library/react';
import Project, { ProjectProps } from 'components/project/project';
import useSanityImage from 'hooks/useSanityImage';
import { mockSanityImage } from 'constants/mock';

jest.mock('hooks/useSanityImage');

const mockUseSanityImage = useSanityImage as jest.MockedFunction<
  typeof useSanityImage
>;

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
  const props: ProjectProps = {
    name: 'project name',
    description: 'project description',
    private: false,
    keywords: [],
  };

  beforeEach(() => {
    mockUseSanityImage.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<Project {...props} />);

    expect(screen.getByTestId('project')).toBeInTheDocument();
    expect(screen.getByText('project.work_project')).toBeInTheDocument();
    expect(screen.queryAllByTestId('badge').length).toBe(0);
    expect(
      screen.queryByLabelText(
        'Link to the Github repository or preview of the project',
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Link to Github repository of ${props.name}`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Link to a Preview of ${props.name}`),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render background image, when specified', async () => {
    mockUseSanityImage.mockReturnValue({
      src: 'https://domain.image.com',
      loader: jest.fn(),
      width: 123,
      height: 123,
    });
    await act(() => {
      render(<Project {...props} backgroundImage={mockSanityImage} />);
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByAltText(`project.background_image_of ${props.name}`),
    ).toBeInTheDocument();
  });

  it('should render as private project, when private is true', () => {
    render(<Project {...props} private={true} />);

    expect(screen.getByTestId('project')).toBeInTheDocument();
    expect(screen.getByText('project.private_project')).toBeInTheDocument();
    expect(screen.queryByText('project.work_project')).not.toBeInTheDocument();
  });

  it('should render badges for the slugs', () => {
    const keywords = ['Keyword 1', 'Keyword 2'];
    render(<Project {...props} keywords={keywords} />);

    expect(screen.queryAllByTestId('badge').length).toBe(keywords.length);
  });

  it('should render Github Icon with URL', () => {
    render(<Project {...props} githubUrl="https://githuburl" />);

    expect(
      screen.getByLabelText(
        `project.preview_or_project ${props.name}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`project.github_repo_of ${props.name}`),
    ).toBeInTheDocument();
  });

  it('should render External link Icon with URL', () => {
    render(<Project {...props} previewUrl="https://previewUrl" />);

    expect(
      screen.getByLabelText(
        `project.preview_or_project ${props.name}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`project.preview_of ${props.name}`),
    ).toBeInTheDocument();
  });
});
