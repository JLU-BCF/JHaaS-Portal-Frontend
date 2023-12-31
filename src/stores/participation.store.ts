import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

export type HubForParticipation = {
  creatorId: string;
  name: string;
  slug: string;
  description?: string;
  startDate: Date;
  endDate: Date;
};

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

  async function fetchHubParticipations(slug: string | string[]) {
    return fetchWrapper
      .get(`${backend}/participation/list/${slug}`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function fetchParticipation(slug: string | string[]) {
    return fetchWrapper
      .get(`${backend}/participation/detail/${slug}`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function fetchJupyterForParticipation(slug: string | string[]) {
    return fetchWrapper
      .get(`${backend}/participation/hub/${slug}`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function requestAccess(slug: string | string[]) {
    return fetchWrapper
      .post(`${backend}/participation/hub/${slug}`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function participationAction(
    participantId: string,
    hubId: string,
    action: 'accept' | 'reject'
  ) {
    return fetchWrapper
      .post(`${backend}/participation/action/${action}/${participantId}/${hubId}`)
      .then((data) => data)
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  return {
    fetchUserParticipations,
    fetchHubParticipations,
    fetchParticipation,
    fetchJupyterForParticipation,
    requestAccess,
    participationAction
  };
});
