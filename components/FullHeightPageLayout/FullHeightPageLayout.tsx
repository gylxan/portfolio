import Layout from '../Layout/Layout';
import { PropsWithChildren } from 'react';

export default function FullHeightPageLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <main className="container mx-auto flex h-full flex-col justify-center px-4 md:px-8">
        {children}
      </main>
    </Layout>
  );
}
