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

		<el-row>
			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="120px">
					<el-form-item label="销售机会编号">
						<el-input :disabled="true" v-model="saleChance.chanceId" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="客户名称"><span class="sign">*</span>
						<el-input v-model="saleChance.chanceCustName" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="概要"><span class="sign">*</span>
						<el-input v-model="saleChance.chanceTitle" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input v-model="saleChance.chanceLinkman" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input type="textarea" :rows="3" v-model="saleChance.chanceDesc" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addSaleChance" size="mini">保存</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="goback" size="mini">返回</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<el-col :span="12">
				<el-form :inline="true" ref="saleChance" :model="saleChance" label-width="100px">
					<el-form-item label="机会来源">
						<el-input v-model="saleChance.chanceSource" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="成功机率(%)"><span class="sign">*</span>
						<el-input v-model="saleChance.chanceRate" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话">
						<el-input v-model="saleChance.chanceTel" size="small" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-input :disabled="true" :value="this.$getSessionStorage('sysuser').userName" size="small" style="width: 400px;"></el-input>
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
					chanceId: '',
					chanceSource: '',
					chanceCustName: '',
					chanceRate: '',
					chanceTitle: '',
					chanceTel: '',
					chanceLinkman: '',
					chanceCreateId: this.$getSessionStorage('sysuser').userId,
					chanceDesc: '',
					chanceCreateDate: this.$getCurDate()
				}
			}
		},
		methods: {
			addSaleChance() {
				if (this.saleChance.chanceCustName == '' || this.saleChance.chanceTitle == '' || this.saleChance.chanceRate == '') {
					alert('*号为必填项');
					return;
				}
				this.$axios.post('insertSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							this.$router.push('/index/saleChanceList');
						} else {
							alert('添加失败');
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
		/* font-weight: 00; */
		margin-bottom: 15px;
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

	.el-button {
		margin-top: 20px;
	}

	.el-button--primary {
		margin-left: 100px;
		background-color: #5BC0DE;
	}

	.el-button--success {
		background-color: #337AB7;
		border-color: #2E6DA4;
	}

	.sign {
		color: red;
		margin-left: -11px;
		margin-right: 4px;
		font-weight: bold;
	}
</style>
