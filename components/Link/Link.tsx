import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

import styles from './Link.module.css';

interface LinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof NextLinkProps
    >,
    NextLinkProps {
  underlined?: boolean;
  coloredHover?: boolean;
}
const Link = ({
  className,
  underlined = true,
  coloredHover = true,
  ...props
}: LinkProps) => (
  <NextLink
    {...props}
    className={clsx(
      styles.link,
      underlined && styles.underlined,
      coloredHover && 'hover:text-secondary',
      coloredHover && 'active:text-secondary',
      className,
    )}
  />
);

export default Link;
