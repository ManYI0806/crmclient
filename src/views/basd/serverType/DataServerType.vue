<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>服务类型管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table :data="dataServerTypelist" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
			</el-table-column>
			<el-table-column prop="dstId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="dstName" label="服务类型">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button type="primary" @click="editDataServerType(scope.row)">编辑</el-button>
					<el-button type="danger" @click="deleteDataServerType(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="addDataServerType()">新建</el-button>
		<el-button type="danger" @click="delBatch()">批量删除</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				dataServerTypelist: [],
				multipleSelection:[]
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$axios.post('selectDataServerTypeAll')
					.then((response) => {
						this.dataServerTypelist = response.data;
					})
					.catch((error) => {
						console.log(error);
					});
			},
			addDataServerType() {
				this.$router.push('/index/addServerType');
			},
			deleteDataServerType(row) {
				if(!confirm('确定要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteDataServerType', {
						dstId: row.dstId
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
			editDataServerType(row) {
				this.$router.push({
					path: '/index/editServerType',
					query: {
						dstId: row.dstId
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
					paramArr[i]=this.multipleSelection[i].dstId;
				}
				this.$axios.post('deleteDataServerTypeBatch', paramArr)
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