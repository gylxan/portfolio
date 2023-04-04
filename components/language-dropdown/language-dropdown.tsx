import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { setCookie } from 'utils/cookie';
import React from 'react';
import { DropdownMenu, DropdownMenuItem } from 'components';
import { useTranslations } from 'use-intl';
import { initialState, useAppContext } from 'contexts/app-context';

const LanguageDropdown = () => {
  const { locale, asPath, locales } = useRouter();
  const t = useTranslations('language');
  const availableLanguages = locales ?? [];
  const { setData } = useAppContext();

  function handleLanguageSelect(locale: string) {
    setCookie('NEXT_LOCALE', locale, 31536000);
    setData(initialState);
  }

  function getTitle(code: string) {
    return t(code) || code.toUpperCase();
  }

  if (!availableLanguages.length) {
    return null;
  }

  return (
    <DropdownMenu
      label={
        <div className="flex gap-1">
          <FontAwesomeIcon icon={faGlobe} size="lg" />
          {getTitle(locale ?? '')}
        </div>
      }
      value={locale}
      onChange={handleLanguageSelect}
    >
      {availableLanguages.map((code) => (
        <DropdownMenuItem
          key={code}
          value={code}
          href={asPath}
          locale={code}
          lang={code}
          hrefLang={code}
        >
          {getTitle(code)}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
};

export default LanguageDropdown;
