import type { NextPage } from 'next';
import Page from '../components/Page/Page';

import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

const Home: NextPage = () => {
  return (
    <Page title="Portfolio" description="Portfolio of Guido Lange">
      <div className="container flex justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <AnimatedTitle title="Guido Lange" subTitle="Frontend Developer" />
        </div>
      </div>
    </Page>
  );
};

export default Home;
