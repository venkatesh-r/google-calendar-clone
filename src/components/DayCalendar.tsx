import { useState } from "react";
import { TIMING } from "../utils/constants.js";
import { format, subDays, addDays } from "date-fns";
import CalendarHeader from "./CalendarHeader.js";

const DayCalendar = ({ events, onViewChange, setEvents }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleyesterday = () => {
    setCurrentDate((prev) => subDays(prev, 1));
  };

  const handletommorrow = () => {
    setCurrentDate((prev) => addDays(prev, 1));
  };

  return (
    <div className="container mx-auto p-2">
      <CalendarHeader
        currentDate={currentDate}
        today={handleToday}
        next={handletommorrow}
        prev={handleyesterday}
        view="day"
        onViewChange={onViewChange}
      />
      <div className="text-left ml-[7%]">
        {format(currentDate, "eee")}
        <br />
        {format(currentDate, "dd")}
      </div>
      <div className="grid grid-rows-12 text-left">
        {TIMING.map((time) => {
          return (
            <div
              className="border-b-1 p-2 border-gray-200 text-base"
              key={time}
            >
              {time}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayCalendar;
