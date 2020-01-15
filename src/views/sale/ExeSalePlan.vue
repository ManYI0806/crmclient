<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>执行开发计划</el-breadcrumb-item>
			<el-button size="mini">开发成功</el-button>
			<el-button size="mini" @click="drawUpPlan">制定计划</el-button>
			<el-button size="mini" @click="stopPlan">终止开发</el-button>
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

		<template>
			<el-table :show-header="false" :data="salePlanList" style="width: 86%" :cell-style="{padding:'2px 0px',textAlign:'center',border:'none'}">
				<el-table-column width="495px">
					<template slot-scope="scope">
						<span>{{scope.row.planTodo}}</span>
					</template>
				</el-table-column>
				<el-table-column width="77px">
					<template slot-scope="scope">
						<span style="font-weight: bold;color:black;">执行效果</span>
					</template>
				</el-table-column>
				<el-table-column width="310px">
					<template slot-scope="scope">
						<el-input v-model="salePlanList[scope.$index].planResult" size="mini" style="width: 300px;"></el-input>
					</template>
				</el-table-column>
				<el-table-column width="48px">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editSalePlan(scope.row)">保存</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
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
			drawUpPlan() {
				this.$router.push({
					path: '/index/drawUpPlan',
					query: {
						chanceId: this.$route.query.chanceId,
						chanceCreateId: this.$route.query.chanceCreateId,
						chanceDueId: this.$route.query.chanceDueId
					}
				});
			},
			stopPlan() {
				this.$axios.post('updateSaleChanceStatusById', {
						chanceId: this.saleChance.chanceId
					})
					.then((response) => {
						alert('已终止开发');
						this.$router.push('/index/salePlanList');
					})
					.catch((error) => {
						console.log(error);
					})
			},
			editSalePlan(row) {
				this.$axios.post('updateSalePlanResultById', {
						planId: row.planId,
						planResult: row.planResult
					})
					.then((response) => {
						if (response.data == 1) {
							alert('保存成功');
						} else {
							alert('保存失败');
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
		/* font-weight: 00; */
		margin-bottom: 15px;
	}

	.el-breadcrumb .el-button {
		color: white;
		padding: 5px;
		background-color: #5BC0DE;
	}

	.el-icon-s-home {
		font-size: 18px;
	}

	.demo-form-inline {
		margin: 15px 0;
	}

	.el-form-item {
		margin-bottom: 0;
	}

	.el-table {
		margin: 0 auto;
		margin-top: 10px;
	}

	.el-table .el-button--primary {
		width: 38px;
		text-align: center;
		padding: 4px;
		background-color: #5BC0DE;
	}

	.goback {
		background-color: #337AB7;
		color: white;
		margin-top: 15px;
		margin-left: 105px;
	}
</style>
