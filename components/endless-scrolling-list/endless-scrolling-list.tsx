import React from 'react';
import { AppState, AppStateEntity, useAppContext } from 'contexts/app-context';
import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import EndlessScrollingItem from 'components/endless-scrolling-item/endless-scrolling-item';
import { useTranslations } from 'use-intl';
import Loader from '../loader/loader';

export type EndlessScrollingListProps<AppStateKey extends keyof AppState> =
  Omit<UseEndlessScrollingProps<AppStateKey>, 'lastId'> & {
    idField: string;
    noEntryAvailableTranslationKey: string;
    className?: string;
    component: React.FC<AppStateEntity<AppStateKey>>;
    skeleton: React.FC;
  };

const EndlessScrollingList = <AppStateKey extends keyof AppState>({
  contextKey,
  idField,
  noEntryAvailableTranslationKey,
  className,
  component: Component,
  skeleton: Skeleton,
  limit = 10,
  ...endlessScrollingProps
}: EndlessScrollingListProps<AppStateKey>) => {
  const { data } = useAppContext();
  const {
    [contextKey]: { entries, lastId },
  } = data;

  const { hasMore, fetchNextPage, loading } = useEndlessScrolling({
    ...endlessScrollingProps,
    contextKey,
    lastId,
  });

  const t = useTranslations(contextKey as string);
  if (!hasMore && entries.length === 0) {
    return <>{t(noEntryAvailableTranslationKey)}</>;
  }
  return (
    <>
      <div className={className}>
        {entries.length === 0 &&
          loading &&
          [...Array(limit)].map((_, index) => <Skeleton key={index} />)}
        {entries.map((entry, index) => (
          <EndlessScrollingItem
            key={`${entry[idField as keyof typeof entry]}`}
            enabled={index === entries.length - 1}
            onLoad={fetchNextPage}
          >
            {/*@ts-expect-error - Props are correctly assignable*/}
            <Component {...entry} />
          </EndlessScrollingItem>
        ))}
      </div>
      {loading && entries.length > 0 && <Loader className="mt-6" />}
    </>
  );
};

export default EndlessScrollingList;
