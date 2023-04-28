import React from 'react'
import ImageCompressListItem from './image-compress-list-item'


describe('<ImageCompressListItem />', () => {
  before(function () {
    cy.fixture('assets/sample-png.png').as('pngImage')
  })

  beforeEach(function() {
    this.pngImageFile = new File(
      [Cypress.Blob.base64StringToBlob(this.pngImage, 'image/png')],
      'sample-png.png',
      { type: 'image/png' }
    )
  })

  context('when image item is not processed', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        done: false,
        error: undefined
      }
    })

    it('renders image item', function() {
      cy.mount(<ImageCompressListItem image={this.image} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-compress-list-item"]').should('exist')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="status"]').should('contain.text', 'Compressing image')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })

    it('handles image item delete button click', function() {
      const onDeleteSpy = cy.spy(cy.stub()).as('onDeleteSpy')
      cy.mount(<ImageCompressListItem image={this.image} onDelete={onDeleteSpy} />)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').click()
      cy.get('@onDeleteSpy').should('be.calledOnce')
      cy.get('@onDeleteSpy').should('be.calledWith', this.image)
    })
  })

  context('when image item is processed successfully', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: this.pngImageFile,
        done: true,
        error: undefined
      }
    })

    it('renders image item', function() {
      cy.mount(<ImageCompressListItem image={this.image} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-compress-list-item"]').should('exist')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="status"]').should('contain.text', 'File size is now')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('not.be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('not.be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })

    it('handles image item delete button click', function() {
      const onDeleteSpy = cy.spy(cy.stub()).as('onDeleteSpy')
      cy.mount(<ImageCompressListItem image={this.image} onDelete={onDeleteSpy} />)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').click()
      cy.get('@onDeleteSpy').should('be.calledOnce')
      cy.get('@onDeleteSpy').should('be.calledWith', this.image)
    })
  })

  context('when image item is not processed successfully', () => {
    beforeEach(function() {
      this.error = "Error compressing image"
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        done: true,
        error: this.error
      }
    })

    it('renders image item', function() {
      cy.mount(<ImageCompressListItem image={this.image} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-compress-list-item"]').should('exist')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="status"]').should('contain.text', this.error)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })

    it('handles image item delete button click', function() {
      const onDeleteSpy = cy.spy(cy.stub()).as('onDeleteSpy')
      cy.mount(<ImageCompressListItem image={this.image} onDelete={onDeleteSpy} />)
      cy.get('[data-cy="image-compress-list-item"]').find('[data-cy="delete-button"]').click()
      cy.get('@onDeleteSpy').should('be.calledOnce')
      cy.get('@onDeleteSpy').should('be.calledWith', this.image)
    })
  })
})
