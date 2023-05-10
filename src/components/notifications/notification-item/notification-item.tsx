import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import styles from './notification-item.module.css'
import { ALERT_TYPE } from '@constants'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid'


type NotificationItemProps = {
  notification: NotificationItem
  onDelete: (id: string) => void
}

const NOTIFICATION_ICONS = {
  [ALERT_TYPE.SUCCESS]: <CheckCircleIcon data-cy="notification-icon" height={20} width={20} />,
  [ALERT_TYPE.ERROR]: <ExclamationCircleIcon data-cy="notification-icon" height={20} width={20} />,
  [ALERT_TYPE.WARNING]: <ExclamationTriangleIcon data-cy="notification-icon" height={20} width={20} />,
  [ALERT_TYPE.INFO]: <InformationCircleIcon data-cy="notification-icon" height={20} width={20} />,
}

export default function NotificationItem({ notification, onDelete }: NotificationItemProps) {
  const nodeRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  function hide() {
    setVisible(false)
  }

  function handleDelete() {
    onDelete(notification.id)
  }

  function handleEntered() {
    setTimeout(() => hide(), 5000);
  }

  return (
    <CSSTransition
      in={visible}
      nodeRef={nodeRef}
      timeout={800}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit={true}
      onEntered={handleEntered}
      onExited={handleDelete}
    >
      <div ref={nodeRef} className={classNames(styles.container, styles[notification.type])} onClick={hide}>
        <span>{NOTIFICATION_ICONS[notification.type]}</span>
        <span className={styles.message}>{notification.message}</span>
      </div>
    </CSSTransition>
  )
}
