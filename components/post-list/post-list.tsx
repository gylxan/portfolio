import {
  paginatedPostDocumentQuery,
  paginatedPostOrderQuery,
  postListFields,
  postPaginatedLimit,
} from 'constants/groq';
import React from 'react';
import { EndlessLoadingList, PostListItem, PostListItemSkeleton } from 'components';

const PostList = () => {
  return (
    <EndlessLoadingList
      className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3"
      contextKey="post"
      idField="_id"
      noEntryAvailableTranslationKey="no_posts_available"
      component={PostListItem}
      skeleton={PostListItemSkeleton}
      sortField="_createdAt"
      documentQuery={paginatedPostDocumentQuery}
      orderQuery={paginatedPostOrderQuery}
      fields={postListFields}
      limit={postPaginatedLimit}
    />
  );
};

export default PostList;
