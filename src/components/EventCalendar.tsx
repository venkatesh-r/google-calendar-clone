import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
  parse,
} from "date-fns";
import clsx from "clsx";
import { useState } from "react";
import WeekHeader from "./WeekHeader";
import CalendarHeader from "./CalendarHeader";

const EventCalendar: React.FC = ({ events, onViewChange }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const firstDayofMonth = startOfMonth(currentDate);
  const lastDayofMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayofMonth,
    end: lastDayofMonth,
  });

  const startingDayIndex = getDay(firstDayofMonth);

  return (
    <div className="container mx-auto p-4">
      <CalendarHeader
        currentDate={currentDate}
        today={handleToday}
        next={handleNextMonth}
        prev={handlePrevMonth}
        view="month"
        onViewChange={onViewChange}
      />
      <WeekHeader />
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`}></div>;
        })}
        {daysInMonth.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(
              day,
              parse(event.start, "EEEE, MMM dd, yyyy hh:mm a", new Date())
            )
          );
          console.log(dayEvents);
          return (
            <div
              className={clsx(
                "border border-gray-200 rounded-md p-10 align-top h-30",
                {
                  "p-3 bg-blue-800 rounded-full w-3 h-3 text-white":
                    isToday(day),
                }
              )}
              key={index}
            >
              {format(day, "d")}
              {dayEvents.map((event, id) => (
                <div key={id}>
                  {format(event.start, "hh:mm")}
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
