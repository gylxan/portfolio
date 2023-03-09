import clsx from 'clsx';
import React, {PropsWithChildren} from 'react';

export interface RowProps extends PropsWithChildren {
  space?: number;
}
const Row = ({ space, children }: RowProps) => {
  return (
    <div className={clsx(['flex', space && `gap-${space}`])}>{children}</div>
  );
};

export default Row;
