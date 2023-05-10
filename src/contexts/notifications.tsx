import React, { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import NotificationsContainer from '@components/notifications/notifications-container/notifications-container'

type NotificationsContextValue = {
  notify: (type: NotificationType, message: string) => void
}

const notificationsContextDefaultValue: NotificationsContextValue = {
  notify: () => null
}

const NotificationsContext = createContext<NotificationsContextValue>(notificationsContextDefaultValue)

type NotificationsProviderProps = {
  children: React.ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  function addNotification(type: NotificationType, message: string): void {
    setNotifications((state) => [...state, { id: uuid(), type, message }])
  }

  function deleteNotification(id: string) {
    setNotifications((state) => state.filter((n) => n.id !== id))
  }

  return (
    <NotificationsContext.Provider value={{ notify: addNotification }}>
      {children}
      <NotificationsContainer notifications={notifications} onDelete={deleteNotification} />
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext)
}
