import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import { ref } from 'vue';
import { useNotificationStore } from './notification';
import { Jupyter } from '@/models/jupyter.model';
import router from '@/router';

export const useJupyterStore = defineStore('jupyter', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const fetchInProgress = ref(true);
  const jupyters = ref(new Set<Jupyter>());

  async function fetchJupyters() {
    fetchInProgress.value = true;
    fetchWrapper
      .get(`${backend}/jupyter/list`)
      .then((data) => {
        fetchInProgress.value = false;
        jupyters.value.clear();
        data.forEach((element: object) => {
          jupyters.value.add(new Jupyter(element));
        });
      })
      .catch((err) => {
        fetchInProgress.value = false;
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function fetchJupyter(slug: string | string[]) {
    fetchInProgress.value = true;
    return fetchWrapper
      .get(`${backend}/jupyter/${slug}`)
      .then((data) => {
        fetchInProgress.value = false;
        return new Jupyter(data);
      })
      .catch((err) => {
        fetchInProgress.value = false;
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function createJupyter(values: object) {
    fetchInProgress.value = true;
    fetchWrapper
      .post(`${backend}/jupyter`, values)
      .then((data) => {
        notify({
          display: 'info',
          message: `Created "${data.name}"`
        });
        router.push({ name: 'jupyter-overview' });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  return { fetchJupyters, fetchJupyter, createJupyter, fetchInProgress, jupyters };
});
