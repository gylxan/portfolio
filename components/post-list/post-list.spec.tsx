import type { Post } from 'types/post';
import { act, render, screen } from '@testing-library/react';
import { PostList } from 'components';
import * as useSanityImageHook from 'hooks/useSanityImage';
import * as useEndlessScrollingHook from 'hooks/useEndlessScrolling';
import type { ImageLoader } from 'next/image';
import * as AppContext from 'contexts/app-context';

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

const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Post 1',
    description: 'Description for post 1',
    _createdAt: '2022-10-22',
    slug: { _type: 'slug', current: 'post1' },
    estimatedReadingTime: 12345,
    mainImage: {
      asset: {
        _ref: '123',
        metadata: {
          lqid: '12324',
        },
      },
    },
    categories: [
      {
        name: 'Category 1',
        description: 'Description for category 1',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
  {
    _id: '2',
    title: 'Post 2',
    description: 'Description for post 2',
    _createdAt: '2022-10-22',
    slug: { _type: 'slug', current: 'post-2' },
    estimatedReadingTime: 12345,
    mainImage: {
      asset: {
        _ref: '234',
        metadata: {
          lqid: '4343211',
        },
      },
    },
    categories: [
      {
        name: 'Category 2',
        description: 'Description for category 2',
      },
      {
        name: 'Category 3',
        description: 'Description for category 3',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
];
describe('<PostList/>', () => {
  const useAppContextSpy = jest.spyOn(AppContext, 'useAppContext');
  const setData = jest.fn();

  jest.spyOn(useSanityImageHook, 'default').mockReturnValue({
    loader: undefined as unknown as ImageLoader,
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  });

  let onLoadedMock: (results: Post[], lastId: string | null) => void;

  const useEndlessScrollingHookSpy = jest.spyOn(
    useEndlessScrollingHook,
    'default',
  );

  beforeEach(() => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: mockPosts, lastId: '' },
      },
      setData,
    });

    useEndlessScrollingHookSpy.mockImplementation(({ onLoaded }) => {
      onLoadedMock = onLoaded;
      return {
        hasMore: false,
        loading: false,
        fetchNextPage: jest.fn(),
        error: null,
      };
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
      },
      setData,
    });
    await act(() => {
      render(<PostList />);
    });

    expect(screen.getByText('post.no_posts_available')).toBeInTheDocument();
  });

  it('calls setData of app context, when endless scrolling loaded next page', async () => {
    await act(() => {
      render(<PostList />);
    });

    onLoadedMock?.(mockPosts, null);

    expect(setData).toHaveBeenCalledTimes(1);
  });
});
