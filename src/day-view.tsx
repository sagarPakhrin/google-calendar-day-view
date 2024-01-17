import { cn } from "@/lib/utils";
import { eachHourOfInterval, endOfDay, format, startOfDay } from "date-fns";

type DayViewProps = {
  selected_date: Date;
};

export const DayView = ({ selected_date }: DayViewProps) => {
  const currentDay = format(selected_date, "EEE");

  const hours = eachHourOfInterval({
    start: startOfDay(selected_date),
    end: endOfDay(selected_date),
  });

  return (
    <div className="my-2 bg-white rounded flex-1 h-full border border-gray-300">
      <div className="flex items-center h-24 border-b border-gray-300">
        <div className="w-32 h-full flex items-center justify-center border-r border-gray-300">
          {format(new Date(), "z")}
        </div>
        <div className={cn("flex-1 flex flex-col px-6 py-3 h-full")}>
          <p>{currentDay}</p>
        </div>
      </div>
      <div className="border-b flex items-center h-10 border-gray-300">
        <div
          className={cn(
            "w-32 h-full flex items-center justify-center border-r border-gray-300 text-gray-600",
          )}
        >
          All Day
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="overflow-y-scroll flex-1 max-h-full pb-56">
        <div>
          {hours.map((time, idx) => (
            <div className="flex h-12" key={idx}>
              <div className="w-32 h-full flex items-start justify-center border-r border-gray-300 text-gray-600">
                <time
                  dateTime={format(time, "yyyy-MM-dd")}
                  className="-mt-3 select-none"
                >
                  {idx === 0 ? "" : format(time, "h:mm a")}
                </time>
              </div>
              <div
                className={cn(
                  "flex-1 relative border-gray-300",
                  idx !== 0 && "border-t",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
