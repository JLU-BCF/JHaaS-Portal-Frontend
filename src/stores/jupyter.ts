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
  const jupyters = ref(new Array<Jupyter>());

  async function fetchJupyters() {
    fetchInProgress.value = true;
    fetchWrapper
      .get(`${backend}/jupyter/list`)
      .then((data) => {
        fetchInProgress.value = false;
        jupyters.value = [];
        data.forEach((element: object) => {
          jupyters.value.push(new Jupyter(element));
        });
        jupyters.value = jupyters.value.sort((a, b) => {
          return b.createdAt?.getTime() - a.createdAt?.getTime();
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

  async function fetchOpenJupyters() {
    fetchInProgress.value = true;
    fetchWrapper
      .get(`${backend}/jupyter/open`)
      .then((data) => {
        fetchInProgress.value = false;
        jupyters.value = [];
        data.forEach((element: object) => {
          jupyters.value.push(new Jupyter(element));
        });
        jupyters.value = jupyters.value.sort((a, b) => {
          return b.createdAt?.getTime() - a.createdAt?.getTime();
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
      .get(`${backend}/jupyter/by-slug/${slug}`)
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

  async function createJupyterChange(values: object) {
    fetchInProgress.value = true;
    fetchWrapper
      .put(`${backend}/jupyter`, values)
      .then((data) => {
        notify({
          display: 'info',
          message: `Created Change Request for "${data.name}"`
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

  async function cancelJupyter(id: string) {
    if (!confirm('This Request will be canceled. Continue?')) {
      return;
    }
    fetchInProgress.value = true;
    fetchWrapper
      .put(`${backend}/jupyter/cancel/${id}`)
      .then((data) => {
        notify({
          display: 'info',
          message: `Canceled Request for "${data.name}"`
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

  async function acceptJupyter(id: string) {
    if (!confirm('This Request will be accepted. Continue?')) {
      return;
    }
    fetchInProgress.value = true;
    fetchWrapper
      .put(`${backend}/jupyter/accept/${id}`)
      .then((data) => {
        notify({
          display: 'info',
          message: `Accepted Request "${data.name}"`
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

  async function rejectJupyter(id: string) {
    if (!confirm('This Request will be rejected. Continue?')) {
      return;
    }
    fetchInProgress.value = true;
    fetchWrapper
      .put(`${backend}/jupyter/reject/${id}`)
      .then((data) => {
        notify({
          display: 'info',
          message: `Rejected Request "${data.name}"`
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

  async function acceptJupyterChange(id: string) {
    if (!confirm('This Change Request will be accepted. Continue?')) {
      return;
    }
    fetchInProgress.value = true;
    fetchWrapper
      .put(`${backend}/jupyter/change/accept/${id}`)
      .then((data) => {
        notify({
          display: 'info',
          message: `Accepted Request "${data.name}"`
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

  return {
    acceptJupyter,
    acceptJupyterChange,
    rejectJupyter,
    fetchJupyters,
    fetchOpenJupyters,
    fetchJupyter,
    createJupyter,
    createJupyterChange,
    cancelJupyter,
    fetchInProgress,
    jupyters
  };
});
