<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i></el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">统计报表</a></el-breadcrumb-item>
			<el-breadcrumb-item>客户服务分析</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin: 10px;"></div>
		<el-form :inline="true" :model="clientInfo" class="demo-form-inline el-main1">
			<el-form-item label="年份">
				<el-select v-model="clientInfo.ordersDate" style="width: 150px;">
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
				<el-button type="primary" size="small" style="margin-left: 10px;">查询</el-button>
			</el-form-item>
			<div style="margin: 20px;"></div>
			<el-table :data="DataServerType" stripe style="width: 100%">
				<el-table-column prop="clientServer.serverCreateDate" label="年份" width="200" align="center">
				</el-table-column>
				<el-table-column prop="dstName" label="建议" width="300" align="center">
				</el-table-column>
				<el-table-column prop="dstName" label="咨询" width="300" align="center">
				</el-table-column>
				<el-table-column prop="dstName" label="投诉" width="300" align="center">
				</el-table-column>
			</el-table>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				clientInfo: {
					ordersDate: ''
				},
				DataServerType: []
			}

		},
		created() {
			this.$axios.post('selectDataServerTypeAndClientServerAll')
				.then((response) => {
					console.log(response.data);
					this.DataServerType = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
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
