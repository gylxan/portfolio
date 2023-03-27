import type { Post } from 'types/post';
import { act, render, screen } from '@testing-library/react';
import { EndlessLoadingList, PostListItem } from 'components';
import * as useSanityImageHook from 'hooks/useSanityImage';
import * as useEndlessScrollingHook from 'hooks/useEndlessScrolling';
import type { ImageLoader } from 'next/image';
import * as AppContext from 'contexts/app-context';
import { mockPosts } from 'constants/mock';
import { EndlessLoadingListProps } from 'components/endless-loading-list/endless-loading-list';
import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
} from 'constants/groq';

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

describe('<EndlessLoadingList/>', () => {
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

  const props: EndlessLoadingListProps<Post> = {
    idField: '_id',
    fields: postListFields,
    orderQuery: paginatedPostOrderQuery,
    documentQuery: paginatedPostDocumentQuery,
    contextKey: 'post',
    sortField: '_createdAt',
    limit: 6,
    noEntryAvailableTranslationKey: 'no_post_available',
    component: PostListItem,
  };

  beforeEach(() => {
    useAppContextSpy.mockReturnValue({
      data: {
        post: { entries: mockPosts, lastId: '' },
        project: { entries: [], lastId: '' },
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
      render(<EndlessLoadingList {...props} />);
    });

    expect(screen.getAllByRole('link')).toHaveLength(mockPosts.length);
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
      render(<EndlessLoadingList {...props} />);
    });

    expect(
      screen.getByText(
        `${props.contextKey}.${props.noEntryAvailableTranslationKey}`,
      ),
    ).toBeInTheDocument();
  });

  it('calls setData of app context, when endless scrolling loaded next page', async () => {
    await act(() => {
      render(<EndlessLoadingList {...props} />);
    });

    onLoadedMock?.(mockPosts, null);

    expect(setData).toHaveBeenCalledTimes(1);
  });
});
