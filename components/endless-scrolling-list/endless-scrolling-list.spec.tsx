import { act, render, screen } from '@testing-library/react';
import * as useSanityImageHook from 'hooks/useSanityImage';
import * as useEndlessScrollingHook from 'hooks/useEndlessScrolling';
import EndlessScrollingList from 'components/endless-scrolling-list/endless-scrolling-list';
import type { ImageLoader } from 'next/image';
import * as AppContext from 'contexts/app-context';
import { mockPosts } from 'constants/mock';
import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
} from 'constants/groq';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import PostListItem from '../post-list-item/post-list-item';

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

describe('<EndlessScrollingList />', () => {
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

  const skeleton = () => <div data-testid="skeleton">Skeleton</div>;

  const props = {
    idField: '_id',
    fields: postListFields,
    orderQuery: paginatedPostOrderQuery,
    documentQuery: paginatedPostDocumentQuery,
    contextKey: 'post',
    sortField: '_createdAt',
    limit: 6,
    noEntryAvailableTranslationKey: 'no_post_available',
    component: PostListItem,
    skeleton,
  } as const;

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
    await act(() => {
      render(<EndlessScrollingList {...props} />);
    });

    expect(screen.getAllByRole('link')).toHaveLength(mockPosts.length);
    expect(screen.queryAllByTestId('skeleton')).toHaveLength(0);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render skeletons, when there are no entries yet, has more and is loading', async () => {
    useEndlessScrollingHookSpy.mockReturnValue({
      hasMore: true,
      loading: true,
      fetchNextPage: vi.fn(),
      error: null,
    });
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: [], lastId: '' },
        project: { entries: [], lastId: '' },
      },
      setData,
    });
    const limit = 7;
    await act(() => {
      render(<EndlessScrollingList {...props} limit={limit} />);
    });

    expect(screen.getAllByTestId('skeleton')).toHaveLength(limit);
  });

  it('should render a message, when there are no entries available', async () => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: [], lastId: '' },
        project: { entries: [], lastId: '' },
      },
      setData,
    });
    await act(() => {
      render(<EndlessScrollingList {...props} />);
    });

    expect(
      screen.getByText(
        `${props.contextKey}.${props.noEntryAvailableTranslationKey}`,
      ),
    ).toBeInTheDocument();
  });

  it('should render Loader, when there are entries and is loading', async () => {
    useEndlessScrollingHookSpy.mockReturnValue({
      hasMore: true,
      loading: true,
      fetchNextPage: vi.fn(),
      error: null,
    });

    await act(() => {
      render(<EndlessScrollingList {...props} />);
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
