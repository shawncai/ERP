<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.planNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SalePlan.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SalePlan.planCategory')" prop="planCategory" style="width: 100%;">
                <el-select
                  v-model="personalForm.planCategory"
                  style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('tongyo.mdjh')" value="1" />
                  <el-option :label="$t('tongyo.qyjh')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SalePlan.planType')" prop="planType" style="width: 100%;">
                <el-select
                  v-model="personalForm.planType"
                  style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('tongyo.njh')" value="1" />
                  <el-option :label="$t('tongyo.jjh')" value="2" />
                  <el-option :label="$t('tongyo.yjh')" value="3" />
                  <el-option :label="$t('tongyo.zjh')" value="4" />
                  <el-option :label="$t('tongyo.rjh')" value="5" />
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
            <el-col :span="12">
              <el-form-item :label="$t('SalePlan.beginTime')" prop="beginTime" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.beginTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width:200px"
                  @change="cleardeposit" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SalePlan.endTime')" prop="endTime" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.endTime"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width:200px" />
              </el-form-item>
            </el-col>
            <el-col v-if="personalForm.planCategory === '2'" :span="12" >
              <el-form-item :label="$t('SalePlan.regionId')" prop="regionId" style="width: 100%;">
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
                />
              </el-form-item>
            </el-col>
            <el-col v-if="personalForm.planCategory === '1'" :span="12">
              <el-form-item :label="$t('SalePlan.repositoryid')" prop="repositoryid" style="width: 100%;">
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
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.jhmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="insertEvent(-1)">{{ $t('updates.tjmx') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('updates.scmx') }}</el-button>
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
              <el-select v-if="isedit2(scope.row)" v-model="scope.row.typeId" :placeholder="$t('SalePlan.xzmd')" clearable filterable style="margin-left: 18px;width: 180px">
                <el-option
                  v-for="(item, index) in CategoryList"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"/>
              </el-select>
              <span v-else/>
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
    <el-card :body-style="{ padding: '10px' }" class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 50px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatesaleplan, saleplanlistDetail, searchEmpCategory } from '@/api/SalePlan'
