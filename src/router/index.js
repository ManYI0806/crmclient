import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../components/Welcome.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
	children:[{
		path:'/index/',
		name:'Welcom',
		component:Welcome
	},{
		path:'/index/saleChanceList',
		name:'SaleChanceList',
		component:()=>import('../views/sale/SaleChanceList.vue')
	},{
		path:'/index/salePlanList',
		name:'SalePlanList',
		component:()=>import('../views/sale/SalePlanList.vue')
	},{
		path:'/index/clientInfoList',
		name:'ClientInfoList',
		component:()=>import('../views/cust/ClientInfoList.vue')
	},{
		path:'/index/clientLoseEarlyWarningList',
		name:'ClientLoseEarlyWarningList',
		component:()=>import('../views/cust/ClientLoseEarlyWarningList.vue')
	},{
		path:'/index/addClientServer',
		name:'AddClientServer',
		component:()=>import('../views/server/AddClientServer.vue')
	},{
		path:'/index/dueClientServerList',
		name:'DueClientServerList',
		component:()=>import('../views/server/DueClientServerList.vue')
	},{
		path:'/index/handleClientServerList',
		name:'HandleClientServerList',
		component:()=>import('../views/server/HandleClientServerList.vue')
	},{
		path:'/index/clientServerFeedbackList',
		name:'ClientServerFeedbackList',
		component:()=>import('../views/server/ClientServerFeedbackList.vue')
	},{
		path:'/index/clientServerDetailedList',
		name:'ClientServerDetailedList',
		component:()=>import('../views/server/ClientServerDetailedList.vue')
	},{
		path:'/index/clientContribution',
		name:'ClientContribution',
		component:()=>import('../views/rept/ClientContribution.vue')
	},{
		path:'/index/clientConstitute',
		name:'ClientConstitute',
		component:()=>import('../views/rept/ClientConstitute.vue')
	},{
		path:'/index/clientServer',
		name:'ClientServer',
		component:()=>import('../views/rept/ClientServer.vue')
	},{
		path:'/index/clientLoss',
		name:'ClientLoss',
		component:()=>import('../views/rept/ClientLoss.vue')
	},{
		path:'/index/dataClientLevel',
		name:'DataClientLevel',
		component:()=>import('../views/basd/level/DataClientLevel.vue')
	},{
		path:'/index/dataServerType',
		name:'DataServerType',
		component:()=>import('../views/basd/serverType/DataServerType.vue')
	},{
		path:'/index/dataArea',
		name:'DataArea',
		component:()=>import('../views/basd/area/DataArea.vue')
	},{
		path:'/index/users',
		name:'DataUsers',
		component:()=>import('../views/basd/users/DataUsers.vue')
	}]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
