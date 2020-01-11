<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>企业客户等级管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table :data="dataClientLevellist" stripe style="width: 100%">
			<el-table-column>
				<el-checkbox v-model="checked"></el-checkbox>
			</el-table-column>
			<el-table-column prop="dclId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="dclName" label="客户等级名称">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button type="primary">编辑</el-button>
					<el-button type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary">新建</el-button>
		<el-button type="danger">批量删除</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				dataClientLevellist: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$axios.post('selectDataClientLevelAll')
					.then((response) => {
						this.dataClientLevellist = response.data;
						console.log(response.data);
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