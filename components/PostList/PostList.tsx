import type { Post } from 'types/post';
import { PostListItem } from 'components';

interface PostListProps {
  posts: Post[];
}
const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
