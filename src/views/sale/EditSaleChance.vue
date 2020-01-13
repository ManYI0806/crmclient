<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>编辑销售机会</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="销售机会编号">
						<el-input :disabled="true" v-model="saleChance.chanceId" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input v-model="saleChance.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="概要">
						<el-input v-model="saleChance.chanceTitle" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input v-model="saleChance.chanceLinkman" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input type="textarea" :rows="3" v-model="saleChance.chanceDesc" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="mini" @click="editSaleChance">保存</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" size="mini" @click="goback">返回</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="机会来源">
						<el-input v-model="saleChance.chanceSource" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="成功机率(%)">
						<el-input v-model="saleChance.chanceRate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话">
						<el-input v-model="saleChance.chanceTel" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input :disabled="true" v-model="sysuser.userName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input :disabled="true" v-model="saleChance.chanceCreateDate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 0,
					chanceSource: '',
					chanceCustName: '',
					chanceRate: '',
					chanceTitle: '',
					chanceTel: '',
					chanceLinkman: '',
					chanceCreateId: 0,
					chanceDesc: '',
					chanceCreateDate: '',
					chanceDueDate: ''
				},
				sysuser: {}
			}
		},
		created() {
			this.$axios.post('selectSysUserById', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.sysuser = response.data;
				})
			this.$axios.post('selectSaleChanceById', {
					chanceId: this.$route.query.chanceId
				})
				.then((response) => {
					this.saleChance = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
		},
		methods: {
			editSaleChance() {
				this.$axios.post('editSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							alert('修改成功');
							this.$router.push('/index/saleChanceList');
						} else {
							alert('编辑失败');
						}
					})
			},
			goback() {
				this.$router.push('/index/saleChanceList');
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

	.el-form-item {
		margin-bottom: 0;
	}

	.el-button--primary {
		margin-left: 100px;
	}
</style>
