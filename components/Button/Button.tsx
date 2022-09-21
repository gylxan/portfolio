import { FC, HTMLProps, PropsWithChildren, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from '../Link/Link';
import styles from './Button.module.css';

type ButtonProps = HTMLProps<AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>>;

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children } = props;
  if ('href' in props) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        underlined={false}
        coloredHover={false}
        className={styles.button}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
