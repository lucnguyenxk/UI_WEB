import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
import EmployeeList from './view/employee/EmployeeList.vue';
import Report from './view/report/Report.vue'
const routes = [
    {path :'/customerList', component:EmployeeList},
    {path : '/report', component:Report},
]
const router = new VueRouter({
  routes
})
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
