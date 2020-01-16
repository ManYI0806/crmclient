<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i></el-breadcrumb-item>
			<el-breadcrumb-item>
				<a href="/">统计报表</a>
			</el-breadcrumb-item>
			<el-breadcrumb-item>客户构成分析</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="活动区域">
				<el-select v-model="formInline.region">
					<el-option label="按等级" value="按等级"></el-option>
					<el-option label="按满意度" value="按满意度"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<template>
			<el-table :data="dataClientLevel" stripe style="width: 50%">
				<el-table-column prop="dclId" label="编号" width="180" align="center">
				</el-table-column>
				<el-table-column prop="dclName" label="等级" width="180" align="center">
				</el-table-column>
				<el-table-column prop="count" label="客户数量" width="180" align="center">
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					region: ''
				},
				dataClientLevel: []
			}
		},
		created() {
			this.$axios.post('selectClientInfoAndDataClientLevelAll')
				.then((response) => {
					console.log(response.data);
					this.dataClientLevel = response.data;
				})
				.catch((error) => {
					console.log(error);
				});

		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped>
	.demo-form-inline {
		line-height: 0px;
		text-align: left;
		margin-top: 20px;
		width: ;
	}
</style>