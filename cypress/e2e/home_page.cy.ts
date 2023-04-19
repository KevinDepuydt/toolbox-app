import React from 'react'

const HOME_URL = 'http://localhost:3000'

describe('home page spec', () => {
  beforeEach(() => {
    cy.visit(HOME_URL)
  })

  it('renders the page layout', () => {
    cy.get('[data-cy="layout"]').should('be.visible')
    cy.get('[data-cy="layout-title"]').should('have.text', 'Kevin\'s tools')
    cy.get('[data-cy="layout-subtitle"]').should('have.text', 'A list of tools to handle digital tasks')
  })

  it('renders the page breadcrumb', () => {
    cy.get('[data-cy="breadcrumb"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-item"]').should('have.length', 1)
    cy.get('[data-cy="breadcrumb-item"]').first().should('contain.text', 'Home')
  })

  it('renders the feature list',  () => {
    cy.get('[data-cy="feature-list"]').should('be.visible')
    cy.get('[data-cy="feature-list"]').children('[data-cy="feature-list-item"]').should('have.length', 1)
  })

  it('redirects to the feature page when user clicks a feature item', function() {
    cy.get('[data-cy="feature-list-item"]').first().invoke('attr', 'href').then((href) => {
      cy.get('[data-cy="feature-list-item"]').first().click()
      cy.url().should('include', href)
    })
  })
})
