import { Button } from 'components/index';
import {
  Children,
  cloneElement,
  MouseEvent, PropsWithChildren,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import type { DropdownMenuItemProps } from 'components/dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DropdownMenuProps extends PropsWithChildren {
  label: ReactNode;
  value: string | undefined;
  children?:
    | ReactElement<DropdownMenuItemProps>
    | ReactElement<DropdownMenuItemProps>[];
  onChange: (value: string) => void;
}
const DropdownMenu = ({
  label,
  value,
  onChange,
  children,
}: DropdownMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick({
    active: isMenuOpen,
    ref: menuRef,
    callback: toggleMenu,
  });

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleItemClick(e: MouseEvent<HTMLAnchorElement>) {
    const newValue = e.currentTarget.getAttribute('data-value') as string;
    if (newValue === value) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    onChange(newValue);
    toggleMenu();
  }

  return (
    <div className="relative text-sm" ref={menuRef}>
      <Button
        type="button"
        className="flex items-center gap-2 border-none text-sm text-primary hover:bg-secondary-ghost hover:text-secondary focus:text-secondary"
        onClick={toggleMenu}
      >
        {label}
        <FontAwesomeIcon
          icon={faCaretDown}
          className={clsx(
            isMenuOpen && 'rotate-180',
            'transition-transform duration-200 ease-out',
          )}
        />
      </Button>
      {isMenuOpen && (
        <ul
          role="listbox"
          className="absolute top-full left-0 z-[1] translate-y-2 rounded-md border-2 bg-background"
        >
          {Children.map(children || [], (child) => {
            return cloneElement(
              child,
              {
                ...child.props,
                selected: value === child.props.value,
                onClick: handleItemClick,
              },
              child.props.children,
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default DropdownMenu;
