import type { Post } from 'types/post';
import PostListItem from 'components/post-list-item/post-list-item';
import { useTranslations } from 'use-intl';
import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
  postPaginatedLimit,
} from 'constants/groq';
import { useAppContext } from 'components/app-context/app-context';
import useEndlessScrolling from 'hooks/useEndlessScrolling';
import React, { useCallback } from 'react';
import { EndlessLoadingItem } from 'components/endless-loading-item/endless-loading-item';

const PostList = () => {
  const { data, setData } = useAppContext();
  const { posts } = data;

  const handleOnLoaded = useCallback(
    (results: Post[]) =>
      setData((prevData) => ({
        ...prevData,
        posts: [...prevData.posts, ...results],
      })),
    [setData],
  );

  const { hasMore, fetchNextPage } = useEndlessScrolling({
    idField: '_createdAt',
    documentQuery: paginatedPostDocumentQuery,
    orderQuery: paginatedPostOrderQuery,
    fields: postListFields,
    limit: postPaginatedLimit,
    onLoaded: handleOnLoaded,
  });

  const t = useTranslations('post');
  if (!hasMore && posts.length === 0) {
    return <>{t('no_posts_available')}</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <EndlessLoadingItem
            key={post._id}
            enabled={index === posts.length - 1}
            onLoad={fetchNextPage}
          >
            <PostListItem post={post} />
          </EndlessLoadingItem>
        ))}
      </div>
    </>
  );
};

export default PostList;
