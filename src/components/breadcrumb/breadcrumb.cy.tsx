import React from 'react'
import * as NextRouter from 'next/router'
import Breadcrumb from './breadcrumb'


describe('<Breadcrumb />', () => {
  const homeLabel = 'Home'

  context('user navigated to home page', () => {
    before(() => {
      cy.stub(NextRouter, 'useRouter').returns({ asPath: '/' })
    })

    it('renders home element only', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav[data-cy="breadcrumb"]').should('be.visible')
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').should('have.length', 1)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').first().should('have.text', homeLabel)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').eq(1).should('not.exist')
    })
  })

  context('user navigated to "/path" page', () => {
    const pathArray = ['', 'path']

    before(() => {
      cy.stub(NextRouter, 'useRouter').returns({ asPath: pathArray.join('/') })
    })

    it('renders all elements of path', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav[data-cy="breadcrumb"]').should('be.visible')
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').should('have.length', pathArray.length)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').first().should('have.text', homeLabel)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').eq(1).should('have.text', pathArray[1])
    })
  })

  context('user navigated to "/some/nested/path" page', () => {
    const pathArray = ['', 'some', 'nested', 'path']

    before(() => {
      cy.stub(NextRouter, 'useRouter').returns({ asPath: pathArray.join('/') })
    })

    it('renders all elements of path', () => {
      cy.mount(<Breadcrumb />)
      cy.get('nav[data-cy="breadcrumb"]').should('be.visible')
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').should('have.length', pathArray.length)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').first().should('have.text', homeLabel)
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').eq(1).should('have.text', pathArray[1])
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').eq(2).should('have.text', pathArray[2])
      cy.get('nav[data-cy="breadcrumb"]').children('[data-cy="breadcrumb-item"]').eq(3).should('have.text', pathArray[3])
    })
  })
})
