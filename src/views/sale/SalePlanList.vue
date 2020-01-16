<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="客户名称">
				<el-input v-model="params.chanceCustName" size="mini" style="width: 152px;"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="params.chanceTitle" size="mini" style="width: 152px;"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="params.chanceLinkman" size="mini" style="width: 152px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="danger " @click="clear" size="mini">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="selectSaleChance" size="mini">查询</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="results.data" stripe style="width: 100%" :cell-style="{padding:'0',textAlign:'center'}" :row-style="{padding:'0'}"
		 :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:900,borderTop:'1px solid #EBEEF5',backgroundColor:'#F5F5F5',textAlign:'center'}">
			<el-table-column prop="chanceId" label="编号" width="80px"></el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称" width="230px"></el-table-column>
			<el-table-column prop="chanceTitle" label="概要" width="300px"></el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人" width="100px"></el-table-column>
			<el-table-column prop="chanceTel" label="联系人电话"></el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间" width="100px"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-row type="flex" justify="center">
						<el-col>
							<el-button type="text" title="制定计划" size="small" @click="drawUpPlan(scope.row)">
								<i class="el-icon-document-add"></i>
							</el-button>
						</el-col>
						<el-col>
							<el-button type="text" title="执行计划" size="small" :style="{display:scope.row.chanceDueId==userId?'inline':'none'}"
							 @click="exeSalePlan(scope.row)">
								<i class="el-icon-s-promotion"></i>
							</el-button>
						</el-col>
						<el-col>
							<el-button type="text" title="开发成功" size="small" :style="{display:scope.row.chanceDueId==userId?'inline':'none'}"
							 @click="devSuccess(scope.row)">
								<i class="el-icon-finished"></i>
							</el-button>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="results.totalRow"
		 :page-size="$store.state.maxPageNum">
		</el-pagination>

	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		data() {
			return {
				pageNum: 1, //用于文本框中用户输入的内容，表示跳转到哪一页
				results: {},
				params: { //模糊查询的输入条件参数
					chanceCustName: '',
					chanceTitle: '',
					chanceLinkman: '',
					chanceStatus: 1
				},
				userId: this.$getSessionStorage('sysuser').userId
			}
		},
		created() {
			this.fenye(1)
		},
		methods: {
			refresh() {
				this.reload();
			},
			fenye(pageNum) {
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', this.params, pageNum, this.$store.state.maxPageNum,
					(response) => {
						this.results = response;
					})
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			clear() {
				this.params.chanceCustName = '';
				this.params.chanceTitle = '';
				this.params.chanceLinkman = '';
			},
			selectSaleChance() {
				this.fenye(1);
			},
			drawUpPlan(row) {
				if (this.$getSessionStorage('sysuser').userRoleId == 3 && this.userId != row.chanceDueId) {
					alert('您当前没有对这条数据制定计划的权限');
					return;
				}
				this.$router.push({
					path: '/index/drawUpPlan',
					query: {
						chanceId: row.chanceId,
						chanceCreateId: row.chanceCreateId,
						chanceDueId: row.chanceDueId
					}
				});
			},
			exeSalePlan(row) {
				this.$router.push({
					path: '/index/exeSalePlan',
					query: {
						chanceId: row.chanceId,
						chanceCreateId: row.chanceCreateId,
						chanceDueId: row.chanceDueId
					}
				});
			},
			devSuccess(row) {
				this.$axios.post('updateSaleChanceStatusById', {
						chanceId: row.chanceId,
						chanceStatus: 2
					})
					.then((response) => {
						this.reload();
					})
					.catch((error) => {
						console.log(error);
					});
				this.$axios.post('insertClientInfo', {
						clientCode: this.$getSerialNum(),
						clientName: row.chanceCustName,
						clientCustId: row.chanceDueId
					})
					.then((response) => {
						if (response.data == 1) {
							alert('sucess');
						}
					})
					.catch((error) => {
						console.log(error);
					})
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
		font-weight: 00;
	}

	.el-icon-s-home {
		font-size: 18px;
	}

	.demo-form-inline {
		margin: 12px 0;
	}

	.el-form-item {
		margin-bottom: 0;
	}

	.el-pagination {
		text-align: center;
	}

	.el-table .el-button span i {
		font-size: 16px;
	}

	.el-col-24 {
		width: 30px;
	}
</style>
