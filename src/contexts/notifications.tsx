import React, { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import NotificationsContainer from '@components/notifications/notifications-container/notifications-container'

type NotificationsContextValue = {
  info: (data: NotificationData) => void
  success: (data: NotificationData) => void
  warning: (data: NotificationData) => void
  error: (data: NotificationData) => void
}

const notificationsContextDefaultValue: NotificationsContextValue = {
  info: () => null,
  success: () => null,
  warning: () => null,
  error: () => null
}

const NotificationsContext = createContext<NotificationsContextValue>(notificationsContextDefaultValue)

type NotificationsProviderProps = {
  children: React.ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  function addNotification(type: NotificationType, data: NotificationData): void {
    if (typeof data === 'string') {
      setNotifications((state) => [...state, { id: uuid(), type, message: data }])
    } else {
      setNotifications((state) => [...state, { id: uuid(), type, ...data }])
    }
  }

  function deleteNotification(id: string) {
    setNotifications((state) => state.filter((n) => n.id !== id))
  }

  function notifySuccess(data: NotificationData) {
    addNotification('success', data)
  }

  function notifyError(data: NotificationData) {
    addNotification('error', data)
  }

  function notifyWarning(data: NotificationData) {
    addNotification('warning', data)
  }

  function notifyInfo(data: NotificationData) {
    addNotification('info', data)
  }

  return (
    <NotificationsContext.Provider value={{
      info: notifyInfo,
      success: notifySuccess,
      warning: notifyWarning,
      error: notifyError
    }}>
      {children}
      <NotificationsContainer notifications={notifications} onDelete={deleteNotification} />
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext)
}
