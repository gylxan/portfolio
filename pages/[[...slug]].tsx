import { DocumentCreator, Layout, Title } from 'components';
import type { GetStaticProps } from 'next';
import client from 'utils/sanity';
import { configQuery, pathPageQuery, singlePageQuery } from 'constants/groq';
import type { SiteConfig } from 'types/siteConfig';
import type { Page as IPage } from 'types/page';

interface PageProps {
  siteConfig: SiteConfig;
  data: IPage;
}

const Page = ({ siteConfig, data }: PageProps) => {
  const { title, pageTitle, content, slug, ogDescription } = data;

  return (
    <Layout
      siteConfig={siteConfig}
      title={title}
      description={ogDescription}
      // openGraphImage={mainImage}
      slug={slug.current}
    >
      {(pageTitle || title) && (
        <Title className="mb-8">{!!pageTitle ? pageTitle : title}</Title>
      )}
      <div className="container">
        {content.map((contentBlock) => (
          <DocumentCreator key={contentBlock._key} {...contentBlock} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const allPages = await client.fetch<IPage[] | null>(pathPageQuery);

  return {
    paths: allPages?.map((page) => ({
      params: {
        slug: page.slug.current === '/' ? [] : page.slug.current.split('/'),
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);
  const data = await client.fetch(singlePageQuery, {
    slug: !params?.slug ? '/' : (params?.slug as string[])?.join('/'),
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      siteConfig,
      data,
    },
    revalidate: 60,
  };
};

export default Page;
