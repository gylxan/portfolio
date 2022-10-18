import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const workbox = window.workbox;

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = () => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (
          confirm(
            'A newer version of the portfolio is available, reload to update?',
          )
        ) {
          workbox.addEventListener('controlling', () => {
            window.location.reload();
          });

          // Send a message to the waiting service worker, instructing it to activate.
          workbox.messageSkipWaiting();
        }
      };

      workbox.addEventListener('waiting', promptNewVersionAvailable);
      workbox.register();

      return () => {
        workbox.removeEventListener('waiting', promptNewVersionAvailable);
      };
    }
  }, []);
};

export default useServiceWorker;
