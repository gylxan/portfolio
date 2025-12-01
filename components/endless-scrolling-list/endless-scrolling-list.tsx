import React from 'react';
import { useAppContext } from 'contexts/app-context';
import useEndlessScrolling, {
  UseEndlessScrollingProps,
} from 'hooks/useEndlessScrolling';
import EndlessScrollingItem from 'components/endless-scrolling-item/endless-scrolling-item';
import { useTranslations } from 'use-intl';
import Loader from '../loader/loader';

export interface EndlessScrollingListProps<T> extends Omit<
  UseEndlessScrollingProps<T>,
  'lastId'
> {
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
}: EndlessScrollingListProps<T>) => {
  const { data } = useAppContext();
  const {
    [contextKey]: { entries, lastId },
  } = data;

  const { hasMore, fetchNextPage, loading } = useEndlessScrolling<T>({
    ...endlessScrollingProps,
    contextKey,
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
          <EndlessScrollingItem
            key={`${entry[idField]}`}
            enabled={index === entries.length - 1}
            onLoad={fetchNextPage}
          >
            <Component {...entry} />
          </EndlessScrollingItem>
        ))}
      </div>
      {loading && entries.length > 0 && <Loader className="mt-6" />}
    </>
  );
};

export default EndlessScrollingList;
