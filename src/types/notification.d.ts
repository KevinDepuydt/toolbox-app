type NotificationType = 'info' | 'success' | 'error' | 'warning'

type NotificationItem = {
  id: string
  type: NotificationType
  title?: string
  message: string
}

type NotificationData = Omit<NotificationItem, 'id' | 'type'> | string
