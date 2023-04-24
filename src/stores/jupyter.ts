import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import { ref, type Ref } from 'vue';
import { useNotificationStore } from './notification';
import { Jupyter } from '@/models/jupyter.model';
import router from '@/router';
import { sortByCreationTime } from '@/helpers/sort';

export const useJupyterStore = defineStore('jupyter', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const fetchInProgress = ref(true);
  const myJupyters: Ref<Jupyter[]> = ref([]);

  async function fetch(scope: 'id' | 'slug', id: string | string[]): Promise<Jupyter>;
  async function fetch(scope?: 'mine' | 'pending' | 'all'): Promise<Jupyter[]>;
  async function fetch(
    scope: 'mine' | 'id' | 'slug' | 'pending' | 'all' = 'mine',
    id?: string | string[]
  ) {
    fetchInProgress.value = true;
    let url = `${backend}/jupyter`;

    /* eslint-disable indent */
    switch (scope) {
      case 'id':
        url += `/by-id/${id}`;
        break;
      case 'slug':
        url += `/by-slug/${id}`;
        break;
      case 'pending':
        url += '/open';
        break;
      case 'all':
        url += '/';
        break;
      case 'mine':
      default:
        url += '/list';
    }
    /* eslint-enable indent */

    return fetchWrapper
      .get(url)
      .then((data) => {
        if (['id', 'slug'].includes(scope)) {
          return new Jupyter(data);
        }
        let jupyters: Array<Jupyter> = [];
        data.forEach((element: object) => {
          jupyters.push(new Jupyter(element));
        });
        jupyters = jupyters.sort(sortByCreationTime);
        return jupyters;
      })
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      })
      .finally(() => (fetchInProgress.value = false));
  }

  async function createJupyter(values: object, isChangeRequest = false) {
    fetchInProgress.value = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fetchPromise: Promise<any>;
    const url = `${backend}/jupyter`;

    if (isChangeRequest) {
      fetchPromise = fetchWrapper.put(url, values);
    } else {
      fetchPromise = fetchWrapper.post(url, values);
    }

    fetchPromise
      .then((data) => {
        notify({
          display: 'info',
          message: `Created ${isChangeRequest ? 'change ' : ''}request "${data.name}"`
        });
        const newJupyter = new Jupyter(data);
        updateMyJupyters(newJupyter);
        router.push({ name: 'jupyter-details', params: { slug: newJupyter.slug } });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  async function jupyterAction(
    id: string,
    action: 'cancel' | 'accept' | 'reject',
    isChangeRequest: boolean
  ) {
    if (
      !confirm(`This ${isChangeRequest ? 'change ' : ''}request will be ${action}ed. Continue?`)
    ) {
      return;
    }

    const url = `${backend}/jupyter${isChangeRequest ? '/change' : ''}/${action}/${id}`;

    fetchInProgress.value = true;
    return fetchWrapper
      .put(url)
      .then((data) => {
        notify({
          display: 'info',
          message: `${action}ed "${data.name}"`
        });
        const newJupyter = new Jupyter(data);
        updateMyJupyters(newJupyter);
        return newJupyter;
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  function updateMyJupyters(newJupyter: Jupyter) {
    const jupyters = myJupyters.value.filter((jupyter) => jupyter.id !== newJupyter.id);
    jupyters.push(newJupyter);
    myJupyters.value = jupyters.sort(sortByCreationTime);
  }

  fetch().then((jupyters) => {
    myJupyters.value = jupyters;
  });

  return {
    fetch,
    createJupyter,
    jupyterAction,
    fetchInProgress,
    myJupyters
  };
});
