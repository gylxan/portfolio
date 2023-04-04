import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import client from 'utils/sanity';
import { groq } from 'next-sanity';
import { AppState, useAppContext } from 'contexts/app-context';

export enum IdCheckOperator {
  LowerThen = '<',
  // GreaterThen = '>',
}
export interface UseEndlessScrollingProps<T> {
  sortField: string;
  lastId: string | null;
  limit?: number;
  documentQuery: string;
  orderQuery?: string;
  fields?: string;
  checkOperator?: IdCheckOperator;
  contextKey: keyof AppState;
}
const useEndlessScrolling = <T extends object>({
  limit = 10,
  lastId,
  sortField,
  documentQuery,
  orderQuery,
  fields = '...',
  checkOperator = IdCheckOperator.LowerThen,
  contextKey,
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
  const previousLocale = useRef(locale);
  const { setData } = useAppContext();

  const handleOnLoaded = useCallback(
    (results: T[], lastId: string | null) =>
      setData((prevData) => ({
        ...prevData,
        [contextKey]: {
          ...prevData[contextKey],
          lastId,
          entries: [...prevData[contextKey].entries, ...results],
        },
      })),
    [setData, contextKey],
  );

  const fetchNextPage = useCallback(async () => {
    if (lastId === null) {
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, error: null, loading: true }));

      const results = await client.fetch(
        groq`
      *[${documentQuery}${
          !!lastId ? ` && ${sortField} ${checkOperator} $${sortField}` : ''
        }]${orderQuery ? ` | ${orderQuery}` : ''} [0..$limit] {
      ${fields}
      }`,
        {
          limit: limit - 1,
          lang: locale,
          [sortField]: lastId,
        },
      );

      handleOnLoaded(
        results,
        results.length === limit
          ? results[results.length - 1]?.[sortField] ?? null
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
  }, [lastId, documentQuery, sortField, checkOperator, orderQuery, fields, limit, locale, handleOnLoaded]);

  useEffect(() => {
    // When there was no initial load yet, or we change the language and lastId has been reset, load new page
    if (
      !isInitialLoaded.current ||
      (previousLocale.current !== locale && lastId === '')
    ) {
      fetchNextPage();
    }
    isInitialLoaded.current = true;
  }, [fetchNextPage, lastId, loading, locale]);

  useEffect(() => {
    previousLocale.current = locale;
  }, [locale]);

  return {
    loading,
    error,
    hasMore: lastId !== null,
    fetchNextPage,
  };
};

export default useEndlessScrolling;
