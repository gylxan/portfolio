import { renderHook } from '@testing-library/react';
import useResize from 'hooks/useResize';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

describe('useResize', () => {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  const callback = vi.fn();

  afterEach(() => {
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should register document listener', () => {
    renderHook(() => useResize({ callback }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.anything(),
    );
  });

  it('should un-register document listener on unmount', () => {
    const { unmount } = renderHook(() => useResize({ callback }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.anything(),
    );
  });
});
