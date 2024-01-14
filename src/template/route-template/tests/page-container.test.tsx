import { render, screen } from "@testing-library/react";
import { PageContainer, WelcomeMessage } from "../components";
import { describe, expect, test } from "vitest";

describe("PageContainer", () => {
  test("renders page container with children", () => {
    render(
      <PageContainer>
        <div>This is a simple test example</div>
      </PageContainer>
    );

    const message = screen.getByText(`This is a simple test example`);

    expect(message).toBeInTheDocument();
  });
});
