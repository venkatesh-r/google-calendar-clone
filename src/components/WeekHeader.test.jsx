import { render, screen } from "@testing-library/react";
import WeekHeader from "./WeekHeader";

describe("WeekHeader Component", () => {
  it("should render all 7 days of the week", () => {
    render(<WeekHeader />);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekdays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
