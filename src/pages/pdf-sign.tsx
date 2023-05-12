import React, { useState } from 'react'
import { useNotifications } from '@contexts/notifications'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'


export default function PDFSignPage() {
  const notify = useNotifications()
  const [pdfFile, setPdfFile] = useState<File>()

  function handleSelect(files: File[]) {
    if (files.length > 0) {
      setPdfFile(files[0])
    }
  }

  return (
    <>
      <FileDropZone
        accept="application/pdf"
        onSelect={handleSelect}
        multiple={false}
      />
    </>
  );
}
