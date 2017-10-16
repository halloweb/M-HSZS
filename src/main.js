import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router/index.js'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 


Vue.use(VueRouter)
Vue.use(iView);

Vue.prototype.$ajax = axios

const router = new VueRouter({
    mode: 'history',
    routes: routerConfig
})


//添加响应拦截器
axios.interceptors.response.use(function(response){
     //对响应数据做些事
     
      return response;
   },function(error){
     //请求错误时做些事

     return Promise.reject(error);
   });
new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#app')
