import { useState } from "react";
import { format } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface Eventprops {
  title: string;
  start: Date | null | string;
  end: Date | null | string;
}

const EventPicker: React.FC = () => {
  const [events, setEvents] = useState<Eventprops[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [eventTitle, setEventTitle] = useState("");

  const formattedStartDate = startDate
    ? format(startDate, "EEEE, MMM dd, yyyy hh:mm a")
    : "No date";

  const formattedEndDate = startDate
    ? format(endDate, "EEEE, MMM dd, yyyy hh:mm a")
    : "No date";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventTitle) {
      setEvents((prev) => [
        ...prev,
        { title: eventTitle, start: formattedStartDate, end: formattedEndDate },
      ]);
    }
    setEventTitle("");
  };

  console.log(events);

  return (
    <div className="flex">
      <form onSubmit={handleFormSubmit}>
        <h3 className="mb-2">Event Title</h3>
        <input
          type="text"
          value={eventTitle}
          className="border-1 px-3 py-1"
          onChange={(e) => {
            setEventTitle(e.target.value);
          }}
        />
        <p className="mt-5 mb-2">Start of the Event</p>
        <DateTimePicker onChange={setStartDate} value={startDate} />
        <p className="mt-5 mb-2">End of the Event</p>
        <DateTimePicker onChange={setEndDate} value={endDate} />
        <br />
        <button className="mt-5 rounded-md bg-blue-800 py-1 px-5 text-white cursor-pointer">
          Save
        </button>
      </form>
    </div>
  );
};

export default EventPicker;
