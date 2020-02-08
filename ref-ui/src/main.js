// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data() {
        return {
            $api: {
                generateCode: () => {
                    return axios.create({baseURL: "https://us-central1-sazakio-ref.cloudfunctions.net/generateCode"})
                }, 
                retrieveLink: (code) => {
                    return axios.create({baseURL: "https://us-central1-sazakio-ref.cloudfunctions.net/retrieveLink"})
                }
            }
        }
    }
})
