import { defineStore } from 'pinia'
import axios from "axios";
import { hasAccess as _hasAccess } from "@/utils/hasAccess";
import { h } from 'vue';


export const useSession = defineStore('sessionStore', {

    state: () => {

        return {
            demo: false,
            provider_id: "",
            loading: false,
            app: {},
            auth: false,
            account: {},
            user: {},
            access: [],
            access_signature: "",
            alerts: [],
            hidingTip: false,
        }
    },

    actions: {
        setBrowserStorage(key, value) {
            sessionStorage.setItem(key, value)
        },
        getBrowserStorage(key) {
            return sessionStorage.getItem(key)
        },
        removeBrowserStorage(key) {
            sessionStorage.removeItem(key)
        },
        getAccess() {
            return this.access
        },
        async initialize(addAccess = {}) {

            this.loading = true

            await axios.get('https://api.backstack.com/v1/app/session', { api: 'backstack' })
                .then((response) => {

                    //console.log('session.init', response.data);

                    this.demo = response.data.demo;
                    this.provider_id = response.data.provider_id;
                    this.app = response.data.app;
                    this.auth = response.data.auth;

                    const combinedAccess = Object.assign({}, response.data.access, addAccess);

                    this.access = combinedAccess;
                    this.access_signature = response.data.access_signature;
                    //this.alerts = response.data.alerts;
                    this.alerts = response.data.alerts?.filter(alert => this.hasAccess(alert.access));

                    this.user = response.data.user;
                    this.account = response.data.account;
                })
                .finally(() => {
                    this.loading = false
                })
        },
        update(data) {

            //console.log('session.update', data);

            this.demo = data.demo;
            this.provider_id = data.provider_id;
            this.auth = data.auth;
            this.app = data.app;
            this.access = data.access;
            this.access_signature = data.access_signature;
            this.alerts = data.alerts?.filter(alert => this.hasAccess(alert.access));
            this.user = data.user;
            this.account = data.account;
        },

        async logout() {
            this.loading = true
            await axios.get('https://api.backstack.com/v1/app/logout', { api: 'backstack' })
                .then((response) => {
                    this.demo = response.data.demo;
                    this.auth = response.data.auth;
                    this.app = response.data.app;
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

        async hideTip(tipId) {
            this.hidingTip = true
            await axios.post(`https://api.backstack.com/v1/user/hide-tips/${tipId}`, null, { api: 'backstack' })
                .then((response) => {
                    this.user.hidden_tips = response.data;
                })
                .finally(() => {
                    this.hidingTip = false
                })
        },

        closeTip(tipId) {
            this.user.hidden_tips.push(tipId)
        }
    },

    getters: {

        hasAccess: (state) => {
            if (state.demo === true) {
                return (requiredAccess) => true
            }
            return (requiredAccess) => _hasAccess(requiredAccess, state.access)
        },

        tipHidden: (state) => {
            return (tipId) => state.user.hidden_tips?.includes(tipId)
        },
    }
})