const ProjectSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-md border-2 p-3">
      <div className="flex flex-row justify-between justify-items-start">
        <div className="flex flex-col gap-2">
          <div className="h-[1.125rem] w-[7rem] rounded-md bg-skeleton" />
          <div className="h-7 w-[12rem] rounded-md bg-skeleton" />
        </div>
        <div className="flex gap-4">
          <div className="h-6 w-6 rounded-2xl bg-skeleton" />
          <div className="h-6 w-6 rounded-2xl bg-skeleton" />
        </div>
      </div>
      <div className="mt-4 h-5 w-full rounded-md bg-skeleton" />
      <div className="mb-4 h-5 w-full rounded-md bg-skeleton" />
      <div className="flex gap-1">
        <div className="w-20 flex h-8 rounded-2xl bg-skeleton" />
        <div className="w-20 flex h-8 rounded-2xl bg-skeleton" />
        <div className="w-20 flex h-8 rounded-2xl bg-skeleton" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
