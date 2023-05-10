import React from 'react'
import styles from './notifications-container.module.css'
import NotificationItem from '@components/notifications/notification-item/notification-item'


type NotificationsContainerProps = {
  notifications: NotificationItem[],
  onDelete: (id: string) => void
}

export default function NotificationsContainer({ notifications, onDelete }: NotificationsContainerProps) {
  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
