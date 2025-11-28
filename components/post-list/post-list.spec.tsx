import { render, screen } from '@testing-library/react';
import { PostList } from 'components';
import * as useSanityImageHook from 'hooks/useSanityImage';
import * as useEndlessScrollingHook from 'hooks/useEndlessScrolling';
import type { ImageLoader } from 'next/image';
import * as AppContext from 'contexts/app-context';
import { mockPosts } from 'constants/mock';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('hooks/useEndlessScrolling');
vi.mock('next-sanity');
vi.mock('use-intl');
vi.mock('next/router');

vi.mock('contexts/app-context', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useAppContext: vi.fn(),
  };
});

vi.mock('react-intersection-observer', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useInView: vi.fn().mockReturnValue({
      ref: vi.fn(),
      inView: false,
    }),
  };
});

describe('<PostList/>', () => {
  const useAppContextSpy = vi.spyOn(AppContext, 'useAppContext');
  const setData = vi.fn();

  vi.spyOn(useSanityImageHook, 'default').mockReturnValue({
    loader: undefined as unknown as ImageLoader,
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  });

  const useEndlessScrollingHookSpy = vi.spyOn(
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
      fetchNextPage: vi.fn(),
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render', async () => {
    render(<PostList />);

    expect(await screen.findAllByRole('link')).toHaveLength(mockPosts.length);
  });

  it('should render a message, when there are no posts', async () => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: [], lastId: '' },
        project: { entries: [], lastId: '' },
      },
      setData,
    });
    render(<PostList />);

    expect(
      await screen.findByText('post.no_posts_available'),
    ).toBeInTheDocument();
  });
});
