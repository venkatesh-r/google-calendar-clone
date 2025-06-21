import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  isToday,
  addWeeks,
  subWeeks,
} from "date-fns";
import WeekHeader from "./WeekHeader";
import { useState } from "react";
import clsx from "clsx";
import CalendarHeader from "./CalendarHeader.js";
import { TIMING } from "../utils/constants.js";

const WeekCalendar = ({ events, onViewChange, setEvents }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });

  const weekdays = eachDayOfInterval({ start, end });

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handlenextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
  };

  const handlePrevWeek = () => {
    setCurrentDate((prev) => subWeeks(prev, 1));
  };

  return (
    <>
      <div className="container mx-auto p-2">
        <CalendarHeader
          currentDate={currentDate}
          today={handleToday}
          next={handlenextWeek}
          prev={handlePrevWeek}
          view="week"
          onViewChange={onViewChange}
        />
      </div>
      <WeekHeader />
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((day) => {
          return (
            <div
              className={clsx("align-top my-2", {
                "bg-blue-800 w-8 h-8 content-center ml-[41%] rounded-full text-white align-middle":
                  isToday(day),
              })}
            >
              {format(day, "dd")}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-12 text-left">
        {TIMING.map((time) => {
          return (
            <div className="border-b-1 p-2 border-gray-200" key={time}>
              {time}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeekCalendar;
