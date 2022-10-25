/// <reference types="cypress" />


describe('Angular events app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/events')
  })

  it('displays correct data for events on the main page', () => {
    cy.get('.eventName').should('have.length', 5)
    cy.get('.eventName').first().should('have.text', 'ANGULAR CONNECT')
    cy.get('.eventName').last().should('have.text', 'NG-VEGAS')
  })

  it('routes to correct event page on click', () => {
    cy.get('[data-cy="eventDetails"]').first().click();
    cy.location().should((URL) => {
      expect(URL.toString()).to.eq(
        'http://localhost:4200/events/1'
      )
    }
    )
  })
});