import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import FileButton from '@components/image-compress/file-button/file-button'
import ImageList from '@components/image-compress/image-list/image-list'


export default function ImageCompressPage() {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    (async () => {
      if (images.length) {
        const image = images.find((i) => !i.done);
        if (image) {
          try {
            // prepare image form
            const form = new FormData()
            form.append('image', image.inputFile)

            // call image compress API
            const { data } = await axios.post('/api/image-compress', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

            // build output file from base64 src
            const imageDataUrl = `data:${data.type};base64,${data.base64}`;
            const res = await fetch(imageDataUrl)
            const blob = await res.blob()
            const parts = image.inputFile.name.split('.')
            const ext = parts.pop()
            const name = parts.join('.')
            const file = new File([blob], `${name}-min.${ext}`,{ type: image.inputFile.type })

            // update image item with output file
            updateImage(image, { outputFile: file })
          } catch (e: any) {
            updateImage(image, { error: e.message })
          }
        }
      }
    })();
  }, [images])

  function handleSelect(files: File[]) {
    if (files.length > 0) {
      files.forEach((file) => addImage(file))
    }
  }

  function addImage(file: File) {
    setImages((state) => [...state, { id: uuid(), inputFile: file, done: false }])
  }

  function updateImage(image: Image, updates: Partial<Image>) {
    setImages(
      (arr) => arr.map(
        (item) => item.id === image.id
          ? { ...image, ...updates, done: true }
          : item
      )
    )
  }

  function deleteImage(image: Image) {
    setImages(
      (arr) => arr.filter(
        (item) => item.id !== image.id
      )
    )
  }

  return (
    <>
      <FileButton onSelect={handleSelect} />
      <ImageList images={images} onDelete={deleteImage} />
    </>
  );
}
