import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { Post } from 'types/post';
import client from 'utils/sanity';
import { routerConfig } from '__mocks__/next/router';
import * as AppContext from 'contexts/app-context';
import { initialState } from 'contexts/app-context';
import { NextRouter, useRouter } from 'next/router';

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

jest.mock('utils/sanity', () => ({
  fetch: jest.fn(),
}));

jest.mock('contexts/app-context', () => {
  const originalAppContext = jest.requireActual('contexts/app-context');
  return {
    ...originalAppContext,
    useAppContext: jest.fn(),
  };
});

describe('useEndlessScrolling', () => {
  const props: UseEndlessScrollingProps<Post[]> = {
    sortField: 'id',
    documentQuery: '_type == "post"',
    lastId: '',
    contextKey: 'post',
  };

  const useAppContextSpy = jest.spyOn(AppContext, 'useAppContext');
  const setData = jest.fn();
  const fetchSpy = jest.spyOn(client, 'fetch');
  const onLoadedMock = jest.fn();

  beforeEach(() => {
    fetchSpy.mockResolvedValue([]);


    useAppContextSpy.mockReturnValue({ data: initialState, setData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('fetches the next page on mount', async () => {
    await act(async () => {
      await renderHook(() => useEndlessScrolling(props));
    });

    expect(setData).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
  });

  it('fetches the next page', async () => {
    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook(() => useEndlessScrolling(props));
    });

    await act(async () => {
      await render?.result.current.fetchNextPage();
    });

    expect(setData).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenLastCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
    expect(render?.result.current.error).toBeNull();
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page with last id of previous results', async () => {
    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook(() =>
        useEndlessScrolling({
          ...props,
          limit: 1,
          lastId: '123',
        }),
      );
    });

    await act(async () => {
      await render.result.current.fetchNextPage();
    });

    expect(setData).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 0,
      lang: routerConfig.locale,
      [props.sortField]: '123',
    });
  });

  it('sets last id to null, when less then limit elements returned', async () => {
    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook(() =>
        useEndlessScrolling({
          ...props,
          lastId: '123',
        }),
      );
    });

    expect(setData).toHaveBeenCalledTimes(1);
  });

  it('fetches the next page and sets error, when error (string) occurs', async () => {
    fetchSpy.mockRejectedValue('My error');

    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook(() =>
        useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
      );
    });

    expect(onLoadedMock).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
    expect(render?.result.current.error).toBe('My error');
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page and sets error, when error (object) occurs', async () => {
    fetchSpy.mockRejectedValue({ message: 'My error' });
    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook(() =>
        useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
      );
    });

    expect(onLoadedMock).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
    expect(render?.result.current.error).toBe('My error');
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page, when language changed and lastId is empty string', async () => {
    let render: RenderHookResult<
      {
        loading: boolean;
        error: string | null;
        hasMore: boolean;
        fetchNextPage: () => Promise<void>;
      },
      UseEndlessScrollingProps<Post[]>
    >;
    await act(async () => {
      render = await renderHook((props) => useEndlessScrolling(props), {
        initialProps: props,
      });
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(setData).toHaveBeenCalledTimes(1);
    mockUseRouter.mockReturnValue({ ...routerConfig, locale: 'de' });

    await act(async () => {
      await render?.rerender({ ...props });
    });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(setData).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenLastCalledWith(expect.anything(), {
      limit: 9,
      lang: 'de',
      [props.sortField]: '',
    });
    expect(render?.result.current.error).toBeNull();
    expect(render?.result.current.loading).toBeFalsy();
  });
});
