import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, HTMLProps, PropsWithChildren, } from 'react';
import Link from '../Link/Link';

type ButtonProps = HTMLProps<
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children } = props;
  const className =
    'font-mono rounded border-2 p-2 hover:no-underline text-secondary hover:bg-secondary-ghost focus:bg-secondary-ghost transition-all transition-[250ms]';
  if ('href' in props) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        underlined={false}
        coloredHover={false}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
