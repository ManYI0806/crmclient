<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>制定开发计划</el-breadcrumb-item>
			<el-button type="primary" size="mini">执行计划</el-button>
		</el-breadcrumb>

		<el-row>
			<el-col :span="12">
				<el-form :inline="true" ref="form" :model="form" label-width="100px">
					<el-form-item label="销售机会编号">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="概要">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input :disabled="true" type="textarea" :rows="3" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12">
				<el-form :inline="true" ref="form" :model="form" label-width="100px">
					<el-form-item label="机会来源">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="成功机率(%)">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="指派给">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="指派时间">
						<el-input :disabled="true" v-model="form.name" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-table :show-header="false" :data="tableData" empty-text="暂无计划项" style="width: 85%;":cell-style="{padding:'3px 0px',border:'none'}">
			<el-table-column label="日期" width="150">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="姓名" width="610">
				<template slot-scope="scope">
					<el-input v-model="form.name" size="mini" style="width: 600px;"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">保存</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="add">
			<span>制定计划项</span>
			<el-input v-model="form.name" size="mini" style="width: 600px;"></el-input>
			<el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">保存</el-button>
		</el-row>
		<el-button size="mini" class="goback" @click="handleEdit(scope.$index, scope.row)">返回</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {

				},
				tableData: [{
					date: '已有计划项',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '已有计划项',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '已有计划项',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-breadcrumb {
		background-color: #D9EDF7;
		border-radius: 5px;
		height: 36px;
		line-height: 36px;
		padding-left: 15px;
		padding-right: 15px;
		margin-bottom: 15px;
	}

	.el-icon-s-home {
		font-size: 18px;
	}

	.el-table {
		margin: 0 auto;
		margin-top: 10px;
	}
	
	.el-table .el-button,.add .el-button{
		width: 40px;
		text-align: center;
		padding: 5px;
	}
	
	.el-table .el-button--primary{
		background-color: #5BC0DE;
	}
	
	.el-breadcrumb .el-button {
		float: right;
		margin-top: 7px;
		padding: 4px;
		background-color: #5BC0DE;
	}

	.el-form-item {
		margin-bottom: 0;
	}
	
	.add{
		margin-top: 5px;
		margin-left: 105px;
	}
	.add span{
		font-size: 14px;
		font-weight: bold;
		margin-right: 70px;
	}
	
	.add .el-button{
		margin-left: 10px;
	}
	
	.goback{
		background-color: #337AB7;
		color: white;
		margin-top: 15px;
		margin-left: 105px;
	}
	
</style>
