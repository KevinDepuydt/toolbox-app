import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import apiService from '@services/api'
import fileService from '@services/file'
import { IMAGE_STATUS } from '@constants'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'
import ImageList from '@components/image-list/image-list'
import ImageConvertListItem from '@components/pages/image-convert/image-convert-list-item/image-convert-list-item'
import { useNotifications } from '@contexts/notifications'


export default function ImageConvertPage() {
  const notify = useNotifications()
  const [images, setImages] = useState<ImageConvertState[]>([])

  function handleSelect(files: File[]) {
    if (files.length > 0) {
      files.forEach((file) => addImage(file))
    }
  }

  function addImage(file: File) {
    setImages((state) => [...state, { id: uuid(), inputFile: file, status: IMAGE_STATUS.NONE }])
  }

  function updateImage(image: ImageConvertState, updates: Partial<ImageConvertState>) {
    setImages(
      (arr) => arr.map(
        (item) => item.id === image.id
          ? { ...image, ...updates }
          : item
      )
    )
  }

  async function convertImage(image: ImageConvertState) {
    try {
      updateImage(image, { status: IMAGE_STATUS.PROCESSING })
      const { data } = await apiService.convertImage(image)
      const file = await fileService.base64ToFile(data.base64, data.type, image.inputFile.name)
      updateImage(image, {
        status: IMAGE_STATUS.DONE,
        outputFile: file,
        outputFileSizeDiff: fileService.compareFilesSize(image.inputFile, file)
      })
      notify.success({
        title: 'Your image is ready',
        message: `the image "${image.inputFile.name}" have been converted successfully`
      })
    } catch (e: any) {
      updateImage(image, {
        status: IMAGE_STATUS.ERROR,
        error: e.response?.data?.error || e.message
      })
      notify.error({
        title: 'Oops',
        message: `the image "${image.inputFile.name}" conversion failed`
      })
    }
  }

  function deleteImage(image: ImageConvertState) {
    setImages(
      (arr) => arr.filter(
        (item) => item.id !== image.id
      )
    )
  }

  return (
    <>
      <FileDropZone accept="image/*" onSelect={handleSelect} />
      <ImageList>
        {images.map((image) => (
          <ImageConvertListItem
            key={image.id}
            image={image}
            onChange={updateImage}
            onConvert={convertImage}
            onDelete={deleteImage}
          />
        ))}
      </ImageList>
    </>
  );
}
