import React from 'react'
import * as NextRouter from 'next/router'
import Breadcrumb from './breadcrumb'

describe('<Breadcrumb />', () => {
  context('user navigated to home page', () => {
    before(() => {
      const asPath = '/'
      cy.stub(NextRouter, 'useRouter').returns({ asPath })
    })

    it('renders home element only', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav').should('be.visible')
      cy.get('nav').children().should('have.length', 1)
      cy.get('nav').children().first().should('have.text', 'Home')
      cy.get('nav').children().eq(1).should('not.exist')
    })
  })

  context('user navigated to "/path" page', () => {
    before(() => {
      const asPath = '/path'
      cy.stub(NextRouter, 'useRouter').returns({ asPath })
    })

    it('renders all elements of path', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav').should('be.visible')
      cy.get('nav').children().should('have.length', 2)
      cy.get('nav').children().first().should('have.text', 'Home')
      cy.get('nav').children().eq(1).should('have.text', 'path')
    })
  })

  context('user navigated to "/some/nested/path" page', () => {
    before(() => {
      const asPath = '/some/nested/path'
      cy.stub(NextRouter, 'useRouter').returns({ asPath })
    })

    it('renders all elements of path', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav').should('be.visible')
      cy.get('nav').children().should('have.length', 4)
      cy.get('nav').children().first().should('have.text', 'Home')
      cy.get('nav').children().eq(1).should('have.text', 'some')
      cy.get('nav').children().eq(2).should('have.text', 'nested')
      cy.get('nav').children().eq(3).should('have.text', 'path')
    })
  })
})
