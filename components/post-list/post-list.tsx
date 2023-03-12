import type { Post } from 'types/post';
import PostListItem from 'components/post-list-item/post-list-item';
import { useTranslations } from 'use-intl';
import Loader from 'components/loader/loader';

export interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const t = useTranslations('post');
  if (posts.length === 0) {
    return <>{t('no_posts_available')}</>;
  }
  return (
    <>
      <span className="mb-4 flex justify-end">
        {t('amount', { count: posts.length })}
      </span>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <Loader limit={1} />
    </>
  );
};

export default PostList;
