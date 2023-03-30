import React from 'react'
import FeatureListItem from '../feature-list-item/feature-list-item'
import styles from './feature-list.module.css'


type FeatureListProps = {
  features: Feature[]
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div className={styles.container}>
      {features.map((feature) => (
        <FeatureListItem
          key={feature.path}
          feature={feature}
        />
      ))}
    </div>
  )
}
