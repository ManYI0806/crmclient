<template>
	<div>
		<el-container>
			<el-header height="80px">
				<h3>CRM 客户关系管理系统 <small>Ver.1.0.0</small></h3>
			</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-main id="main">Main</el-main>
			</el-container>
			<el-footer height="42px">
				<p>Copyright &copy yuhongjun 版权所有 2017-04-23 CRM客户关系管理系统</p>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default{
		name:'Index',
		data(){
			return {
				bodyHeight:0
			}
		},
		mounted(){
			document.getElementById('main').style.height = document.body.clientHeight - 122+'px';
			this.bodyHeight = document.body.clientHeight;
			window.onresize = ()=>{
				this.bodyHeight = document.body.clientHeight;
			}
		},
		watch:{
			bodyHeight:function(){
				document.getElementById('main').style.height = this.bodyHeight - 122 + 'px';
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	html,
	body{
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 100%;
	}
	.el-header{
		background-color: #438EB9;
		color: #FFFFFF;
		text-align: left;
		line-height: 40px;
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
		line-height: 200px;
		border-right: 1px solid #CCCCCC;
	}
	
	.el-main {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
</style>