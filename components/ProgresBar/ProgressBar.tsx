import React, { HTMLProps, useEffect } from 'react';

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
      className="flex h-2 w-full rounded bg-primary"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="progress flex rounded bg-secondary transition-[width] duration-1000"
        style={{
          width: `${width}%`,
          transitionDelay: delay ? `${delay}ms` : undefined,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
