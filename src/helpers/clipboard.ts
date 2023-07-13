import { useNotificationStore } from '@/stores/notification.store';

const { notify } = useNotificationStore();

export function copy2clip(text: string, msg?: string) {
  if (msg && !confirm(msg)) {
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      notify({
        display: 'info',
        message: 'Copied to clipboard.'
      });
    })
    .catch(() => {
      notify({
        display: 'danger',
        message: 'Could not copy to clipboard.'
      });
    });
}
