import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import client from 'utils/sanity';
import { Post as IPost } from 'types/post';
import { pathPostQuery } from 'constants/groq';
import { getLanguageUrlPrefix } from 'utils/url';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await client.fetch<IPost[] | null>(pathPostQuery);

  return getServerSideSitemapLegacy(
    ctx,
    posts?.map(({ slug, language }) => ({
      loc: `${process.env.NEXT_PUBLIC_URL}${getLanguageUrlPrefix(
        language,
      )}/post/${slug.current}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    })) || [],
  );
};

export default function Sitemap() {
  return null;
}
