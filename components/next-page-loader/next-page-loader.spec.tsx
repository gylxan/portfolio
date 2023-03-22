import { render, screen } from '@testing-library/react';
import NextPageLoader, {
  NextPageLoaderProps,
} from 'components/next-page-loader/next-page-loader';

let onInViewChange = jest.fn();
jest.mock('react-intersection-observer', () => {
  const actual = jest.requireActual('react-intersection-observer');
  return {
    ...actual,
    useInView: jest.fn().mockImplementation(({ onChange }) => {
      onInViewChange = onChange;
      return { ref: jest.fn() };
    }),
  };
});
describe('<NextPageLoader />', () => {
  const props: NextPageLoaderProps = {
    hasMore: false,
    isLoading: false,
    onFetchNextPage: jest.fn(),
  };

  beforeEach(() => {
    onInViewChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    render(<NextPageLoader {...props} />);

    expect(screen.getByTestId('next-page-loader')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-loader').children).toHaveLength(0);
    expect(screen.getByTestId('next-page-loader').textContent).toBe('');
  });

  it('renders with error', () => {
    render(<NextPageLoader {...props} error="My error" />);

    expect(screen.getByTestId('next-page-loader')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-loader').textContent).not.toBe('');
    expect(screen.getByText('My error')).toBeInTheDocument();
  });

  it('renders with loader', () => {
    render(<NextPageLoader {...props} isLoading={true} />);

    expect(screen.getByTestId('next-page-loader')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-loader').textContent).toBe('');
  });

  it('renders with loader and error', () => {
    render(<NextPageLoader {...props} isLoading={true} error="My error" />);

    expect(screen.getByTestId('next-page-loader')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-loader').textContent).not.toBe('');
    expect(screen.getByText('My error')).toBeInTheDocument();
  });

  describe('onChange', () => {
    const fetchNextPageMock = jest.fn();

    beforeEach(() => {
      fetchNextPageMock.mockClear();
    });

    it('triggers onFetchNextPage, when inView, has more, not loading and no error', () => {
      render(
        <NextPageLoader
          {...props}
          onFetchNextPage={fetchNextPageMock}
          hasMore={true}
        />,
      );

      onInViewChange(true);

      expect(fetchNextPageMock).toHaveBeenCalled();
    });

    it('does not trigger onFetchNextPage, when not inView, has more, not loading and no error', () => {
      render(
        <NextPageLoader
          {...props}
          onFetchNextPage={fetchNextPageMock}
          hasMore={true}
        />,
      );

      onInViewChange(false);

      expect(fetchNextPageMock).not.toHaveBeenCalled();
    });

    it('does not trigger onFetchNextPage, when inView, has not more, not loading and no error', () => {
      render(
        <NextPageLoader
          {...props}
          onFetchNextPage={fetchNextPageMock}
          hasMore={false}
        />,
      );

      onInViewChange(true);

      expect(fetchNextPageMock).not.toHaveBeenCalled();
    });

    it('does not trigger onFetchNextPage, when inView, has more, is loading and no error', () => {
      render(
        <NextPageLoader
          {...props}
          onFetchNextPage={fetchNextPageMock}
          hasMore={true}
          isLoading={true}
        />,
      );

      onInViewChange(true);

      expect(fetchNextPageMock).not.toHaveBeenCalled();
    });

      it('does not trigger onFetchNextPage, when inView, has more, not loading and has error', () => {
          render(
              <NextPageLoader
                  {...props}
                  onFetchNextPage={fetchNextPageMock}
                  hasMore={true}
                  error="My error"
              />,
          );

          onInViewChange(true);

          expect(fetchNextPageMock).not.toHaveBeenCalled();
      });
  });
});
