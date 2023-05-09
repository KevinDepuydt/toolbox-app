import { useEffect, useReducer } from 'react'
import { ArrowDownTrayIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import fileService from '@services/file'
import useImageStatus from '@hooks/image-status'
import { LoadingIcon } from '@components/icons'
import Alert from '@components/alert/alert'
import { initialState, reducer } from './image-compress-list-item.reducer'
import styles from './image-compress-list-item.module.css'


type ImageCompressListItemProps = {
  image: ImageCompressState,
  onDelete: (image: ImageCompressState) => void
}

export default function ImageCompressListItem({ image, onDelete }: ImageCompressListItemProps) {
  const { isDone, isProcessing, isError } = useImageStatus(image)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: image.status, image })
  }, [image])

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
        <Alert
          type={state.alertType}
          message={state.alertMessage}
          discreet={true}
        />
      </div>
      <div className={styles.actions}>
        <button
          data-cy="preview-button"
          onClick={handleOpen}
          disabled={!image.outputFile}
          className={styles.buttonDefault}
        >
          <EyeIcon width={20} height={20} strokeWidth={2} />
          <span className="sr-only">Preview</span>
        </button>
        <button
          data-cy="download-button"
          onClick={handleDownload}
          disabled={!isDone || !image.outputFile}
          className={styles.successButton}
        >
          {isDone ? <ArrowDownTrayIcon height={20} width={20} strokeWidth={2} /> : <LoadingIcon />}
          <span className="sr-only">Download</span>
        </button>
        <button
          data-cy="delete-button"
          onClick={handleDelete}
          className={styles.errorButton}
        >
          <TrashIcon width={20} height={20} strokeWidth={2} />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  )
}
