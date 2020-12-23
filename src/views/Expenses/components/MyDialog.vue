<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.expensesDate')" prop="ExpensesDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.expensesDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col v-show="isoffice" :span="12" >
              <el-form-item :label="$t('Expenses.deptId')" style="width: 100%;">
                <el-select v-model="personalForm.deptId" style="margin-left: 18px;width: 200px" @focus="change">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('income.region')" prop="expensesregion" style="width: 100%;">
                <el-cascader
                  :options="regions"
                  :props="props"
                  v-model="personalForm.expensesregion"
                  :show-all-levels="false"
                  :placeholder="$t('Hmodule.xzqy')"
                  change-on-select
                  filterable
                  clearable
                  style="margin-left: 18px;width: 200px"
                  @change="handlechange4"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.expensesRepositoryId')" style="width: 100%;">
                <el-input v-model="expensesRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                <my-repository :repositorycontrol.sync="repositorycontrol" :regionid="region" @repositoryname="repositoryname"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.closeType')" style="width: 100%;">
                <el-select v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in payModes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('Expenses.expensesAccount')" style="width: 100%;">
                <el-input v-model="personalForm.expensesAccount" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col> -->
            <el-col v-show="isoffice" :span="12" >
              <el-form-item :label="$t('Expenses.expensesAccount')" style="width: 100%;">
                <el-select v-model="personalForm.expensesAccount" style="margin-left: 18px;width: 200px" @focus="getaccounts">
                  <el-option
                    v-for="(item, index) in accounts"
                    :key="index"
                    :label="item.accountNumber"
                    :value="item.accountNumber"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Expenses.currency')" style="width: 100%;">
                <el-select v-model="personalForm.currency" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                  <el-option value="4" label="LKR"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.zcmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="insertEvent(-1)">{{ $t('tongyo.tjzcx') }}</el-button>
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
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.zya')" prop="summary" align="center" min-width="150px"/>
          <!-- <el-editable-column :edit-render="{name: 'ElCascader', type: 'visible'}" :label="$t('updates.kmmc')" prop="setcarst" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-cascader
                v-model="scope.row.setcarst"
                :options="suboptions"
                :props="props2"
                :show-all-levels="false"
                filterable
                @change="test(scope.row,$event)"/>
            </template>
          </el-editable-column> -->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.kmmc')" prop="subjectCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.subjectCode" :value="scope.row.subjectCode" :placeholder="$t('updates.kmmc')" filterable style="width: 100%;" @change="test(scope.row,$event)">
                <el-option
                  v-for="(item, index) in accountcodes"
                  :key="index"
                  :value="item.itemCode"
                  :label="item.itemName"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: { precision: 6}, type: 'visible'}" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchAccount } from '@/api/AccountManagement'
