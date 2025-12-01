import { RefObject, useCallback, useEffect } from 'react';

export interface UseOutsideClickProps {
  active: boolean;
  callback: () => void;
  ref: RefObject<HTMLElement | null>;
}
const useOutsideClick = ({ active, ref, callback }: UseOutsideClickProps) => {
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        event.stopPropagation();
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    if (!active) {
      document.removeEventListener('click', handleClickOutside);
      return;
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [active, handleClickOutside]);
};

export default useOutsideClick;
