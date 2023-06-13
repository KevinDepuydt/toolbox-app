import React from 'react'
import PdfSignatures from '@components/pages/pdf-sign/pdf-signatures/pdf-signatures'
import PdfDocument from '@components/pages/pdf-sign/pdf-document/pdf-document'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'
import Button from '@components/button/button'
import styles from './pdf-sign-wrapper.module.css'


type PdfSignWrapperProps = {
  file?: File
  onFileSelect: (files: File[]) => void
  onFileDelete: () => void
  onFileSign: () => void
}

export default function PdfSignWrapper({ file, onFileSelect, onFileDelete, onFileSign }: PdfSignWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {file ? (
          <PdfDocument file={file} />
        ) : (
          <FileDropZone
            accept="application/pdf"
            onSelect={onFileSelect}
            multiple={false}
          />
        )}
      </div>
      <div className={styles.sidebar}>
        <PdfSignatures />
        <Button style="success" fluid={true} onClick={onFileSign} className="mt-4">
          <span>Sign document</span>
        </Button>
        <Button style="danger" disabled={!file} fluid={true} onClick={onFileDelete} className="mt-4">
          <span>Delete document</span>
        </Button>
      </div>
    </div>
  )
}
