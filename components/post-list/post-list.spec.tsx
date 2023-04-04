import { act, render, screen } from '@testing-library/react';
import { PostList } from 'components';
import * as useSanityImageHook from 'hooks/useSanityImage';
import * as useEndlessScrollingHook from 'hooks/useEndlessScrolling';
import type { ImageLoader } from 'next/image';
import * as AppContext from 'contexts/app-context';
import { mockPosts } from 'constants/mock';

jest.mock('hooks/useSanityImage');
jest.mock('hooks/useEndlessScrolling');

jest.mock('contexts/app-context', () => {
  const originalAppContext = jest.requireActual('contexts/app-context');
  return {
    ...originalAppContext,
    useAppContext: jest.fn(),
  };
});

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

describe('<PostList/>', () => {
  const useAppContextSpy = jest.spyOn(AppContext, 'useAppContext');
  const setData = jest.fn();

  jest.spyOn(useSanityImageHook, 'default').mockReturnValue({
    loader: undefined as unknown as ImageLoader,
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  });

  const useEndlessScrollingHookSpy = jest.spyOn(
    useEndlessScrollingHook,
    'default',
  );

  beforeEach(() => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: mockPosts, lastId: '' },
        project: { entries: [], lastId: '' },
      },
      setData,
    });

    useEndlessScrollingHookSpy.mockReturnValue({
      hasMore: false,
      loading: false,
      fetchNextPage: jest.fn(),
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', async () => {
    await act(() => {
      render(<PostList />);
    });

    expect(screen.getAllByRole('link')).toHaveLength(mockPosts.length);
  });

  it('should render a message, when there are no posts', async () => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: [], lastId: '' },
        project: { entries: [], lastId: '' },
      },
      setData,
    });
    await act(() => {
      render(<PostList />);
    });

    expect(screen.getByText('post.no_posts_available')).toBeInTheDocument();
  });
});
