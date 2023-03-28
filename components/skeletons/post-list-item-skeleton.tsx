const PostListItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-md p-3">
      <div className="aspect-video rounded-md bg-skeleton" />
      <div className="mt-4 h-7 rounded-md bg-skeleton" />
      <div className="h-4 mt-2 rounded-md bg-skeleton" />
      <div className="h-4 rounded-md bg-skeleton" />
      <div className="flex justify-between items-center">
        <div className="w-20 flex h-8 gap-1 rounded-2xl bg-skeleton" />
        <div className="h-4 w-[7rem] self-end rounded-md bg-skeleton" />
      </div>
    </div>
  );
};

export default PostListItemSkeleton;
