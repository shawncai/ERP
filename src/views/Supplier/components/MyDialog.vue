<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="width: 100%;">
                <el-input v-model="personalForm.supplierName" placeholder="请输入供应商名称" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="width: 100%;">
                <el-select v-model="personalForm.typeId" placeholder="请选择供应商类别" style="margin-left: 18px;width: 200px" @focus="updateType">
                  <el-option
                    v-for="(item, index) in typeIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="width: 100%;">
                <el-input v-model="personalForm.supplierShortName" placeholder="请输入供应商简称" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierIntroduction')" prop="supplierShortName" style="width: 100%;">
                <el-input v-model="personalForm.supplierIntroduction" placeholder="请输入描述" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="lianxi" class="form-name">业务信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('public.countyrId')" prop="countryId" style="width: 100%;">
                <el-select v-model="personalForm.countryId" placeholder="国家" style="margin-left: 18px;width: 200px" @change ="handlechange">
                  <el-option
                    v-for="(item, index) in nations"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.provinceId')" style="width: 100%;">
                <el-select v-model="personalForm.provinceId" placeholder="请选择省" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.cityId')" style="width: 100%;">
                <el-select v-model="personalForm.cityId" placeholder="请选择市" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.address')" style="width: 100%;">
                <el-input v-model="personalForm.detailAddress" placeholder="请输入地址" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.groupId')" prop="groupId" style="width: 100%;">
                <el-select v-model="personalForm.groupId" multiple placeholder="请选择供应商分组" style="margin-left: 18px;width: 200px" @focus="updateGroup">
                  <el-option
                    v-for="(item, index) in groupIds"
                    :key="index"
                    :label="item.groupName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.zipCode')" style="width: 100%;">
                <el-input v-model="personalForm.zipCode" placeholder="请输入邮编" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonName')" style="width: 100%;">
                <el-input v-model="personalForm.contactPersonName" placeholder="请输入联系人" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonPhone')" style="width: 100%;">
                <el-input v-model="personalForm.contactPersonPhone" placeholder="请输入电话" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.regionId')" prop="regionid" style="width: 100%;">
                <el-cascader
                  :options="regions"
                  :props="props"
                  v-model="perregions"
                  :show-all-levels="false"
                  placeholder="请选择区域"
                  change-on-select
                  filterable
                  clearable
                  style="margin-left: 18px;width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.giveId')" style="width: 100%;">
                <el-select v-model="personalForm.deliveryMode" placeholder="请选择交货方式" style="margin-left: 18px;width: 200px" @focus="updateGive">
                  <el-option
                    v-for="(item, index) in deliveryModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.transportId')" style="width: 100%;">
                <el-select v-model="personalForm.transportId" placeholder="请选择运送方式" style="margin-left: 18px;width: 200px" @focus="updateTran">
                  <el-option
                    v-for="(item, index) in transportIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                <el-select v-model="personalForm.payMode" :disabled="IscloseT" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in colseTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.levelId')" style="width: 100%;">
                <el-select v-model="personalForm.levelId" placeholder="请选择供应商优质级别" style="margin-left: 18px;width: 200px" @focus="updateLeve">
                  <el-option
                    v-for="(item, index) in levelIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="width: 100%;">
                <el-select v-model="personalForm.isHot" placeholder="请选择" style="margin-left: 18px;width: 200px">
                  <el-option label="是" value="1"/>
                  <el-option label="否" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isEffective')" style="width: 100%;">
                <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="margin-left: 18px;width: 200px">
                  <el-option label="启用" value="1"/>
                  <el-option label="未启用" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.buyerId')" style="width: 100%;">
                <el-input v-model="buyerId" placeholder="请输入采购员" clearable style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <my-emp :control.sync="empcontrol" @personName="personName"/>
              <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="width: 100%;">
                <el-input v-model="personalForm.businessScopeIntroduction" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">可提供商品明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddproduct">添加商品</el-button>
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="proportion" align="center" label="供货比列" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 class="form-name">财务信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.paymentId')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @focus="updatePaymen">
                  <el-option
                    v-for="(item, index) in settleModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.moneyId')" style="width: 100%;">
                <el-select v-model="personalForm.moneyId" :value="personalForm.moneyId" placeholder="请选择币种" style="margin-left: 18px;width: 200px">
                  <el-option label="RMB" value="1"/>
                  <el-option label="USD" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.bankName')" style="width: 100%;">
                <el-input v-model="personalForm.bankName" placeholder="请输入开户行" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.accountName')" style="width: 100%;">
                <el-input v-model="personalForm.accountName" placeholder="请输入户名" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.account')" style="width: 100%;">
                <el-input v-model="personalForm.account" placeholder="请输入账号" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="fuzhu" class="form-name">辅助信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.establishDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.establishDate"
                  type="date"
                  placeholder="选择成立时间"
                  value-format="yyyy-MM-dd"
                  clearable
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.legalPerson')" style="width: 100%;">
                <el-input v-model="personalForm.legalPerson" placeholder="请输入法人代表" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.businessLicense')" style="width: 100%;">
                <el-input v-model="personalForm.businessLicense" placeholder="请输入营业执照号" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.companyTypeId')" style="width: 100%;">
                <el-select v-model="personalForm.companyTypeId" placeholder="请选择单位性质" style="margin-left: 18px;width: 200px">
                  <el-option label="类型1" value="1"/>
                  <el-option label="类型2" value="2"/>
                </el-select>
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
import { getcountrylist, getprovincelist, getcitylist, regionlist, saveRegion, getRegion } from '@/api/public'
import { searchCategory, searchGroup, update } from '@/api/Supplier'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
export default {
  components: { MyDetail, MyEmp },
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
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制可提供商品明细
      control: false,
      // 供应商分组数据
      groupIds: [],
      // 结算方式
      settleModes: [],
      // 优质级别
      levelIds: [],
      // 运送方式
      transportIds: [],
      // 交货方式
      deliveryModes: [],
      // 结算方式数据
      colseTypes: [],
      // 供应商类别
      typeIds: [],
      // 采购员弹窗控制
      empcontrol: false,
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 区域列表
      regions: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 采购员回显
      buyerId: '',
      // 转化区域id
      perregions: [],
      // 供应商信息数据
      // 个人信息规则数据
      personalrules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择供应商类别', trigger: 'change' }
        ],
        groupId: [
          { required: true, message: '请选择供应商分组', trigger: 'change' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      },
      // 商品明细数据
      list2: [],
      // 商品明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.buyerId = this.editdata.buyerName
      this.list2 = this.personalForm.supplierDetailVos
      this.handlechange(this.personalForm.countryId)
      this.handlechange2(this.personalForm.provinceId)
      getRegion(this.personalForm.regionId).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.perregions = res.data.data.content.zcc.split(',').map(function(item) {
            return Number(item)
          })
        }
      })
    }
  },
  created() {
    this.getnationlist()
  },
  methods: {
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        }
      })
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliveryModes = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.settleModes = res.data.data.content.list
        }
      })
      // 分组数据
      searchGroup().then(res => {
        if (res.data.ret === 200) {
          this.groupIds = res.data.data.content
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        }
      })
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.buyerId = val.personName
      this.personalForm.buyerId = val.id
    },
    // foucus 更新
    updateType() {
      this.getnationlist()
    },
    updateGroup() {
      this.getnationlist()
    },
    updateGive() {
      this.getnationlist()
    },
    updateTran() {
      this.getnationlist()
    },
    updateLeve() {
      this.getnationlist()
    },
    updatePaymen() {
      this.getnationlist()
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
        // 业务信息
        countryId: '',
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: '',
        zipCode: '',
        contactPersonName: '',
        contactPersonPhone: '',
        regionId: '',
        deliveryMode: '',
        transportId: '',
        levelId: '',
        isHot: '',
        isEffective: '',
        buyerId: '',
        // 财务信息
        businessScopeIntroduction: '',
        settleMode: '',
        moneyId: '',
        bankName: '',
        accountName: '',
        account: '',
        establishDate: '',
        legalPerson: '',
        taxNumber: '',
        businessLicense: '',
        companyTypeId: ''
      }
      this.perregions = []
      this.buyerId = ''
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.type === null || elem.type === '' || elem.type === undefined) {
          delete elem.type
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.proportion === null || elem.proportion === '' || elem.proportion === undefined) {
          delete elem.proportion
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      saveRegion(this.perregions, this.personalForm.regionId)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          update(this.personalForm, parms2).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$emit('rest', true)
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
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
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
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
