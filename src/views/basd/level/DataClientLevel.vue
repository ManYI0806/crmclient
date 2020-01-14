<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>企业客户等级管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table :data="dataClientLevellist" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
			</el-table-column>
			<el-table-column prop="dclId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="dclName" label="客户等级名称">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button type="primary" @click="editdataClientLevel(scope.row)">编辑</el-button>
					<el-button type="danger" @click="deldataClientLevel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="adddataClientLevel()">新建</el-button>
		<el-button type="danger" @click="delBatch()">批量删除</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				dataClientLevellist: [],
				multipleSelection:[]
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$axios.post('selectDataClientLevelAll')
					.then((response) => {
						this.dataClientLevellist = response.data;
//						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			},
			adddataClientLevel() {
				this.$router.push('/index/addClientLevel');
			},
			deldataClientLevel(row) {
				if(!confirm('确定要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteDataClientLevel', {
						dclId: row.dclId
					})
					.then((response) => {
						if(response.data == 1) {
							this.init();
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			
			},
			editdataClientLevel(row) {
				this.$router.push({
					path: '/index/editClientLevel',
					query: {
						dclId: row.dclId
					}
				});

			},
			delBatch(){
				if(this.multipleSelection.length<=0){
					alert('请选择要删除的数据！');
					return;
				}
				if(!confirm('确认要删除这些数据吗？')){
					return;
				}
				let paramArr = [];
				for(let i=0;i<this.multipleSelection.length;i++){
					paramArr[i]=this.multipleSelection[i].dclId;
				}
				this.$axios.post('deleteDataClientLevelBatch', paramArr)
					.then((response) => {
						if(response.data>0){
							this.init();
						}else{
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}

		}
	}
</script>

<style>

</style>