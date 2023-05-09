import react from 'react'

describe('convert image page spec', () => {
  const outputFormat = 'jpeg'
  const nextOutputFormat = 'gif'
  const assetsFixturesBasePath = 'cypress/fixtures/assets'
  const error = 'Error converting image'

  before(() => {
    cy.fixture('layout').as('layout')
    cy.fixture('assets/sample-png-converted.jpeg').as('convertedPngImage')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/image-convert')
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
      cy.get('[data-cy="breadcrumb-item"]').eq(1).should('contain.text', 'image-convert')
    })

    it('renders the file drop zone', () => {
      cy.get('[data-cy="file-drop-zone"]').should('be.visible')
      cy.get('[data-cy="file-drop-zone-input"]').should('not.be.visible')
      cy.get('[data-cy="file-drop-zone-message"]').should('be.visible')
    })
  })

  context('when no image have been selected', () => {
    it('renders an empty image list', () => {
      cy.get('[data-cy="image-list"]').should('exist').and('not.be.visible')
      cy.get('[data-cy="image-convert-list-item"]').should('not.exist')
    })
  })

  context('when image have been selected', () => {
    const filenames = ['sample-png.png']

    beforeEach(function() {
      cy.intercept(
        'POST',
        '/api/image-convert',
        {
          delay: 10000,
          statusCode: 200,
          body: {
            type: `image/${outputFormat}`,
            base64: this.convertedPngImage
          }
        })
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
    })

    it('renders the selected image', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-convert-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="alert"]').should('contain.text', 'Select the image output format')
    })

    it('renders the right image output format options', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').should('be.visible')
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').find('option').should('not.contain.text', 'png')
    })

    it('handles image output format change', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').should('have.value', outputFormat)
    })

    it('does not handle image convert when output is not selected', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]')
        .should('contain.text', 'Convert')
        .and('be.disabled')
    })

    it('handles image convert when output is selected', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').should('have.value', outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]').should('not.be.disabled')
    })

    it('does not handle image download', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('be.disabled')
    })

    it('does not handle image preview', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-convert-list-item"]').should('not.exist')
    })
  })

  context('when image have been selected and is processing', () => {
    const filenames = ['sample-png.png']

    beforeEach(function() {
      cy.intercept(
        'POST',
        '/api/image-convert',
        {
          delay: 10000,
          statusCode: 200,
          body: {
            type: 'image/jpeg',
            base64: this.convertedPngImage
          }
        }).as('apiRequest')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })

      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]').click()
    })

    it('renders the processed image', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-convert-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="alert"]').should('contain.text', 'Converting image')
    })

    it('does not handle image output format change', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]')
        .should('have.value', outputFormat)
        .and('be.disabled')
    })

    it('does not handle image convert', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]')
        .should('contain.text', 'Convert')
        .and('be.disabled')
    })

    it('does not handles image download', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('be.disabled')
    })

    it('does not handle image preview', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-convert-list-item"]').should('not.exist')
    })
  })

  context('when image have been selected and processed', () => {
    const filenames = ['sample-png.png']

    beforeEach(function() {
      cy.intercept(
        'POST',
        '/api/image-convert',
        {
          statusCode: 200,
          body: {
            type: 'image/jpeg',
            base64: this.convertedPngImage
          }
        }).as('apiRequest')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })

      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]').click()

      cy.wait('@apiRequest')
    })

    it('renders the processed image', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-convert-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="alert"]').should('contain.text', 'image generated successfully')
    })

    it('handles image output format change', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(nextOutputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]')
        .should('have.value', nextOutputFormat)
        .and('not.be.disabled')
    })

    it('does not handle image convert unless output format changed', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]')
        .should('contain.text', 'Convert')
        .and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(nextOutputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]')
        .should('contain.text', 'Convert')
        .and('not.be.disabled')
    })

    it('handles image download', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('not.be.disabled')
    })

    it('handles image preview', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('not.be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-convert-list-item"]').should('not.exist')
    })
  })

  context('when image have been selected but not processed successfully', () => {
    const filenames = ['sample-png.png']

    beforeEach(() => {
      cy.intercept(
        'POST',
        '/api/image-convert',
        {
          statusCode: 400,
          body: { error }
        }).as('apiRequestError')
      cy.wait(2000)
    })

    beforeEach(() => {
      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })

      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(outputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]').click()

      cy.wait('@apiRequestError', { timeout: 10000 })
    })

    it('renders the processed image', () => {
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-convert-list-item"]').should('have.length', filenames.length)
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="filename"]').should('contain.text', filenames[0])
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="alert"]').should('contain.text', error)
    })

    it('handles image output format change', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]').select(nextOutputFormat)
      cy.get('[data-cy="image-convert-list-item"]').first().find('select[data-cy="output-format"]')
        .should('have.value', nextOutputFormat)
        .and('not.be.disabled')
    })

    it('handles image convert', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="convert-button"]')
        .should('contain.text', 'Convert')
        .and('not.be.disabled')
    })

    it('does not handle image download', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="download-button"]')
        .should('contain.text', 'Download')
        .and('be.disabled')
    })

    it('does not handle image preview', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="preview-button"]')
        .should('contain.text', 'Preview')
        .and('be.disabled')
    })

    it('handles image delete', () => {
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]')
        .should('contain.text', 'Delete')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').first().find('[data-cy="delete-button"]').click()
      cy.get('[data-cy="image-convert-list-item"]').should('not.exist')
    })
  })
})
