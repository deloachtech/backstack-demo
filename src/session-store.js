import { defineStore } from 'pinia'
import axios from "axios";
import { hasAccess } from "backstack-vue-assets/assets/js/hasAccess.js";


export const useSession = defineStore('sessionStore', {

    state: () => {

        return {
            loading: false,
            auth: false,
            account: {},
            user: {},
            access: [],
            access_signature: "",
            alerts: [],
            appSchema: {},
            toasts: []
        }
    },

    actions: {
        setToast(key, message) {
            this.toasts.push(key, message)
        },
        unsetToast(key) {
            const index = this.toasts.findIndex(toast => toast.key === key);
            if (index !== -1) {
                this.toasts.splice(index, 1);
            }
        },
        setBrowserStorage(key, value) {
            sessionStorage.setItem(key, value)
        },
        getBrowserStorage(key) {
            return sessionStorage.getItem(key)
        },
        removeBrowserStorage(key) {
            sessionStorage.removeItem(key)
        },

        async initialize(appSchema) {
            this.appSchema = appSchema
            this.loading = true
            await axios.get('https://api.backstack.com/v1/auth/session', {  api :'backstack' })
                .then((response) => {
                    this.auth = response.data.auth;
                    this.access = response.data.access;
                    this.access_signature = response.data.access_signature;
                    this.alerts = response.data.alerts;
                    this.user = response.data.user;
                    this.account = response.data.account;
                })
                .finally(() => {
                    this.loading = false
                })
        },
        update(data) {
            this.auth = data.auth;
            this.access = data.access;
            this.access_signature = data.access_signature;
            this.alerts = data.alerts;
            this.user = data.user;
            this.account = data.account;
        },

        async logout() {
            this.loading = true
            await axios.get('https://api.backstack.com/v1/auth/logout', {  api :'backstack' })
                .then((response) => {
                    this.auth = response.data.auth;
                    this.access = response.data.access;
                    this.access_signature = response.data.access_signature;
                    this.alerts = response.data.alerts;
                    this.user = response.data.user;
                    this.account = response.data.account;
                })
                .finally(() => {
                    this.loading = false
                })
        },

    },

    getters: {
        hasAccess: (state) => {
            return (accessRequired) => hasAccess(accessRequired, state.access)
        },
    }
})