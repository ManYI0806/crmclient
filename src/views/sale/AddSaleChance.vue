<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>新建销售机会</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-row>
				<el-col>
					<el-form-item label="销售机会编号">
						<el-input v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会来源">
						<el-input v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-form-item label="客户名称">
					<el-input v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="成功几率(%)">
					<el-input v-model="params.chanceTitle" size="small" style="width: 400px;"></el-input>
				</el-form-item>
			</el-row>

			<el-row>
				<el-form-item label="概要">
					<el-input v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话">
					<el-input v-model="params.chanceTitle" size="small" style="width: 400px;"></el-input>
				</el-form-item>
			</el-row>

			<el-row>
				<el-form-item label="联系人">
					<el-input v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="创建人">
					<el-input v-model="params.chanceTitle" size="small" style="width: 400px;"></el-input>
				</el-form-item>
			</el-row>

			<el-row>
				<el-form-item label="机会描述">
					<el-input type="textarea" :rows="3" v-model="params.chanceCustName" size="small" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-input v-model="params.chanceTitle" size="small" style="width: 400px;"></el-input>
				</el-form-item>
			</el-row>

			<el-form-item>
				<el-button type="primary" @click="selectSaleChance" size="mini">保存</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="addSaleChance" size="mini">返回</el-button>
			</el-form-item>
		</el-form>

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
			addSaleChance() {
				this.$router.push('/index/addSaleChance');
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
		margin: 15px 0;
	}
</style>
