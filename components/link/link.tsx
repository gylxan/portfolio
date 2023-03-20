import React, { AnchorHTMLAttributes } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

import styles from 'components/link/link.module.css';

export type NextLinkType = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps;

export type LinkProps = (
  | NextLinkType
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
) & {
  underlined?: boolean;
  coloredHover?: boolean;
  active?: boolean;
  href: string;
};
const Link = ({
  className,
  underlined = true,
  coloredHover = true,
  active = false,
  href,
  ...props
}: LinkProps) => {
  const isInternal = href?.startsWith('/');

  const resultClassName = clsx(
    styles.link,
    'transition-colors duration-300 inline-block',
    underlined && styles.underlined,
    coloredHover && 'hover:text-secondary active:text-secondary',
    active && styles.active,
    className,
  );

  if (isInternal) {
    return (
      <NextLink
        {...(props as NextLinkType)}
        href={href}
        className={resultClassName}
      />
    );
  }
  return (
    <a
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      href={href}
      className={resultClassName}
      rel="noopener noreferrer"
    />
  );
};

export default Link;
