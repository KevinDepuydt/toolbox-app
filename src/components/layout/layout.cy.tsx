import React from 'react'
import Layout from './layout'
import * as NextRouter from 'next/router'

describe('<Layout />', () => {
  before(() => {
    cy.stub(NextRouter, 'useRouter').returns({ asPath: '/' })
  })

  it('renders layout', () => {
    cy.mount(
      <Layout>
        <p>Hello world</p>
      </Layout>
    )
    cy.get('[data-cy="layout"]').should('be.visible')
    cy.get('[data-cy="layout-title"]').should('have.text', 'Kevin\'s tools')
    cy.get('[data-cy="layout-subtitle"]').should('have.text', 'A list of tools to handle digital tasks')
    cy.get('[data-cy="breadcrumb"]').should('be.visible')
    cy.get('[data-cy="layout-content"]').should('be.visible').and('contain.text', 'Hello world')
  })
})
