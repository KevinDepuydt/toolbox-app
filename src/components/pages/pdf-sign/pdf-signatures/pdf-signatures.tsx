import React from 'react'
import Button from '@components/button/button'
import styles from './pdf-signatures.module.css'


type PdfSignaturesProps = {}

export default function PdfSignatures({}: PdfSignaturesProps) {
  function addSignature() {}

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Signatures</h3>
      <div>
        {/* signatures list goes here */}
      </div>
      <Button style="default" fluid={true} onClick={addSignature} className="mt-4">
        Add signature
      </Button>
    </div>
  )
}
