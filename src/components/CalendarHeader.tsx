import { format, isValid } from "date-fns";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CalendarHeaderProps {
  currentDate: Date;
  today: () => void;
  next: () => void;
  prev: () => void;
  view?: "month" | "week" | "day";
  onViewChange: (val) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  today,
  next,
  prev,
  view = "month",
  onViewChange,
}) => {
  const [viewday, setViewday] = useState("month");
  const handleChange = (val) => {
    setViewday(val);
    onViewChange(val);
  };
  return (
    <div className="flex items-center mb-4">
      <button
        className="cursor-pointer border border-[#747775] rounded-full px-5 py-2"
        onClick={today}
      >
        Today
      </button>
      <div className="mx-3 flex items-center">
        <button onClick={prev} className=" cursor-pointer">
          <FaAngleLeft />
        </button>
        <button onClick={next} className="cursor-pointer">
          <FaAngleRight />
        </button>
      </div>
      <h2 className="text-2xl text-[#1f1f1f] ml-3">
        {view === "day" && format(currentDate, "MMMM dd, yyyy")}
        {view === "week" && format(currentDate, "'Week of' MMMM dd, yyyy")}
        {view === "month" && isValid(currentDate)
          ? format(currentDate, "MMMM yyyy")
          : ""}
      </h2>
      <div className="ml-auto">
        <button onClick={() => handleChange("month")} className="px-2">
          Month
        </button>
        <button onClick={() => handleChange("week")} className="px-2">
          Week
        </button>
        <button onClick={() => handleChange("day")} className="px-2">
          Day
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
