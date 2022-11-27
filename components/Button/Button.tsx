import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, HTMLProps, PropsWithChildren, } from 'react';
import clsx from 'clsx';
import { Link } from '../';

export type ButtonProps = HTMLProps<
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children, className } = props;
  const defaultClassName =
    'font-mono text-sm rounded border-2 p-2 hover:no-underline text-secondary hover:bg-secondary-ghost hover:text-secondary focus:bg-secondary-ghost transition-colors duration-[250ms]';
  if ('href' in props) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        underlined={false}
        coloredHover={false}
        className={clsx(defaultClassName, className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={clsx(defaultClassName, className)}
    >
      {children}
    </button>
  );
};

export default Button;
