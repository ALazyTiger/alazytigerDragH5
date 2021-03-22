import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const Home = resolve => require(["@/components/admin/common/Home.vue"], resolve); //主页
const H5List = resolve => require(["@/components/admin/Panghu/list.vue"], resolve); //新闻列表
const Publish = resolve => require(["@/components/admin/Panghu/Publish.vue"], resolve); //新增、编辑新闻
const login = resolve => require(['@/components/admin/login/index.vue'], resolve)//登录
const H5Show = resolve => require(['@/components/pages/index.vue'], resolve)//H5预览
export default new Router({
  // mode: 'history', //（使用history模式）
  routes: [
    {
      path: '/',
      component: login,
      redirect: '/login',
    },
    {
      path: '/login',
      name: '登录',
      component: login,
    },
    {
      path: "/h5/:id",
      name: '',
      component: H5Show 
    },
    {
      path: '/list',
      component: Home,
      children: [
        {
          path: '/',
          name: 'H5列表',
          component: H5List
        },
        {
          path: "/add",
          name: "创作新作品",
          component: Publish
        },
        {
          path: "/edit/:id",
          name: "修改作品",
          component: Publish
        }
      ]
    }
    
  
  ]
});
