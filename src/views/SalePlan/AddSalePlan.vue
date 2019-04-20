<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planType')" prop="planType" style="width: 100%;">
                  <el-select v-model="personalForm.planType" style="margin-left: 18px;width: 218px">
                    <el-option value="1" label="年"/>
                    <el-option value="2" label="月"/>
                    <el-option value="3" label="周"/>
                    <el-option value="4" label="日"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.planDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.beginTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.beginTime"
                    :picker-options="pickerOptions0"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"
                    @change="cleardeposit"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.endTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.endTime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.lowerPlanMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.lowerPlanMoney" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planTotalMoney')" style="width: 100%;">
                  <el-input v-model="personalForm.planTotalMoney" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.urgePlan')" style="width: 100%;">
                  <el-input v-model="personalForm.urgePlan" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >计划明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">添加明细</el-button>
          <el-button type="danger">删除</el-button>
        </div>
        <el-dialog :visible.sync="categoryVisible" title="添加明细" class="normal" width="600px" center>
          <el-form ref="addCategoryForm" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
            <el-form-item :label="$t('SalePlan.regionId')" label-width="100px" prop="type">
              <el-cascader v-model="addCategoryForm.regionId" :options="provinceList" :props="props" placeholder="" style="width: 100%" @active-item-change="handleItemChange" @change="handlechange4"/>
            </el-form-item>
            <el-form-item :label="$t('SalePlan.repositoryid')" label-width="100px">
              <el-select v-model="addCategoryForm.repositoryid" placeholder="请选择门店" filterable style="width: 100%;" @change="changeValue">
                <el-option
                  v-for="(item, index) in repositories"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SalePlan.lowerPlanMoney')" label-width="100px">
              <el-input v-model="addCategoryForm.lowerMoney" autocomplete="off"/>
            </el-form-item>
            <el-form-item :label="$t('SalePlan.targetMoney')" label-width="100px">
              <el-input v-model="addCategoryForm.targetMoney" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handlesave2()">保存</el-button>
            <el-button type="danger" @click="handlecancel()">取消</el-button>
          </span>
        </el-dialog>
        <div class="container">
          <el-tree
            :data="data2"
            :props="defaultProps"
            :check-strictly = "true"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"/>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { createSalePlan } from '@/api/SalePlan'
