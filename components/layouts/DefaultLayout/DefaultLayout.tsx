import Layout from '../Layout/Layout';
import { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="container mx-auto mt-4 mb-6 px-4 md:mt-12 md:px-8">
      {children}
    </Layout>
  );
};

export default DefaultLayout;
