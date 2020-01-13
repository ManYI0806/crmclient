<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/index' }">
				<i class="el-icon-s-home"></i>
			</el-breadcrumb-item>
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>指派销售机会</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="销售机会编号">
						<el-input :disabled="true" v-model="saleChance.chanceId" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input :disabled="true" v-model="saleChance.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="概要">
						<el-input :disabled="true" v-model="saleChance.chanceTitle" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input :disabled="true" v-model="saleChance.chanceLinkman" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input :disabled="true" type="textarea" :rows="3" v-model="saleChance.chanceDesc" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="机会来源">
						<el-input :disabled="true" v-model="saleChance.chanceSource" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="成功机率(%)">
						<el-input :disabled="true" v-model="saleChance.chanceRate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话">
						<el-input :disabled="true" v-model="saleChance.chanceTel" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input :disabled="true" :value="sysuser.userName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input :disabled="true" v-model="saleChance.chanceCreateDate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
			<el-row>
				<el-form-item label="指派给">
					<el-select filterable size="small" v-model="saleChance.chanceDueId" style="width: 400px;margin-right: 65px;">
						<el-option v-for="item in sysuserMgrList" :label="item.userName" :value="item.userId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="指派时间">
					<el-input :disabled="true" v-model="saleChance.chanceDueDate" size="small" style="width: 400px;"></el-input>
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item>
					<el-button type="primary" size="mini" @click="dueSaleChance">指派</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="success" size="mini" @click="goback">返回</el-button>
				</el-form-item>
			</el-row>
		</el-form>
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
					chanceDueDate: '',
					chanceDueId: 0
				},
				sysuser: {},
				sysuserMgrList: []
			}
		},
		created() {
			this.$axios.post('selectSaleChanceById', {
					chanceId: this.$route.query.chanceId
				})
				.then((response) => {
					this.saleChance = response.data;
					this.saleChance.chanceDueDate = this.$getCurDate();
				})
				.catch((error) => {
					console.log(error);
				})

			this.$axios.post('selectSysUserById', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.sysuser = response.data;
				})
				.catch((error) => {
					console.log(error);
				})

			this.$axios.post('selectSysUserCustMgrAll')
				.then((response) => {
					this.sysuserMgrList = response.data;
					this.saleChance.chanceDueId = this.sysuserMgrList[0].userId;
				})
				.catch((error) => {
					console.log(error);
				})
		},
		methods: {
			dueSaleChance() {
				this.$axios.post('dueSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							alert('指派成功');
							this.$router.push('/index/saleChanceList');
						} else {
							alert('指派失败');
						}
					})
					.catch((error) => {
						console.log(error);
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
