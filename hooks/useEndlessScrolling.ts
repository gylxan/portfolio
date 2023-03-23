import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import client from 'utils/sanity';
import { groq } from 'next-sanity';

export enum IdCheckOperator {
  LowerThen = '<',
  GreaterThen = '>',
}
export interface UseEndlessScrollingProps<T> {
  idField: string;
  lastId: string | null;
  limit?: number;
  documentQuery: string;
  orderQuery?: string;
  fields?: string;
  checkOperator?: IdCheckOperator;
  onLoaded: (results: T, lastId: string | null) => void;
}
const useEndlessScrolling = <T extends object>({
  limit = 10,
  lastId,
  idField,
  documentQuery,
  orderQuery,
  fields = '...',
  checkOperator = IdCheckOperator.GreaterThen,
  onLoaded,
}: UseEndlessScrollingProps<T>) => {
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

      const results = await client.fetch(
        groq`
      *[${documentQuery}${
          !!lastId ? ` && ${idField} ${checkOperator} $${idField}` : ''
        }]${orderQuery ? ` | ${orderQuery}` : ''} [0..$limit] {
      ${fields}
      }`,
        {
          limit: limit - 1,
          lang: locale,
          [idField]: lastId,
        },
      );

      onLoaded(
        results,
        results.length === limit
          ? results[results.length - 1]?.[idField] ?? null
          : null,
      );
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
    lastId,
    checkOperator,
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
    hasMore: lastId !== null,
    fetchNextPage,
  };
};

export default useEndlessScrolling;
