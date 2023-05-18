import React, { useState } from 'react'
import { useNotifications } from '@contexts/notifications'
import PdfSignWrapper from '@components/pages/pdf-sign/pdf-sign-wrapper/pdf-sign-wrapper'


export default function PDFSignPage() {
  const notify = useNotifications()
  const [pdfFile, setPdfFile] = useState<File>()

  function handleSelect(files: File[]) {
    if (files.length > 0) {
      setPdfFile(files[0])
    }
  }

  return (
    <PdfSignWrapper
      file={pdfFile}
      onFileSelect={handleSelect}
    />
  );
}
