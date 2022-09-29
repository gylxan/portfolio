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
      document.removeEventListener('click', handleClickOutside, true);
      return;
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [active, handleClickOutside]);
};

export default useOutsideClick;