import { updateexpenses } from '@/api/Expenses'
import { regionlist } from '@/api/public'
import { subjectList, itemList } from '@/api/SubjectFinance'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyRepository from './MyRepository'
import { searchCategory } from '@/api/Supplier'
var _that
export default {
  components: { MyRepository, MyEmp },
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
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.expensesregion === undefined || this.personalForm.expensesregion === null || this.personalForm.expensesregion === '') {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    return {
      isoffice: false,
      accountcodes: [],
      accounts: [],
      accountsparm: {
        pageNum: 1,
        pageSize: 1000000,
        isEffective: '1'

      },
      region: '',
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      regions: [],
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      suboptions: [],
      treedata: [],
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      // 选择的数据
      choosedata: [],
      payModes: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 门店回显
      expensesRepositoryId: '',
      // 控制门店
      repositorycontrol: false,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 控制经办人
      stockControl: false,
      // 收入单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        expensesDate: [
          { required: true, message: '请选择支出日期', trigger: 'change' }
        ],
        expensesregion: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      // 收入单明细数据
      list2: [],
      // 收入单明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
      this.getitemList()
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.expensesRepositoryId = this.personalForm.expensesRepositoryName
      this.region = this.personalForm.expensesRegionId
      this.list2 = this.personalForm.expensesDetailVos
      this.getTypes()
      this.gettree()
    }
  },
  created() {
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getitemList() {
      console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
      if (this.$store.getters.repositoryId === 0) {
        this.isoffice = true
        const parms = {
          subjectId: 138
        }
        itemList(parms).then(res => {
          if (res.data.ret === 200) {
            this.accountcodes = res.data.data.content.map(item => {
              return {
                itemName: item.itemCode + ' ' + item.itemName,
                itemCode: item.itemCode
              }
            })
          }
        })
      } else {
        this.isoffice = false
        const parms = {
          subjectId: 137
        }
        itemList(parms).then(res => {
          if (res.data.ret === 200) {
            this.accountcodes = res.data.data.content.map(item => {
              return {
                itemName: item.itemCode + ' ' + item.itemName,
                itemCode: item.itemCode
              }
            })
          }
        })
      }
    },
    getaccounts() {
      searchAccount(this.accountsparm).then(res => {
        if (res.data.ret === 200) {
          this.accounts = res.data.data.content.list
        }
      })
    },
    switchtreedata(val) {
      for (const i in val) {
        if (val[i].subjectNumber === '' || val[i].subjectNumber === null) {
          this.switchtreedata(val[i].subjectFinanceVos)
        } else {
          if (val[i].level > 3) {
            this.switchtreedata(val[i].subjectFinanceVos)
          }
          val[i].subjectName = val[i].subjectNumber + val[i].subjectName
        }
      }
    },
    getarrs() {
      console.log('222', 222)
      console.log('this.personalForm.expensesRegionId', this.personalForm.expensesRegionId)
      const needata = this.findPathByLeafId(this.personalForm.expensesRegionId, this.regions)
      console.log('needata', needata)
      this.personalForm.expensesregion = needata
      const finalid = needata[needata.length - 1]
      console.log(finalid)
      this.region = finalid
    },
    findPathByLeafId(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].regionListVos) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].regionListVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    handlechange4(val) {
      console.log(val)
      const finalid = val[val.length - 1]
      console.log(finalid)
      this.region = finalid
      this.personalForm.expensesregionId = finalid
      // searchRepository(finalid).then(res => {
      //   console.log(res)
      //   if (res.data.ret === 200) {
      //     this.repositories = res.data.data.content.list
      //   } else {
      //     console.log('区域选择门店')
      //   }
      // })
    },
    findtreedata(val, val2) {
      let data;
      (val || []).map(i => {
        if (i.id === val2) {
          data = i
        } else {
          const child = this.findtreedata(i.subjectFinanceVos, val2)
          if (child) {
            data = child
          }
        }
      })
      return data
    },
    processchildren(val) {
      for (const i in val) {
        if (val[i].subjectFinanceVos.length === 0) {
          delete val[i].subjectFinanceVos
        } else {
          this.processchildren(val[i].subjectFinanceVos)
        }
      }
      return val
    },
    test(row, val) {
      console.log(row, val)
      const accountsname = this.accountcodes.find(item => {
        return item.itemCode === val
      })
      console.log('accountsname', accountsname)
      row.subjectName = accountsname.itemName
      // row.subjectCode = needata.subjectNumber
    },
    gettree() {
      console.log(123)
      subjectList().then(res => {
        if (res.data.ret === 200) {
          const newarr = res.data.data.content
          const testarr = this.switchtreedata(newarr)
          this.suboptions = this.processchildren(newarr)
          this.treedata = res.data.data.content
        }
      })
      console.log(321)
    },
    // 新增收入明细
    insertEvent(index) {
      this.$refs.editable.insertAt({}, index)
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
    getTypes() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          console.log('333', 333)
          this.getarrs()
        } else {
          console.log('区域列表出错')
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.expensesDate = currentdate
    },
    // 门店focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.expensesRepositoryId = val.repositoryName
      this.personalForm.expensesRepositoryId = val.id
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      console.log(val)
      this.personalForm.deptId = val.deptId
      this.expensesRepositoryId = val.repositoryName
      this.personalForm.expensesRepositoryId = val.repositoryId
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        currency: '1'
      }
      this.handlePersonId = null
      this.personalForm.handlePersonId = null
      this.expensesRepositoryId = null
      this.personalForm.expensesRepositoryId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.expensesDetailVos
      delete this.personalForm.expensesDetailVos
      delete this.personalForm.approvalUseVos
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId

      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.subjectCode === null || elem.subjectCode === '' || elem.subjectCode === undefined) {
          i = 2
        }
        if (elem.summary === null || elem.summary === '' || elem.summary === undefined) {
          delete elem.summary
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          delete elem.money
        }
        return elem
      })
      if (i === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '科目名称必选',
          offset: 100
        })
        return false
      }
      const parms2 = JSON.stringify(EnterDetail)
      console.log('EnterDetail', EnterDetail)
      const Data = this.personalForm
      console.log('Data', Data)
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            updateexpenses(parms, parms2).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: this.$t('prompt.czcg'),
                  message: this.$t('prompt.czcg'),
                  type: 'success',
                  duration: 1000,
                  offset: 100
                })
                this.$emit('rest', true)
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
                this.editVisible = false
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: 'wrong',
                  offset: 100
                })
              }
            })
          }).catch(valid => {
            console.log('error submit!!')
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
    height: 900px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
