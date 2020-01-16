<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
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
			<el-form-item>
				<el-button type="success" @click="addSaleChance" size="mini">新建</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="results.data" stripe style="width: 100%;text-align: center;" :cell-style="{padding:'0',textAlign:'center'}"
		 :row-style="{padding:'0'}" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:900,borderTop:'1px solid #EBEEF5',backgroundColor:'#F5F5F5',textAlign:'center'}">
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
							<el-button type="text" title="指派" size="small" :style="{display:visibleCancel}" @click="dueSaleChance(scope.row)">
								<i class="el-icon-s-unfold"></i>
							</el-button>
						</el-col>
						<el-col>
							<el-button type="text" title="编辑" size="small" :style="{display:scope.row.chanceCreateId==userId?'inline':'none'}"
							 @click="editSaleChance(scope.row)">
								<i class="el-icon-edit-outline"></i>
							</el-button>
						</el-col>
						<el-col>
							<el-button type="text" title="删除" size="small" :style="{display:scope.row.chanceCreateId==userId?'inline':'none'}"
							 @click="delSaleChance(scope.row)">
								<i class="el-icon-delete"></i>
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
		data() {
			return {
				pageNum: 1, //用于文本框中用户输入的内容，表示跳转到哪一页
				results: {},
				params: { //模糊查询的输入条件参数
					chanceCustName: '',
					chanceTitle: '',
					chanceLinkman: '',
					chanceStatus: 0
				},
				visibleCancel: '',
				userRoleId: this.$getSessionStorage('sysuser').userRoleId,
				userId: this.$getSessionStorage('sysuser').userId
			}
		},
		created() {
			if (this.userRoleId != 2) {
				this.visibleCancel = 'none';
			}
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', this.params, pageNum, this.$store.state.maxPageNum,
					(response) => {
						this.results = response;
					})
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			//清空查询条件
			clear() {
				this.params.chanceCustName = '';
				this.params.chanceTitle = '';
				this.params.chanceLinkman = '';
			},
			//查询功能
			selectSaleChance() {
				this.fenye(1);
			},
			//新建功能
			addSaleChance() {
				this.$router.push('/index/addSaleChance');
			},
			//指派功能
			dueSaleChance(row) {
				this.$router.push({
					path: '/index/dueSaleChance',
					query: {
						chanceId: row.chanceId,
						chanceCreateId: row.chanceCreateId
					}
				});
			},
			//编辑功能
			editSaleChance(row) {
				this.$router.push({
					path: '/index/editSaleChance',
					query: {
						chanceId: row.chanceId,
						chanceCreateId: row.chanceCreateId
					}
				})
			},
			//删除功能
			delSaleChance(row) {
				if (!confirm('确认删除' + row.chanceCustName + '的数据么')) {
					return;
				}
				this.$axios.post('deleteSaleChanceById', {
						chanceId: row.chanceId
					})
					.then((response) => {
						if (response.data == 1) {
							this.fenye(1);
						} else {
							alert('删除失败');
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
	
	.el-table .el-button span i{
		font-size: 16px;
	}
	
	.el-col-24{
		width: 30px;
	}

	.el-pagination {
		margin-top: 15px;
		text-align: center;
	}
</style>
