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
		
		<el-table :data="results.data" stripe style="width: 100%" :header-cell-style="{color:'#333',fontSize:'14px',fontWeight:900,borderTop:'1px solid #EBEEF5',backgroundColor:'#F5F5F5',textAlign:'center'}">
			<el-table-column prop="chanceId" label="编号"></el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称"></el-table-column>
			<el-table-column prop="chanceTitle" label="概要"></el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人"></el-table-column>
			<el-table-column prop="chanceTel" label="联系人电话"></el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">制定计划</el-button>
					<el-button type="text" size="small">执行计划</el-button>
					<el-button type="text" size="small">开发成功</el-button>
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
					chanceLinkman: ''
				}
			}
		},
		methods: {
			clear() {
	
			},
			selectSaleChance() {
				console.log('submit!');
			},
			handleCurrentChange(val) {
				console.log('当前页: ${val}');
			},
			handleClick(row) {
				console.log(row);
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
	
	.el-form-item{
		margin-bottom: 0;
	}
	
</style>