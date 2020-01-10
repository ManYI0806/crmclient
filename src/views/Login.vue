<template>
	<div>
		<el-card class="box-card" :body-style="{padding:'15px'}">
			<div slot="header" class="clearfix">
				<div style="margin:-18px -20px; padding:8px 10px; background: #337AB7;color: white;">CRM客户关系管理系统 登陆</div>
			</div>
			<div class="text item">
				<el-form :model="sysuser" status-icon :rules="rules" ref="sysuser" label-width="65px" class="demo-ruleForm" size="mini">
					<el-form-item label="用户名" prop="userName">
						<el-input type="text" v-model="sysuser.userName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="userPassword">
						<el-input type="password" v-model="sysuser.userPassword" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="login('sysuser')">登陆</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			var validateUserName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				sysuser: {
					userName:'',
					userPassword: ''
				},
				rules: {
					userName: [{
						validator: validateUserName,
						trigger: 'blur'
					}],
					userPassword: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			login(sysuser) {
				this.$refs[sysuser].validate((valid) => {
					if(valid) {
						this.$axios.post('selectSysUserByNameByPass',this.sysuser)
							.then((response)=>{
								if(response.data==''){
									alert('用户名户密码错误!');
								}else{
									this.$setSessionStorage('sysuser',response.data);
									this.$router.push("/index");
								}
							})
							.catch((error)=>{
								console.log(error);
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			users(sysuser) {
				this.$refs[users].resetFields();
			}
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}
	
	.item {
		margin-bottom: 18px;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	.box-card {
		width: 360px;
		margin: 0 auto;
		margin-top: 180px;
		border: 1px solid #337AB7;
	}
	
	.el-input{
		width: 245px;
	}
</style>