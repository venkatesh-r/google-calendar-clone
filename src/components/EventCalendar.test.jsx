import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventCalendar from "./EventCalendar";

describe("Home component", () => {
  it("renders Home component", () => {
    render(<EventCalendar />);
  });
  screen.debug();
});
