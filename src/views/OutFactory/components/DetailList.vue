<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.factoryName +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryName')" prop="factoryName" style="width: 100%;">
                <span>{{ personalForm.factoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryNumber')" style="width: 100%;">
                <span>{{ personalForm.factoryNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryFax')" style="width: 100%;">
                <span>{{ personalForm.factoryFax }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryContactName')" style="width: 100%;">
                <span>{{ personalForm.factoryContactName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryContactPhone')" style="width: 100%;">
                <span>{{ personalForm.factoryContactPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.taxNumber')" style="width: 100%;">
                <span>{{ personalForm.taxNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.accountName')" style="width: 100%;">
                <span>{{ personalForm.accountName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.bankName')" style="width: 100%;">
                <span>{{ personalForm.bankName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.account')" style="width: 100%;">
                <span>{{ personalForm.account }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.businessRegisterNumber')" style="width: 100%;">
                <span>{{ personalForm.businessRegisterNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.productionLicense')" style="width: 100%;">
                <span>{{ personalForm.productionLicense }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.unitAddress')" style="width: 100%;">
                <span>{{ personalForm.unitAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.unitEmail')" style="width: 100%;">
                <span>{{ personalForm.unitEmail }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.stat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" style="width:200px;margin-left: 18px" disabled>
                  <el-radio :label="1" style="width: 100px">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.wlxq') }}</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverId')" style="width: 100%;">
                <span>{{ personalForm.receiveName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receivePlaceCode')" style="width: 100%;">
                <span>{{ personalForm.receivePlaceCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.countryId')" style="width: 100%;">
                <span>{{ personalForm.countryNname }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.provinceId')" style="width: 100%;">
                <span>{{ personalForm.provinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.cityId')" style="width: 100%;">
                <span>{{ personalForm.cityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.regionId')" style="width: 100%;">
                <span>{{ personalForm.regionName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverPhone')" style="width: 100%;">
                <span>{{ personalForm.receiverPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverAddress')" style="width: 100%;">
                <span>{{ personalForm.receiverAddress }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom:30px;">
      <div ref="fuzhu" class="form-name" >{{ $t('updates.ktgspmx') }}</div>
      <button :loading="downloadLoading" class="print" style="font-size: 13px;background: white;" @click="handleExport">{{ $t('public.export') }}</button>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" fixed/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="90px" fixed/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="90px" fixed/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="90px" fixed/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="90px" fixed/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="90px" fixed/>
          <el-editable-column :label="$t('update4.jg')" prop="price" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="150px"/>

        </el-editable>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
var _that
export default {
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      downloadLoading: false,
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      list2: [],
      // 商品明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.outFactoryDetailVos
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlecancel() {
      this.editVisible = false
    },
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['物品编号', '物品名称', '规格', '单位', '颜色', '价格']
          const filterVal = ['productCode', 'productName', 'productType', 'unit', 'color', 'price']
          const data = this.formatJson(filterVal, this.list2)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: `${this.personalForm.factoryName}可提供商品明细`
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: 1000px;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .el-col-12{
    width: 49%;
  }
</style>
