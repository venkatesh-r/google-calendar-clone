import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import WeekHeader from "./WeekHeader";

const EventCalendar = () => {
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
      <div>
        <div className="flex">
          <div>
            <button onClick={handleToday}>Today</button>
            <button>
              <FaAngleLeft onClick={handlePrevMonth} />
            </button>
            <button onClick={handleNextMonth}>
              <FaAngleRight />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-10">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
        </div>
      </div>
      <WeekHeader />
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`}></div>;
        })}
        {daysInMonth.map((day, index) => {
          return (
            <div
              className={clsx(
                "border border-gray-200 rounded-md p-10 align-top h-30",
                {
                  "bg-blue-800 text-white": isToday(day),
                }
              )}
              key={index}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
