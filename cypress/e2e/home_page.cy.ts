import React from 'react'

describe('home page spec', () => {
  before(() => {
    cy.fixture('layout').as('layout')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('renders the page layout', function() {
    cy.get('[data-cy="layout"]').should('be.visible')
    cy.get('[data-cy="layout-title"]').should('have.text', this.layout.title)
    cy.get('[data-cy="layout-subtitle"]').should('have.text', this.layout.description)
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

  it('redirects to the feature page when user clicks a feature item', () => {
    cy.get('[data-cy="feature-list-item"]').first().invoke('attr', 'href').then((href) => {
      cy.get('[data-cy="feature-list-item"]').first().click()
      cy.url().should('include', href)
    })
  })
})
