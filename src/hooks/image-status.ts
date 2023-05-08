import { useEffect, useReducer } from 'react'
import { IMAGE_STATUS, ImageStatus } from '@constants'


type ImageStatusState = {
  isNone: boolean
  isProcessing: boolean
  isDone: boolean
  isError: boolean
}

type Action = {
  type: ImageStatus
}

const initialState = {
  isNone: true,
  isProcessing: false,
  isDone: false,
  isError: false,
}

function imageStatusReducer(state: ImageStatusState, action: Action) {
  const newState = { isNone: false, isProcessing: false, isDone: false, isError: false }
  console.log('imageStatusReducer', state, action)
  switch (action.type) {
    case IMAGE_STATUS.NONE:
      newState.isNone = true
      break
    case IMAGE_STATUS.PROCESSING:
      newState.isProcessing = true
      break
    case IMAGE_STATUS.DONE:
      newState.isDone = true
      break
    case IMAGE_STATUS.ERROR:
      newState.isError = true
      break
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

  return newState
}

export default function useImageStatus(image: ImageState) {
  const [imageStatus, dispatch] = useReducer(imageStatusReducer, initialState)

  console.log('useImageStatus', image, imageStatus)
  useEffect(() => {
    dispatch({ type: image.status })
  }, [image])

  return imageStatus
}
