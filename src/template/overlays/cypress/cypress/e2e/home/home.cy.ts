/// <reference types="cypress" />

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays home page properly", () => {
    cy.contains("Hey, let's build something together?");
    cy.contains("We are here to help you with your Next.js project");
  });
});
