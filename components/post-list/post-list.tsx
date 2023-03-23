import type { Post } from 'types/post';
import { useTranslations } from 'use-intl';
import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
  postPaginatedLimit,
} from 'constants/groq';
import { useAppContext } from 'contexts/app-context';
import useEndlessScrolling, {
  IdCheckOperator,
} from 'hooks/useEndlessScrolling';
import React, { useCallback } from 'react';
import { EndlessLoadingItem, Loader, PostListItem } from 'components';

const PostList = () => {
  const { data, setData } = useAppContext();
  const {
    post: { entries, lastId },
  } = data;

  const handleOnLoaded = useCallback(
    (results: Post[], lastId: string | null) =>
      setData((prevData) => ({
        ...prevData,
        post: {
          ...prevData.post,
          lastId,
          entries: [...prevData.post.entries, ...results],
        },
      })),
    [setData],
  );

  const { hasMore, fetchNextPage, loading } = useEndlessScrolling<Post[]>({
    idField: '_createdAt',
    documentQuery: paginatedPostDocumentQuery,
    orderQuery: paginatedPostOrderQuery,
    fields: postListFields,
    limit: postPaginatedLimit,
    onLoaded: handleOnLoaded,
    lastId,
    checkOperator: IdCheckOperator.LowerThen,
  });

  const t = useTranslations('post');
  if (!hasMore && entries.length === 0) {
    return <>{t('no_posts_available')}</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((post, index) => (
          <EndlessLoadingItem
            key={post._id}
            enabled={index === entries.length - 1}
            onLoad={fetchNextPage}
          >
            <PostListItem post={post} />
          </EndlessLoadingItem>
        ))}
      </div>
      {loading && <Loader className="mt-6" />}
    </>
  );
};

export default PostList;
