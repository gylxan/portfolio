import { PropsWithChildren } from 'react';

export type AnimatedTitleProps = PropsWithChildren;

const AnimatedTitle = ({ children }: AnimatedTitleProps) => {
  return <h1 className="relative text-4xl animate-fade-in-down">{children}</h1>;
};

export default AnimatedTitle;
