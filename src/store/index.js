import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import SettingModule from './modules/setting.js'
import SettingPlugin from './plugins/setting.js'
import ThemeModule from './modules/theme.js'
import ThemePlugin from './plugins/theme.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        setting: SettingModule,
        theme: ThemeModule
    },
    plugins: [
        createPersistedState({
            reducer: (persistedState) => {
                const stateFilter = JSON.parse(JSON.stringify(persistedState)); // deep clone
                ['offsidebarOpen', 'asideToggled', 'horizontal'] // states which we don't want to persist.
                    .forEach(item => delete stateFilter.setting[item])
                return stateFilter
            }
        }),
        SettingPlugin,
        ThemePlugin
    ],
    state:{
        isDevelopment:process.env.NODE_ENV !== 'production'?true:false,
        NODE_ENV:process.env.NODE_ENV,
        baseURL:process.env.baseURL,
        baseFrontURL:process.env.baseFrontURL
    },
    getters:{
        isDevelopment:state => {
            return state.isDevelopment
        },
        NODE_ENV:state => {
            return state.NODE_ENV
        },
        baseURL:state => {
            return state.baseURL
        },
        baseFrontURL:state => {
            return state.baseFrontURL
        }
    }
})