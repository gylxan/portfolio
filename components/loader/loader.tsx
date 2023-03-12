import {useInView} from 'react-intersection-observer';
import {useEffect, useState} from 'react';
import Spinner from 'components/spinner/spinner';
import {groq} from 'next-sanity';
import client from 'utils/sanity';

interface LoaderProps {
  limit?: number;
}
const Loader = ({ limit = 10 }: LoaderProps) => {
  const { ref, inView } = useInView({ delay: 300 });
  const [loading, setLoading] = useState(false);
  const [lastCreatedAt, setLastCreatedAt] = useState<null | string>('');

  async function fetchNextPage() {
    // We already reached the end.
    if (lastCreatedAt === null) {
      return;
    }
    try {
      setLoading(true);
      const { result } = await client.fetch(
        groq`*[_type == "post"] | order(_createdAt desc) [0...$limit] {
                ...,
                categories[]->,
                "mainImage": mainImage {
                    asset->{
                        ...,
                        metadata
                    }
                }
        }`,
        { lastCreatedAt, limit },
      );
      setLastCreatedAt(
        result.length > 0 ? result[result.length - 1]._createdAt : null,
      );
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (inView && !loading) {
      fetchNextPage();
    }
  }, [inView, loading, fetchNextPage]);
  return <div ref={ref}>{loading && <Spinner />}</div>;
};

export default Loader;
