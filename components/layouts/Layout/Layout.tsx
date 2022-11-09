import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ className?: string }>;

const Layout = ({ children, className }: Props) => {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
