<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理 </el-breadcrumb-item>
			<el-breadcrumb-item>编辑用户</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="sysUser" :model="sysUser" label-width="100px" style="margin-top: 15px;width: 500px;">
			<el-form-item label="用户编号">
				<el-input v-model="sysUser.userId" disabled></el-input>
			</el-form-item>
			<el-form-item label="用户姓名">
				<el-input v-model="sysUser.userName"></el-input>
			</el-form-item>
			<el-form-item label="用户职责">
				<el-select v-model="sysUser.userRoleId">
					<el-option v-for="item in sysUserList" :label="item.userRoleId" :value="item.userRoleId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户所属地区">
				<el-select v-model="sysUser.daId">
					<el-option v-for="item in dataAreaList" :label="item.daName" :value="item.daId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="update()">更新</el-button>
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
				sysUserList:[],
				dataAreaList:[]
			}
		},
		created() {
			this.$axios.post('selectSysUserById',{
				userId:this.$route.query.userId
			})
				.then((response) => {
					this.sysUser=response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserAll')
					.then((response) => {
						this.sysUserList = response.data;
						this.sysUser.userRoleId=this.sysUserList[0].userRoleId;
					})
					.catch((error) => {
						console.log(error);
					});
			this.$axios.post('selectDataAreaAll')
					.then((response) => {
						this.dataAreaList = response.data;
						this.sysUser.daId=this.dataAreaList[0].daId;
					})
					.catch((error) => {
						console.log(error);
					});
		},
		methods:{
			update(){
				this.$axios.post('updateSysUser',this.sysUser)
					.then((response) => {
						if(response.data==1){
							this.$router.push('/index/dataUsers');
						}else{
							alert('更新失败！');
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
</style>
