import type { GetStaticProps } from 'next';
import { Layout, Link } from 'components';
import styles from 'styles/404.module.css';
import client, { getSanitizedSiteConfig } from 'utils/sanity';
import type { SanitySiteConfig, SiteConfig } from 'types/siteConfig';
import { configQuery } from 'constants/groq';
import { useTranslations } from 'use-intl';

interface FourOhFourProps {
  siteConfig: SiteConfig;
}

const FourOhFour = ({ siteConfig }: FourOhFourProps) => {
  const t = useTranslations('four_oh_four');
  return (
    <Layout fullHeight title="404" siteConfig={siteConfig}>
      <div className="container flex flex-col items-center gap-4">
        <h1 className={styles.title} title="404">
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
