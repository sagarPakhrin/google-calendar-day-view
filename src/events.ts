import { add, isWithinInterval, startOfToday } from "date-fns";

export type EventType = {
  id: number;
  title?: string;
  start_date: Date;
  end_date: Date;
};

export type GroupedEvents = {
  events: EventType[];
};

const today = startOfToday();

export const events: EventType[] = [
  {
    id: 1,
    start_date: add(today, { hours: 12, minutes: 30 }),
    end_date: add(today, { hours: 13, minutes: 30 }),
    title: "First",
  },
  {
    id: 2,
    start_date: add(today, { hours: 12, minutes: 45 }),
    end_date: add(today, { hours: 13, minutes: 30 }),
    title: "Second",
  },
  {
    id: 3,
    start_date: add(today, { hours: 13 }),
    end_date: add(today, { hours: 13, minutes: 45 }),
    title: "Third",
  },
  {
    id: 4,
    start_date: add(today, { hours: 13, minutes: 15 }),
    end_date: add(today, { hours: 14, minutes: 15 }),
    title: "Fourth",
  },
  {
    id: 5,
    start_date: add(today, { hours: 13, minutes: 30 }),
    end_date: add(today, { hours: 14, minutes: 30 }),
    title: "Fifth",
  },
];

export const groupEvents = (
  events: EventType[],
  groupedEvents: GroupedEvents[] = [],
): GroupedEvents[] => {
  if (events.length <= 0) {
    return groupedEvents;
  }

  const [first, ...rest] = events;

  const eventsInRage = rest.filter((event) => {
    return isWithinInterval(event.start_date, {
      start: first.start_date,
      end: add(first.end_date, { minutes: -1 }),
    });
  });

  const group = [first, ...eventsInRage];
  const sliced = rest.slice(eventsInRage.length);
  groupedEvents.push({
    events: group,
  });
  return groupEvents(sliced, groupedEvents);
};

export const groupedEvents = groupEvents(events);
