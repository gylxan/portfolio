import { Routes } from 'constants/routes';
import Image from 'next/image';
import { Link, Menu } from 'components';
import { SiteConfig } from 'types/siteConfig';
import useSanityImage from 'hooks/useSanityImage';

interface HeaderProps {
  siteConfig: SiteConfig;
}
const Header = ({ siteConfig }: HeaderProps) => {
  const { logo, menuLinks } = siteConfig;
  const imageSrc = useSanityImage(logo)?.src;
  return (
    <header className="flex h-24 w-full grow items-center justify-between gap-4 px-4 text-center md:px-8">
      <Link
        href={Routes.Home}
        data-testid="logo"
        className="relative h-10 w-10 p-2 text-white hover:text-white "
        underlined={false}
        coloredHover={false}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="logo"
            sizes="40px"
            fill
            priority
            width={undefined}
            height={undefined}
          />
        )}
      </Link>

      <Menu links={menuLinks} />
    </header>
  );
};

export default Header;
