<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="用户名称">
				<el-input v-model.trim="params.userName" size="small"></el-input>
			</el-form-item>
			<el-form-item label="用户职责">
				<el-input v-model.trim="params.userRoleId" size="small"></el-input>
			</el-form-item>
			<el-form-item label="用户所属地区">
				<el-input v-model.trim="params.daId" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="clear()" size="small">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="select()" size="small">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="add()" size="small">新建</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" @click="delBatch()" size="small">批量删除</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="results.data" style="width: 90%; margin-top: 20px;" @selection-change="handleSelectionChange">
			<el-table-column prop="userId" type="selection" width="55">
			</el-table-column>
			<el-table-column prop="userId" label="用户编号" width="200">
			</el-table-column>
			<el-table-column prop="userName" label="用户名称" width="200">
			</el-table-column>
			<el-table-column prop="userRoleId" label="用户职责" width="250">
			</el-table-column>
			<el-table-column prop="dataArea.daName" label="用户所属地区" width="200">
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="scope">
					<el-button @click="update(scope.row)" type="text" size="small">更新</el-button>
					<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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
		data() {
			return {
				pageNum: 1,
				results: {},
				params:{
					userId:0,
					userRoleId:null,
					userName:'',
					daId:null
				},
				multipleSelection:[]
			}
		},
		created() {
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectSysUserCount', 'selectSysUserPaging', this.params, pageNum, this.$store.state.maxPageNum, (response) => {
					this.results = response;
					console.log(this.results);
				});
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			select() {
				this.fenye(1);
			},
			clear() {
				this.params.userName = '';
				this.params.userRoleId = null;
				this.params.daId = '';
			},
			del(row) {
				if(!confirm('确定要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteSysUserById', {
						userId: row.userId
					})
					.then((response) => {
						if(response.data == 1) {
							this.fenye(1);
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			update(row) {
				this.$router.push({
					path: '/index/editUsers',
					query: {
						userId: row.userId
					}
				});
			},
			delBatch() {
				if (this.multipleSelection.length <= 0) {
					alert('请选择要删除的数据！');
					return;
				}
				if (!confirm('确认要删除这些数据吗？')) {
					return;
				}
				//由于服务器端需要int数组参数来批量删除，所以这里将对象数组中的id抽取出来成为一个新数组
				let paramArr = [];
				for(let i=0;i<this.multipleSelection.length;i++){
					paramArr[i]=this.multipleSelection[i].userId;
				}
				this.$axios.post('deleteSysUserBatch', paramArr)
					.then((response) => {
						if (response.data > 0) {
							this.fenye(1);
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			add() {
				this.$router.push('/index/addUsers');
			}
		}
	}
</script>

<style>

</style>