import { renderHook } from '@testing-library/react';
import useServiceWorker from '../useServiceWorker';

describe('useServiceWorker', () => {
  const mockWorkbox = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    messageSkipWaiting: jest.fn(),
    register: jest.fn(),
  };

  const originalNavigatorServiceWorker = navigator.serviceWorker;
  const originalWorkbox = window.workbox;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: true,
      writable: true,
    });
    Object.defineProperty(global, 'workbox', {
      value: mockWorkbox,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: originalNavigatorServiceWorker,
      writable: true,
    });
    Object.defineProperty(global, 'workbox', {
      value: originalWorkbox,
      writable: true,
    });
  });

  it('should register workbox listener', () => {
    renderHook(() => useServiceWorker());

    expect(mockWorkbox.addEventListener).toHaveBeenCalledWith(
      'waiting',
      expect.anything(),
    );
    expect(mockWorkbox.register).toHaveBeenCalled();
  });

  it('should not register workbox, when serviceWorker is not in navigator', () => {
    Object.defineProperty(window, 'navigator', {
      value: {},
      writable: true,
    });

    renderHook(() => useServiceWorker());

    expect(mockWorkbox.addEventListener).not.toHaveBeenCalled();
    expect(mockWorkbox.register).not.toHaveBeenCalled();
  });

  it('should not register workbox, when workbox is not defined', () => {
    Object.defineProperty(global, 'workbox', {
      value: undefined,
      writable: true,
    });

    renderHook(() => useServiceWorker());

    expect(mockWorkbox.addEventListener).not.toHaveBeenCalled();
    expect(mockWorkbox.register).not.toHaveBeenCalled();
  });

  it('should un-register workbox listener on unmount', () => {
    const { unmount } = renderHook(() => useServiceWorker());

    unmount();

    expect(mockWorkbox.removeEventListener).toHaveBeenCalledWith(
      'waiting',
      expect.anything(),
    );
  });
});
