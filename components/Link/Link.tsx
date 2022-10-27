import { HTMLProps } from 'react';
import clsx from 'clsx';

import styles from './Link.module.css';

interface Props extends HTMLProps<HTMLAnchorElement> {
  underlined?: boolean;
  coloredHover?: boolean;
}
const Link = ({
  className,
  underlined = true,
  coloredHover = true,
  ...props
}: Props) => (
  <a
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
