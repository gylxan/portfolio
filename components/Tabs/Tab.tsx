import React, { forwardRef, HTMLProps } from 'react';

export interface TabProps
  extends React.PropsWithChildren,
    HTMLProps<HTMLDivElement> {
  hidden?: boolean;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ hidden = false, children, ...props }: TabProps, ref) => {
    return (
      <div {...props} ref={ref} role="tabpanel" aria-hidden={hidden}>
        {children}
      </div>
    );
  },
);

Tab.displayName = 'Tab';

export default Tab;
