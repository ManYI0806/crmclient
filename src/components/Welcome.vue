<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index/' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>欢迎页面</el-breadcrumb-item>
		</el-breadcrumb>
		<img src="../assets/welcome.jpg" />
	</div>
</template>

<script>
	export default {
		name: 'Welcome'
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.el-breadcrumb {
		background-color: #D9EDF7;
		border-radius: 5px;
		height: 36px;
		line-height: 36px;
		padding-left: 15px;
		font-weight: 00;
	}

	.el-icon-s-home {
		font-size: 18px;
	}
	
	div{
		text-align: center;
	}
	img{
		margin-top: 80px;
	}
	
</style>
