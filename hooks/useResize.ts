import { useEffect } from 'react';

interface UseResizeProps {
  callback: () => void;
}
const useResize = ({ callback }: UseResizeProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', callback);
      return () => {
        window.removeEventListener('resize', callback);
      };
    }
  }, [callback]);
};

export default useResize;
