<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.expensesDate')" prop="ExpensesDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.expensesDate"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col v-show="isoffice" :span="6">
                <el-form-item :label="$t('Expenses.deptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" style="width: 200px" @focus="change">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('income.region')" prop="expensesregion" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="personalForm.expensesregion"
                    :show-all-levels="false"
                    :placeholder="$t('Hmodule.xzqy')"
                    change-on-select
                    filterable
                    clearable
                    style="width: 200px"
                    @change="handlechange4"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.expensesRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="expensesRepositoryId" style="width: 200px" disabled @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" :regionid="region" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.closeType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.payMode" clearable style="width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Expenses.expensesAccount')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.expensesAccount" style="width: 200px" clearable/>
                </el-form-item>
              </el-col> -->
              <el-col v-show="isoffice" :span="6">
                <el-form-item :label="$t('Expenses.expensesAccount')" prop="transferInAccount" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.expensesAccount" style="width: 200px" @focus="getaccounts">
                    <el-option
                      v-for="(item, index) in accounts"
                      :key="index"
                      :label="item.accountNumber"
                      :value="item.accountNumber"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Expenses.currency')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.currency" style="width: 200px">
                    <el-option value="1" label="PHP"/>
                    <el-option value="2" label="USD"/>
                    <el-option value="3" label="RMB"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.zcmx') }}</div>
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
            <!-- <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('updates.kmmc')" prop="subjectFinance" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-cascader
                  v-model="scope.row.subjectFinance"
                  :options="suboptions"
                  :props="props2"
                  :show-all-levels="false"
                  filterable
                  @change="test(scope.row,$event)"/>
              </template>
            </el-editable-column> -->
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.kmmc')" prop="subjectCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.subjectCode" :value="scope.row.subjectCode" :placeholder="$t('updates.kmmc')" filterable style="margin-left: 18px;width: 100%;margin-bottom: 0" @change="test(scope.row,$event)">
                  <el-option
                    v-for="(item, index) in accountcodes"
                    :key="index"
                    :value="item.itemCode"
                    :label="item.itemName"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button :loading="saveloading" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { searchAccount } from '@/api/AccountManagement'
import { subjectList, itemList } from '@/api/SubjectFinance'
import '@/directive/noMoreClick/index.js'
import { createexpenses } from '@/api/Expenses'
import { searchCategory } from '@/api/Supplier'
import { regionlist } from '@/api/public'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddExpenses',
  components: { MyRepository, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('please select handlePerson'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.expensesregion === undefined || this.personalForm.expensesregion === null || this.personalForm.expensesregion === '') {
        callback(new Error('please select area'))
      } else {
        callback()
      }
    }
    return {
      saveloading: false,
      isoffice: false,
      accountcodes: [],
      accounts: [],
      accountsparm: {
        pageNum: 1,
        pageSize: 1000000,
        isEffective: '1'

      },
      suboptions: [],
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 30 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      treedata: [],
      // 区域列表
      regions: [],
      region: null,
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      // 结算方式数据
      colseTypes: [],
      payModes: [],
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
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: this.$store.getters.name,
      // 控制经办人
      stockControl: false,
      // 收入单信息数据
      personalForm: {
        isVoucher: 1,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        currency: '1',
        handlePersonId: this.$store.getters.userId,
        expensesRegionId: this.$store.getters.regionId,
        expensesDate: null
      },
      // 收入单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        expensesDate: [
          { required: true, message: 'please select expensesDate', trigger: 'change' }
        ]
        // ,
        // expensesregion: [
        //   { required: true, validator: validatePass3, trigger: 'change' }
        // ]
      },
      // 收入单明细数据
      list2: [],
      // 收入单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getdatatime()
    this.getTypes()
    this.gettree()
    this.getitemList()
    this.getcurrency()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getcurrency() {
      const mycountry = this.$store.getters.countryId
      if (mycountry === 1) {
        this.personalForm.currency = '3'
      } else if (mycountry === 2) {
        this.personalForm.currency = '1'
      }
    },
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
    getaccounts() {
      searchAccount(this.accountsparm).then(res => {
        if (res.data.ret === 200) {
          this.accounts = res.data.data.content.list
        }
      })
    },
    getarrs() {
      console.log('222', 222)
      console.log('北京市朝阳区爱谁谁')
      console.log('this.personalForm', this.personalForm)
      console.log('this.regions', this.regions)
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
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
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
    // 新增收入明细
    insertEvent(index) {
      this.$refs.editable.insertAt({ productCode: null }, index)
    },
    getTypes() {
      console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
      if (this.$store.getters.repositoryId !== 0 && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined && this.$store.getters.repositoryId !== '') {
        this.expensesRepositoryId = this.$store.getters.repositoryName
        this.personalForm.expensesRepositoryId = this.$store.getters.repositoryId
      }
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          this.getarrs()
        } else {
          console.log('区域列表出错')
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
      if (this.region === null || this.region === '' || this.region === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: 'please select area',
          offset: 100
        })
        return false
      }
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
      this.getcurrency()
      // this.personalForm = {
      //   createPersonId: this.$store.getters.userId,
      //   countryId: this.$store.getters.countryId,
      //   repositoryId: this.$store.getters.repositoryId,
      //   regionId: this.$store.getters.regionId,
      //   currency: '1',
      //   handlePersonId: this.$store.getters.userId,
      //   expensesRegionId: this.$store.getters.regionId
      // }
      // // eslint-disable-next-line no-sequences
      // this.handlePersonId = this.$store.getters.name,
    },
    // 保存操作
    handlesave() {
      this.saveloading = true

      setTimeout(() => {
        const EnterDetail = this.$refs.editable.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.mxbbnwk'),
            offset: 100
          })
          this.saveloading = false
          return false
        }
        let i = 1
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          delete elem.productCode
          if (elem.subjectCode === null || elem.subjectCode === '' || elem.subjectCode === undefined) {
            i = 2
          }
          if (elem.summary === null || elem.summary === '' || elem.summary === undefined) {
            delete elem.summary
          }
          if (elem.subjectFinanceId === null || elem.subjectFinanceId === '' || elem.subjectFinanceId === undefined) {
            delete elem.subjectFinanceId
          }
          if (elem.money === null || elem.money === '' || elem.money === undefined) {
            delete elem.money
          }
          return elem
        })
        if (i === 2) {
          this.$notify.error({
            title: 'wrong',
            message: 'please select subject',
            offset: 100
          })
          this.saveloading = false

          return false
        }
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
            this.$refs.editable.validate().then(valid => {
              createexpenses(parms, parms2, this.personalForm).then(res => {
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
                this.saveloading = false
              })
            }).catch(valid => {
              console.log('error submit!!')
              this.saveloading = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveloading = false

            return false
          }
        })
      }, 0.5 * 1000)
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Expenses/AddExpenses', name: 'AddExpenses', fullPath: '/Expenses/AddExpenses', title: 'AddExpenses' }
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
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
