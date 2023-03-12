import { MouseEvent, useRef, useState } from 'react';
import { Button, Link, MenuButton } from 'components';
import clsx from 'clsx';
import useOutsideClick from 'hooks/useOutsideClick';
import useResize from 'hooks/useResize';
import styles from 'components/menu/menu.module.css';
import type { MenuLink } from 'types/siteConfig';
import type { SanityFile } from 'types/file';

export const MD_WIDTH = 768;

const menuOpenClass = 'menu-open';

export interface MenuProps {
  links: MenuLink[];
  resume?: SanityFile;
}

const Menu = ({ links, resume }: MenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

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

  function handleMenuButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
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
    <nav className="flex">
      <MenuButton
        open={isMenuOpen}
        onClick={handleMenuButtonClick}
        className={styles.menuButton}
      />
      <div
        className={clsx(styles.menu, isMenuOpen && styles.open)}
        aria-hidden={!isMenuOpen}
      >
        <ul role="menu" ref={ref} className={styles.list}>
          {links.map(({ slug, title }) => (
            <li key={slug.current}>
              <Link
                href={`/${slug.current}`}
                underlined={false}
                onClick={handleLinkClick}
                role="menuitem"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        {resume && (
          <Button
            href={resume.asset.url}
            target="_blank"
            className="text-base md:text-sm"
            data-testid="resume-button"
          >
            Resume
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Menu;
