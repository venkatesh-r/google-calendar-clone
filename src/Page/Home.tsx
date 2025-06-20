import { useState } from "react";
import EventCalendar from "../components/EventCalendar";
import WeekCalendar from "../components/WeekCalendar";
import DayCalendar from "../components/DayCalendar";
import EventPicker from "../components/EventPicker";
import CalendarHeader from "../components/CalendarHeader";

const Home = () => {
  const events = [
    {
      end: "Friday, Jun 20, 2025 09:47 PM",
      start: "Friday, Jun 20, 2025 08:47 PM",
      title: "Team meeting",
    },
    {
      end: "Tuesday, Jun 10, 2025 09:00 AM",
      start: "Tuesday, Jun 10, 2025 10:00 PM",
      title: "sprint meeting",
    },
    {
      end: "Tuesday, Jun 25, 2025 03:00 PM",
      start: "Tuesday, Jun 25, 2025 04:00 PM",
      title: "sprint meeting",
    },
  ];

  const [viewday, setViewday] = useState("month");

  const handleViewChange = (val: string) => {
    setViewday(val);
    console.log(val);
  };

  return (
    <div>
      {viewday === "month" && (
        <EventCalendar events={events} onViewChange={handleViewChange} />
      )}
      {viewday === "week" && <WeekCalendar onViewChange={handleViewChange} />}
      {viewday === "day" && <DayCalendar onViewChange={handleViewChange} />}

      <EventPicker />
    </div>
  );
};

export default Home;
