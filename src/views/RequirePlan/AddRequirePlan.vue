<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.deptId')" style="width: 100%;">
                  <el-input v-model="workCenterId" style="margin-left: 18px;width:200px" clearable @focus="workcenterchoose"/>
                </el-form-item>
              </el-col>
              <my-center :control.sync="centercontrol" @center="center"/>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.producePlanNumber')" prop="producePlanNumber" style="width: 100%;">
                  <el-input v-model="personalForm.producePlanNumber" style="margin-left: 18px;width:200px" clearable @focus="producechoose"/>
                </el-form-item>
                <produce-plan :procontrol.sync="producecontrol" @allinfo="allinfo"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.planSupplyDate')" prop="planSupplyDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.planSupplyDate"
                    type="date"
                    placeholder="计划供料日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.produceRepositoryId')" prop="produceRepositoryId" style="width: 100%;">
                  <el-input v-model="produceRepositoryId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('RequirePlan.summary')" style="width: 100%;">
                  <el-input v-model="personalForm.summary" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.wlxqjhmx') }}</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTypeName(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.mxqsl')" prop="requireQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.yjhsl')" prop="planQuantity" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getPlanQuantity(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.wlly')" prop="materialsSource" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getSourceName(scope.row) }}</p>
              </template>
            </el-editable-column>
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
import { addrequireplan, getBomByPlanNumber } from '@/api/RequirePlan'
import { searchEmpCategory3 } from '@/api/Product'
import { searchMea } from '@/api/public'
import MyCenter from './components/MyCenter'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyRepository from './components/MyRepository'
import ProducePlan from './components/ProducePlan'
var _that
export default {
  name: 'AddRequirePlan',
  components: { ProducePlan, MyRepository, MyCenter, MyEmp, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // 物料来源
      materialsSource: [{ value: 1, label: '库存' }, { value: 2, label: '生产' }, { value: 3, label: '采购' }],
      // 主生产计划回显
      producePlanNumber: '',
      // 仓库回显
      produceRepositoryId: '',
      // 负责人回显
      handlePersonId: '',
      // 工作中心回显
      workCenterId: '',
      // 仓库控制
      repositorycontrol: false,
      // 负责人控制
      stockControl: false,
      // 主生产计划控制
      producecontrol: false,
      // 控制工作中心
      centercontrol: false,
      // 控制商品列表窗口
      control: false,
      // 主生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 主生产任务规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择负责人', trigger: 'focus' }
        ],
        producePlanNumber: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        planSupplyDate: [
          { required: true, message: '请选择计划供料日期', trigger: 'change' }
        ],
        produceRepositoryId: [
          { required: true, message: '请选择仓库', trigger: 'focus' }
        ]
      },
      // 主生产任务明细数据
      list2: [],
      // 主生产任务明细列表规则
      validRules: {
      }
    }
  },

  mounted() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.handlePersonId = this.$store.getters.empcontract.handlePersonName
        this.personalForm.handlePersonId = this.$store.getters.empcontract.handlePersonId
        this.produceRepositoryId = this.$store.getters.repositoryName
        this.personalForm.produceRepositoryId = this.$store.getters.repositoryId
        this.allinfo(this.$store.getters.empcontract)
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 应计划数量取整
    getPlanQuantity(row) {
      console.log(row)
      searchMea(row.unit).then(res => {
        if (res.data.data.content[0].type === 1) {
          row.planQuantity = Math.ceil(row.planQuantity)
        }
      })
      return row.planQuantity
    },
    getSourceName(row) {
      console.log('row', row)
      if (row.materialsSource === 1) {
        return '库存'
      }
      if (row.materialsSource === 2) {
        return '生产'
      }
      if (row.materialsSource === 3) {
        return '采购'
      }
    },

    // 获取规格
    getTypeName(row) {
      if (row.typeId === null) {
        row.typeId = 0
      }
      searchEmpCategory3(row.typeId).then(res => {
        if (res.data.ret === 200) {
          row.productType = res.data.data.content.list[0].categoryName
        }
      })
      return row.productType
    },
    // 主生产计划focus事件
    producechoose() {
      if (this.personalForm.produceRepositoryId === '' || this.personalForm.produceRepositoryId === null || this.personalForm.produceRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        return false
      } else {
        this.producecontrol = true
      }
    },
    // produce(val) {
    //   this.$refs.editable.clear()
    //   const nowlistdata = this.$refs.editable.getRecords()
    //   for (let i = 0; i < val.length; i++) {
    //     for (let j = 0; j < nowlistdata.length; j++) {
    //       if (val[i].productCode === nowlistdata[j].productCode) {
    //         this.$notify.error({
    //           title: 'wrong',
    //           message: this.$t('prompt.wpytj'),
    //           offset: 100
    //         })
    //         return false
    //       }
    //     }
    //     this.$refs.editable.insert(val[i])
    //   }
    // },
    // 回显主生产计划
    allinfo(val) {
      console.log(val)
      console.log(val)
      this.$refs.editable.clear()
      this.producePlanNumber = val.planNumber
      this.personalForm.producePlanNumber = val.planNumber
      getBomByPlanNumber(this.personalForm.producePlanNumber, this.personalForm.produceRepositoryId).then(res => {
        if (res.data.ret === 200) {
          const xuqiu = res.data.data.content
          for (const key in xuqiu) {
            if (xuqiu[key].materialsSource === '' || xuqiu[key].materialsSource === undefined || xuqiu[key].materialsSource === null) {
              delete xuqiu[key]
            }
          }
          var r = xuqiu.filter(function(s) {
            return (s !== undefined || s)
          })
          const xuqiu2 = r.map(function(item) {
            return {
              id: item.id,
              productCode: item.productCode,
              productName: item.productName,
              typeId: item.typeId,
              unit: item.unit,
              requireQuantity: item.requireQuantity,
              planQuantity: item.planQuantity,
              materialsSource: item.materialsSource
            }
          })
          for (let i = 0; i < xuqiu2.length; i++) {
            this.$refs.editable.insert(xuqiu2[i])
          }
        }
      })
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.personalForm.workCenterId = val.id
    },
    // 负责人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 负责人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    // 仓库回显
    repositoryname(val) {
      console.log(val)
      // this.$refs.editable.clear()
      this.produceRepositoryId = val.repositoryName
      this.personalForm.produceRepositoryId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.produceRepositoryId = null
      this.handlePersonId = null
      this.workCenterId = null
      this.producePlanNumber = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.requireQuantity === null || elem.requireQuantity === '' || elem.requireQuantity === undefined) {
          delete elem.requireQuantity
        }
        if (elem.planQuantity === null || elem.planQuantity === '' || elem.planQuantity === undefined) {
          delete elem.planQuantity
        }
        if (elem.issueQuantity === null || elem.issueQuantity === '' || elem.issueQuantity === undefined) {
          delete elem.issueQuantity
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addrequireplan(parms, parms2, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/RequirePlan/AddRequirePlan', name: 'AddRequirePlan', fullPath: '/RequirePlan/AddRequirePlan', title: 'AddRequirePlan' }
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
