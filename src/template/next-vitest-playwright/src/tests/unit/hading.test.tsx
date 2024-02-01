import { render, screen } from "@testing-library/react";
import { Heading } from "@/components";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/config/env", () => ({
  env: {
    WELCOME_MESSAGE: "We are here to help you with your Next.js project 🥳",
  },
}));

describe("Heading Component", () => {
  test("should render Heading Component properly", () => {
    render(<Heading />);

    expect(
      screen.getByText(/Hey, let’s build something together?/i)
    ).toBeDefined();

    expect(
      screen.getByText(/We are here to help you with your Next.js project 🥳/i)
    ).toBeDefined();
  });
});
