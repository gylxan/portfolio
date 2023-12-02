import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'use-intl';

export const ColorModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('menu');

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center p-2 w-9 h-9"
      aria-label={t('color_mode')}
    >
      <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="lg" />
    </button>
  );
};
