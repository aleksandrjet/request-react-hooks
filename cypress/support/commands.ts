/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-cy-id=${selector}]`, ...args)
})