import { searchSaleCategory } from '@/api/SaleCategory'
import { listbyparentid, searchRepository, searchregionName, getId, regionlist } from '@/api/public'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
import MyApply from './MyApply'
import MyRequire from './MyRequire'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MyRepository from './MyRepository'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyAgent, MyCustomer, MyRequire, MyApply, MyDetail, MyDelivery, MyEmp, MyRepository },
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
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择计划类别'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择计划类型'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择开始时间'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择结束时间'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    const validatePass7 = (rule, value, callback) => {
      console.log(value)
      if (this.repositoryid === '' || this.repositoryid === undefined || this.repositoryid === null) {
        callback(new Error('请选择仓库'))
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
      // 默认仓库
      repositoryid: '',
      // 仓库开关
      repositorycontrol: false,
      // 区域列表
      regions: [],
      regionids: [],
      // 区域列表字段更改re
      reprops: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 门店数据
      repositories: [],
      // 区域数据
      provinceList: [],
      // 转化数据
      props: { value: 'value', children: 'cities' },
      // 添加明细
      categoryVisible: false,
      // 明细数据
      addCategoryForm: { label: '', id: 1, parentId: 0, level: 1, salePlanDetailVos: [], lowerMoney: '', targetMoney: '' },
      // 最低计划额
      lowerMoney: '',
      // 计划额
      targetMoney: '',
      // 树结构数据
      data2: [],
      defaultProps: {
        children: 'salePlanDetailVos',
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
      // 销售订单规则数据
      // 销售订单规则数据
      personalrules: {
        planCategory: [{
          required: true,
          validator: validatePass2,
          trigger: 'change'
        }],
        planType: [{
          required: true,
          validator: validatePass3,
          trigger: 'change'
        }],
        beginTime: [{
          required: true,
          validator: validatePass4,
          trigger: 'change'
        }],
        endTime: [{
          required: true,
          validator: validatePass5,
          trigger: 'change'
        }],
        regionId: [{
          required: true,
          validator: validatePass6,
          trigger: 'change'
        }],
        repositoryid: [{
          required: true,
          validator: validatePass7,
          trigger: 'change'
        }]
      },
      // 订单明细数据
      list2: [],
      // 销售费用明细
      list3: [],
      // 明细列表规则
      validRules: {
      },
      // 商品类别列表
      CategoryList: []
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log(this.regions)
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          console.log('this.editdata1111=====>', this.editdata)
          console.log('this.regions1111=====>', this.regions)
          console.log('shuzuregions1111===>', this.findPathByLeafId(this.editdata.planRegionId, this.regions))
          console.log('this.editdata2222=====>', this.editdata)
          this.personalForm = this.editdata
          this.personalForm.planRegionId = this.findPathByLeafId(this.personalForm.planRegionId, this.regions)
          this.personalForm.planCategory = String(this.personalForm.planCategory)
          this.personalForm.planType = String(this.personalForm.planType)
          this.repositoryid = this.personalForm.planRepositoryName
          this.data2 = this.personalForm.salePlanDetailVos
          saleplanlistDetail(this.personalForm.id).then(res => {
            console.log('详情数据============>', res.data.data.content.salePlanDetailVos)
            for (let i = 0; i < res.data.data.content.salePlanDetailVos.length; i++) {
              res.data.data.content.salePlanDetailVos[i].planTarget = String(res.data.data.content.salePlanDetailVos[i].planTarget)
            }
            this.list2 = res.data.data.content.salePlanDetailVos
          })
        } else {
          console.log('区域列表出错')
        }
      })
    }
  },
  created() {
    this.getTypes()
    this.getTreeId()
    this.getCategory()
    // this.getregionlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 插入数据
    insertEvent(index) {
      console.log('表格数据===============>', this.$refs.editable.getRecords(0))
      const mytable = this.$refs.editable.getRecords(0)
      this.$refs.editable.insertAt(mytable, index)
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
      console.log('执行查找区域列表')
      console.log('1111111111111111111=====>', this.personalForm.planRegionId)
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          this.personalForm.planRegionId = this.findPathByLeafId(this.personalForm.planRegionId, this.regions)
          console.log('222222222222222222222=====>', this.personalForm.planRegionId)
        } else {
          console.log('区域列表出错')
        }
      })
    },
    getCategory() {
      searchEmpCategory().then(res => {
        this.CategoryList = res.data.data.content.list
      })
    },
    // 判断是否可以修改商品类型
    isedit2(row) {
      console.log('row============>', row)
      const flag = row.planTarget
      if (flag === '1') {
        return true
      } else {
        return false
      }
    },
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
      if (val !== '7') {
        delete row.address
      } else if (val !== '1') {
        delete row.typeId
      }
    },
    repositoryname(val) {
      this.repositoryid = val.repositoryName
      this.personalForm.planRepositoryId = val.id
    },
    // 打开仓库
    handlechooseRep() {
      this.repositorycontrol = true
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

      const children = parent.data.salePlanDetailVos || parent.data

      const index = children.findIndex(d => d.id === data.id)

      children.splice(index, 1)
    },
    // checkGroupNode: function(a, b) {
    //   if (b.checkedKeys.length > 0) {
    //     this.$refs.DeviceGroupTree.setCheckedKeys([a.id])
    //   }
    // },
    handleCheckChange(data, checked) {
      // console.log(data)
      // console.log(checked)
      if (checked === true) {
        this.child = true
        this.childData = data
        this.childData2 = data
        this.editCheckId = data.id
      } else if (checked === false) {
        this.child = false
        this.childData = ''
      }
    },
    // 清理明细数据
    cleardata() {
      this.addCategoryForm = { label: '', id: 1, parentId: 0, level: 1, salePlanDetailVos: [] }
    },
    // 保存明细
    handlesave2() {
      if (this.child === false) {
        const treeData = { label: '', id: 1, parentId: 0, level: 1, salePlanDetailVos: [] }
        treeData.label = this.addCategoryForm.repositoryName + ':  最低目标额(元):  ' + this.addCategoryForm.lowerMoney + '     ' + '目标额（元): ' + this.addCategoryForm.targetMoney
        treeData.id = this.treeIds++
        treeData.repositoryid = this.addCategoryForm.repositoryid
        treeData.targetMoney = this.addCategoryForm.targetMoney
        treeData.lowerMoney = this.addCategoryForm.lowerMoney
        this.data2.push(treeData)
        this.categoryVisible = false
        this.cleardata()
        this.addCategoryForm.id++
      } else if (this.child === true) {
        // console.log(this.childData)
        const treeData = { label: '', id: 1, parentId: 0, level: 1, salePlanDetailVos: [] }
        treeData.label = this.addCategoryForm.repositoryName + ':  最低目标额(元):  ' + this.addCategoryForm.lowerMoney + '     ' + '目标额（元): ' + this.addCategoryForm.targetMoney
        treeData.parentId = this.childData.id
        treeData.repositoryid = this.addCategoryForm.repositoryid
        treeData.repositoryid = this.addCategoryForm.repositoryid
        treeData.targetMoney = this.addCategoryForm.targetMoney
        treeData.lowerMoney = this.addCategoryForm.lowerMoney
        treeData.id = this.treeIds++
        treeData.level = this.childData.level + 1
        this.childData.salePlanDetailVos.push(treeData)
        this.categoryVisible = false
        this.cleardata()
        this.addCategoryForm.id++
      }
    },
    changeValue(value) {
      // console.log(value)
      // console.log(this.repositories)
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
        // console.log(res)
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
      // console.log(val)
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
          // console.log(vm.provinceList)
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
          // console.log(vm.provinceList)
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
          // console.log(vm.provinceList)
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
          // console.log(vm.provinceList)
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
        // console.log(res)
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
    // 通过折扣额计算折扣
    getdiscountMoney(row) {
      row.discount = ((1 - row.discountMoney / row.salePrice / row.quantity) * 100).toFixed(2)
    },
    // 通过折扣计算折扣额
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
        if (first.salePlanDetailVos) {
          queen = queen.concat(first.salePlanDetailVos)
          delete first['salePlanDetailVos']
        }
        out.push(first)
      }
      return out
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.list2 // 输出转换后数组
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '计划明细不能为空',
          offset: 100
        })
        return false
      }
      for (let i = 0; i < EnterDetail.length; i++) {
        if (EnterDetail[i].address === '' && EnterDetail[i].planTarget === '7') {
          this.$notify.error({
            title: 'wrong',
            message: '地点信息未填完整',
            offset: 100
          })
          return false
        }
      }
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (let i = 0; i < EnterDetail.length; i++) {
        for (const key in EnterDetail[i]) {
          console.log('key===============>', EnterDetail[i][key])
          if (EnterDetail[i][key] === '' || EnterDetail[i][key] === undefined || EnterDetail[i][key] === null) {
            console.log('执行')
            delete EnterDetail[i][key]
          }
        }
      }
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          if (Data.planCategory === '2') {
            delete Data.planRepositoryId
            const regionId_length = Data.planRegionId.length
            if (regionId_length === 0) {
              Data.planRegionId = ''
            } else {
              Data.planRegionId = Data.planRegionId[regionId_length - 1]
            }
          } else if (Data.planCategory === '1') {
            delete Data.planRegionId
          }
          if (Data.planType) {
            Data.planType = Number(Data.planType)
          }
          if (Data.planCategory) {
            Data.planCategory = Number(Data.planCategory)
          }
          updatesaleplan(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: this.$t('prompt.czcg'),
                message: this.$t('prompt.czcg'),
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$emit('rest', true)
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
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
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
