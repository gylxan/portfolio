import { HTMLProps } from 'react';
import clsx from 'clsx';

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
    className={clsx([
      'hover:underline',
      underlined && 'underline',
      coloredHover && 'hover:text-secondary',
      className,
    ])}
  />
);

export default Link;
