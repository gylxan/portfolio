import { MouseEvent, useRef, useState } from 'react';
import { Link, MenuButton } from 'components';
import clsx from 'clsx';
import useOutsideClick from 'hooks/useOutsideClick';
import useResize from 'hooks/useResize';
import styles from 'components/menu/menu.module.css';
import { MenuLink } from 'types/siteConfig';

export const MD_WIDTH = 768;

const menuOpenClass = 'menu-open';

export interface MenuProps {
  links: MenuLink[];
}

const Menu = ({ links }: MenuProps) => {
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
    <nav className="flex" >
      <MenuButton
        open={isMenuOpen}
        onClick={handleMenuButtonClick}
        className={styles.menuButton}
      />
      <ul className={clsx(styles.list, isMenuOpen && styles.open)} role="menu" aria-hidden={!isMenuOpen} ref={ref}>
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
    </nav>
  );
};

export default Menu;
