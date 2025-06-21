import { format, isValid } from "date-fns";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaChevronDown } from "react-icons/fa";

import EventPicker from "./EventPicker";

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
  events,
  setEvents,
}) => {
  const [viewday, setViewday] = useState("month");
  const handleChange = (val) => {
    setViewday(val);
    onViewChange(val);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("Month");

  const handleSelect = (view: string) => {
    setSelectedView(view);
    handleChange(view.toLowerCase()); // send "month", "week", "day"
    setIsOpen(false);
  };

  return (
    <div className="flex items-center mb-7">
      <EventPicker eventsData={events} setEvents={setEvents} />
      <button
        className="cursor-pointer border border-[#747775] hover:bg-[#E7E8EB] rounded-full px-5 py-2"
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
      <h2 className="text-2xl  ml-3">
        {view === "day" && format(currentDate, "MMMM dd, yyyy")}
        {view === "week" && format(currentDate, "'Week of' MMMM dd, yyyy")}
        {view === "month" && isValid(currentDate)
          ? format(currentDate, "MMMM yyyy")
          : ""}
      </h2>
      <div className="flex items-left justify-items-end ml-auto relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-left justify-items-end border border-[#747775] rounded-full px-4 py-2 hover:bg-[#E7E8EB]"
        >
          {selectedView}
          <FaChevronDown className="ml-2 mt-1" />
        </button>
        {isOpen && (
          <div className="absolute top-9 left-0 mt-2 w-32 border border-gray-300 rounded shadow-md z-10">
            <button
              onClick={() => handleSelect("Month")}
              className="block w-full text-left px-4 py-2 hover:bg-[#E7E8EB]"
            >
              Month
            </button>
            <button
              onClick={() => handleSelect("Week")}
              className="block w-full text-left px-4 py-2 hover:bg-[#E7E8EB]"
            >
              Week
            </button>
            <button
              onClick={() => handleSelect("Day")}
              className="block w-full text-left px-4 py-2 hover:bg-[#E7E8EB]"
            >
              Day
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarHeader;
