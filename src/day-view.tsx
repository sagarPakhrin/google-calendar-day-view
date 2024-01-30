import { cn } from "@/lib/utils";
import {
  differenceInMinutes,
  eachHourOfInterval,
  endOfDay,
  format,
  startOfDay,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { EventType, GroupedEvents, events, groupedEvents } from "./events";

type DayViewProps = {
  selected_date: Date;
};

const TOTAL_MINUTES = 24 * 60;

export const DayView = ({ selected_date }: DayViewProps) => {
  const currentDay = format(selected_date, "EEE");
  const [ref, setSetRef] = useState<HTMLDivElement | null>(null);
  const today = startOfToday();

  console.log(groupedEvents);

  const hours = eachHourOfInterval({
    start: startOfDay(selected_date),
    end: endOfDay(selected_date),
  });

  const getEventStyle = (e: EventType) => {
    const containerHeight = ref?.offsetHeight || 1;
    const minutes_passed = differenceInMinutes(e.start_date, today);

    const event_duration = differenceInMinutes(e.end_date, e.start_date);

    const percentage = minutes_passed / TOTAL_MINUTES;
    const top = percentage * containerHeight;
    const height = (event_duration / TOTAL_MINUTES) * containerHeight;

    return {
      width: "calc(100% - 127px)",
      top,
      height,
      zIndex: "5",
    };
  };

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
        <div className="relative" ref={(divRef) => setSetRef(divRef)}>
          {groupedEvents.map((group) =>
            group.events.map((event) => (
              <div
                className="bg-blue-400 text-white text-xs rounded py-1 px-2 absolute right-0"
                style={getEventStyle(event)}
                key={event.id}
              >
                {event.title}
                <br />
                <span>
                  {format(event.start_date, "h:mm a")} -{" "}
                  {format(event.end_date, "h:mm a")}
                </span>
              </div>
            )),
          )}
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
