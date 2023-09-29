import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

interface FrontendConfiguration {
  AUTHENTIK_FQDN: string;
  AUTHENTIK_URL: string;
  AUTHENTIK_NAME: string;
  MAIL_FEEDBACK_ADDRESS: string;
  TOS_ADDRESS: string;
}

export const useFrontendConfigurationStore = defineStore('frontend_configuration', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const { notify } = useNotificationStore();

  let initConf: FrontendConfiguration = {
    AUTHENTIK_FQDN: '',
    AUTHENTIK_URL: '',
    AUTHENTIK_NAME: '',
    MAIL_FEEDBACK_ADDRESS: '',
    TOS_ADDRESS: ''
  };

  const oldConf = localStorage.getItem('frontend-configuration');
  if (oldConf) {
    initConf = JSON.parse(oldConf);
  }

  const frontendConfiguration: Ref<FrontendConfiguration> = ref(initConf);

  if (!oldConf) {
    fetchWrapper
      .get(`${backend}/frontend-configuration`)
      .then((val: FrontendConfiguration) => {
        frontendConfiguration.value.AUTHENTIK_FQDN = val.AUTHENTIK_FQDN;
        frontendConfiguration.value.AUTHENTIK_URL = val.AUTHENTIK_URL;
        frontendConfiguration.value.AUTHENTIK_NAME = val.AUTHENTIK_NAME;
        frontendConfiguration.value.MAIL_FEEDBACK_ADDRESS = val.MAIL_FEEDBACK_ADDRESS;
        frontendConfiguration.value.TOS_ADDRESS = val.TOS_ADDRESS;

        localStorage.setItem('frontend-configuration', JSON.stringify(frontendConfiguration.value));
      })
      .catch((err) =>
        notify({
          display: 'danger',
          message: err
        })
      );
  }

  return { frontendConfiguration };
});
