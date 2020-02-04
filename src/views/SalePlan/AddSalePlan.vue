<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form
            ref="personalForm"
            :model="personalForm"
            :rules="personalrules"
            :inline="true"
            status-icon
            class="demo-ruleForm"
            label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planCategory')" prop="" style="width: 100%;">
                  <el-select
                    v-model="personalForm.planCategory"
                    style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="门店计划" />
                    <el-option value="2" label="区域计划" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planType')" prop="" style="width: 100%;">
                  <el-select
                    v-model="personalForm.planType"
                    style="margin-left: 18px;width: 200px"
                    @change="listenplanType">
                    <el-option value="1" label="年计划" />
                    <el-option value="2" label="季计划" />
                    <el-option value="3" label="月计划" />
                    <el-option value="4" label="周计划" />
                    <el-option value="5" label="日计划" />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('SalePlan.planDate')" style="100%">
                  <el-date-picker
                    v-if="personalForm.planType == 5"
                    v-model="personalForm.planDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px" />
                  <el-date-picker
                    v-else-if="personalForm.planType == 1 || 2 || 3 || 4"
                    v-model="personalForm.planDate"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年"
                    style="margin-left: 18px;width: 200px"
                    @change="getnum" />
                  <el-input v-else v-model="personalForm.planDate" disabled style="margin-left: 18px;width:200px" />
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item v-if="isshow" :label="$t(typeName)" style="width: 100%;">
                  <el-select
                    v-if="personalForm.planType == 2"
                    v-model="personalForm.planDateAdd"
                    style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="春季" />
                    <el-option value="2" label="夏季" />
                    <el-option value="3" label="秋季" />
                    <el-option value="4" label="冬季" />
                  </el-select>
                  <el-select
                    v-if="personalForm.planType == 3"
                    v-model="personalForm.planDateAdd"
                    style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="一月" />
                    <el-option value="2" label="二月" />
                    <el-option value="3" label="三月" />
                    <el-option value="4" label="四月" />
                    <el-option value="5" label="五月" />
                    <el-option value="6" label="六月" />
                    <el-option value="7" label="七月" />
                    <el-option value="8" label="八月" />
                    <el-option value="9" label="九月" />
                    <el-option value="10" label="十月" />
                    <el-option value="11" label="十一月" />
                    <el-option value="12" label="十二月" />
                  </el-select>
                  <el-select
                    v-if="personalForm.planType == 4"
                    v-model="personalForm.planDateAdd"
                    style="margin-left: 18px;width: 200px">
                    <el-option v-for="item in weeklist" :key="item.id" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.beginTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.beginTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"
                    @change="cleardeposit" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SalePlan.endTime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.endTime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px" />
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.planCategory === '2'" :span="6" >
                <el-form-item :label="$t('SalePlan.regionId')" style="width: 100%;">
                  <el-cascader
                    :options="regions"
                    :props="reprops"
                    v-model="personalForm.planRegionId"
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
              <el-col v-if="personalForm.planCategory === '1'" :span="6">
                <el-form-item :label="$t('SalePlan.repositoryid')" style="width: 100%;">
                  <el-input v-model="repositoryid" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.jhmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="insertEvent(-1)">{{ $t('updates.tjmx') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('updates.scmx') }}</el-button>
        </div>
        <!-- 明细表格 -->
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
            <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('SalePlan.planTarget')" prop="" align="center" min-width="250px">
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.planTarget" :placeholder="$t('SalePlan.xzmd')" clearable filterable style="margin-left: 18px;width: 180px" @change="jungleAddress(scope.row,$event)">
                  <el-option value="1" label="销售任务" />
                  <el-option value="2" label="分期付款收款任务" />
                  <el-option value="3" label="准时交款任务" />
                  <el-option value="4" label="一个月未交任务" />
                  <el-option value="5" label="连续三个月未交任务" />
                  <el-option value="6" label="连续三个月以上未交任务" />
                  <el-option value="7" label="地点任务" />
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.address')" prop="address" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isedit(scope.row)" v-model="scope.row.address" clearable/>
                <span v-else/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('SalePlan.typeId')" prop="typeId" align="center" min-width="250px">
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.typeId" :placeholder="$t('SalePlan.xzmd')" clearable filterable style="margin-left: 18px;width: 180px">
                  <el-option
                    v-for="(item, index) in CategoryList"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.quantity')" prop="quantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :disabled="scope.row.isdisable2"
                  v-model="scope.row.quantity"
                />
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.money')" prop="money" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :disabled="scope.row.isdisable2"
                  v-model="scope.row.money"
                />
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.actualQuantity')" prop="actualQuantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.actualQuantity"
                  disabled
                />
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('SalePlan.actualMoney')" prop="actualMoney" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.actualMoney"
                  disabled
                />
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button
          v-no-more-click
          type="primary"
          style="background:#3696fd;border-color:#3696fd;width: 98px"
          @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" style="width: 98px" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import {
  addsaleplan,
  searchEmpCategory
} from '@/api/SalePlan'
import {
  searchSaleCategory
} from '@/api/SaleCategory'
import {
  listbyparentid,
  searchRepository,
  getId,
  searchregionName,
  regionlist
} from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MyRequire from './components/MyRequire'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MyRepository from './components/MyRepository'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddSalePlan',
  components: {
    MyAgent,
    MyCustomer,
    MyRequire,
    MyApply,
    MyDetail,
    MyDelivery,
    MyEmp,
    MyRepository
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入'))
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
      // 判断商品类型
      myflag: false,
      // 商品类别列表
      CategoryList: [],
      // 区域列表
      regions: [],
      regionids: [],
      // 区域列表字段更改re
      reprops: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 默认仓库
      repositoryid: this.$store.getters.repositoryName,
      // 仓库开关
      repositorycontrol: false,
      // 周数列表
      weeklist: [],
      // 是否显示周月
      isshow: false,
      // 门店数据
      repositories: [],
      // 区域数据
      provinceList: [],
      // 转化数据
      props: {
        value: 'value',
        children: 'cities'
      },
      // 添加明细
      categoryVisible: false,
      // 修改明细
      categoryVisible2: false,
      // 明细数据
      addCategoryForm: {
        label: '',
        id: 1,
        parentId: 0,
        level: 1,
        children: [],
        lowerMoney: '',
        targetMoney: '',
        regionId: []
      },
      // 修改数据
      editCategoryForm: {
        label: '',
        id: 1,
        parentId: 0,
        level: 1,
        children: [],
        lowerMoney: '',
        targetMoney: ''
      },
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
      // 单选数据
      editCheckId: '',
      // id递增数据
      treeIds: 1,
      // 转存数据
      childData: '',
      // 标志符
      child: false,
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        planRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        beginTime: null,
        endTime: null
      },
      // 销售订单规则数据
      personalrules: {
        planType: [{
          required: true,
          message: '请选择计划类型',
          trigger: 'change'
        }],
        customerType: [{
          required: true,
          message: '请选择客户类别',
          trigger: 'change'
        }],
        customerName: [{
          required: true,
          validator: validatePass,
          trigger: 'focus'
        }],
        returnDate: [{
          required: true,
          message: '请选择退货日期',
          trigger: 'change'
        }],
        currency: [{
          required: true,
          message: '请选择币种',
          trigger: 'change'
        }],
        sourceType: [{
          required: true,
          message: '请选择源单类型',
          trigger: 'change'
        }],
        closeStatusId: [{
          required: true,
          message: '请选择结算状态',
          trigger: 'change'
        }]
      },
      addCategoryFormrules: {
        lowerMoney: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }],
        targetMoney: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }],
        regionId: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }]
      },
      editCategoryFormrules: {
        lowerMoney: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }],
        targetMoney: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }],
        regionId: [{
          required: true,
          validator: validatePass,
          trigger: 'change'
        }]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
        address: [{
          required: true, message: 'Please enter a address.', trigger: 'blur'
        }],
        quantity: [{
          required: true, message: 'Please enter a quantity.', trigger: ''
        }],
        money: [{
          required: true, message: 'Please enter a money.', trigger: ''
        }]
      },
      // 周数
      week: 0,
      // 修改id
      editId: 0
    }
  },
  computed: {
    typeName: function() {
      if (this.personalForm.planType === '2') {
        return 'SalePlan.quarter'
      }
      if (this.personalForm.planType === '3') {
        return 'SalePlan.month'
      }
      if (this.personalForm.planType === '4') {
        return 'SalePlan.week'
      }
    }
  },
  created() {
    this.getTypes()
    this.getTreeId()
    this.getregionlist()
    this.getCategory()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 判断是否可以修改
    isedit(row) {
      console.log('row============>', row)
      const flag = row.planTarget
      if (flag === '7') {
        return true
      } else {
        return false
      }
    },
    // 判断计划类别
    jungleAddress(row, val) {
      if (val === '7') {
        row.address = ''
      }
    },
    // 处理区域id
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
    // 获取商品类型
    getCategory() {
      searchEmpCategory().then(res => {
        this.CategoryList = res.data.data.content.list
      })
    },
    // 插入数据
    insertEvent(index) {
      console.log('表格数据===============>', this.$refs.editable.getRecords(0))
      const mytable = this.$refs.editable.getRecords(0)
      this.$refs.editable.insertAt(mytable, index)
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
    // 区域列表数据
    getregionlist() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          this.personalForm.planRegionId = this.findPathByLeafId(this.$store.getters.regionId, this.regions)
        } else {
          console.log('区域列表出错')
        }
      })
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(123123, this.personalForm.regionId)
      // const finalid = val[val.length - 1]
      // searchRepository(finalid).then(res => {
      //   console.log(res)
      //   if (res.data.ret === 200) {
      //     this.repositories = res.data.data.content.list
      //   } else {
      //     console.log('区域选择门店')
      //   }
      // })
    },
    repositoryname(val) {
      this.repositoryid = val.repositoryName
      this.personalForm.planRepositoryId = val.id
    },
    // 打开仓库
    handlechooseRep() {
      this.repositorycontrol = true
    },
    // 删除树
    deleteTreeData() {
      console.log('delete')
      this.nodeDelete()
    },
    // 判断一年多少周
    isLeapYear(year) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        console.log(year + 'is leap year')
        return true
      } else {
        console.log(year + 'is not leap year')
        return false
      }
    },
    getDate(date) {
      const oDate = new Date(date)
      const day = oDate.getDay()
      console.log(typeof day)
      switch (day) {
        case 0:
          console.log('星期日')
          return 0
        case 1:
          console.log('星期一')
          return 1
        case 2:
          console.log('星期二')
          return 2
        case 3:
          console.log('星期三')
          return 3
        case 4:
          console.log('星期四')
          return 4
        case 5:
          console.log('星期五')
          return 5
        case 6:
          console.log('星期六')
          return 6
      }
    },
    main() {
      const currentYearDays = this.isLeapYear(2019) ? 366 : 365
      const beforeDays = 7 - this.getDate(`${this.personalForm.planDate}-1-1`) + 1
      const afterDays = this.getDate(`${this.personalForm.planDate}-12-31`)
      const vaildDays = currentYearDays - beforeDays - afterDays
      this.week = (vaildDays / 7).toFixed(0)
    },
    test(year) {
    },
    getnum() {
      console.log(this.personalForm.planDate)
      this.main()
      this.weeklist
      let obj = {}
      for (let i = 1; i <= this.week; i++) {
        obj = {}
        obj.value = i
        obj.label = `第${i}周`
        this.weeklist.push(obj)
      }
    },
    // 判断显示
    listenplanType() {
      console.log('listen')
      if (this.personalForm.planType === '1' || this.personalForm.planType === '5') {
        console.log(this.personalForm.planType)
        this.isshow = false
      } else {
        this.isshow = true
      }
    },
    // 取消添加
    handlecancel2() {
      this.addCategoryForm.regionId = []
      this.categoryVisible = false
    },
    // 取消修改
    handlecancel3() {
      this.addCategoryForm.regionId = []
      this.categoryVisible2 = false
    },
    // 获取递归值
    getTreeId() {
      getId().then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.treeIds = res.data.data.content
        }
      })
    },
    // 删除tree数据
    nodeDelete(node, data) {
      const parent = node.parent

      const children = parent.data.children || parent.data

      const index = children.findIndex(d => d.id === data.id)

      children.splice(index, 1)
    },
    // 修改tree数据
    nodeEdit(node, data) {
      this.categoryVisible2 = true
      this.editCategoryForm.lowerMoney = data.lowerMoney
      this.editCategoryForm.targetMoney = data.targetMoney
      this.editCategoryForm.regionId = data.regionId
      this.editCategoryForm.repositoryId = data.repositoryid
      console.log(data)
      console.log(this.editCategoryForm)
    },
    // checkGroupNode: function(a, b) {
    //   if (b.checkedKeys.length > 0) {
    //     this.$refs.DeviceGroupTree.setCheckedKeys([a.id])
    //   }
    // },
    handleCheckChange(data, checked) {
      console.log(data)
      console.log(checked)
      if (checked === true) {
        this.child = true
        this.childData = data
        this.childData2 = data
        this.editCheckId = data.id
        this.editCategoryForm = data
        this.editCategoryForm.repositoryId = data.repositoryid
        this.editId = data.id
        console.log('修改', this.editCategoryForm)
      } else if (checked === false) {
        this.child = false
        this.childData = ''
      }
    },
    // 清理明细数据
    cleardata() {
      this.addCategoryForm = {
        label: '',
        id: 1,
        parentId: 0,
        level: 1,
        children: [],
        regionId: [],
        repositoryName: ''
      }
    },
    // 保存明细
    handlesave2() {
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            offset: 100
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
      if (this.child === false) {
        const treeData = {
          label: '',
          id: 1,
          parentId: 0,
          level: 1,
          children: []
        }
        treeData.label = this.addCategoryForm.labelName + ':  最低目标额(元):  ' + this.addCategoryForm.lowerMoney +
            '     ' + '目标额（元): ' + this.addCategoryForm.targetMoney
        treeData.id = this.treeIds++
        treeData.repositoryid = this.addCategoryForm.repositoryid
        treeData.regionId = this.addCategoryForm.regionId
        treeData.labelName = this.addCategoryForm.labelName
        treeData.repositoryName = this.addCategoryForm.repositoryName
        treeData.targetMoney = this.addCategoryForm.targetMoney
        treeData.lowerMoney = this.addCategoryForm.lowerMoney
        this.data2.push(treeData)
        this.categoryVisible = false
        this.cleardata()
        this.addCategoryForm.id++
      } else if (this.child === true) {
        const treeData = {
          label: '',
          id: 1,
          parentId: 0,
          level: 1,
          children: []
        }
        treeData.label = this.addCategoryForm.labelName + ':  最低目标额(元):  ' + this.addCategoryForm.lowerMoney +
            '     ' + '目标额（元): ' + this.addCategoryForm.targetMoney
        treeData.parentId = this.childData.id
        treeData.repositoryid = this.addCategoryForm.repositoryid
        treeData.regionId = this.addCategoryForm.regionId
        treeData.labelName = this.addCategoryForm.labelName
        treeData.repositoryName = this.addCategoryForm.repositoryName
        treeData.targetMoney = this.addCategoryForm.targetMoney
        treeData.lowerMoney = this.addCategoryForm.lowerMoney
        treeData.id = this.treeIds++
        treeData.level = this.childData.level + 1
        this.childData.children.push(treeData)
        this.categoryVisible = false
        this.cleardata()
        this.addCategoryForm.id++
      }
    },
    // 修改保存明细
    handlesave3() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            offset: 100
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
      const label = this.editCategoryForm.labelName + ':  最低目标额(元):  ' + this.editCategoryForm.lowerMoney +
            '     ' + '目标额（元): ' + this.editCategoryForm.targetMoney
      console.log(label)
      this.$refs.DeviceGroupTree.updateKeyChildren(this.editId, {
        label: label,
        repositoryId: this.editCategoryForm.repositoryid,
        regionId: this.editCategoryForm.regionId,
        labelName: this.editCategoryForm.labelName,
        repositoryName: this.editCategoryForm.repositoryName,
        targetMoney: this.editCategoryForm.targetMoney,
        lowerMoney: this.editCategoryForm.lowerMoney

      })
      this.categoryVisible2 = false
    },
    changeValue(value) {
      console.log(value)
      console.log(this.repositories)
      let obj = {}
      obj = this.repositories.find((item) => {
        return item.id === value
      })
      this.addCategoryForm.repositoryName = obj.repositoryName
      this.editCategoryForm.repositoryName = obj.repositoryName
      console.log(obj.repositoryName)
    },
    // 根据区域选择门店
    getPosition(val, cb) {
      const vm = this // 查询省市县
      let params = {}
      if (!val) { // 初始化加载 获取所有省份数据
        params = {
          region: this.personalForm.regionId
        }
      } else if (val.length === 1) { // 加载二级  获取市级数据
        params = {
          region: val[0]
        }
      } else if (val.length === 2) { // 加载3级   获取县级数据
        params = {
          region: val[1]
        }
      } else if (val.length === 3) { // 加载4级   获取县级数据
        params = {
          region: val[2]
        }
      } else if (val.length === 4) { // 加载5级   获取县级数据
        params = {
          region: val[3]
        }
      } else if (val.length === 5) { // 加载6级   获取县级数据
        params = {
          region: val[4]
        }
      } else if (val.length === 6) { // 加载7级   获取县级数据
        params = {
          region: val[5]
        }
      }
      listbyparentid(params).then((res) => {
        if (!val) { // 初始化加载   查询省份数据
          // vm.provinceList = res.data.data.content.map((e) => {
          //   return { value: e.id, label: e.regionName, cities: [] }
          // })
          vm.provinceList = [{
            value: this.$store.getters.regionId,
            label: this.$store.getters.regionName,
            cities: []
          }]
        } else if (val.length === 1) { // 加载二级    查询该省下市级数据
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              if (res.data.data.content === undefined) {
                item.cities = null
                return
              }
              item.cities = res.data.data.content.map((e) => {
                return {
                  value: e.id,
                  label: e.regionName,
                  cities: []
                }
              })
            }
          })
        } else if (val.length === 2) { // 加载3级   查询该省市下县级数据
          vm.provinceList.map((item) => {
            if (item.value === val[0]) {
              item.cities.map((value) => {
                console.log('value', value)
                if (value.value === val[1]) {
                  if (res.data.data.content === undefined) {
                    value.cities = null
                    return
                  }
                  value.cities = res.data.data.content.map((e) => {
                    return {
                      value: e.id,
                      label: e.regionName,
                      cities: []
                    }
                  })
                }
              })
            }
          })
        } else if (val.length === 3) { // 加载4级   查询该省市下县级数据
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
                      return {
                        value: e.id,
                        label: e.regionName,
                        cities: []
                      }
                    })
                  })
                }
              })
            }
          })
        } else if (val.length === 4) { // 加载5级   查询该省市下县级数据
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
                          return {
                            value: e.id,
                            label: e.regionName,
                            cities: []
                          }
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        } else if (val.length === 5) { // 加载6级   查询该省市下县级数据
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
                              return {
                                value: e.id,
                                label: e.regionName,
                                cities: []
                              }
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
                                  return {
                                    value: e.id,
                                    label: e.regionName,
                                    cities: []
                                  }
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
      console.log('门店', val)
      this.getPosition(val)
      console.log('this.addCategoryForm.regionId', this.addCategoryForm.regionId)
      console.log('this.provinceList', this.provinceList)
      setTimeout(() => {
        this.addCategoryForm.labelName = this.$refs.mycascader.currentLabels.join('/')
        this.editCategoryForm.labelName = this.$refs.mycascader.currentLabels.join('/')
        console.log('this.$refs.mycascader', this.$refs.mycascader.currentLabels.length)
      }, 0)

      const finalid = val[val.length - 1]
      searchregionName(finalid).then(res => {
        console.log('123', res)
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
    handleItemChange_edit(val) {
      console.log('门店', val)
      this.getPosition(val)
      console.log('this.addCategoryForm.regionId', this.addCategoryForm.regionId)
      console.log('this.provinceList', this.provinceList)
      setTimeout(() => {
        console.log('this.$refs.mycascader', this.$refs.mycascader.currentLabels.length)
      }, 0)

      const finalid = val[val.length - 1]
      searchregionName(finalid).then(res => {
        console.log('123', res)
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
    // 判断补0
    junglezero(val) {
      if (val <= 9) {
        return '0' + val
      } else {
        return val
      }
    },
    // 清空结束时间
    cleardeposit(val) {
      console.log('val==================>', this.personalForm.planType)
      const processarr = Date.parse(new Date(val))
      console.log('processarr==========>', processarr)
      const date = new Date()
      if (this.personalForm.planType === '1') {
        this.personalForm.endTime = new Date(processarr + 3600 * 1000 * 24 * 365)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      } else if (this.personalForm.planType === '2') {
        this.personalForm.endTime = new Date(processarr + 3600 * 1000 * 24 * 90)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      } else if (this.personalForm.planType === '3') {
        this.personalForm.endTime = new Date(processarr + 3600 * 1000 * 24 * 30)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      } else if (this.personalForm.planType === '4') {
        this.personalForm.endTime = new Date(processarr + 3600 * 1000 * 24 * 7)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      } else if (this.personalForm.planType === '5') {
        this.personalForm.endTime = new Date(processarr + 3600 * 1000 * 24)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      } else if (this.personalForm.planType === undefined) {
        console.log('wozhixingle')
        this.personalForm.endTime = new Date(processarr)
        this.personalForm.endTime = this.personalForm.endTime.getFullYear() + '-' + this.junglezero((this.personalForm.endTime.getMonth() + 1)) + '-' + this.junglezero(this.personalForm.endTime.getDate())
      }
      // this.personalForm.endTime = null
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
    // chooseSource(val) {
    //   if (val === '1') {
    //     this.Isproduct = true
    //     this.IsNumber = false
    //   } else if (val === '2') {
    //     this.Isproduct = false
    //     this.IsNumber = true
    //   }
    // },
    // 总计
    // getSummaries(param) {
    //   const {
    //     columns,
    //     data
    //   } = param
    //   const sums = []
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = '总计'
    //       return
    //     }
    //     const values = data.map(item => Number(item[column.property]))
    //     if (!values.every(value => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr)
    //         if (!isNaN(value)) {
    //           return prev + curr
    //         } else {
    //           return (prev).toFixed(2)
    //         }
    //       }, 0)
    //       sums[index] += ''
    //     } else {
    //       sums[index] = ''
    //     }
    //   })
    //   sums[2] = ''
    //   sums[3] = ''
    //   sums[4] = ''
    //   sums[5] = ''
    //   sums[6] = ''
    //   sums[7] = ''
    //   sums[8] = ''
    //   sums[9] = ''
    //   sums[25] = ''
    //   sums[27] = ''
    //   sums[28] = ''
    //   sums[29] = ''
    //   sums[30] = ''
    //   this.heji1 = sums[24]
    //   this.heji2 = sums[19]
    //   this.heji3 = sums[16]
    //   this.heji4 = sums[18]
    //   this.heji5 = sums[22]
    //   this.heji6 = sums[20] - sums[22]
    //   return sums
    // },
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
    // 修改本级明细
    handleAddproduct2() {
      this.categoryVisible2 = true
      console.log('获取节点', this.$refs.DeviceGroupTree.getCheckedKeys())
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.customerId = null
      this.salePersonId = null
      this.data2 = ''
    },
    // 树结构数据转数组
    treeToList(tree) {
      let queen = []
      const out = []
      queen = queen.concat(tree)
      while (queen.length) {
        const first = queen.shift()
        if (first.children) {
          queen = queen.concat(first.children)
          delete first['children']
        }
        out.push(first)
      }
      return out
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(EnterDetail)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '计划明细不能为空',
          offset: 100
        })
        return false
      }
      for (let i = 0; i < EnterDetail.length; i++) {
        if (EnterDetail[i].address === '' && EnterDetail[i].planTarget === '7') {
          this.$notify.error({
            title: '错误',
            message: '地点信息未填完整',
            offset: 100
          })
          return false
        }
      }
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      const regionId_length = Data.regionId.length
      if (regionId_length === 0) {
        Data.regionId = ''
      } else {
        Data.regionId = Data.regionId[regionId_length - 1]
      }
      console.log('Data==============>', Data)
      console.log('EnterDetail==============>', EnterDetail)
      if (Data.planCategory === '2') {
        delete Data.planRepositoryId
      } else if (Data.planCategory === '1') {
        delete Data.planRegionId
      }
      Data.planType = Number(Data.planType)
      Data.planCategory = Number(Data.planCategory)
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addsaleplan(parms, parms2, this.personalForm).then(res => {
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
              this.$refs.editable.clear()
              // this.$refs.personalForm2.clearValidate()
              // this.$refs.personalForm2.resetFields()
              // this.$refs.personalForm3.clearValidate()
              // this.$refs.personalForm3.resetFields()
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = {
        path: '/SalePlan/AddSalePlan',
        name: 'AddSalePlan',
        fullPath: '/SalePlan/AddSalePlan',
        title: 'AddSalePlan'
      }
      this.$store.dispatch('delView', view).then(({
        visitedViews
      }) => {})
    }
  }
}

</script>

<style rel="stylesheet/css" scoped>
  .normal>>>.el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }

  .normal>>>.el-dialog {
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

  .form-name {
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 20px;
  }

  .container {
    margin-top: 40px;
  }

  /* .el-button+.el-button {
    width: 98px;
  } */

</style>
