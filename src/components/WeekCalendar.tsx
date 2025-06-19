import { format } from "date-fns";
import WeekHeader from "./WeekHeader";

const timing = [
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

const WeekCalendar = () => {
  return (
    <>
      <WeekHeader />
      <div className="grid grid-rows-12 text-left">
        {timing.map((time) => {
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
