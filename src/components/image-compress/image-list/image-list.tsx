import React from 'react'
import ImageListItem from './image-list-item/image-list-item'
import styles from './image-list.module.css'


type ImageListProps = {
  images: Image[]
  onDelete: (image: Image) => void
}

export default function ImageList({ images, onDelete }: ImageListProps) {
  return (
    <div className={styles.container}>
      {images.map((image) => (
        <ImageListItem key={image.id} image={image} onDelete={onDelete} />
      ))}
    </div>
  )
}
