import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

export type Tos = {
  id: string;
  text_markdown: string;
  text_html: string;
  validity_start: Date;
  createdAt: Date;
};

export const useTosStore = defineStore('tos', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  async function fetchTosList() {
    return fetchWrapper
      .get(`${backend}/tos`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  return {
    fetchTosList
  };
});
