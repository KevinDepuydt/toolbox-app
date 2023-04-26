import react from 'react'

describe('compress image spec', () => {
  const assetsFixturesBasePath = 'cypress/fixtures/assets'
  const error = 'Image format not supported'

  before(() => {
    cy.fixture('layout').as('layout')
    cy.fixture('assets/sample-png-min.png').as('compressedPngImage')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/image-compress')
  })

  context('when this page is loaded', () => {
    it('renders the page layout', function() {
      cy.get('[data-cy="layout"]').should('be.visible')
      cy.get('[data-cy="layout-title"]').should('have.text', this.layout.title)
      cy.get('[data-cy="layout-subtitle"]').should('have.text', this.layout.description)
    })

    it('renders the page breadcrumb', () => {
      cy.get('[data-cy="breadcrumb"]').should('be.visible')
      cy.get('[data-cy="breadcrumb-item"]').should('have.length', 2)
      cy.get('[data-cy="breadcrumb-item"]').first().should('contain.text', 'Home')
      cy.get('[data-cy="breadcrumb-item"]').eq(1).should('contain.text', 'image-compress')
    })

    it('renders the file drop zone', () => {
      cy.get('[data-cy="file-drop-zone"]').should('be.visible')
      cy.get('[data-cy="file-drop-zone-input"]').should('not.be.visible')
      cy.get('[data-cy="file-drop-zone-message"]').should('be.visible')
    })
  })

  context('when no images have been selected', () => {
    it('renders an empty image list', () => {
      cy.get('[data-cy="image-list"]').should('exist').and('not.be.visible')
      cy.get('[data-cy="image-compress-list-item"]').should('not.exist')
    })
  })

  context('when images have been selected but not processed', () => {
    const filenames = ['sample-png.png']

    beforeEach(function() {
      cy.intercept(
        'POST',
        '/api/image-compress',
        {
          delay: 10000,
          statusCode: 200,
          body: {
            type: 'image/png',
            base64: this.compressedPngImage
          }
        })
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
    })

    it('renders the processing images', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-compress-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="status"]').should('contain.text', 'Compressing image')
    })

    it('does not handle image download', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('be.disabled')
    })

    it('does not handle image preview', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-compress-list-item"]').should('not.exist')
    })
  })

  context('when images have been selected and processed', () => {
    const filenames = ['sample-png.png']

    beforeEach(function() {
      cy.intercept(
        'POST',
        '/api/image-compress',
        {
          statusCode: 200,
          body: {
            type: 'image/png',
            base64: this.compressedPngImage
          }
        }).as('apiRequest')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
      cy.wait('@apiRequest')
    })

    it('renders the processed images', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-compress-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="status"]').should('contain.text', 'File size is now')
    })

    it('handles image download', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('not.be.disabled')
    })

    it('handles image preview', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('not.be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-compress-list-item"]').should('not.exist')
    })
  })

  context('when images have been selected but not processed successfully', () => {
    const filenames = ['sample-gif.gif']

    beforeEach(() => {
      cy.intercept(
        'POST',
        '/api/image-compress',
        {
          statusCode: 400,
          body: { error }
        }).as('apiRequestError')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
      cy.wait('@apiRequestError', { timeout: 10000 })
    })

    it('renders the processed images', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-compress-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="status"]').should('contain.text', error)
    })

    it('does not handle image download', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('be.disabled')
    })

    it('does not handle image preview', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-compress-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-compress-list-item"]').should('not.exist')
    })
  })
})
