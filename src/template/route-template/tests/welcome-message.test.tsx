import { render, screen } from "@testing-library/react";
import { WelcomeMessage } from "../components";
import { describe, expect, test } from "vitest";

describe("WelcomeMessage", () => {
  test("renders welcome message properly", () => {
    render(<WelcomeMessage />);

    const welcomeMessage = screen.getByText(`Welcome to the page`);

    expect(welcomeMessage).toBeInTheDocument();
  });
});
