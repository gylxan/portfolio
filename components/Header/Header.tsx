import { Routes } from '../../constants/routes';
import Image from 'next/image';
import { Link, Menu } from '../';

const Header = () => {
  return (
    <header className="flex h-24 w-full grow items-center justify-between gap-4 px-4 text-center md:px-8">
      <Link
        href={Routes.Home}
        data-testid="logo"
        className="relative h-10 w-10 p-2 text-white hover:text-white "
        underlined={false}
        coloredHover={false}
      >
        <Image
          src={process.env.NEXT_PUBLIC_LOGO_URL || ''}
          alt="logo"
          sizes="40px"
          fill
          priority
        />
      </Link>

      <Menu />
    </header>
  );
};

export default Header;
