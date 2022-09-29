import React, { HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './MenuButton.module.css';

interface MenuButtonProps extends HTMLProps<HTMLButtonElement> {
  open: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  open,
  className,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      type="button"
      aria-label="menu"
      className={clsx([styles.menuButton, open && styles.open, className])}
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
