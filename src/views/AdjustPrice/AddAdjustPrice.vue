<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入调价单主题" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" placeholder="请选择经办人" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.adjustDeptId" placeholder="请选择调价部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustRepositoryId')" prop="adjustRepositoryId" style="width: 100%;">
                  <el-input v-model="adjustRepositoryId" placeholder="请选择调价仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustDate')" prop="adjustDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.adjustDate"
                    type="date"
                    placeholder="选择调价日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"
                    @change="test"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.effectiveDate')" prop="effectiveDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.effectiveDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    placeholder="选择生效日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.summary')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.reason')" prop="reason" style="width: 100%;">
                  <el-select v-model="personalForm.adjustReason" placeholder="请选择调价部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in reasonlist"
                      :key="index"
                      :value="item.adjustReason"
                      :label="item.reasonName"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调价单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.tjdmx') }}</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
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
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <!--            <el-editable-column :edit-render="{type: 'default'}" prop="locationId" align="center" :label="$t('Hmodule.hw')" width="200px">-->
            <!--              <template slot-scope="scope">-->
            <!--                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">-->
            <!--                  <el-option-->
            <!--                    v-for="(item, index) in locationlist"-->
            <!--                    :key="index"-->
            <!--                    :value="item.id"-->
            <!--                    :label="item.locationCode"/>-->
            <!--                </el-select>-->
            <!--              </template>-->
            <!--            </el-editable-column>-->
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.lsyj')" prop="salePrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.lstzj')" prop="newSalePrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.newSalePrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.pfyj')" prop="tradePrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.pftzj')" prop="newTradePrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.newTradePrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.yyyj')" prop="memberPrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.yytzj')" prop="newMemberPrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.newMemberPrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getlocation, locationlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { addadjustprice } from '@/api/AdjustPrice'
import { searchInventoryCategory } from '@/api/InventoryCategory'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
var _that
export default {
  name: 'AddAdjustPrice',
  components: { MyRepository, MyDetail, MyCreate, MyAccept },
  data() {
    const validatepass = (rule, value, callback) => {
      if (this.adjustRepositoryId === '' || this.adjustRepositoryId === undefined || this.adjustRepositoryId === null) {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    const validatepass2 = (rule, value, callback) => {
      if (this.personalForm.adjustDate === '' || this.personalForm.adjustDate === undefined || this.personalForm.adjustDate === null) {
        callback(new Error('请选择调价日期'))
      } else {
        callback()
      }
    }
    const validatepass3 = (rule, value, callback) => {
      if (this.personalForm.effectiveDate === '' || this.personalForm.effectiveDate === undefined || this.personalForm.effectiveDate === null) {
        callback(new Error('请选择生效日期'))
      } else {
        callback()
      }
    }
    return {
      // 调价原因
      reasonlist: [],
      // 调价参数
      gettemplist: {
        pagenum: 1,
        pagesize: 9999,
        type: 2,
        iseffective: 1
      },
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: this.$store.getters.name,
      // 调价仓库回显
      adjustRepositoryId: this.$store.getters.repositoryName,
      // 经办人控制框
      createcontrol: false,
      // 控制调价仓库选择窗口
      repositorycontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调价信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        adjustDeptId: this.$store.getters.deptId,
        adjustRepositoryId: this.$store.getters.repositoryId,
        adjustDate: new Date()
      },
      // 调价单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'focus' }
        ],
        adjustRepositoryId: [
          { required: true, validator: validatepass, trigger: 'change' }
        ],
        adjustDate: [
          { required: true, validator: validatepass2, trigger: 'change' }
        ],
        effectiveDate: [
          { required: true, validator: validatepass3, trigger: 'change' }
        ]
      },
      // 调价单明细数据
      list2: [],
      // 调价明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调价明细中货位数据
      locationlist: [],
      // 调价单明细列表规则
      validRules: {
        newSalePrice: [
          { required: true, message: '请填写价格', trigger: 'focus' }
        ],
        newTradePrice: [
          { required: true, message: '请填写价格', trigger: 'focus' }
        ],
        newMemberPrice: [
          { required: true, message: '请填写价格', trigger: 'focus' }
        ]
      },
      pickerOptions1: {}
    }
  },

  mounted() {
    this.getlist()
    this.test()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 限制生效日期
    test() {
      this.pickerOptions1.disabledDate = (time) => {
        return time.getTime() < new Date(this.personalForm.adjustDate).getTime()
        // return time.getTime() > Date.now()
      }
      console.log(new Date(this.personalForm.adjustDate).getTime())
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      searchInventoryCategory(this.gettemplist).then(res => {
        if (res.data.ret === 200) {
          this.reasonlist = res.data.data.content.list
        }
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 经办人返回数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.adjustRepositoryId = val.repositoryName
      this.personalForm.adjustRepositoryId = val.id
      // this.locationlistparms.repositoryId = val.id
      // locationlist(this.locationlistparms).then(res => {
      //   if (res.data.ret === 200) {
      //     this.locationlist = res.data.data.content.list
      //   }
      // })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.adjustRepositoryId)
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.adjustRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.adjustRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 调价单事件
    // 新增调价单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
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
    // 调价金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        adjustDeptId: this.$store.getters.deptId,
        adjustRepositoryId: this.$store.getters.repositoryId,
        adjustDate: new Date()
      }
      // 经办人回显
      this.handlePersonId = this.$store.getters.name
      // 调价仓库回显
      this.adjustRepositoryId = this.$store.getters.repositoryName
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(this.personalForm)
      console.log(EnterDetail)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
          delete elem.salePrice
        }
        if (elem.newSalePrice === null || elem.newSalePrice === '' || elem.newSalePrice === undefined) {
          delete elem.newSalePrice
        }
        if (elem.tradePrice === null || elem.tradePrice === '' || elem.tradePrice === undefined) {
          delete elem.tradePrice
        }
        if (elem.newTradePrice === null || elem.newTradePrice === '' || elem.newTradePrice === undefined) {
          delete elem.newTradePrice
        }
        if (elem.memberPrice === null || elem.memberPrice === '' || elem.memberPrice === undefined) {
          delete elem.memberPrice
        }
        if (elem.newMemberPrice === null || elem.newMemberPrice === '' || elem.newMemberPrice === undefined) {
          delete elem.newMemberPrice
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      const parms2 = JSON.stringify(EnterDetail)
      const parm3 = this.personalForm
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              addadjustprice(parms, parms2, parm3).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/AdjustPrice/AddAdjustPrice', name: 'AddAdjustPrice', fullPath: '/AdjustPrice/AddAdjustPrice', title: 'AddAdjustPrice' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
