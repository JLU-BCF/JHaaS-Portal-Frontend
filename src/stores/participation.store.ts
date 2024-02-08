import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import type { Participation } from '@/models/participation.model';

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

  async function cancelParticipation(
    participantId: string,
    hubId: string,
    verificationToken?: string
  ) {
    if (!confirm('Should this participation really be canceled?')) {
      return Promise.reject();
    }

    return fetchWrapper
      .delete(`${backend}/participation/${participantId}/${hubId}`, {
        verificationToken
      })
      .then((data) => {
        notify({
          display: 'info',
          message: data
        });
        return data;
      })
      .catch((err) => {
        notify({
          display: 'danger',
          message: err
        });
      });
  }

  async function notebookAction(
    participation: Participation,
    action: 'start' | 'stop' | 'delete'
  ) {
    if (!confirm(`Do you really want to ${action} this Notebook?`)) {
      return Promise.reject();
    }

    return fetchWrapper
      .post(`${backend}/participation/notebook/${action}/${participation.participantId}/${participation.hubId}`)
      .then((data) => {
        notify({
          display: 'info',
          message: data
        });
        return data;
      })
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
    participationAction,
    cancelParticipation,
    notebookAction
  };
});
