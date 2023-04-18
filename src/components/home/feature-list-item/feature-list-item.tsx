import React from 'react'
import styles from './feature-list-item.module.css'


type FeatureListItemProps = {
  feature: Feature
}

export default function FeatureListItem({ feature }: FeatureListItemProps) {
  return (
    <a data-cy="feature-list-item" href={feature.path} className={styles.container}>
      <h3 className={styles.title}>{feature.name}</h3>
      <p className={styles.description}>{feature.description}</p>
    </a>
  )
}
