import { add, startOfToday } from "date-fns";

export type EventType = {
  id: number;
  title?: string;
  start_date: Date;
  end_date: Date;
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
