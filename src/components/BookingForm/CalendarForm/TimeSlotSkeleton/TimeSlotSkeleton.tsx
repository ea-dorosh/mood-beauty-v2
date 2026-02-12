interface TimeSlotSkeletonProps {
  count?: number;
  showDateText?: boolean;
  showButton?: boolean;
}

export default function TimeSlotSkeleton({
  count = 12,
  showDateText = true,
  showButton = true,
}: TimeSlotSkeletonProps) {
  return (
    <div>
      {showDateText && (
        <div className="mb-4">
          <div className="w-full h-12 rounded bg-[rgba(0,0,0,0.06)] animate-pulse" />
        </div>
      )}

      <div className="grid grid-cols-3 w-full gap-2.5 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-10 rounded-full bg-[rgba(0,0,0,0.06)] animate-pulse"
          />
        ))}
      </div>

      {showButton && (
        <div className="flex justify-center mt-4">
          <div className="w-[300px] h-10 rounded-[20px] bg-[rgba(0,0,0,0.06)] animate-pulse" />
        </div>
      )}
    </div>
  );
}
