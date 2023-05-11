import React from 'react'
import NotificationItem from './notification-item'
import styles from './notification-item.module.css'

describe('<NotificationItem />', () => {
  beforeEach(function() {
    cy.fixture('notifications').as('notifications')
  })

  it('renders info notification', function () {
    const { infoNotification: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]').should('be.visible')
      .and('have.class', styles.info)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]').should('not.exist')
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders info notification with title', function () {
    const { infoNotificationWithTitle: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.info)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]')
      .should('exist')
      .and('contain.text', notification.title)
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders success notification', function () {
    const { successNotification: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.success)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]').should('not.exist')
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders success notification with title', function () {
    const { successNotificationWithTitle: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.success)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]')
      .should('exist')
      .and('contain.text', notification.title)
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders warning notification', function () {
    const { warningNotification: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.warning)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]').should('not.exist')
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders warning notification with title', function () {
    const { warningNotificationWithTitle: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.warning)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]')
      .should('exist')
      .and('contain.text', notification.title)
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders error notification', function () {
    const { errorNotification: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.error)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]').should('not.exist')
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('renders error notification with title', function () {
    const { errorNotificationWithTitle: notification } = this.notifications
    cy.mount(<NotificationItem notification={notification} onDelete={cy.stub()} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.error)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').find('[data-cy="title"]')
      .should('exist')
      .and('contain.text', notification.title)
    cy.get('[data-cy="notification-item"]').find('[data-cy="message"]').should('contain.text', notification.message)
  })

  it('handle notification delete when notification is clicked', function () {
    const { errorNotificationWithTitle: notification } = this.notifications
    const onDelete = cy.spy(cy.stub()).as('onDeleteSpy')
    cy.mount(<NotificationItem notification={notification} onDelete={onDelete} />)
    cy.get('[data-cy="notification-item"]')
      .should('be.visible')
      .and('have.class', styles.error)
      .and('have.attr', 'data-notification-type', notification.type)
    cy.get('[data-cy="notification-item"]').click()
    cy.get('@onDeleteSpy').should('be.calledOnce')
    cy.get('@onDeleteSpy').should('be.calledWith', notification.id)
    cy.wait(1000)
    cy.get('[data-cy="notification-item"]').should('not.exist')
  })
})