import { HTMLProps, PropsWithChildren, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Tab.module.css';

export interface TabProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
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
