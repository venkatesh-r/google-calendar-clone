import { useState } from "react";
import EventCalendar from "../components/EventCalendar";
import WeekCalendar from "../components/WeekCalendar";
import DayCalendar from "../components/DayCalendar";
import { EventData } from "../data/EventData.js";
import { useTheme } from "../utils/theme-context.jsx";

const Home = () => {
  const [events, setEvents] = useState(EventData);
  const [viewday, setViewday] = useState("month");
  const { theme, toggleTheme } = useTheme();

  const handleViewChange = (val: string) => {
    setViewday(val);
  };

  return (
    <div>
      <h1 className="text-5xl mb-5">Calendar</h1>
      <div className="relative right-0">
        <label className="absolute ml-5 top-[-40px] right-0 text-lg">
          Change theme
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
            className="absolute ml-2 top-2"
          />
        </label>
      </div>
      {viewday === "month" && (
        <EventCalendar
          events={events}
          setEvents={setEvents}
          onViewChange={handleViewChange}
        />
      )}
      {viewday === "week" && (
        <WeekCalendar
          events={events}
          setEvents={setEvents}
          onViewChange={handleViewChange}
        />
      )}
      {viewday === "day" && (
        <DayCalendar
          events={events}
          setEvents={setEvents}
          onViewChange={handleViewChange}
        />
      )}
    </div>
  );
};

export default Home;
