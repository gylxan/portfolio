import { useInView } from 'react-intersection-observer';
import Loader from 'components/loader/loader';

export interface NextPageLoaderProps {
  isLoading: boolean;
  hasMore: boolean;
  error?: null | string;
  onFetchNextPage: () => void;
}
const NextPageLoader = ({
  isLoading,
  hasMore,
  error,
  onFetchNextPage,
}: NextPageLoaderProps) => {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasMore && !isLoading && !error) {
        onFetchNextPage();
      }
    },
  });

  return (
    <div ref={ref} className="py-4" data-testid="next-page-loader">
      {isLoading && <Loader />}
      {!!error && error}
    </div>
  );
};

export default NextPageLoader;
