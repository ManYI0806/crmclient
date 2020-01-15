<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>制定开发计划</el-breadcrumb-item>
			<el-button type="primary" size="mini" @click="exeSalePlan">执行计划</el-button>
		</el-breadcrumb>

		<el-row>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="销售机会编号">
						<el-input :disabled="true" v-model="saleChance.chanceId" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input :disabled="true" v-model="saleChance.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="概要">
						<el-input :disabled="true" v-model="saleChance.chanceTitle" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input :disabled="true" v-model="saleChance.chanceLinkman" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input :disabled="true" type="textarea" :rows="3" v-model="saleChance.chanceDesc" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="机会来源">
						<el-input :disabled="true" v-model="saleChance.chanceSource" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="成功机率(%)">
						<el-input :disabled="true" v-model="saleChance.chanceRate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话">
						<el-input :disabled="true" v-model="saleChance.chanceTel" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input :disabled="true" v-model="createUser.userName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input :disabled="true" v-model="saleChance.chanceCreateDate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="指派给">
						<el-input :disabled="true" v-model="dueUser.userName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="指派时间">
						<el-input :disabled="true" v-model="saleChance.chanceDueDate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-table :show-header="false" :data="salePlanList" empty-text="暂无计划项" style="width: 85%;" :cell-style="{padding:'3px 0px',border:'none'}">
			<el-table-column width="150">
				<template slot-scope="scope">
					<span style="margin-left: 10px">已有计划项</span>
				</template>
			</el-table-column>
			<el-table-column width="610" type="index">
				<template slot-scope="scope">
					<!-- 使用scope.$index获取table遍历时的索引号 -->
					<el-input v-model="salePlanList[scope.$index].planTodo" size="mini" style="width: 600px;"></el-input>
				</template>
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editSalePlan(scope.row)">保存</el-button>
					<el-button size="mini" type="danger" @click="delSalePlan(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="add">
			<span>制定计划项</span>
			<el-input v-model="newsPlan" size="mini" style="width: 600px;"></el-input>
			<el-button size="mini" type="success" @click="addSalePlan()">保存</el-button>
		</el-row>
		<el-button size="mini" class="goback" @click="goback">返回</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 0,
					chanceSource: '',
					chanceCustName: '',
					chanceRate: '',
					chanceTitle: '',
					chanceTel: '',
					chanceLinkman: '',
					chanceCreateId: 0,
					chanceDesc: '',
					chanceCreateDate: '',
					chanceDueDate: '',
					chanceDueId: ''
				},
				salePlanList: [],
				newsPlan: '',
				createUser: {},
				dueUser: {}
			}
		},
		created() {
			this.$axios.post('selectSaleChanceById', {
					chanceId: this.$route.query.chanceId
				})
				.then((response) => {
					this.saleChance = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserById', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.createUser = response.data;
					console.log(this.createUser);
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserById', {
					userId: this.$route.query.chanceDueId
				})
				.then((response) => {
					this.dueUser = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
			this.$axios.post('selectSalePlanAllByPlanChcId', {
					planChcId: this.$route.query.chanceId
				})
				.then((response) => {
					this.salePlanList = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
		},
		methods: {
			exeSalePlan() {
				// if(this.salePlanList.length==0){
				// 	alert('请首先添加计划项');
				// 	return;
				// }
				this.$router.push({
					path: '/index/exeSalePlan',
					query: {
						chanceId: this.saleChance.chanceId,
						chanceCreateId: this.saleChance.chanceCreateId,
						chanceDueId: this.saleChance.chanceDueId
					}
				});
			},
			editSalePlan(row) {
				this.$axios.post('updateSalePlanByPlanId', {
						planId: row.planId,
						planChcId: row.planChcId,
						planTodo: row.planTodo
					})
					.then((response) => {
						if (response.data == 1) {
							alert('修改成功');
						} else {
							alert('修改失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			delSalePlan(row) {
				if (!confirm('确认删除该计划项么')) {
					return;
				}
				this.$axios.post('deleteSalePlanByPlanId', {
						planId: row.planId
					})
					.then((response) => {
						if (response.data == 1) {
							alert('删除成功');
						} else {
							alert('删除失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			addSalePlan() {
				if (this.newsPlan == '' || this.newsPlan == null) {
					alert('计划项不能为空');
					return;
				}
				this.$axios.post('insertSalePlan', {
						planId: this.saleChance.planId,
						planChcId: this.saleChance.chanceId,
						planTodo: this.newsPlan
					})
					.then((response) => {
						if (response.data == 1) {
							alert('添加成功');
						} else {
							alert('添加失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			goback() {
				this.$router.push('/index/salePlanList');
			}
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

	.el-table .el-button,
	.add .el-button {
		width: 40px;
		text-align: center;
		padding: 5px;
	}

	.el-table .el-button--primary {
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

	.add {
		margin-top: 5px;
		margin-left: 105px;
	}

	.add span {
		font-size: 14px;
		font-weight: bold;
		margin-right: 70px;
	}

	.add .el-button {
		margin-left: 10px;
	}

	.goback {
		background-color: #337AB7;
		color: white;
		margin-top: 15px;
		margin-left: 105px;
	}
</style>
