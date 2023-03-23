import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null as Object | null
    }),
    actions: {
        success(message: any) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message: any) {
            this.alert = { message, type: 'alert-danger' };
        },
        clear() {
            this.alert = null;
        }
    }
});
