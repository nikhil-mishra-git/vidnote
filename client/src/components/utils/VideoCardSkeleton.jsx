const VideoCardSkeleton = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">

      <div className="w-full h-64 bg-zinc-800"></div>

      <div className="p-4 space-y-3">
        <div className="h-5 bg-zinc-800 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        <div className="h-8 bg-zinc-800 rounded w-1/3 ml-auto"></div>
      </div>

    </div>
  );
};

export default VideoCardSkeleton;
