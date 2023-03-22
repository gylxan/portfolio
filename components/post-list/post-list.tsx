import type { Post } from 'types/post';
import PostListItem from 'components/post-list-item/post-list-item';
import { useTranslations } from 'use-intl';
import NextPageLoader from 'components/next-page-loader/next-page-loader';
import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
  postPaginatedLimit,
} from 'constants/groq';
import { useAppContext } from 'components/app-context/app-context';
import useEndlessScrolling from 'hooks/useEndlessScrolling';

const PostList = () => {
  const { data, setData } = useAppContext();
  const { posts } = data;
  const { hasMore, error, loading, fetchNextPage } = useEndlessScrolling({
    idField: '_createdAt',
    documentQuery: paginatedPostDocumentQuery,
    orderQuery: paginatedPostOrderQuery,
    fields: postListFields,
    limit: postPaginatedLimit,
    onLoaded: (results: Post[]) =>
      setData({ ...data, posts: [...posts, ...results] }),
  });

  const t = useTranslations('post');
  if (!hasMore && posts.length === 0) {
    return <>{t('no_posts_available')}</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <NextPageLoader
        hasMore={hasMore}
        isLoading={loading}
        error={error}
        onFetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default PostList;
