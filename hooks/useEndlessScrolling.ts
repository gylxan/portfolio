import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import client from 'utils/sanity';
import { groq } from 'next-sanity';

export interface UseEndlessScrollingProps<T> {
  idField: string;
  limit?: number;
  documentQuery: string;
  orderQuery?: string;
  fields?: string;
  onLoaded: (results: T) => void;
}
const useEndlessScrolling = <T extends object>({
  limit = 10,
  idField,
  documentQuery,
  orderQuery,
  fields = '...',
  onLoaded,
}: UseEndlessScrollingProps<T>) => {
  const [lastId, setLastId] = useState<null | string>('');
  const isInitialLoaded = useRef(false);
  const [state, setState] = useState<{
    loading: boolean;
    error: null | string;
  }>({
    loading: false,
    error: null,
  });
  const { locale } = useRouter();
  const { error, loading } = state;

  const fetchNextPage = useCallback(async () => {
    if (lastId === null) {
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, error: null, loading: true }));
      console.log('endless scrolling load with last id', documentQuery,
          fields,
          idField,
          limit,
          locale,
          onLoaded,
          orderQuery, lastId);

      const results = await client.fetch(
        groq`
      *[${documentQuery}${!!lastId ? ` && ${idField} < $${idField}` : ''}]${
          orderQuery ? ` | ${orderQuery}` : ''
        } [0..$limit] {
      ${fields}
      }`,
        {
          limit: limit - 1,
          lang: locale,
          [idField]: lastId,
        },
      );

      setLastId(
        results.length === limit
          ? results[results.length - 1]?.[idField] ?? null
          : null,
      );
      onLoaded(results);
    } catch (error) {
      if (typeof error === 'string') {
        setState((prevState) => ({ ...prevState, error: error as string }));
      } else if ((error as Error).message) {
        setState((prevState) => ({
          ...prevState,
          error: (error as Error).message,
        }));
      }
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [
    documentQuery,
    fields,
    idField,
    limit,
    locale,
    onLoaded,
    orderQuery,
    lastId
  ]);

  useEffect(() => {
    if (isInitialLoaded.current) {
      return;
    }
    fetchNextPage();
    isInitialLoaded.current = true;
  }, [fetchNextPage]);

  return {
    loading,
    error,
    lastId,
    hasMore: lastId !== null,
    fetchNextPage,
  };
};

export default useEndlessScrolling;
