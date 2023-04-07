import Image from 'next/image';
import { LanguageDropdown, Link, Menu } from 'components';
import useSanityImage from 'hooks/useSanityImage';
import type { SanityAltImage } from 'types/image';
import type { MenuLink } from 'types/siteConfig';
import type { SanityFile } from 'types/file';

export interface HeaderProps {
  menuLinks: MenuLink[];
  resume?: SanityFile;
  logo: SanityAltImage;
}

const Header = ({ logo, menuLinks, resume }: HeaderProps) => {
  const imageSrc = useSanityImage(logo)?.src;
  return (
    <header className="flex h-24 w-full grow items-center justify-between gap-4 px-4 text-center md:px-8 bg-background sticky top-0 z-[1]">
      <Link
        href="/"
        data-testid="logo"
        className="relative h-10 w-10 p-2 text-white hover:text-white "
        underlined={false}
        coloredHover={false}
      >
        {imageSrc && (
          <Image src={imageSrc} alt={logo.alt} sizes="40px" fill priority />
        )}
      </Link>

      <div className="flex items-center gap-4 md:flex-row-reverse">
        <LanguageDropdown />
        <Menu links={menuLinks} resume={resume} />
      </div>
    </header>
  );
};

export default Header;
