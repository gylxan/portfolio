import { Title, Page, PostList } from '../components';
import type { GetStaticProps } from 'next';
import client from '../utils/sanity';
import { allPostQuery } from '../constants/groq';
import type { Post } from '../types/post';

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Page title="Blog">
      <Title>Blog</Title>
      <div className="container mt-8">
        {posts.length > 0 ? (
          <>
            <span className="mb-4 flex justify-end">
              {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
            </span>
            <PostList posts={posts} />
          </>
        ) : (
          'Sadly, there are no posts yet :('
        )}
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await client.fetch(allPostQuery);

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

export default Blog;
