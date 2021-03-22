// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// import 'vue-fullpage/vue-fullpage.css'
// import VueFullpage from 'vue-fullpage'
// Vue.use(VueFullpage)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'vue-animate-fullpage/dist/animate.css'

import VueAnimateFullpage from 'vue-animate-fullpage/dist/index'

Vue.use(VueAnimateFullpage)

Vue.prototype.$fullscreen = VueAnimateFullpage; //全局挂载，方便手动跳转




// 导入所有的过滤器变量
import * as custom from './filters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
Vue.directive('drag', {
  //1.指令绑定到元素上回立刻执行bind函数，只执行一次
  //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
  bind: function (el, binding) {
    let oDiv = el; //获取当前元素
    let firstTime = '', lastTime = '';
    el.onmousedown = function (e) {
      var disX = e.pageX - el.offsetLeft;
      var disY = e.pageY - el.offsetTop;

      // 给当前元素添加属性，用于元素状态的判断
      oDiv.setAttribute('ele-flag', false)
      oDiv.setAttribute('draging-flag', true)
      firstTime = new Date().getTime();
      document.onmousemove = function (e) {
        el.style.left = e.pageX - disX + 'px';
        el.style.top = e.pageY - disY + 'px';
        binding.value({ left: e.pageX - disX, top: e.pageY - disY })
        return false;
      }
      document.onmouseup = function (event) {
        document.onmousemove = document.onmouseup = null;
        lastTime = new Date().getTime();
        if ((lastTime - firstTime) > 200) {
          oDiv.setAttribute('ele-flag', true)
          event.stopPropagation()
        }
        setTimeout(function () {
          oDiv.setAttribute('draging-flag', false)
        }, 100)
      }
    }
  },
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted: function (el) {
    
  }
})

//mobile 调用 移动端适配

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(to => to.meta.requiresAuth)) {
        //判断当前是否有登录的权限
        if (!store.state.isLogin) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})