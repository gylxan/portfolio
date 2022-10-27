import React, { HTMLProps, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Tab.module.css';
import clsx from 'clsx';

export interface TabProps
  extends React.PropsWithChildren<HTMLProps<HTMLDivElement>> {
  active?: boolean;
}

export const Tab = ({
  active = true,
  children,
  className,
  ...props
}: TabProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      timeout={300}
      classNames={{ ...styles }}
      in={active}
      appear={true}
      nodeRef={ref}
    >
      <div
        {...props}
        ref={ref}
        className={className}
        role="tabpanel"
        aria-hidden={!active}
        hidden={!active}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default Tab;
