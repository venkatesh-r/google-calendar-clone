const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekHeader = () => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {weekdays.map((day) => {
        return <div key={day}>{day}</div>;
      })}
    </div>
  );
};

export default WeekHeader;
