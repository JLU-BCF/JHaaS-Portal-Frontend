import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import { ref } from 'vue';
import { useNotificationStore } from './notification';
import { Jupyter } from '@/models/jupyter.model';

export const useJupyterStore = defineStore('jupyter', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const jupyters = ref(new Set<Jupyter>());

  async function loadJupyters() {
    fetchWrapper
      .get(`${backend}/jupyter`)
      .then((data) => {
        // TODO rework... wip...
        jupyters.value.add(data);
        notify({
          display: 'info',
          message: JSON.stringify(data)
        });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  return { loadJupyters };
});
