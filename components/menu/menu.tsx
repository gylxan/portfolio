import { MouseEvent, useRef, useState } from 'react';
import { Link, MenuButton } from 'components';
import clsx from 'clsx';
import useOutsideClick from 'hooks/useOutsideClick';
import useResize from 'hooks/useResize';
import styles from 'components/menu/menu.module.css';
import { MenuLink } from 'types/siteConfig';

export const MD_WIDTH = 768;

const menuOpenClass = 'menu-open';

interface MenuProps {
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

  function renderMenu(
    listClassname: string,
    listItemClassname?: string,
    linkClickHandler?: () => void,
  ) {
    return (
      <ol className={listClassname}>
        {links.map(({ slug, title }) => (
          <li key={slug.current} className={listItemClassname}>
            <Link
              href={slug.current}
              underlined={false}
              onClick={linkClickHandler}
            >
              {title}
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="flex">
      {renderMenu(styles.list)}
      <MenuButton
        open={isMenuOpen}
        onClick={handleMenuButtonClick}
        className={styles.menuButton}
      />
      <aside
        aria-hidden={isMenuOpen}
        tabIndex={-1}
        className={clsx(styles.burgerMenu, isMenuOpen && styles.open)}
        ref={ref}
      >
        <nav>
          {renderMenu(
            styles.burgerMenuList,
            styles.burgerMenuListItem,
            handleLinkClick,
          )}
        </nav>
      </aside>
    </div>
  );
};

export default Menu;
