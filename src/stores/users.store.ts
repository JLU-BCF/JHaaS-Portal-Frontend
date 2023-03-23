import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore, useAuthStore } from '@/stores';
import type User from '@/models/User';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: [] as Array<User>,
        user: {} as User,
        usersLoading: false,
        userLoading: false
    }),
    actions: {
        async register(user: User) {
            await fetchWrapper.post(`${baseUrl}/register`, user);
        },
        async getAll() {
            this.usersLoading = true;
            try {
                this.users = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async getById(id: string) {
            this.userLoading = true;
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async update(id: string, params: Object) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (authStore.user && id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id: string) {
            // add isDeleting prop to user being deleted
            const user = this.users.find(x => x.id === id);

            if (! user) {
                const alertStore = useAlertStore();
                alertStore.error('User does not exist!');
                return;
            }
            
            user.isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (authStore.user && id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});
