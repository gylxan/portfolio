import type { HTMLProps } from 'react';
import clsx from 'clsx';
import styles from 'components/menu-button/menu-button.module.css';
import { useTranslations } from 'use-intl';

interface MenuButtonProps extends HTMLProps<HTMLButtonElement> {
  open: boolean;
}

const MenuButton = ({ open, className, ...otherProps }: MenuButtonProps) => {
  const t = useTranslations('menu');
  return (
    <button
      {...otherProps}
      type="button"
      aria-label={`${t(`${open ? 'close' : 'open'}_menu`)}`}
      className={clsx(styles.menuButton, open && styles.open, className)}
    >
      <div className={styles.lineBox}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </button>
  );
};

export default MenuButton;
