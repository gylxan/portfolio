import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import client from 'utils/sanity';
import { Post as IPost } from 'types/post';
import { pathPostQuery } from 'constants/groq';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await client.fetch<IPost[] | null>(pathPostQuery);

  return getServerSideSitemap(
    ctx,
    posts?.map(({ slug }) => ({
      loc: `${process.env.NEXT_PUBLIC_URL}/posts/${slug.current}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7
    })) || [],
  );
};

export default function Sitemap() {
  return null;
}
