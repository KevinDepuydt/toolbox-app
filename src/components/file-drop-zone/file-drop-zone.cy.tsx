import React from 'react'
import FileDropZone from './file-drop-zone'


describe('<FileDropZone />', () => {
  const assetsFixturesBasePath = 'cypress/fixtures/assets'
  const accept = 'image/*'
  let files: File[] = []
  const onSelect = (selectedFiles: File[]) => {
    console.log('onSelect', selectedFiles)
    files = selectedFiles
  }

  beforeEach(() => {
    files = []
  })

  it('renders the component properly', () => {
    cy.mount(<FileDropZone accept={accept} onSelect={onSelect} />)
    cy.get('input[type=file]')
      .should('have.attr', 'accept', accept)
      .and('not.be.visible')
    cy.get('p').should('have.text', 'Drop files here or click to select')
  })

  context('when user select files', () => {
    it('selects one file', () => {
      const filenames = ['sample-png.png']
      const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')

      cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)

      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
        .then(() => {
          expect(files).to.have.length(1)
          expect(files[0]).to.have.property('name', filenames[0])
        })

      cy.get('@onSelectSpy').should('be.calledOnce')
    })

    it('selects multiple files', () => {
      const filenames = ['sample-gif.gif', 'sample-png.png', 'sample-jpg.jpg', 'sample-svg.svg']
      const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')

      cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)

      cy.get('input[type=file]')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select', force: true })
        .then(() => {
          expect(files).to.have.length(4)
          expect(files[0]).to.have.property('name', filenames[0])
          expect(files[1]).to.have.property('name', filenames[1])
          expect(files[2]).to.have.property('name', filenames[2])
          expect(files[3]).to.have.property('name', filenames[3])
        })

      cy.get('@onSelectSpy').should('be.calledOnce')
    })


    // We cannot handle the following test case
    // because the option { force: true } on selectFile command bypass the accept attribute
    // and make every file loading
    //
    // it('selects only accepted files', () => {
    //   const filenames = ['sample-text.txt', 'sample-pdf.pdf', 'sample-png.png', 'sample-jpg.jpg']
    //   const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')
    //
    //   cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)
    //
    //   // override display property to be able to test with the accept attribute
    //   cy.get('input[type=file]').invoke('attr', 'style', 'display: block')
    //
    //   cy.get('input[type=file]')
    //     .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'select' })
    //     .then(() => {
    //       // console.log({ files })
    //       expect(files).to.have.length(2)
    //       expect(files[0]).to.have.property('name', filenames[1])
    //       expect(files[1]).to.have.property('name', filenames[2])
    //     })
    //
    //   cy.get('@onSelectSpy').should('be.calledOnce')
    // })
  })

  context('when user drag and drop files', () => {
    it('selects one file', () => {
      const filenames = ['sample-png.png']
      const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')

      cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)

      cy.get('div p')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'drag-drop' })
        .then(() => {
          expect(files).to.have.length(1)
          expect(files[0]).to.have.property('name', filenames[0])
        })

      cy.get('@onSelectSpy').should('be.calledOnce')
    })

    it('selects multiple files', () => {
      const filenames = ['sample-gif.gif', 'sample-png.png', 'sample-jpg.jpg', 'sample-svg.svg']
      const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')

      cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)

      cy.get('div p')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'drag-drop' })
        .then(() => {
          expect(files).to.have.length(4)
          expect(files[0]).to.have.property('name', filenames[0])
          expect(files[1]).to.have.property('name', filenames[1])
          expect(files[2]).to.have.property('name', filenames[2])
          expect(files[3]).to.have.property('name', filenames[3])
        })

      cy.get('@onSelectSpy').should('be.calledOnce')
    })

    it('selects only accepted files', () => {
      const filenames = ['sample-pdf.pdf', 'sample-png.png', 'sample-jpg.jpg']
      const onSelectSpy = cy.spy(onSelect).as('onSelectSpy')

      cy.mount(<FileDropZone accept={accept} onSelect={onSelectSpy} />)

      // drag-n-drop on p element instead of div container
      // to prevent selectFile command issue with nodes that haven children
      cy.get('div p')
        .selectFile(filenames.map((filename) => `${assetsFixturesBasePath}/${filename}`), { action: 'drag-drop' })
        .then(() => {
          expect(files).to.have.length(2)
          expect(files[0]).to.have.property('name', filenames[1])
          expect(files[1]).to.have.property('name', filenames[2])
        })

      cy.get('@onSelectSpy').should('be.calledOnce')
    })
  })
})
