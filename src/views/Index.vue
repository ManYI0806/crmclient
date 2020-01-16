<template>
	<div>
		<el-container>
			<el-header height="68px">
				<h3>CRM 客户关系管理系统 <small>Ver.1.0.0</small></h3>
			</el-header>
			<el-container>
				<el-aside width="288px">
					<el-tag><i class="el-icon-s-custom"></i>客户关系管理系统</el-tag>
					<el-menu router :unique-opened="true" default-active="2" class="el-menu-vertical-demo">
						<el-submenu index="1">
							<template slot="title">
								<span>营销管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/index/saleChanceList">销售机会管理</el-menu-item>
								<el-menu-item index="/index/salePlanList">客户开发计划</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<span>客户管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/index/clientInfoList">客户信息管理</el-menu-item>
								<el-menu-item index="/index/clientLoseEarlyWarningList">客户流失管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<span>服务管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/index/addClientServer">服务创建</el-menu-item>
								<el-menu-item index="/index/dueClientServerList">服务分配</el-menu-item>
								<el-menu-item index="/index/handleClientServerList">服务处理</el-menu-item>
								<el-menu-item index="/index/clientServerFeedbackList">服务反馈</el-menu-item>
								<el-menu-item index="/index/clientServerDetailedList">服务归档</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="4">
							<template slot="title">
								<span>统计报表</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/index/clientContribution">客户贡献分析</el-menu-item>
								<el-menu-item index="/index/clientConstitute">客户构成分析</el-menu-item>
								<el-menu-item index="/index/clientServer">客户服务分析</el-menu-item>
								<el-menu-item index="/index/clientLoss">客户流失分析</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">
								<span>基础数据</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/index/dataClientLevel">数据字典-客户等级</el-menu-item>
								<el-menu-item index="/index/dataServerType">数据字典-服务类别</el-menu-item>
								<el-menu-item index="/index/dataArea">数据字典-地区</el-menu-item>
								<el-menu-item index="/index/dataUsers">数据字典-用户</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main id="main">
					<router-view></router-view>
				</el-main>
			</el-container>
			<el-footer height="42px">
				<p>Copyright &copy yuhongjun 版权所有 2017-04-23 CRM客户关系管理系统</p>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				bodyHeight: 0
			}
		},
		mounted() {
			document.getElementById('main').style.height = document.body.clientHeight - 110 + 'px';
			this.bodyHeight = document.body.clientHeight;
			window.onresize = () => {
				this.bodyHeight = document.body.clientHeight;
			}
		},
		watch: {
			bodyHeight: function() {
				document.getElementById('main').style.height = this.bodyHeight - 110 + 'px';
			}
		},
		methods: {
			
		}
	}
</script>

<style scope>
	html,
	body {
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 100%;
	}

	.el-header {
		background-color: #438EB9;
		color: #FFFFFF;
		text-align: left;
		line-height: 28px;
		font-size: 18px;
	}

	.el-footer {
		background-color: #438EB9;
		text-align: center;
		color: white;
		line-height: 11px;
	}

	.el-aside {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
		/* line-height: 200px; */
		border-right: 1px solid #CCCCCC;
		padding: 10px;
	}

	.el-icon-s-custom {
		font-size: 20px;
		margin-right: 8px;
	}

	.el-menu {
		border-right: 0 !important;
		margin-top: 10px;
	}

	.el-submenu {
		border: 1px solid #DDDDDD;
		border-radius: 5px;
		background-color: #F5F5F5;
		margin-bottom: 8px;
	}

	.el-menu-item,
	.el-submenu__title {
		font-size: 16px;
		height: 40px;
		line-height: 36px;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
		border-top: 1px solid #DDDDDD;
	}

	.el-menu-item {
		height: 40px !important;
		line-height: 40px !important;
		font-size: 14px;
		color: #337AB7;
		padding-left: 20px !important;
	}

	.el-menu-item.is-active {
		color: #23528D;
	}

	.el-menu-item:focus,
	.el-menu-item:hover {
		background-color: #F5F5F5;
		color: #23528D;
	}

	.el-tag {
		background-color: #D9EDF7;
		height: 36px;
		width: 100%;
		line-height: 36px;
		color: #2B7DBC;
		font-size: 16px;
	}

	.el-main {
		background-color: #FFFFFF;
		padding: 10px 20px 0px 10px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}
</style>
