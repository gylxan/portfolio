import { useState } from 'react';
import { useRouter } from 'next/router';
import client from 'utils/sanity';
import { groq } from 'next-sanity';

interface UseEndlessScrollingProps<T> {
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
  const [state, setState] = useState<{
    loading: boolean;
    error: null | string;
  }>({
    loading: false,
    error: null,
  });
  const { locale } = useRouter();
  const { error, loading } = state;

  const fetchNextPage = async () => {
    if (lastId === null) {
      return;
    }

    try {
      setState({ ...state, error: null, loading: true });

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
      console.log(error);
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
  };

  return {
    loading,
    error,
    lastId,
    hasMore: lastId !== null,
    fetchNextPage,
  };
};

export default useEndlessScrolling;
