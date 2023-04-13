import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Notification {
  display: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  message: string;
  onlyOnce?: boolean;
  seen?: boolean;
  id?: number;
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref(new Set<Notification>());
  let counter = 0;

  function notify(notification: Notification) {
    notification.id = ++counter;
    notifications.value.add(notification);
    setTimeout(() => removeNotification(notification), 5000);
  }

  function removeNotification(notification: Notification) {
    notifications.value.delete(notification);
  }

  return { notifications, notify };
});
