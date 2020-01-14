<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i></el-breadcrumb-item>
			<el-breadcrumb-item>服务管理</el-breadcrumb-item>
			<el-breadcrumb-item>服务创建</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="clientServer" label-width="100px" :inline="true" :model="clientServer" class="demo-form-inline" style="margin-top: 30px;">
			<el-row>
				<el-col>
					<el-form-item label="概要">
						<el-input v-model="clientServer.serverTitle"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-select v-model="clientServer.clientCode">
							<el-option v-for="(item,index) in clientInfoList" :value="item.clientName"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item label="服务类型">
						<el-select v-model="clientServer.serverTypeId">
							<el-option v-for="(item,index) in dataServerTypeList" :label="item.dstName" :value="item.dstId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input disabled :value="this.$getSessionStorage('sysuser').userName"></el-input>
					</el-form-item>

				</el-col>
			</el-row>
			<el-row>
				<el-form-item label="服务请求内容">
					<el-input id="fuwu" type="textarea" :rows="6" v-model="clientServer.serverContent" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-input disabled v-model="clientServer.serverCreateDate"></el-input>

				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item>
					<el-button type="primary" @click="add()">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				clientServer: {
					serverTypeId: '',
					serverTitle: '',
					clientCode: '',
					serverContent: '',
					serverCreateId: this.$getSessionStorage('sysuser').userId,
					serverCreateDate: this.$getCurDate()
				},
				dataServerTypeList: [],
				clientInfoList: [],
			}
		},
		methods: {
			add() {
				this.$axios.post('insertClientServerjh', this.clientServer)
					.then((response) => {
						if (response.data == 1) {
							console.log(this.clientServer)
							this.$router.push('/index/addClientServer');
						} else {
							alert('添加失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		created() {
			this.$axios.post('selectDataServerTypeAlljh')
				.then((response) => {
					this.dataServerTypeList = response.data;

				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectClientInfoAlljh')
				.then((response) => {
					this.clientInfoList = response.data;

				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
</script>

<style scoped>
	.el-input {
		width: 300px;
	}

	.el-select {
		width: 300px;
	}

	.el-button {
		margin-left: 100px;
	}
</style>
