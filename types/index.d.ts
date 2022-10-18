import { Workbox } from 'workbox-window';

export {};
declare global {
  interface Window {
    workbox: Workbox;
  }
}
window.workbox = window.workbox || {};
