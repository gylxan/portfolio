import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Post } from 'types/post';
import client from 'utils/sanity';
import { routerConfig } from '__mocks__/next/router';
import * as AppContext from 'contexts/app-context';
import { initialState } from 'contexts/app-context';
import { useRouter } from 'next/router';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('next/router');
const mockUseRouter = vi.mocked(useRouter);

vi.mock('utils/sanity', () => ({
  default: {
    fetch: vi.fn(),
  },
}));

vi.mock('contexts/app-context', async (actualImport) => {
  return {
    ...(await actualImport()),
    useAppContext: vi.fn(),
  };
});

describe('useEndlessScrolling', () => {
  const props: UseEndlessScrollingProps<Post[]> = {
    sortField: 'id',
    documentQuery: '_type == "post"',
    lastId: '',
    contextKey: 'post',
  };

  const useAppContextSpy = vi.spyOn(AppContext, 'useAppContext');
  const setData = vi.fn();
  const fetchSpy = vi.spyOn(client, 'fetch');
  const onLoadedMock = vi.fn();

  beforeEach(() => {
    fetchSpy.mockResolvedValue({ ms: 123, result: [] } as Awaited<
      ReturnType<typeof client.fetch>
    >);

    useAppContextSpy.mockReturnValue({ data: initialState, setData });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('fetches the next page on mount', async () => {
    renderHook(() => useEndlessScrolling(props));

    await waitFor(() => {
      expect(setData).toHaveBeenCalledTimes(1);
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
  });

  it('fetches the next page', async () => {
    const render = renderHook(() => useEndlessScrolling(props));

    await waitFor(() => {
      expect(setData).toHaveBeenCalledTimes(1);
    });
    await act(async () => {
      await render.result.current.fetchNextPage();
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
    const render = renderHook(() =>
      useEndlessScrolling({
        ...props,
        limit: 1,
        lastId: '123',
      }),
    );

    await waitFor(() => {
      expect(setData).toHaveBeenCalledTimes(1);
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
    renderHook(() =>
      useEndlessScrolling({
        ...props,
        lastId: '123',
      }),
    );

    await waitFor(() => {
      expect(setData).toHaveBeenCalledTimes(1);
    });
  });

  it('fetches the next page and sets error, when error (string) occurs', async () => {
    fetchSpy.mockRejectedValue('My error');

    const render = renderHook(() => useEndlessScrolling({ ...props }));

    expect(onLoadedMock).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
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
    const render = renderHook(() => useEndlessScrolling({ ...props }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.sortField]: '',
    });
    expect(render?.result.current.error).toBe('My error');
    expect(render?.result.current.loading).toBeFalsy();
  });

  it('fetches the next page, when language changed and lastId is empty string', async () => {
    const render = renderHook((props) => useEndlessScrolling(props), {
      initialProps: props,
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    expect(setData).toHaveBeenCalledTimes(1);
    mockUseRouter.mockReturnValue({ ...routerConfig, locale: 'de' });

    render?.rerender({ ...props });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
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
