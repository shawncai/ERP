<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.applyNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="width: 100%;">
                <el-input v-model="personalForm.firstName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                <el-input v-model="personalForm.middleName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="width: 100%;">
                <el-input v-model="personalForm.lastName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyPhone')" prop="applyPhone" style="width: 100%;">
                <el-input v-model="personalForm.applyPhone" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.provinceId')" prop="provinceId" style="width: 100%;">
                <el-select v-model="personalForm.provinceId" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.cityId')" prop="cityId" style="width: 100%;">
                <el-select v-model="personalForm.cityId" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.address')" prop="address" style="width: 100%;">
                <el-input v-model="personalForm.address" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.gender')" style="width: 100%;">
                <el-radio-group v-model="personalForm.gender" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.marriageStat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.marriageStat" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">未婚</el-radio>
                  <el-radio :label="2">已婚</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                <el-select v-model="personalForm.certificateType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="身份证"/>
                  <el-option value="2" label="其他"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.certificateNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workStat')" style="width: 100%;">
                <el-select v-model="personalForm.workStat" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="无业"/>
                  <el-option value="2" label="在职"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" style="width: 100%;">
                <el-input v-model="saleRepositoryId" :disabled="IsSalesaleRepositoryId" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyDate')" prop="applyDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.applyDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">商品信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="productForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="width: 100%;">
                <el-input v-model="productForm.productCode" style="margin-left: 18px;width: 200px" @focus="handlemater"/>
              </el-form-item>
            </el-col>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productName')" style="width: 100%;">
                <el-input v-model="productForm.productName" :disabled="IsProductName" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.color')" style="width: 100%;">
                <el-input v-model="productForm.color" :disabled="IsColor" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.typeId')" style="width: 100%;">
                <el-input v-model="typeName" :disabled="IsTypeId" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.unit')" style="width: 100%;">
                <el-input v-model="productForm.unit" :disabled="IsUnit" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.categoryId')" style="width: 100%;">
                <el-input v-model="categoryName" :disabled="IsCategoryId" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.kpiGrade')" style="width: 100%;">
                <el-input v-model="productForm.kpiGrade" :disabled="IskpiGrade" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.point')" style="width: 100%;">
                <el-input v-model="productForm.point" :disabled="Ispoint" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">
                <el-input v-model="productForm.carCode" :disabled="IsCarCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">
                <el-input v-model="productForm.motorCode" :disabled="IsmotorCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">
                <el-input v-model="productForm.batteryCode" :disabled="IsbatteryCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentCount')" prop="installmentCount" style="width: 100%;">
                <el-select v-model="productForm.installmentCount" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in installmentCounts"
                    :key="index"
                    :value="item.installmentCount"
                    :label="item.installmentCount"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="width: 100%;">
                <el-input v-model="productForm.installmentDays" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="width: 100%;">
                <el-input v-model="personalForm.totalMoney" :disabled="IstotalMoney" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">配偶信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateName')" style="width: 100%;">
                <el-input v-model="personalForm.mateName" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateCertificateType')" style="width: 100%;">
                <el-select v-model="personalForm.mateCertificateType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="身份证"/>
                  <el-option value="2" label="其他"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateCertificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.mateCertificateNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.matePhone')" style="width: 100%;">
                <el-input v-model="personalForm.matePhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateWorkStat')" style="width: 100%;">
                <el-select v-model="personalForm.mateWorkStat" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="无业"/>
                  <el-option value="2" label="在职"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">工作信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workProvinceId')" style="width: 100%;">
                <el-select v-model="personalForm.workProvinceId" style="margin-left: 18px;width: 200px" @change="handlechangeworkProvince">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workCityId')" style="width: 100%;">
                <el-select v-model="personalForm.workCityId" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities2"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                <el-input v-model="personalForm.workAddress" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                <el-input v-model="personalForm.enterpriseName" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseNature')" style="width: 100%;">
                <el-select v-model="personalForm.enterpriseNature" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="国企"/>
                  <el-option value="2" label="民营"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterprisePeoples')" style="width: 100%;">
                <el-input v-model="personalForm.enterprisePeoples" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                <el-input v-model="personalForm.salary" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseContact')" style="width: 100%;">
                <el-input v-model="personalForm.enterpriseContact" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                <el-input v-model="personalForm.enterprisePhone" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px;margin-bottom: 30px">
      <h2 ref="geren" class="form-name">担保人信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyName')" prop="suretyName" style="width: 100%;">
                <el-input v-model="personalForm.suretyName" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyPhone')" prop="suretyPhone" style="width: 100%;">
                <el-input v-model="personalForm.suretyPhone" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.relationship')" prop="relationship" style="width: 100%;">
                <el-input v-model="personalForm.relationship" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyProvinceId')" prop="suretyProvinceId" style="width: 100%;">
                <el-select v-model="personalForm.suretyProvinceId" style="margin-left: 18px;width: 200px" @change="handlechangesuretyProvince">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCityId')" prop="suretyCityId" style="width: 100%;">
                <el-select v-model="personalForm.suretyCityId" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities3"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyAddress')" style="width: 100%;">
                <el-input v-model="personalForm.suretyAddress" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="width: 100%;">
                <el-select v-model="personalForm.suretyCertificateType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="身份证"/>
                  <el-option value="2" label="其他"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.suretyCertificateNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateapply } from '@/api/InstallmentApply'
