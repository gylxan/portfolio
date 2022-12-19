import type { GetStaticProps } from 'next';
import { Link, Layout } from 'components';
import { Routes } from 'constants/routes';
import styles from 'styles/404.module.css';
import client from 'utils/sanity';
import type { SiteConfig } from 'types/siteConfig';
import { configQuery } from 'constants/groq';

interface FourOhFourProps {
  siteConfig: SiteConfig;
}

const FourOhFour = ({ siteConfig }: FourOhFourProps) => {
  return (
    <Layout fullHeight title="404" siteConfig={siteConfig}>
      <div className="container flex flex-col items-center gap-4">
        <h1 className={styles.title} title="404">
          404
        </h1>
        <h2>Ooops, seems like you are wrong here</h2>
        <Link href={Routes.Home}>Go back to home</Link>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<FourOhFourProps> = async () => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);

  return {
    props: {
      siteConfig,
    },
    revalidate: 60,
  };
};

export default FourOhFour;
