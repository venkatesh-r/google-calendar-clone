import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IoCloseOutline } from "react-icons/io5";

const EventPicker: React.FC = ({ eventsData, setEvents }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [createEvent, setCreateEvent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventTitle) {
      setEvents((prev) => [
        ...prev,
        {
          title: eventTitle,
          start: startDate ? startDate.toISOString() : "",
          end: endDate ? endDate.toISOString() : "",
        },
      ]);
    }

    setEventTitle("");
    setCreateEvent((prev) => !prev);
  };

  return (
    <div className="flex">
      <div>
        <button
          className="cursor-pointer border border-[#747775] hover:bg-gray-100 rounded-full px-5 py-2 mr-5"
          onClick={() => setCreateEvent((prev) => !prev)}
        >
          Create Event
        </button>
      </div>
      {createEvent && (
        <form
          className="cursor-pointer absolute bg-[#F0F4F9] py-5 px-15 left-[45%] top-[20%] text-black rounded-2xl shadow-2xl"
          onSubmit={handleFormSubmit}
        >
          <button
            className="absolute right-5 cursor-pointer"
            onClick={() => setCreateEvent((prev) => !prev)}
          >
            <IoCloseOutline size={30} />
          </button>
          <h3 className="mt-5 mb-2">Event Title</h3>
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
          <button className="mt-12 rounded-md bg-blue-800 py-1 px-5 text-white cursor-pointer">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default EventPicker;
