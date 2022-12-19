import { Layout, PostList, Title } from 'components';
import type { GetStaticProps } from 'next';
import client from 'utils/sanity';
import { allPostQuery, configQuery } from 'constants/groq';
import type { Post } from 'types/post';
import type { SiteConfig } from 'types/siteConfig';

interface BlogProps {
  siteConfig: SiteConfig;
  posts: Post[];
}

const Blog = ({ posts, siteConfig }: BlogProps) => {
  return (
    <Layout title="Blog" siteConfig={siteConfig}>
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);
  const posts = await client.fetch(allPostQuery);

  return {
    props: {
      posts,
      siteConfig,
    },
    revalidate: 60,
  };
};

export default Blog;
