import type {
  ButtonHTMLAttributes,
  FC,
  HTMLProps,
  PropsWithChildren,
} from 'react';
import clsx from 'clsx';
import { Link } from 'components';
import type { LinkProps } from 'components/link/link';

export type LinkOrButtonType =
  | LinkProps
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = HTMLProps<LinkOrButtonType>;

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children, className } = props;
  if ('href' in props) {
    return (
      <Link
        {...(props as LinkProps)}
        underlined={false}
        coloredHover={false}
        className={clsx('button', className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={clsx('button', 'duration-[250ms]', className)}
    >
      {children}
    </button>
  );
};

export default Button;
