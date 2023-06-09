import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

export const useParticipationStore = defineStore('participation', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  async function fetchUserParticipations() {
    return fetchWrapper
      .get(`${backend}/participation/list`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  return { fetchUserParticipations };
});
