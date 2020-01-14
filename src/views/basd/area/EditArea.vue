<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>地区管理</el-breadcrumb-item>
			<el-breadcrumb-item>编辑地区</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="dataArea" :model="dataArea" label-width="100px" style="margin-top: 15px;width: 500px;">
			<el-form-item label="地区编号">
				<el-input v-model="dataArea.daId" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="地区名称">
				<el-input v-model="dataArea.daName"></el-input>
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
				dataArea: {
					daId: 0,
					daName: ''
				}
			}
		},
		created() {
			this.$axios.post('selectDataAreaById', {
					daId: this.$route.query.daId
				})
				.then((response) => {
					this.dataArea = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			edit() {
				this.$axios.post('updateDataArea', this.dataArea)
					.then((response) => {
						if(response.data == 1) {
							this.$router.push('/index/dataArea');
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