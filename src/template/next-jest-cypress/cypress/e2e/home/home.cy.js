/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays home page properly", () => {
    cy.contains("Hey, let’s build something together?");
    cy.contains("We are here to help you with your Next.js project 🥳");
  });
});
