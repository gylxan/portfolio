import type { GetStaticProps } from 'next';
import { Layout, Link } from 'components';
import client, { getSanitizedSiteConfig } from 'utils/sanity';
import type { SanitySiteConfig, SiteConfig } from 'types/siteConfig';
import { configQuery } from 'constants/groq';
import { useTranslations } from 'use-intl';
import clsx from 'clsx';

interface FourOhFourProps {
  siteConfig: SiteConfig;
}

const FourOhFour = ({ siteConfig }: FourOhFourProps) => {
  const t = useTranslations('four_oh_four');
  return (
    <Layout fullHeight title="404" siteConfig={siteConfig}>
      <div className="container flex flex-col items-center gap-4">
        <h1
          className={clsx(
            'font-extrabold animate-glitch text-8xl -leading-[7px]',
            'before:content-[attr(title)] before:absolute before:left-0 before:animate-glitch-top before:[clip-path:polygon(0_0,100%_0,100%_33%,0_33%)]',
            'after:content-[attr(title)] after:absolute after:left-0 after:animate-glitch-bottom after:[clip-path:polygon(0_67%,100%_67%,100%_100%,0_100%)]',
          )}
          title="404"
        >
          404
        </h1>
        <h2>{t('wrong_place')}</h2>
        <Link href="/">{t('back_to_home')}</Link>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<FourOhFourProps> = async ({
  locale,
}) => {
  const siteConfig = await client.fetch<SanitySiteConfig>(configQuery, {
    lang: locale,
  });

  return {
    props: {
      siteConfig: getSanitizedSiteConfig(siteConfig),
    },
    revalidate: 60,
  };
};

export default FourOhFour;
