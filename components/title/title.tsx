import { PropsWithChildren } from 'react';

export interface AnimatedTitleProps extends PropsWithChildren {
  animated?: boolean;
}

const Title = ({ children, animated = true }: AnimatedTitleProps) => {
  function renderChildren() {
    if (!animated || typeof children !== 'string') {
      return children;
    }

    let delayedElementIndex = -1;
    return children.split('').map((char, index) => {
      // Skip spaces or empty strings from animation
      if (!char.trim()) {
        return <span key={index}>{char}</span>;
      }
      return (
        <span
          key={index}
          className={`relative inline-block animate-pop-in opacity-0 transition-all`}
          style={{ animationDelay: `${delayedElementIndex++ * 50}ms` }}
        >
          {char}
        </span>
      );
    });
  }

  return <h1 className="relative text-4xl">{renderChildren()}</h1>;
};

export default Title;
