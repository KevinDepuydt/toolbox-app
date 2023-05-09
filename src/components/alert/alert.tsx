import React from 'react'
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ALERT_TYPE, AlertType } from '@constants'
import styles from './alert.module.css'


type AlertProps = {
  type: AlertType
  message: string
  discreet?: boolean
}

const ALERT_ICONS = {
  [ALERT_TYPE.SUCCESS]: <CheckCircleIcon data-cy="alert-icon" height={20} width={20} />,
  [ALERT_TYPE.ERROR]: <ExclamationCircleIcon data-cy="alert-icon" height={20} width={20} />,
  [ALERT_TYPE.WARNING]: <ExclamationTriangleIcon data-cy="alert-icon" height={20} width={20} />,
  [ALERT_TYPE.INFO]: <InformationCircleIcon data-cy="alert-icon" height={20} width={20} />,
}

export default function Alert({ type, message, discreet = false }: AlertProps) {
  return (
    <div
      data-cy="alert"
      data-alert-type={type}
      className={classNames(
        styles[type],
        styles.container,
        { [styles.discreet] : discreet }
      )}
    >
      {ALERT_ICONS[type]}
      <span data-cy="alert-message" className={styles.message}>{message}</span>
    </div>
  )
}
