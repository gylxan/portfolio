import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface ColumnProps extends PropsWithChildren {
  space?: number;
  alignment?: 'left' | 'center' | 'right';
  rowSwitchSize?: 'never' | 'sm' | 'md' | 'lg' | 'xl';
}
const Column = ({ space, alignment, rowSwitchSize, children }: ColumnProps) => {
  return (
    <div
      className={clsx([
        'flex flex-col',
        space && `gap-${space}`,
        alignment && `items-${alignment}`,
        rowSwitchSize &&
          rowSwitchSize !== 'never' &&
          `${rowSwitchSize}:flex-row`,
      ])}
    >
      {children}
    </div>
  );
};

export default Column;
