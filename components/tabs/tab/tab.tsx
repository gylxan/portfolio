import { HTMLProps, PropsWithChildren, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

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
      classNames={{
        enter: 'opacity-0',
        enterActive: 'opacity-100 transition-opacity duration-300 ease-in',
        exit: 'opacity-100',
        exitActive: 'opacity-0 transition-opacity duration-300 ease-in'
      }}
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
