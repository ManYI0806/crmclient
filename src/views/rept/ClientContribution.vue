<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i></el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">统计报表</a></el-breadcrumb-item>
			<el-breadcrumb-item>客户贡献分析</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin: 20px;"></div>
		<el-form :inline="true" :model="orders" class="demo-form-inline el-main1">
			<el-form-item label="客户名称">
				<el-input v-model="orders.clientName"></el-input>
			</el-form-item>
			<el-form-item label="年份">
				<el-select v-model="orders.ordersDate" style="width: 150px;">
					<el-option label="全部" value="全部"></el-option>
					<el-option label="2012" value="2012"></el-option>
					<el-option label="2013" value="2013"></el-option>
					<el-option label="2014" value="2014"></el-option>
					<el-option label="2015" value="2015"></el-option>
					<el-option label="2016" value="2016"></el-option>
					<el-option label="2017" value="2013"></el-option>
					<el-option label="2018" value="2013"></el-option>
					<el-option label="2019" value="2013"></el-option>
					<el-option label="2020" value="2013"></el-option>
				</el-select>
			</el-form-item>
			<el-from-item label="订单金额范围（万元)">订单金额范围（万元)
				<el-select v-model="orders.ordersTotal" style="width: 150px;">
					<el-option label="全部" value="全部"></el-option>
					<el-option label="0-10" value="0-10"></el-option>
					<el-option label="10-50" value="10-50"></el-option>
					<el-option label="50-100" value="50-100"></el-option>
					<el-option label="100-500" value="100-500"></el-option>
					<el-option label="500-1000" value="500-1000"></el-option>
					<el-option label="1000-5000" value="1000-5000"></el-option>
					<el-option label="5000-10000" value="5000-10000"></el-option>
					<el-option label="10000-50000" value="10000-50000"></el-option>
					<el-option label="50000-100000" value="50000-100000"></el-option>
					<el-option label="100000以上" value="100000以上"></el-option>
				</el-select>
			</el-from-item>
			<el-button type="danger" @click="clear()" size="small" style="margin-left: 10px;">清空</el-button>
			<el-button type="primary" @click="onSubmit()" size="small">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="orders" style="width: 100%">
			<el-table-column prop="ordersId" label="编号" width="200" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientName" label="客户名称" width="400" align="center">
			</el-table-column>
			<el-table-column prop="ordersTotal" label="订单金额" width="400" align="center">
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pageNum: 1, //此数据专用于文本框中用户输入的页数
				results: {},
				orders: []
			}
		},
		created() {
			this.$axios.post('selectClientInfoAndOrdersAll')
				.then((response) => {
					console.log(response.data);
					this.orders = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			clear() {
				this.orders.ordersDate = '';
				this.orders.clientName = '';
				this.orders.ordersTotal = '';
			}
		}
	}
</script>

<style scoped>
	.demo-form-inline {
		line-height: 0px;
		text-align: left;
		margin-top: 20px;
	}
</style>
