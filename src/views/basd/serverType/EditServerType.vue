<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>服务类型管理 </el-breadcrumb-item>
			<el-breadcrumb-item>编辑服务类型</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="dataServerType" :model="dataServerType" label-width="100px" style="margin-top: 15px;width: 500px;">
			<el-form-item label="客户等级编号">
				<el-input v-model="dataServerType.dstId" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="客户等级名称">
				<el-input v-model="dataServerType.dstName"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="edit()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dataServerType: {
					dstId: 0,
					dstName: ''
				}
			}
		},
		created() {
			this.$axios.post('selectDataServerTypeById', {
					dstId: this.$route.query.dstId
				})
				.then((response) => {
					this.dataServerType = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			edit() {
				this.$axios.post('updateDataServerType', this.dataServerType)
					.then((response) => {
						if(response.data == 1) {
							this.$router.push('/index/dataServerType');
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

</style>