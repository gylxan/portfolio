import React, { useCallback } from 'react';
import { AppState, useAppContext } from 'contexts/app-context';
import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import { EndlessLoadingItem, Loader } from 'components';
import { useTranslations } from 'use-intl';

export interface EndlessLoadingListProps<T>
  extends Omit<UseEndlessScrollingProps<T>, 'onLoaded' | 'lastId'> {
  contextKey: keyof AppState;
  idField: keyof T;
  noEntryAvailableTranslationKey: string;
  className?: string;
  component: React.FC<T>;
  skeleton: React.FC;
}
const EndlessLoadingList = <T extends object>({
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
            onLoad={fetchNextPage}
          >
            <Component {...entry} />
          </EndlessLoadingItem>
        ))}
      </div>
      {loading && entries.length > 0 && <Loader className="mt-6" />}
    </>
  );
};

export default EndlessLoadingList;
