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
import { IoCloseOutline } from "react-icons/io5";
import { useTheme } from "../utils/theme-context.jsx";

interface EventProps {
  title: string;
  start: string | Date | null;
  end: string | Date | null;
}

const parseEventDate = (dateString: string | Date) => {
  if (typeof dateString === "string") {
    if (dateString.includes("T")) {
      return new Date(dateString);
    } else {
      return parse(dateString, "EEEE, MMM dd, yyyy hh:mm a", new Date());
    }
  }
  return dateString;
};

const EventCalendar: React.FC = ({ events, onViewChange, setEvents }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);

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
    <div className="container mx-auto p-2">
      <CalendarHeader
        currentDate={currentDate}
        today={handleToday}
        next={handleNextMonth}
        prev={handlePrevMonth}
        view="month"
        onViewChange={onViewChange}
        events={events}
        setEvents={setEvents}
      />
      <WeekHeader />
      <div className="grid grid-cols-7 gap-0">
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`}></div>;
        })}
        {daysInMonth.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(day, parseEventDate(event.start!))
          );
          return (
            <div
              className={clsx(
                "border border-gray-200 px-2 py-2 align-top h-30",
                {
                  "bg-white text-white": isToday(day),
                  "border-gray-200": !isToday(day),
                }
              )}
              key={index}
            >
              <div className="flex justify-center">
                <div
                  className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded-full",
                    {
                      "bg-blue-800 text-white": isToday(day),
                    }
                  )}
                >
                  {format(day, "d")}
                </div>
              </div>
              {dayEvents.map((event, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowPopup(true);
                  }}
                  className="cursor-pointer  text-[14px]"
                >
                  {event.start &&
                    format(parseEventDate(event.start!), "hh:mm a")}{" "}
                  - {event.title}
                  {showPopup && selectedEvent && (
                    <div className="width-[30%] cursor-pointer absolute bg-[#F0F4F9] py-10 pl-10 pr-10 left-[45%] top-[30%] text-black rounded-2xl shadow-2xl text-left">
                      <button
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPopup(false);
                        }}
                      >
                        <IoCloseOutline size={30} />
                      </button>
                      <h2 className="text-2xl mt-6 mb-3">
                        {selectedEvent.title}
                      </h2>
                      <p className="text-2xl mt-6 mb-3">
                        {selectedEvent.start &&
                          format(
                            parseEventDate(selectedEvent.start!),
                            "hh:mm a"
                          )}{" "}
                      </p>
                    </div>
                  )}
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
