import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { act, renderHook } from '@testing-library/react';
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

  it('fetches the next page', async () => {
    const { result } = renderHook(() =>
      useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(1);
    expect(onLoadedMock).toHaveBeenCalledWith([]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('fetches the next page with last id of previous results', async () => {
    fetchSpy.mockResolvedValue([{ id: '123' }]);
    const { result } = renderHook(() =>
      useEndlessScrolling({ ...props, onLoaded: onLoadedMock, limit: 1 }),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 0,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBeFalsy();

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(onLoadedMock).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenNthCalledWith(2, expect.anything(), {
      limit: 0,
      lang: routerConfig.locale,
      [props.idField]: '123',
    });
  });

  it('sets last id to null, when less then limit elements returned', async () => {
    fetchSpy.mockResolvedValue([{ id: '123' }]);
    const { result } = renderHook(() =>
      useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(result.current.lastId).toBeNull();
  });

  it('fetches the next page and sets error, when error (string) occurs', async () => {
    fetchSpy.mockRejectedValue('My error');

    const { result } = renderHook(() =>
      useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(onLoadedMock).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
    expect(result.current.error).toBe('My error');
    expect(result.current.loading).toBeFalsy();
  });

  it('fetches the next page and sets error, when error (object) occurs', async () => {
    fetchSpy.mockRejectedValue({ message: 'My error' });
    const { result } = renderHook(() =>
      useEndlessScrolling({ ...props, onLoaded: onLoadedMock }),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(onLoadedMock).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.anything(), {
      limit: 9,
      lang: routerConfig.locale,
      [props.idField]: '',
    });
    expect(result.current.error).toBe('My error');
    expect(result.current.loading).toBeFalsy();
  });
});
