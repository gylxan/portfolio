import { AnimatedTitle, Page, PostList } from '../components';
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
      <AnimatedTitle title="Blog" />
      <div className="container mt-8">
        <span className="mb-4 flex justify-end">{posts.length} Posts</span>
        <PostList posts={posts} />
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
  };
};

export default Blog;
