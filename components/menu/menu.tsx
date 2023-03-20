import { useRef, useState } from 'react';
import { Button, Link, MenuButton } from 'components';
import clsx from 'clsx';
import useOutsideClick from 'hooks/useOutsideClick';
import useResize from 'hooks/useResize';
import styles from 'components/menu/menu.module.css';
import type { MenuLink } from 'types/siteConfig';
import type { SanityFile } from 'types/file';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';
import { isSlugMatchingCurrentUrl } from 'utils/url';

export const MD_WIDTH = 768;

const menuOpenClass = 'menu-open';

export interface MenuProps {
  links: MenuLink[];
  resume?: SanityFile;
}

const Menu = ({ links, resume }: MenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  const t = useTranslations('menu');
  const { asPath, locale } = useRouter();

  useOutsideClick({
    active: isMenuOpen,
    ref,
    callback: () => toggleMenu(false),
  });
  useResize({ callback: handleResize });

  function handleResize() {
    const body = document.querySelector('body');
    if (window.innerWidth >= MD_WIDTH) {
      body?.classList?.remove(menuOpenClass);
    } else {
      handleBodyOverflow(isMenuOpen);
    }
  }

  function handleLinkClick() {
    toggleMenu(false);
  }

  function handleMenuButtonClick() {
    toggleMenu();
  }

  function toggleMenu(state?: boolean) {
    const newState = state ?? !isMenuOpen;
    setMenuOpen(newState);
    handleBodyOverflow(newState);
  }

  function handleBodyOverflow(overflowHidden: boolean) {
    const body = document.querySelector('body');
    if (overflowHidden) {
      body?.classList?.add(menuOpenClass);
    } else {
      body?.classList?.remove(menuOpenClass);
    }
  }

  return (
    <nav className="flex" ref={ref}>
      <MenuButton
        open={isMenuOpen}
        onClick={handleMenuButtonClick}
        className={styles.menuButton}
      />
      <div
        className={clsx(styles.menu, isMenuOpen && styles.open)}
        aria-hidden={!isMenuOpen}
      >
        <ul role="menu" className={styles.list}>
          {links.map(({ slug, title }) => {
            const href = `/${slug.current}`;
            return (
              title && (
                <li key={slug.current}>
                  <Link
                    href={href}
                    underlined={false}
                    active={isSlugMatchingCurrentUrl(href, locale, asPath)}
                    onClick={handleLinkClick}
                    role="menuitem"
                  >
                    {title}
                  </Link>
                </li>
              )
            );
          })}
        </ul>
        {resume && (
          <Button
            href={resume.asset.url}
            target="_blank"
            className="text-base md:text-sm"
            data-testid="resume-button"
          >
            {t('resume')}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Menu;
