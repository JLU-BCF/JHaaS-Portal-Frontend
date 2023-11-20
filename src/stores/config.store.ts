import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification.store';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

interface FrontendConfiguration {
  DISCRIMINATOR: string;
  AUTHENTIK_FQDN: string;
  AUTHENTIK_URL: string;
  AUTHENTIK_NAME: string;
  AUTHENTIK_CONFIG_TOTP: string;
  AUTHENTIK_CONFIG_WEBAUTHN: string;
  AUTHENTIK_CONFIG_STATIC: string;
  AUTHENTIK_CONFIG_PASSWORD: string;
  MAIL_FEEDBACK_ADDRESS: string;
  TOS_ADDRESS: string;
  DOCS_ADDRESS: string;
}

export const useFrontendConfigurationStore = defineStore('frontend_configuration', () => {
  const backend = import.meta.env.VITE_BACKEND_PATH;
  const fe_config_discriminator = import.meta.env.VITE_FE_CONFIG_DISCRIMINATOR;
  const { notify } = useNotificationStore();

  let initConf: FrontendConfiguration = {
    DISCRIMINATOR: '',
    AUTHENTIK_FQDN: '',
    AUTHENTIK_URL: '',
    AUTHENTIK_NAME: '',
    AUTHENTIK_CONFIG_TOTP: '',
    AUTHENTIK_CONFIG_WEBAUTHN: '',
    AUTHENTIK_CONFIG_STATIC: '',
    AUTHENTIK_CONFIG_PASSWORD: '',
    MAIL_FEEDBACK_ADDRESS: '',
    TOS_ADDRESS: '',
    DOCS_ADDRESS: ''
  };

  const oldConf = localStorage.getItem('frontend-configuration');
  if (oldConf) {
    initConf = JSON.parse(oldConf);
  }

  const frontendConfiguration: Ref<FrontendConfiguration> = ref(initConf);

  if (initConf.DISCRIMINATOR !== fe_config_discriminator) {
    fetchWrapper
      .get(`${backend}/frontend-configuration`)
      .then((val: FrontendConfiguration) => {

        Object.assign(
          frontendConfiguration.value,
          Object.keys(val)
            .filter((k) => val[k as keyof FrontendConfiguration] != null)
            .reduce((a, k) => ({ ...a, [k]: val[k as keyof FrontendConfiguration] }), {})
        );

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
