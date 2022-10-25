import React, { forwardRef, HTMLProps } from 'react';

export interface TabProps
  extends React.PropsWithChildren,
    HTMLProps<HTMLDivElement> {
  title: string;
  hidden?: boolean;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ hidden, children, className, ...props }: TabProps, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        role="tabpanel"
        aria-hidden={hidden}
        className={className}
      >
        {children}
      </div>
    );
  },
);

Tab.displayName = 'Tab';

export default Tab;
