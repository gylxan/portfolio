import Layout from '../Layout/Layout';
import { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="container mx-auto flex h-full flex-col justify-center px-4 md:px-8">
      {children}
    </Layout>
  );
};

export default DefaultLayout;
