import { renderHook } from '@testing-library/react';
import useResize from 'hooks/useResize';

describe('useResize', () => {
  const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  const callback = jest.fn();

  afterEach(() => {
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
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
