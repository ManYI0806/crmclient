<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>服务管理</el-breadcrumb-item>
			<el-breadcrumb-item>服务处理列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="selectClientServer" class="demo-form-inline el-main1">
			<el-form-item label="客户名称">
				<el-input v-model="selectClientServer.clientName"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="selectClientServer.serverTitle"></el-input>
			</el-form-item>
			<el-form-item label="服务类型">
				<el-select v-model="dataServerTypeList.clientCode">
					<el-option v-for="(item,index) in dataServerTypeList" :label="item.dstName" :value="item.dstId"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" size="small">清空</el-button>
				<el-button type="primary" size="small">查询</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="clientServerList" style="width: 100%;">
			<el-table-column fixed prop="serverId" label="服务编号" width="80" align="center">
			</el-table-column>
			<el-table-column prop="clientInfo.clientName" label="客户名称" width="200" align="center">
			</el-table-column>
			<el-table-column prop="serverTitle" label="概要" width="200" align="center">
			</el-table-column>
			<el-table-column prop="dataServerType.dstName" label="服务类型" width="100" align="center">
			</el-table-column>
			<el-table-column prop="sysUser.userName" label="创建人" width="180" align="center">
			</el-table-column>
			<el-table-column prop="serverCreateDate" label="创建时间" width="160" align="center">
			</el-table-column>
			<el-table-column label="操作" width="120" align="center">
				<template slot-scope="scope">
					<el-button @click="del()" type="text" size="small">
						<i class="el-icon-video-play"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" layout="total,prev,pager,next,jumper" :total="results.totalRow"
				 :page-size="$store.state.maxPageNum">
				</el-pagination>
	</div>
</template>
<script>
	export default {
		methods: {
			fenye(pageNum) {
							this.$fenye('selectClientServerCount', 'selectClientServerPaging', this.selectClientServer, pageNum, this.$store.state.maxPageNum, (response) => {
								this.results = response;
							});
						},
						handleCurrentChange(val) {
							this.fenye(val);
						},
						select() {
							this.fenye(1);
						},
						clear() {
							this.selectClientServer.clientName = '';
							this.selectClientServer.serverTitle = '';
						},
			
		del() {
			this.$router.push('/index/handleClientServer');
		}
		},

		data() {
			return {
				pageNum: 1, //此数据专用于文本框中用户输入的页数
				results: {},
				selectClientServer: {
					clientName: '',
					serverTitle: ''
				},
				clientServerList: [],
				dataServerTypeList: [],
				sysUserList:[]
			}
		},
		created() {
			this.fenye(1);
			this.$axios.post('selectClientServerAll')
				.then((response) => {
					this.clientServerList = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectDataServerTypeAll')
				.then((response) => {
					this.dataServerTypeList = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserAll')
				.then((response) => {
					console.log(response.data);
					this.sysUserList = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
</script>

<style scoped>
	.el-main1 {
		line-height: 0px;
		text-align: left;
		margin-top: 20px;
	}
</style>
