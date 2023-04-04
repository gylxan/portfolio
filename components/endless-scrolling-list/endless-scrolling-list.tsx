import React, { useCallback, useEffect, useRef } from 'react';
import {AppState, initialState, useAppContext} from 'contexts/app-context';
import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { EndlessLoadingItem, Loader } from 'components';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';

export interface EndlessLoadingListProps<T>
  extends Omit<UseEndlessScrollingProps<T>, 'onLoaded' | 'lastId'> {
  contextKey: keyof AppState;
  idField: keyof T;
  noEntryAvailableTranslationKey: string;
  className?: string;
  component: React.FC<T>;
  skeleton: React.FC;
}
const EndlessScrollingList = <T extends object>({
  contextKey,
  idField,
  noEntryAvailableTranslationKey,
  className,
  component: Component,
  skeleton: Skeleton,
  limit = 10,
  ...endlessScrollingProps
}: EndlessLoadingListProps<T>) => {
  const { data, setData } = useAppContext();
  const { locale } = useRouter();
  const prevLocale = useRef(locale);

  const {
    [contextKey]: { entries, lastId },
  } = data;

  const handleOnLoaded = useCallback(
    (results: T[], lastId: string | null) =>
      setData((prevData) => ({
        ...prevData,
        [contextKey]: {
          ...prevData[contextKey],
          lastId,
          entries: [...prevData[contextKey].entries, ...results],
        },
      })),
    [setData, contextKey],
  );

  const { hasMore, fetchNextPage, loading } = useEndlessScrolling<T>({
    ...endlessScrollingProps,
    onLoaded: handleOnLoaded,
    lastId,
  });

  useEffect(() => {
    if (locale !== prevLocale.current) {
      setData((prevState) => ({
        ...prevState,
        [contextKey]: {
          lastId: initialState[contextKey].lastId,
          entries: [],
        },
      }));
      fetchNextPage(initialState[contextKey].lastId);
    }
  }, [locale, fetchNextPage, contextKey, setData]);

  const handleNextPage = useCallback(() => {
    fetchNextPage(lastId);
  }, [fetchNextPage, lastId]);

  useEffect(() => {
    prevLocale.current = locale;
  }, [locale]);

  const t = useTranslations(contextKey);
  if (!hasMore && entries.length === 0) {
    return <>{t(noEntryAvailableTranslationKey)}</>;
  }
  return (
    <>
      <div className={className}>
        {entries.length === 0 &&
          loading &&
          [...Array(limit)].map((_, index) => <Skeleton key={index} />)}
        {(entries as T[]).map((entry, index) => (
          <EndlessLoadingItem
            key={`${entry[idField]}`}
            enabled={index === entries.length - 1}
            onLoad={handleNextPage}
          >
            <Component {...entry} />
          </EndlessLoadingItem>
        ))}
      </div>
      {loading && entries.length > 0 && <Loader className="mt-6" />}
    </>
  );
};

export default EndlessScrollingList;
