import { useInView } from 'react-intersection-observer';
import Loader from 'components/loader/loader';
import { useEffect, useState } from 'react';

export interface NextPageLoaderProps {
  hasMore: boolean;
  isLoading: boolean;
  error?: null | string;
  onFetchNextPage: () => Promise<void>;
}
const NextPageLoader = ({
  hasMore,
  isLoading,
  error,
  onFetchNextPage,
}: NextPageLoaderProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !isLoading && !error) {
      onFetchNextPage();
    }
  }, [inView, hasMore, isLoading, error, onFetchNextPage]);

  return (
    <div ref={ref} className="py-4" data-testid="next-page-loader">
      {isLoading && <Loader />}
      {!!error && error}
    </div>
  );
};

export default NextPageLoader;
