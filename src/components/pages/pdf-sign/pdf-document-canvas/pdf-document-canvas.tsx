import React, { useRef, useEffect } from 'react'
import * as PDFJS from 'pdfjs-dist'
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import styles from './pdf-document-canvas.module.css'

type PdfDocumentCanvasProps = {
  file: File
}

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function PdfDocumentCanvas({ file }: PdfDocumentCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      if (file && containerRef.current) {
        try {
          const pdfArrayBuffer = await file.arrayBuffer()
          const pdf = await PDFJS.getDocument(pdfArrayBuffer).promise
          containerRef.current.innerHTML = ''

          for (let i = 1; i <= pdf.numPages; i++) {
            // get current page
            const page = await pdf.getPage(i)

            // get page viewport
            const viewport = page.getViewport({ scale: window.devicePixelRatio })

            // create page canvas
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.className = styles.canvas
            canvas.height = viewport.height
            canvas.width = viewport.width

            // draw page into canvas
            page.render({
              canvasContext: context as CanvasRenderingContext2D,
              viewport: viewport
            });

            // append canvas to container
            containerRef.current.appendChild(canvas)
          }
        } catch (e) {
          console.error(e)
        }
      }
    })()
  }, [file, containerRef])

  return <div ref={containerRef}></div>;
}
