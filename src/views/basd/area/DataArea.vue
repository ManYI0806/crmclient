<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>基础数据</el-breadcrumb-item>
			<el-breadcrumb-item>地区管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table :data="dataArealist" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
			</el-table-column>
			<el-table-column prop="daId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="daName" label="地区名称">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button type="primary" @click="editDataArea(scope.row)">编辑</el-button>
					<el-button type="danger" @click="delDataArea(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="addDataArea()">新建</el-button>
		<el-button type="danger" @click="delBatch()">批量删除</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				dataArealist: [],
				multipleSelection:[]
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$axios.post('selectDataAreaAll')
					.then((response) => {
						this.dataArealist = response.data;
//						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			},
			addDataArea() {
				this.$router.push('/index/addArea');
			},
			delDataArea(row) {
				if(!confirm('确定要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteDataArea', {
						daId: row.daId
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
			editDataArea(row) {
				this.$router.push({
					path: '/index/editArea',
					query: {
						daId: row.daId
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
					paramArr[i]=this.multipleSelection[i].daId;
				}
				this.$axios.post('deleteDataAreaBatch', paramArr)
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