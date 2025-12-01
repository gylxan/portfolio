import { renderHook } from '@testing-library/react';
import useOutsideClick from 'hooks/useOutsideClick';
import { RefObject } from 'react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

describe('useOutsideClick', () => {
  let clickListener: null | EventListenerOrEventListenerObject = null;
  const addEventListenerSpy = vi
    .spyOn(document, 'addEventListener')
    .mockImplementation((_, handler) => (clickListener = handler));
  const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
  const callback = vi.fn();
  const refContains = vi.fn();
  const ref = {
    current: { contains: refContains },
  } as unknown as RefObject<HTMLElement>;
  const stopPropagationSpy = vi.fn();
  const event = { stopPropagation: stopPropagationSpy } as unknown as Event;

  afterEach(() => {
    clickListener = null;
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
    stopPropagationSpy.mockClear();
    refContains.mockReturnValue(true);
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should register document listener', () => {
    renderHook(() => useOutsideClick({ active: true, callback, ref }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    );
  });

  it('should un-register document listener on unmount, when active', () => {
    const { unmount } = renderHook(() =>
      useOutsideClick({ active: true, callback, ref }),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    );
  });

  it('should un-register document listener, when active switch to inactive', () => {
    const { rerender } = renderHook(
      ({ active }) => useOutsideClick({ active, callback, ref }),
      { initialProps: { active: true } },
    );

    rerender({ active: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    );
  });

  it('should un-register document listener when inactive', () => {
    renderHook(() => useOutsideClick({ active: false, callback, ref }));

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    );
  });

  describe('clickHandler', () => {
    it('should call callback, when ref does not contain element which has been clicked on', () => {
      refContains.mockReturnValue(false);
      renderHook(() => useOutsideClick({ active: true, callback, ref }));

      (clickListener as EventListener)(event);

      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it('should not call callback, when ref contains element which has been clicked on', () => {
      renderHook(() => useOutsideClick({ active: true, callback, ref }));

      (clickListener as EventListener)(event);

      expect(stopPropagationSpy).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
