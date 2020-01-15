import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [{
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
		component: () => import( /* webpackChunkName: "about" */ '../views/Index.vue'),
		//二级路由
		children: [{
			//跳转到首页欢迎组件视图中
			path: '/index/',
			name: 'Welcom',
			component: Welcome
		}, {
			//跳转到 <销售机会管理> 组件视图中
			path: '/index/saleChanceList',
			name: 'SaleChanceList',
			component: () => import('../views/sale/SaleChanceList.vue')
		}, {
			//跳转到 <指派销售机会> 组件视图中
			path: '/index/dueSaleChance',
			name: 'DueSaleChance',
			component: () => import('../views/sale/DueSaleChance.vue')
		}, {
			//跳转到 <编辑销售机会> 组件视图中
			path: '/index/editSaleChance',
			name: 'EditSaleChance',
			component: () => import('../views/sale/EditSaleChance.vue')
		}, {
			//跳转到 <新建销售机会> 组件视图中
			path: '/index/addSaleChance',
			name: 'AddSaleChance',
			component: () => import('../views/sale/AddSaleChance.vue')
		}, {
			//跳转到 <客户开发计划> 组件视图中
			path: '/index/salePlanList',
			name: 'SalePlanList',
			component: () => import('../views/sale/SalePlanList.vue')
		}, {
			//跳转到 <制定开发计划> 组件视图中
			path: '/index/drawUpPlan',
			name: 'DrawUpPlan',
			component: () => import('../views/sale/DrawUpPlan.vue')
		}, {
			//跳转到 <执行开发计划> 组件视图中
			path: '/index/exeSalePlan',
			name: 'ExeSalePlan',
			component: () => import('../views/sale/ExeSalePlan.vue')
		}, {
			//跳转到客户信息管理组件视图中
			path: '/index/clientInfoList',
			name: 'ClientInfoList',
			component: () => import('../views/cust/ClientInfoList.vue')
		}, {
			//跳转到客户流失管理组件视图中
			path: '/index/clientLoseEarlyWarningList',
			name: 'ClientLoseEarlyWarningList',
			component: () => import('../views/cust/ClientLoseEarlyWarningList.vue')
		}, {
			//跳转到服务创建组件视图中
			path: '/index/addClientServer',
			name: 'AddClientServer',
			component: () => import('../views/server/AddClientServer.vue')
		}, {
			//跳转到服务分配组件视图中
			path: '/index/dueClientServerList',
			name: 'DueClientServerList',
			component: () => import('../views/server/DueClientServerList.vue')
		}, {
			//跳转到服务处理列表组件视图中
			path: '/index/handleClientServerList',
			name: 'HandleClientServerList',
			component: () => import('../views/server/HandleClientServerList.vue')
		}, {
			//跳转到服务反馈列表组件视图中
			path: '/index/clientServerFeedbackList',
			name: 'ClientServerFeedbackList',
			component: () => import('../views/server/ClientServerFeedbackList.vue')
		}, {
			//跳转到服务处理组件视图中
			path: '/index/handleClientServer',
			name: 'HandleClientServer',
			component: () => import('../views/server/HandleClientServer.vue')
		},{
			//跳转到服务反馈组件视图中
			path: '/index/clientServerFeedback',
			name: 'ClientServerFeedback',
			component: () => import('../views/server/ClientServerFeedback.vue')
		},{
			//跳转到服务归档组件视图中
			path: '/index/clientServerDetailedList',
			name: 'ClientServerDetailedList',
			component: () => import('../views/server/ClientServerDetailedList.vue')
		},{
			//跳转到服务归档明细组件视图中
			path: '/index/clientServerDetailed',
			name: 'ClientServerDetailed',
			component: () => import('../views/server/ClientServerDetailed.vue')
		},
		{
			//跳转到客户贡献分析组件视图中
			path: '/index/clientContribution',
			name: 'ClientContribution',
			component: () => import('../views/rept/ClientContribution.vue')
		}, {
			//跳转到客户构成分析组件视图中
			path: '/index/clientConstitute',
			name: 'ClientConstitute',
			component: () => import('../views/rept/ClientConstitute.vue')
		}, {
			//跳转到客户服务分析组件视图中
			path: '/index/clientServer',
			name: 'ClientServer',
			component: () => import('../views/rept/ClientServer.vue')
		}, {
			//跳转到客户流失分析组件视图中
			path: '/index/clientLoss',
			name: 'ClientLoss',
			component: () => import('../views/rept/ClientLoss.vue')
		}, {
			//跳转到企业客户等级管理组件视图中
			path: '/index/dataClientLevel',
			name: 'DataClientLevel',
			component: () => import('../views/basd/level/DataClientLevel.vue')
		}, {
			//跳转到新建企业客户等级管理组件视图中
			path: '/index/addClientLevel',
			name: 'AddClientLevel',
			component: () => import('../views/basd/level/AddClientLevel.vue')
		}, {
			//跳转到编辑企业客户等级管理组件视图中
			path: '/index/editClientLevel',
			name: 'EditClientLevel',
			component: () => import('../views/basd/level/EditClientLevel.vue')
		}, {
			//跳转到服务类型管理组件视图中
			path: '/index/dataServerType',
			name: 'DataServerType',
			component: () => import('../views/basd/serverType/DataServerType.vue')
		}, {
			//跳转到新建服务类型管理组件视图中
			path: '/index/addServerType',
			name: 'AddServerType',
			component: () => import('../views/basd/serverType/AddServerType.vue')
		}, {
			//跳转到编辑服务类型管理组件视图中
			path: '/index/editServerType',
			name: 'EditServerType',
			component: () => import('../views/basd/serverType/EditServerType.vue')
		}, {
			//跳转到地区管理组件视图中
			path: '/index/dataArea',
			name: 'DataArea',
			component: () => import('../views/basd/area/DataArea.vue')
		}, {
			//跳转到新建地区管理组件视图中
			path: '/index/addArea',
			name: 'AddArea',
			component: () => import('../views/basd/area/AddArea.vue')
		}, {
			//跳转到编辑地区管理组件视图中
			path: '/index/editArea',
			name: 'EditArea',
			component: () => import('../views/basd/area/EditArea.vue')
		}, {
			//跳转到用户管理组件视图中
			path: '/index/users',
			name: 'DataUsers',
			component: () => import('../views/basd/users/DataUsers.vue')
		}, {
			//跳转到用户管理组件视图中
			path: '/index/addusers',
			name: 'AddUsers',
			component: () => import('../views/basd/users/AddUsers.vue')
		}, {
			//跳转到用户管理组件视图中
			path: '/index/editusers',
			name: 'EditUsers',
			component: () => import('../views/basd/users/EditUsers.vue')
		}]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
