/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.2.2
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueI18Next from '@panter/vue-i18next';
import axios from 'axios'

import './vendor.js'

import App from './App.vue'
import router from './router'
import i18next from './i18n.js';

const baseURL = "http://3.35.201.8/admin"

console.log('main.js::' + process.env.NODE_ENV);
console.log('main.js::' + baseURL);

Vue.prototype.ajax = axios.create({
  baseURL: "http://3.35.201.8/admin",
  timeout: 10000,
  headers: {
  	'Authorization' : localStorage.getItem('token')?localStorage.getItem('token'):''
  }
});

Date.prototype.toFormatString = function(onlyDate = false){
	this.setHours(this.getHours() - 9);

	const y = this.getFullYear();
	let m = this.getMonth() + 1;
	let d = this.getDate();

	if(m < 10) m = '0' + m;
	if(d < 10) d = '0' + d;

	let h = this.getHours();
	let M = this.getMinutes();
  let s = this.getSeconds();
	if(h < 10) h = '0' + h;
	if(M < 10) M = '0' + M;
	if(onlyDate) {
		return `${y}.${m}.${d}`;
	}
	else {
		return `${y}.${m}.${d} ${h}:${M}:${s}`;
	}
}

Date.prototype.toCondString = function(onlyDate = false){
	this.setHours(this.getHours() - 9);

	const y = this.getFullYear();
	let m = this.getMonth() + 1;
	let d = this.getDate();

	if(m < 10) m = '0' + m;
	if(d < 10) d = '0' + d;

	let h = this.getHours();
	let M = this.getMinutes();
  let s = this.getSeconds();
	if(h < 10) h = '0' + h;
	if(M < 10) M = '0' + M;
  if(s < 10) s = '0' + s;
	if(onlyDate) {
		return `${y}-${m}-${d}`;
	}
	else {
		return `${y}-${m}-${d} ${h}:${M}:${s}`;
	}
}

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueI18Next);

const i18n = new VueI18Next(i18next);

new Vue({
    i18n,
    router,
    data() {
  		return {
        baseURL : baseURL
  		}
  	},
		render: h => h(App)
}).$mount('#app')
