import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import { Tos, type ITos } from '@/models/tos.model';
import { ref, type Ref } from 'vue';
import router from '@/router';

export const useTosStore = defineStore('tos', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  const fetchInProgress = ref(false);
  const tosList: Ref<Tos[]> = ref([]);

  async function fetchTosList() {
    fetchInProgress.value = true;
    tosList.value.length = 0;

    return fetchWrapper
      .get(`${backend}/tos/all`)
      .then((responseData: ITos[]) => {
        for (const rawTosInstance of responseData) {
          tosList.value.push(new Tos(rawTosInstance));
        }
      })
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      })
      .finally(() => (fetchInProgress.value = false));
  }

  async function createTos(values: object) {
    const url = `${backend}/tos`;
    fetchInProgress.value = true;

    return fetchWrapper
      .post(url, values)
      .then((responseData: ITos) => {
        notify({
          display: 'info',
          message: 'Successfully created TOS'
        });
        const createdTos = new Tos(responseData);
        tosList.value.push(createdTos);

        router.push({ name: 'admin-tos-overview', params: { slug: createdTos.id } });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  async function findTos(id: string | string[]): Promise<Tos>;
  async function findTos(id: string | string[]): Promise<void | Tos> {
    const url = `${backend}/tos/find/${id}`;
    fetchInProgress.value = true;

    return fetchWrapper
      .get(url)
      .then((responseData: ITos) => {
        return new Tos(responseData);
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  async function updateTos(id: string, values: object) {
    const url = `${backend}/tos/${id}`;
    fetchInProgress.value = true;

    return fetchWrapper
      .put(url, values)
      .then((responseData: ITos) => {
        notify({
          display: 'info',
          message: 'Successfully created TOS'
        });
        const updatedTos = new Tos(responseData);
        // TODO remove old TOS from tosList
        tosList.value.push(updatedTos);

        router.push({ name: 'admin-tos-overview', params: { slug: updatedTos.id } });
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  async function deleteTos(id: string) {
    if (!confirm('Do you really want to delete this draft?')) {
      return;
    }

    const url = `${backend}/tos/${id}`;
    fetchInProgress.value = true;

    return fetchWrapper
      .delete(url)
      .then(() => {
        // TODO remove from tosList
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      )
      .finally(() => (fetchInProgress.value = false));
  }

  return {
    fetchTosList,
    createTos,
    findTos,
    updateTos,
    deleteTos,
    fetchInProgress,
    tosList
  };
});
