import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { Post } from 'types/post';
import client from 'utils/sanity';
import { routerConfig } from '__mocks__/next/router';

jest.mock('utils/sanity', () => ({
  fetch: jest.fn(),
}));

describe('useEndlessScrolling', () => {
  const props: UseEndlessScrollingProps<Post[]> = {
    idField: 'id',
    documentQuery: '_type == "post"',
    onLoaded: jest.fn(),
    lastId: '',
  };

  const fetchSpy = jest.spyOn(client, 'fetch');
  const onLoadedMock = jest.fn();

  beforeEach(() => {
    fetchSpy.mockResolvedValue([]);

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('fetches the next page on mount', async () => {
    await act(async () => {
      await renderHook(() =>
        useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
      );
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(1);
    expect(onLoadedMock).toHaveBeenCalledWith([], null);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
  });

  it('fetches the next page', async () => {
    let render: RenderHookResult<{ loading: boolean; error: string | null; hasMore: boolean; fetchNextPage: () => Promise<void>; }, UseEndlessScrollingProps<Post[]>>;
    await act(async () => {
      render = await renderHook(() =>
        useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
      );
    });

    await act(async () => {
      await render?.result.current.fetchNextPage();
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(2);
    expect(onLoadedMock).toHaveBeenLastCalledWith([], null);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenLastCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
    expect(render?.result.current.error).toBeNull();
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page with last id of previous results', async () => {
    let render: RenderHookResult<{ loading: boolean; error: string | null; hasMore: boolean; fetchNextPage: () => Promise<void>; }, UseEndlessScrollingProps<Post[]>>;
    await act(async () => {
      render = await renderHook(() =>
          useEndlessScrolling({ ...props, onLoaded: onLoadedMock, limit: 1, lastId: '123' }),
      );
    });

    await act(async () => {
      await render.result.current.fetchNextPage();
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 0,
      lang: routerConfig.locale,
      [props.idField]: '123',
    });
  });

  it('sets last id to null, when less then limit elements returned', async () => {
    let render: RenderHookResult<{ loading: boolean; error: string | null; hasMore: boolean; fetchNextPage: () => Promise<void>; }, UseEndlessScrollingProps<Post[]>>;
    await act(async () => {
      render = await renderHook(() =>
          useEndlessScrolling({ ...props, onLoaded: onLoadedMock, lastId: '123' }),
      );
    });

    expect(onLoadedMock).toHaveBeenLastCalledWith([], null)
  });

  it('fetches the next page and sets error, when error (string) occurs', async () => {
    fetchSpy.mockRejectedValue('My error');

    let render: RenderHookResult<{ loading: boolean; error: string | null; hasMore: boolean; fetchNextPage: () => Promise<void>; }, UseEndlessScrollingProps<Post[]>>;
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
      [props.idField]: '',
    });
    expect(render?.result.current.error).toBe('My error');
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page and sets error, when error (object) occurs', async () => {
    fetchSpy.mockRejectedValue({ message: 'My error' });
    let render: RenderHookResult<{ loading: boolean; error: string | null; hasMore: boolean; fetchNextPage: () => Promise<void>; }, UseEndlessScrollingProps<Post[]>>;
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
      [props.idField]: '',
    });
    expect(render?.result.current.error).toBe('My error');
    expect(render?.result.current.loading).toBeFalsy();
  });
});
