<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i></el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">统计报表</a></el-breadcrumb-item>
			<el-breadcrumb-item>客户流失分析</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin: 20px;"></div>
		<el-form :inline="true" :model="clientReprieveLose" class="demo-form-inline el-main1">
			<el-form-item label="客户名称">
				<el-input v-model="clientReprieveLose.Name"></el-input>
			</el-form-item>
			<el-form-item label="客户经理">
				<el-input v-model="clientReprieveLose.Manager"></el-input>
			</el-form-item>
			<el-form-item label="年份">
				<el-select v-model="clientReprieveLose.Date" style="width: 150px;">
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
			<el-button type="danger" @click="clear()" size="small" style="margin-left: 10px;">清空</el-button>
			<el-button type="primary" @click="onSubmit()" size="small">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="clientReprieveLose" stripe style="width: 100%">
			<el-table-column prop="clientReprieveLoseId" label="编号" width="200" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientLoseDate" label="年份" width="150" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientName" label="客户名称" width="200" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientCustId" label="客户经理" width="200" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientLoseReason" label="流失原因" width="400" align="center">
			</el-table-column>
		</el-table>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				clientReprieveLose: []
			}
		},
		created() {
			this.$axios.post('selectClientReprieveLoseAll')
				.then((response) => {
					console.log(response.data);
					this.clientReprieveLose = response.data;
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
				this.clientReprieveLose.Date = '';
				this.clientReprieveLose.Name = '';
				this.clientReprieveLose.Manager = '';
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
