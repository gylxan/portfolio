import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface TitleProps extends PropsWithChildren {
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return <h1 className={clsx('relative text-4xl', className)}>{children}</h1>;
};

export default Title;
