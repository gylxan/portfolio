import Link from '../Link/Link';
import { Routes } from '../../constants/routes';
import Image from 'next/image';
import Menu from '../Menu/Menu';

const Header = () => {
  return (
    <header className="flex h-16 w-full grow items-center justify-between gap-4 px-4 text-center">
      <Link
        href={Routes.Home}
        data-testid="logo"
        className="relative h-10 w-10 p-2 text-white hover:text-white "
        underlined={false}
        coloredHover={false}
      >
        <Image src="/icons/icon-72x72.png" alt="logo" layout="fill" priority />
      </Link>

      <Menu />
    </header>
  );
};

export default Header;
