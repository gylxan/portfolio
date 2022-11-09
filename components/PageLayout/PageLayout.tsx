import Layout from '../Layout/Layout';
import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <main className="container mx-auto mt-4 mb-6 px-4 md:mt-12 md:px-8">
        {children}
      </main>
    </Layout>
  );
}
