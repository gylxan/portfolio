import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface ColumnProps extends PropsWithChildren {
  space?: number;

  alignment?: 'left' | 'center' | 'right';
}
const Column = ({ space, alignment, children }: ColumnProps) => {
  return (
    <div
      className={clsx([
        'flex flex-col',
        space && `gap-${space}`,
        alignment && `items-${alignment}`,
      ])}
    >
      {children}
    </div>
  );
};

export default Column;
