import { RefObject, useCallback, useEffect } from 'react';

interface OnOutsideClickProps {
  active: boolean;
  callback: () => void;
  ref: RefObject<any>;
}
const useOutsideClick = ({ active, ref, callback }: OnOutsideClickProps) => {
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (!ref.current?.contains(event.target)) {
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
