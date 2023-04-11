import React from 'react'
import BreadcrumbItem from './breadcrumb-item'


describe('<BreadcrumbItem />', () => {
  const label = 'label'
  const path = '/path'
  const item: BreadcrumbItem = {
    label,
    path
  }

  it('renders as text', () => {
    cy.mount(<BreadcrumbItem item={item} last={true} />)
    cy.get('span').should('contain.text', label)
    cy.get('a').should('not.exist')
    cy.get('svg').should('not.exist')
  })

  it('renders as link', () => {
    cy.mount(<BreadcrumbItem item={item} last={false} />)
    cy.get('a')
      .should('have.attr', 'href', path)
      .and('contain.text', label)
    cy.get('svg').should('be.visible')
    cy.get('span').should('not.exist')
  })
})
