import { DocumentCreator, Layout, Title } from 'components';
import type { GetStaticProps } from 'next';
import client from 'utils/sanity';
import { configQuery, pathPageQuery, singlePageQuery } from 'constants/groq';
import type { SiteConfig } from 'types/siteConfig';
import type { Page as IPage } from 'types/page';
import { getUrl } from 'utils/url';
import { restructureTranslations } from 'utils/i18n';
import {useRouter} from "next/router";

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
      <div className="container mx-auto">
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

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery, {
    lang: locale,
  });

  const currentUrl = getUrl(
    locale ?? (process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as string),
    (params?.slug ?? []) as string[],
  );

  const data = await client.fetch<IPage>(singlePageQuery, {
    slug: currentUrl,
    lang: locale,
  });

  if (!siteConfig || !data || !data.enabled) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      siteConfig,
      data,
      translations: restructureTranslations(siteConfig.translations),
    },
    revalidate: 60,
  };
};

export default Page;
