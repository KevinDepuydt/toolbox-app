import React from 'react'
import Button from './button'


describe('<Button />', () => {
  const label = 'Click me'
  const customClass = 'testing-class'
  const logMessage = 'clicked!'
  const onClick = () => console.log(logMessage)

  beforeEach(() => {
    cy.window().then((win) => {
      cy.wrap(cy.spy(win.console, 'log')).as('consoleLog')
    })
  })

  it('renders with expected label', () => {
    cy.mount(<Button label={label} onClick={onClick} />)
    cy.get('button').should('contain.text', label)
  })

  it('renders with expected children', () => {
    const children = <span>{label}</span>
    cy.mount(<Button onClick={onClick}>{children}</Button>)
    cy.get('button')
      .should('contain.html', `<span>${label}</span>`)
      .and('contain.text', label)
  })

  it('renders with expected classname', () => {
    cy.mount(<Button label={label} onClick={onClick} className={customClass} />)
    cy.get('button').should('have.class', customClass)
  })

  it('runs onClick as expected', () => {
    cy.mount(<Button label={label} onClick={onClick} />)
    cy.get('button').click()
    cy.get('@consoleLog').should('be.calledWith', logMessage)
  })
})
