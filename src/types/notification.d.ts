type NotificationType = 'info' | 'success' | 'error' | 'warning'

type NotificationItem = {
  id: string
  type: NotificationType
  message: string
}
