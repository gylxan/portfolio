import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { usePath } from 'hooks/usePath';

export interface TitleProps extends PropsWithChildren {
  className?: string;
  animated?: boolean;
}

const Title = ({ children, className, animated = true }: TitleProps) => {
  const path = usePath();

  function renderChildren() {
    if (!animated || typeof children !== 'string') {
      return children;
    }

    let delayedElementIndex = 0;
    return children.split('').map((char, index) => {
      // Skip spaces or empty strings from animation
      if (!char.trim()) {
        return <span key={`${char}-${index}`}>{char}</span>;
      }
      return (
        <span
          key={`${char}-${index}`}
          className="relative inline-block animate-pop-in opacity-0 transition-all"
          style={{ animationDelay: `${delayedElementIndex++ * 50}ms` }}
        >
          {char}
        </span>
      );
    });
  }

  return (
    <h1 key={path} className={clsx('relative text-4xl', className)}>
      {renderChildren()}
    </h1>
  );
};

export default Title;
