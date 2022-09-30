import React, { HTMLProps, useEffect } from 'react';

import styles from './ProgressBar.module.css';
import clsx from 'clsx';

export interface ProgressBarProps extends HTMLProps<HTMLDivElement> {
  progress: number;
  delay?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  delay,
  ...otherProps
}) => {
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  return (
    <div
      {...otherProps}
      className={styles.progressBar}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className={clsx([styles.progress])}
        style={{
          width: `${width}%`,
          transitionDelay: delay ? `${delay}ms` : undefined,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
