import { useRouter } from 'next/router';
import { setCookie } from 'utils/cookie';
import React from 'react';
import { DropdownMenu, DropdownMenuItem } from 'components';
import { initialState, useAppContext } from 'contexts/app-context';

const LanguageDropdown = () => {
  const { locale, asPath, locales } = useRouter();
  const availableLanguages = locales ?? [];
  const { setData } = useAppContext();

  function handleLanguageSelect(locale: string) {
    setCookie('NEXT_LOCALE', locale, 31536000);
    setData(initialState);
  }

  function getTitle(code: string) {
    return code.toUpperCase();
  }

  if (!availableLanguages.length) {
    return null;
  }

  return (
    <DropdownMenu
      label={
        <div className="flex gap-2 items-center text-base md:text-sm">
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
          className="text-base md:text-sm"
        >
          {getTitle(code)}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
};

export default LanguageDropdown;
