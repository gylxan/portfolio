import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { NextLinkType } from 'components/link/link';

export interface DropdownMenuItemProps
  extends PropsWithChildren<Omit<NextLinkType, 'href'>> {
  selected?: boolean;
  value: string;
  href?: string;
}

const DropdownMenuItem = ({
  children,
  selected,
  value,
  href,
  ...props
}: DropdownMenuItemProps) => {
  return (
    <li>
      <Link
        {...props}
        className="flex items-center gap-6 rounded-md py-2 px-4 hover:bg-secondary-ghost hover:text-secondary"
        data-value={value}
        aria-selected={selected}
        href={href || '#'}
        role="option"
      >
        {children}
        {selected && <FontAwesomeIcon icon={faCheck} />}
      </Link>
    </li>
  );
};

export default DropdownMenuItem;
