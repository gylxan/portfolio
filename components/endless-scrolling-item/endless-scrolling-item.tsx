import { PropsWithChildren, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export interface EndlessLoadingItemProps {
  enabled: boolean;
  onLoad: () => void;
}
const EndlessScrollingItem = ({
  enabled,
  onLoad,
  children,
}: PropsWithChildren<EndlessLoadingItemProps>) => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
    skip: !enabled,
  });
  useEffect(() => {
    if (inView && enabled) {
      onLoad();
    }
  }, [enabled, inView, onLoad]);

  return <div ref={ref}>{children}</div>;
};

export default EndlessScrollingItem;