import { searchSaleCategory } from '@/api/SaleCategory'
import { listbyparentid, searchRepository, searchregionName } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
export default {
  name: 'AddSalePlan',
  components: { MyAgent, MyCustomer, MyRequire, MyApply, MyDetail, MyDelivery, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.personalForm.endTime !== null) {
            return time.getTime() > new Date(this.personalForm.endTime).getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.beginTime).getTime() - 8.64e7
        }
      },
      // 门店数据
      repositories: [],
      // 区域数据
      provinceList: [],
      // 转化数据
      props: { value: 'value', children: 'cities' },
      // 添加明细
      categoryVisible: false,
      // 明细数据
      addCategoryForm: { label: '', id: 1, parentId: 0, level: 1, children: [], lowerMoney: '', targetMoney: '' },
      // 最低计划额
      lowerMoney: '',
      // 计划额
      targetMoney: '',
      // 树结构数据
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 合计信息
      heji1: '',
      heji2: '',
      heji3: '',
      heji4: '',
      heji5: '',
      heji6: '',
      heji7: '',
      heji8: '',
      heji9: '',
      // 控制源单编码是否可以选择
      IsNumber: true,
      // 控制添加商品按钮是否可以点击
      Isproduct: true,
      // 回显门店
      saleRepositoryId: '',
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      agentcontrol: false,
      // 选择的数据
      choosedata: [],
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999,
        iseffective: 1
      },
      // 控制商品列表窗口
      control: false,
      // 销售订单信息数据
      personalForm: {
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2,
        beginTime: null,
        endTime: null
      },
      // 销售订单规则数据
      personalrules: {
        customerType: [
          { required: true, message: '请选择客户类别', trigger: 'change' }
        ],
        customerName: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        returnDate: [
          { required: true, message: '请选择退货日期', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        closeStatusId: [
          { required: true, message: '请选择结算状态', trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    // handleCheckChange(data, checked) {
    //   console.log(data)
    //   if (checked === true) {
    //
    //   }
    // },
    // 清理明细数据
    cleardata() {
      this.addCategoryForm = { label: '', id: 1, parentId: 0, level: 1, children: [] }
    },
    // 保存明细
    handlesave2() {
      const treeData = { label: '', id: 1, parentId: 0, level: 1, children: [] }
      treeData.label = this.addCategoryForm.repositoryName + ':  最低目标额(元):  ' + this.addCategoryForm.lowerMoney + '     ' + '目标额（元); ' + this.addCategoryForm.targetMoney
      this.data2.push(treeData)
      this.categoryVisible = false
      this.cleardata()
      this.addCategoryForm.id++
      console.log(this.data2)
    },
    changeValue(value) {
      console.log(value)
      console.log(this.repositories)
      let obj = {}
      obj = this.repositories.find((item) => {
        return item.id === value
      })
      this.addCategoryForm.repositoryName = obj.repositoryName
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchregionName(finalid).then(res => {
        console.log(res)
      })
      searchRepository(finalid).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('区域选择门店')
        }
      })
    },
    getPosition(val, cb) {
      console.log(val)
      const vm = this // 查询省市县
      let params = {}
      if (!val) { // 初始化加载 获取所有省份数据
        params = { region: this.personalForm.regionId }
      } else if (val.length === 1) { // 加载二级  获取市级数据
        params = { region: val[0] }
      } else if (val.length === 2) { // 加载3级   获取县级数据
        params = { region: val[1] }
      } else if (val.length === 3) { // 加载4级   获取县级数据
        params = { region: val[2] }
      } else if (val.length === 4) { // 加载5级   获取县级数据
        params = { region: val[3] }
      } else if (val.length === 5) { // 加载6级   获取县级数据
        params = { region: val[4] }
      } else if (val.length === 6) { // 加载7级   获取县级数据
        params = { region: val[5] }
      }
      listbyparentid(params).then((res) => {
        if (!val) { // 初始化加载   查询省份数据
          vm.provinceList = res.data.data.content.map((e) => {
            return { value: e.id, label: e.regionName, cities: [] }
          })
        } else if (val.length === 1) { // 加载二级    查询该省下市级数据
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              if (res.data.data.content === undefined) {
                item.cities = null
                return
              }
              item.cities = res.data.data.content.map((e) => {
                return { value: e.id, label: e.regionName, cities: [] }
              })
            }
          })
        } else if (val.length === 2) { // 加载3级   查询该省市下县级数据
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                if (value.value === val[1]) {
                  if (res.data.data.content === undefined) {
                    value.cities = null
                    return
                  }
                  value.cities = res.data.data.content.map((e) => {
                    return { value: e.id, label: e.regionName, cities: [] }
                  })
                }
              })
            }
          })
        } else if (val.length === 3) { // 加载4级   查询该省市下县级数据
          console.log(vm.provinceList)
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                if (value.value === val[1]) {
                  value.cities.map((value2) => {
                    if (res.data.data.content === undefined) {
                      value2.cities = null
                      return
                    }
                    value2.cities = res.data.data.content.map((e) => {
                      return { value: e.id, label: e.regionName, cities: [] }
                    })
                  })
                }
              })
            }
          })
        } else if (val.length === 4) { // 加载5级   查询该省市下县级数据
          console.log(vm.provinceList)
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                if (value.value === val[1]) {
                  value.cities.map((value2) => {
                    if (value2.value === val[2]) {
                      value2.cities.map((value3) => {
                        if (res.data.data.content === undefined) {
                          value3.cities = null
                          return
                        }
                        value3.cities = res.data.data.content.map((e) => {
                          return { value: e.id, label: e.regionName, cities: [] }
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        } else if (val.length === 5) { // 加载6级   查询该省市下县级数据
          console.log(vm.provinceList)
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                if (value.value === val[1]) {
                  value.cities.map((value2) => {
                    if (value2.value === val[2]) {
                      value2.cities.map((value3) => {
                        if (value3.value === val[3]) {
                          value3.cities.map((value4) => {
                            if (res.data.data.content === undefined) {
                              value4.cities = null
                              return
                            }
                            value4.cities = res.data.data.content.map((e) => {
                              return { value: e.id, label: e.regionName, cities: [] }
                            })
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        } else if (val.length === 6) { // 加载7级   查询该省市下县级数据
          console.log(vm.provinceList)
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                if (value.value === val[1]) {
                  value.cities.map((value2) => {
                    if (value2.value === val[2]) {
                      value2.cities.map((value3) => {
                        if (value3.value === val[3]) {
                          value3.cities.map((value4) => {
                            if (value4.value === val[4]) {
                              value4.cities.map((value5) => {
                                if (res.data.data.content === undefined) {
                                  value5.cities = null
                                  return
                                }
                                value5.cities = res.data.data.content.map((e) => {
                                  return { value: e.id, label: e.regionName, cities: [] }
                                })
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
        cb && cb(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleItemChange(val) {
      this.getPosition(val)
    },
    // 清空结束时间
    cleardeposit() {
      this.personalForm.endTime = null
    },
    getTypes() {
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      searchRepository(this.personalForm.regionId).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('区域选择门店')
        }
      })
    },
    // 控制源单类型
    chooseSource(val) {
      if (val === '1') {
        this.Isproduct = true
        this.IsNumber = false
      } else if (val === '2') {
        this.Isproduct = false
        this.IsNumber = true
      }
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return (prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[25] = ''
      sums[27] = ''
      sums[28] = ''
      sums[29] = ''
      sums[30] = ''
      this.heji1 = sums[24]
      this.heji2 = sums[19]
      this.heji3 = sums[16]
      this.heji4 = sums[18]
      this.heji5 = sums[22]
      this.heji6 = sums[20] - sums[22]
      return sums
    },
    // 通过折扣额计算折扣率
    getdiscountMoney(row) {
      row.discount = ((1 - row.discountMoney / row.salePrice / row.quantity) * 100).toFixed(2)
    },
    // 通过折扣率计算折扣额
    getdiscount(row) {
      row.discountMoney = (row.salePrice * row.quantity * (1 - row.discount / 100)).toFixed(2)
    },
    // 通过数量计算成本金额， 含税金额， 金额， 含税成本金额
    getquantity(row) {
      row.costMoney = row.returnQuantity * row.costPrice
      row.includeTaxMoney = row.returnQuantity * row.taxprice
      row.money = row.returnQuantity * row.salePrice
      row.includeTaxCostMoney = row.includeTaxMoney + row.costMoney
      row.taxMoney = ((row.taxRate / 100) * row.salePrice * row.returnQuantity).toFixed(2)
      if (row.returnQuantity !== 0) {
        row.taxRate = ((row.taxMoney / (row.salePrice * row.returnQuantity)) * 100).toFixed(2)
        row.discount = (1 - row.discountMoney / row.salePrice / row.returnQuantity).toFixed(2)
      }
      row.discountMoney = (row.salePrice * row.returnQuantity * (1 - row.discount)).toFixed(2)
      return row.returnQuantity
    },
    // 计算含税价
    gettaxprice(row) {
      row.taxprice = (row.salePrice * (1 + row.taxRate / 100)).toFixed(2)
      return row.taxprice
    },
    // 通过税率计算税额
    gettaxRate(row) {
      if (row.taxRate !== 0) {
        row.taxMoney = (row.salePrice * row.taxRate * row.quantity / 100).toFixed(2)
      }
      return row.taxRate
    },
    // 通过税额计算税率
    gettaxMoney(row) {
      if (row.taxMoney !== 0 && row.quantity !== 0 && row.salePrice !== 0) {
        row.taxRate = ((row.taxMoney / (row.salePrice * row.quantity)) * 100).toFixed(2)
      }
      return row.taxMoney
    },
    // 选择客户类型时清理客户名称
    clearCustomer() {
      this.personalForm.customerId = ''
      this.customerId = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.personalForm.customerType === '1') {
        this.agentcontrol = true
      } else if (this.personalForm.customerType === '2') {
        this.customercontrol = true
      }
    },
    customerdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.customerName
      this.personalForm.customerPhone = val.phoneNumber
    },
    agentdata(val) {
      this.personalForm.customerId = val.id
      this.customerId = val.agentName
      this.personalForm.customerPhone = val.phone
    },
    // 无来源添加商品
    handleAddproduct() {
      this.categoryVisible = true
      this.handleItemChange()
    },
    deleteChange(val) {
      this.choosedata = val
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
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.repositoryId
      this.roleId = val.postName
      this.personalForm.roleId = val.postId
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      }
      this.customerId = null
      this.salePersonId = null
    },
    // // 保存操作
    // handlesave() {
    //   const EnterDetail = this.$refs.editable.getRecords()
    //   if (EnterDetail.length === 0) {
    //     this.$notify.error({
    //       title: '错误',
    //       message: '明细表不能为空',
    //       offset: 100
    //     })
    //     return false
    //   }
    //   EnterDetail.map(function(elem) {
    //     return elem
    //   }).forEach(function(elem) {
    //     if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
    //       delete elem.batch
    //     }
    //     if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
    //       delete elem.productName
    //     }
    //     if (elem.category === null || elem.category === '' || elem.category === undefined) {
    //       delete elem.category
    //     }
    //     if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
    //       delete elem.unit
    //     }
    //     if (elem.type === null || elem.type === '' || elem.type === undefined) {
    //       delete elem.type
    //     }
    //     if (elem.color === null || elem.color === '' || elem.color === undefined) {
    //       delete elem.color
    //     }
    //     if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
    //       delete elem.kpiGrade
    //     }
    //     if (elem.point === null || elem.point === '' || elem.point === undefined) {
    //       delete elem.point
    //     }
    //     if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
    //       delete elem.salePrice
    //     }
    //     if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
    //       delete elem.costPrice
    //     }
    //     if (elem.costMoney === null || elem.costMoney === '' || elem.costMoney === undefined) {
    //       delete elem.costMoney
    //     }
    //     if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
    //       delete elem.includeTaxMoney
    //     }
    //     if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
    //       delete elem.taxRate
    //     }
    //     if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
    //       elem.taxRate = elem.taxRate / 100
    //     }
    //     if (elem.taxMoney === null || elem.taxMoney === '' || elem.taxMoney === undefined) {
    //       delete elem.taxMoney
    //     }
    //     if (elem.money === null || elem.money === '' || elem.money === undefined) {
    //       delete elem.money
    //     }
    //     if (elem.includeTaxCostMoney === null || elem.includeTaxCostMoney === '' || elem.includeTaxCostMoney === undefined) {
    //       delete elem.includeTaxCostMoney
    //     }
    //     if (elem.discount === null || elem.discount === '' || elem.discount === undefined) {
    //       delete elem.discount
    //     }
    //     if (elem.discount !== null || elem.discount !== '' || elem.discount !== undefined) {
    //       elem.discount = elem.discount / 100
    //     }
    //     if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
    //       delete elem.discountMoney
    //     }
    //     if (elem.alreadyReturnQuantity === null || elem.alreadyReturnQuantity === '' || elem.alreadyReturnQuantity === undefined) {
    //       delete elem.alreadyReturnQuantity
    //     }
    //     if (elem.returnQuantity === null || elem.returnQuantity === '' || elem.returnQuantity === undefined) {
    //       delete elem.returnQuantity
    //     }
    //     if (elem.returnReason === null || elem.returnReason === '' || elem.returnReason === undefined) {
    //       delete elem.returnReason
    //     }
    //     if (elem.sendQuantity === null || elem.sendQuantity === '' || elem.sendQuantity === undefined) {
    //       delete elem.sendQuantity
    //     }
    //     if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
    //       delete elem.carCode
    //     }
    //     if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
    //       delete elem.motorCode
    //     }
    //     if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
    //       delete elem.batteryCode
    //     }
    //     if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
    //       delete elem.locationId
    //     }
    //     return elem
    //   })
    //   const parms2 = JSON.stringify(EnterDetail)
    //   const Data = this.personalForm
    //   for (const key in Data) {
    //     if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
    //       delete Data[key]
    //     }
    //   }
    //   const parms = JSON.stringify(Data)
    //   this.$refs.personalForm.validate((valid) => {
    //     if (valid) {
    //       createSalePlan(parms, parms2, this.personalForm).then(res => {
    //         console.log(res)
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: '成功',
    //             message: '保存成功',
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.restAllForm()
    //           this.$refs.editable.clear()
    //           this.$refs.personalForm.clearValidate()
    //           this.$refs.personalForm.resetFields()
    //           this.$refs.personalForm2.clearValidate()
    //           this.$refs.personalForm2.resetFields()
    //           this.$refs.personalForm3.clearValidate()
    //           this.$refs.personalForm3.resetFields()
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: res.data.msg,
    //             offset: 100
    //           })
    //         }
    //       })
    //     } else {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '信息未填完整',
    //         offset: 100
    //       })
    //       return false
    //     }
    //   })
    // },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/SalePlan/AddSalePlan', name: 'AddSalePlan', fullPath: '/SalePlan/AddSalePlan', title: 'AddSalePlan' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
  .ERP-container {
    margin-right: 0;
  }
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
</style>