import { getprovincelist, getcitylist, existList } from '@/api/public'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
export default {
  components: { MyMater, MyDetail, MyEmp },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('请选择销售人员'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.productForm.productCode === undefined || this.productForm.productCode === null || this.productForm.productCode === '') {
        callback(new Error('请选择商品'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.transDate).getTime() - 8.64e7
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 分期数据
      installmentCounts: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 回显规格型号
      typeName: '',
      // 回显分类
      categoryName: '',
      // 控制编辑分期商品数据
      IsProductName: false,
      IsColor: false,
      IsTypeId: false,
      IsUnit: false,
      IsCategoryId: false,
      IskpiGrade: false,
      Ispoint: false,
      IsCarCode: false,
      IsmotorCode: false,
      IsbatteryCode: false,
      IstotalMoney: false,
      // 控制编辑销售门店
      IsSalesaleRepositoryId: false,
      // 担保人市数据
      cities3: [],
      // 工作企业市数据
      cities2: [],
      // 申请人市数据
      cities: [],
      // 申请人省数据
      provinces: [],
      // 回显门店
      saleRepositoryId: '',
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 控制分期商品列表窗口
      matercontrol: false,
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        applyPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        installmentCount: [
          { required: true, message: '请输入分期期数', trigger: 'change' }
        ],
        totalMoney: [
          { required: true, message: '请输入分期总金额', trigger: 'blur' }
        ],
        installmentDays: [
          { required: true, message: '请输入第一期收款天数', trigger: 'blur' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        saleRepositoryId: [
          { required: true, message: '请输入销售门店', trigger: 'blur' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        productCode: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        suretyName: [
          { required: true, message: '请输入担保人姓名', trigger: 'blur' }
        ],
        suretyPhone: [
          { required: true, message: '请输入担保人电话', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请选择担保人关系', trigger: 'change' }
        ],
        suretyProvinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        suretyCityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.salePersonId = this.personalForm.salePersonName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.getprovince()
      this.handlechange2(this.personalForm.provinceId)
      this.handlechangeworkProvince(this.personalForm.workProvinceId)
      this.handlechangesuretyProvince(this.personalForm.suretyProvinceId)
      this.productForm = this.personalForm.installmentApplyDetailVos[0]
      this.productForm.installmentDays = this.personalForm.installmentDays
      this.productForm.installmentCount = this.personalForm.installmentCount
    }
  },
  created() {
    this.getdatatime()
    this.getprovince()
    this.getratelist()
  },
  methods: {
    // 获取分期期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
    },
    // 通过手机号判断是否有申请的资格
    haveAccess() {
      console.log(this.personalForm.applyPhone)
      if (this.personalForm.applyPhone !== null && this.personalForm.applyPhone !== '' && this.personalForm.applyPhone !== undefined) {
        existList(this.personalForm.applyPhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('存在申请未通过!', '提示', {
              confirmButtonText: '确定',
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              showCancelButton: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.go(-1)
              const view = { path: '/InstallmentApply/AddInstallmentApply', name: 'AddInstallmentApply', fullPath: '/InstallmentApply/AddInstallmentApply', title: 'AddInstallmentApply' }
              this.$store.dispatch('delView', view).then(({ visitedViews }) => {
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else if (res.data.data.content === 3) {
            this.$confirm('存在分期未还完!', '提示', {
              confirmButtonText: '确定',
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              showCancelButton: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.go(-1)
              const view = { path: '/InstallmentApply/AddInstallmentApply', name: 'AddInstallmentApply', fullPath: '/InstallmentApply/AddInstallmentApply', title: 'AddInstallmentApply' }
              this.$store.dispatch('delView', view).then(({ visitedViews }) => {
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        })
      }
    },
    // 分期商品focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      console.log(val)
      this.productForm.productCode = val.code
      if (val.productName !== null && val.productName !== undefined && val.productName !== '') {
        this.IsProductName = true
        this.productForm.productName = val.productName
      }
      if (val.color !== null && val.color !== undefined && val.color !== '') {
        this.IsColor = true
        this.productForm.color = val.color
      }
      if (val.typeId !== null && val.typeId !== undefined && val.typeId !== '') {
        this.IsTypeId = true
        this.productForm.typeId = val.typeId
        this.typeName = val.productType
      }
      if (val.unit !== null && val.unit !== undefined && val.unit !== '') {
        this.IsUnit = true
        this.productForm.unit = val.unit
      }
      if (val.categoryId !== null && val.categoryId !== undefined && val.categoryId !== '') {
        this.IsCategoryId = true
        this.productForm.categoryId = val.categoryId
        this.categoryName = val.category
      }
      if (val.kpiGrade !== null && val.kpiGrade !== undefined && val.kpiGrade !== '') {
        this.IskpiGrade = true
        this.productForm.kpiGrade = val.kpiGrade
      }
      if (val.point !== null && val.point !== undefined && val.point !== '') {
        this.Ispoint = true
        this.productForm.point = val.point
      }
      if (val.carCode !== null && val.carCode !== undefined && val.carCode !== '') {
        this.IsCarCode = true
        this.productForm.carCode = val.carCode
      }
      if (val.motorCode !== null && val.motorCode !== undefined && val.motorCode !== '') {
        this.IsmotorCode = true
        this.productForm.motorCode = val.motorCode
      }
      if (val.batteryCode !== null && val.batteryCode !== undefined && val.batteryCode !== '') {
        this.IsbatteryCode = true
        this.productForm.batteryCode = val.batteryCode
      }
      if (val.salePrice !== null && val.salePrice !== undefined && val.salePrice !== '') {
        this.IstotalMoney = true
        this.personalForm.totalMoney = val.salePrice
        this.personalForm.price = val.salePrice
      }
    },
    handlechangesuretyProvince(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities3 = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    handlechangeworkProvince(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities2 = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    // 申请人省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    // 申请人省
    getprovince() {
      getprovincelist(this.personalForm.countryId).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省出错')
        }
      })
    },
    getdatatime() { // 默认显示今天
      this.personalForm.applyDate = new Date()
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      if (val.repositoryId !== null && val.repositoryId !== undefined && val.repositoryId !== '') {
        this.saleRepositoryId = val.repositoryName
        this.personalForm.saleRepositoryId = val.repositoryId
        this.IsSalesaleRepositoryId = true
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.personalForm.applyDate = new Date()
      this.productForm = {}
      this.salePersonId = null
      this.saleRepositoryId = null
      this.typeName = ''
      this.categoryName = ''
      this.IsProductName = false
      this.IsColor = false
      this.IsTypeId = false
      this.IsUnit = false
      this.IsCategoryId = false
      this.IskpiGrade = false
      this.Ispoint = false
      this.IsCarCode = false
      this.IsmotorCode = false
      this.IsbatteryCode = false
      this.IstotalMoney = false
      this.IsSalesaleRepositoryId = false
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      this.personalForm.installmentCount = this.productForm.installmentCount
      this.personalForm.installmentDays = this.productForm.installmentDays
      this.productForm.price = this.personalForm.totalMoney
      const Data2 = this.productForm
      for (const key in Data2) {
        console.log(key)
        if (Data2[key] === '' || Data2[key] === undefined || Data2[key] === null) {
          delete Data2[key]
        }
        delete Data2.installmentCount
        delete Data2.installmentDays
      }
      const parms2 = JSON.stringify(Data2)
      const Data = this.personalForm
      for (const key in Data) {
        if (key !== 'middleName') {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateapply(parms, parms2).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
              this.$refs.personalForm5.clearValidate()
              this.$refs.personalForm5.resetFields()
              this.$emit('rest', true)
              this.editVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.$refs.personalForm4.clearValidate()
      this.$refs.personalForm4.resetFields()
      this.$refs.personalForm5.clearValidate()
      this.$refs.personalForm5.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
  .el-col-12{
    width: 49%;
  }
</style>
