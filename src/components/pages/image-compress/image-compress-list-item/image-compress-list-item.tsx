import { DownloadIcon, EyeIcon, LoadingIcon, TrashIcon } from '@components/icons'
import fileService from '@services/file'
import useImageStatus from '@hooks/image-status'
import { formatFileSize } from './image-compress-list-item.utils'
import styles from './image-compress-list-item.module.css'


type ImageCompressListItemProps = {
  image: ImageCompressState,
  onDelete: (image: ImageCompressState) => void
}

export default function ImageCompressListItem({ image, onDelete }: ImageCompressListItemProps) {
  const { isDone, isProcessing, isError } = useImageStatus(image)

  async function handleDownload() {
    if (image.outputFile) {
      const src = await fileService.fileToDataUrl(image.outputFile)
      const link = document.createElement('a')
      link.setAttribute('href', src)
      link.setAttribute('download', image.outputFile.name)
      link.click()
    }
  }

  function handleDelete() {
    onDelete(image)
  }

  function handleOpen() {
    if (image.outputFile) {
      const url = URL.createObjectURL(image.outputFile)
      window.open(url, '_blank')
    }
  }

  return (
    <div data-cy="image-compress-list-item" className={styles.container}>
      <div className={styles.details}>
        <p data-cy="filename" className={styles.filename}>{image.inputFile.name}</p>
        <p data-cy="status" className={styles.status}>
          {isProcessing && <span>Compressing image ...</span>}
          {isDone && image.outputFile && <span className={styles.successStatus}>File size is now {formatFileSize(image.outputFile)} ({image.outputFileSizeDiff}%)</span>}
          {isError && <span className={styles.errorStatus}>{image.error}</span>}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          data-cy="preview-button"
          onClick={handleOpen}
          disabled={!image.outputFile}
          className={styles.buttonDefault}
        >
          <EyeIcon />
          <span className="sr-only">Preview</span>
        </button>
        <button
          data-cy="download-button"
          onClick={handleDownload}
          disabled={!isDone || !image.outputFile}
          className={styles.successButton}
        >
          {isDone ? <DownloadIcon /> : <LoadingIcon />}
          <span className="sr-only">Download</span>
        </button>
        <button
          data-cy="delete-button"
          onClick={handleDelete}
          className={styles.errorButton}
        >
          <TrashIcon />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  )
}