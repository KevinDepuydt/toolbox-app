import { ALERT_TYPE, AlertType, IMAGE_STATUS, ImageStatus } from '@constants'
import { formatFileSize } from './image-compress-list-item.utils'

type ImageCompressListItemState = {
  alertType: AlertType
  alertMessage: string
}

type Action = {
  type: ImageStatus
  image: ImageCompressState
}

export const initialState = {
  alertType: ALERT_TYPE.INFO,
  alertMessage: 'Compressing image ...'
}

export function reducer(state: ImageCompressListItemState, action: Action) {
  const newState = { ...state }
  const { type, image } = action
  switch (type) {
    case IMAGE_STATUS.NONE:
    case IMAGE_STATUS.PROCESSING:
      newState.alertType = ALERT_TYPE.INFO
      newState.alertMessage = 'Compressing image ...'
      break
    case IMAGE_STATUS.DONE:
      newState.alertType = ALERT_TYPE.SUCCESS
      if (image.outputFile) {
        newState.alertMessage = `File size is now ${formatFileSize(image.outputFile)} (${image.outputFileSizeDiff}%)`
      } else {
        newState.alertMessage = 'Image compressed successfully'
      }
      break
    case IMAGE_STATUS.ERROR:
      newState.alertType = ALERT_TYPE.ERROR
      newState.alertMessage = image.error || 'Image cannot be compressed'
      break
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

  return newState
}
