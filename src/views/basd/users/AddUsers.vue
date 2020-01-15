<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>新建用户</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="sysUser" :model="sysUser" label-width="100px" style="margin-top: 15px;width: 500px;">
			<el-form-item label="用户姓名">
				<el-input v-model="sysUser.userName"></el-input>
			</el-form-item>
			<el-form-item label="用户职责">
			<el-select v-model="sysUser.userRoleId">
				    <el-option v-for="(item,index) in userRole" :label="item.roleName" :value="item.roleId">
					</el-option>
			</el-select>
			</el-form-item>
			<el-form-item label="用户所属地区">
			<el-select v-model="dataAreaList.daId">
				    <el-option v-for="item in dataAreaList" :label="item.daName" :value="item.daId">
					</el-option>
			</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="add()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sysUser: {
					userId: 0,
					userName: '',
					daId: 0,
					userRoleId: 0
				},
				dataArea:{
					daId:0,
					daName:''
				},
				dataAreaList:[],
				sysUserList:[],
				userRole:[
				    {
					    roleId:1,
					    roleName:'系统管理员'
				    },
				    {
					    roleId:2,
					    roleName:'销售主管'
				    },
				    {
					    roleId:3,
					    roleName:'客户经理'
				    },
				    {
				    	roleId:4,
					    roleName:'高管'
				    }
				]
			}
		},
		created() {
			this.$axios.post('selectSysUserAll')
					.then((response) => {
						this.sysUserList = response.data;
						this.sysUser.userRoleId=this.sysUserList[0].userRoleId;
						this.sysUser.daId=this.sysUserList[0].daId;
					})
					.catch((error) => {
						console.log(error);
					});
			this.$axios.post('selectDataAreaAll')
					.then((response) => {
						this.dataAreaList = response.data;
						this.dataArea.daName=this.dataAreaList[0].daName;
						this.dataArea.daId=this.dataAreaList[0].daId;
					})
					.catch((error) => {
						console.log(error);
					});
		},
		methods: {
			add() {
				this.$axios.post('insertSysUser', this.sysUser)
					.then((response) => {
						if(response.data == 1) {
							this.dataArea.daId=this.sysUser.daId;
							this.$router.push('/index/dataUsers');
						} else {
							alert('添加失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
	}
</script>

<style>
	.el-select {
		width: 350px;
	}
</style>