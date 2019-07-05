<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body top="10px" title="修改物流车辆" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-col :span="12">
            <el-form-item class="print2" label="盘点单编号" style="width: 100%;display: none">
              {{ personalForm.countNumber }}
            </el-form-item>
          </el-col>
          <el-form-item :label="$t('InventoryCount.title')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入入盘点单主题" disabled/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.handlePersonId')" prop="handlePersonId" style="width: 40%;margin-top:1%">
            <el-input v-model="handlePersonId" placeholder="请选择经办人" disabled @focus="handlechoose"/>
          </el-form-item>
          <el-form-item label="国家" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.countryName" disabled/>
          </el-form-item>
          <el-form-item label="制单人" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.createPersonName" disabled/>
          </el-form-item>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          <el-form-item :label="$t('InventoryCount.countDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countDeptId" placeholder="请选择盘点部门" disabled style="width: 100%;">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.countRepositoryId')" prop="countRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="countRepositoryId" placeholder="请选择盘点仓库" disabled @focus="handlechooseRep"/>
          </el-form-item>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          <el-form-item :label="$t('InventoryCount.countType')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countType" placeholder="请选择盘点类型" disabled style="width: 100%;">
              <el-option value="1" label="zzz"/>
              <el-option value="2" label="xxx"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Inventorydetaillist.beginTime')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.beginTime"
              type="date"
              placeholder="盘点开始日期"
              value-format="yyyy-MM-dd"
              disabled
              style="width: 350px"/>
          </el-form-item>
          <el-form-item :label="$t('Inventorydetaillist.endTime')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.endTime"
              type="date"
              placeholder="盘点结束日期"
              value-format="yyyy-MM-dd"
              disabled
              style="width: 350px"/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.summary')" prop="summary" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.summary" placeholder="请输入摘要" type="textarea" disabled/>
          </el-form-item>
        </el-form>
      </div>
      <h2 ref="fuzhu" class="form-name">盘点单明细</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: false, showStatus: true,trigger: 'click', mode: 'cell'}"
          :edit-rules="validRules"
          class="click-table1"
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column type="index" width="55" align="center"/>
          <el-editable-column prop="locationCode" align="center" label="货位" />
          <!--<el-editable-column :edit-render="{name: 'ElSelect', options: batchlist, type: 'visible'}" prop="batch" align="center" label="批次" />-->
          <el-editable-column prop="batch" align="center" label="批次" />
          <el-editable-column prop="productCode" align="center" label="物品编号" />
          <el-editable-column prop="productName" align="center" label="物品名称" />
          <el-editable-column prop="color" align="center" label="颜色" />
          <el-editable-column prop="typeId" align="center" label="规格" />
          <el-editable-column prop="unit" align="center" label="单位" />
          <el-editable-column prop="price" align="center" label="价格" />
          <el-editable-column prop="inventoryQuantity" align="center" label="库存数量" >
            <template slot-scope="scope">
              <p>{{ getquantity(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="actualQuantity" align="center" label="实盘数量" />
          <el-editable-column prop="diffQuantity" align="center" label="差异数量" >
            <template slot-scope="scope">
              <p>{{ getDiff(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="diffType" align="center" label="盈亏类型" >
            <template slot-scope="scope">
              <p>{{ getdiffType(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="totalMoney" align="center" label="总金额" >
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualQuantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="remarks" align="center" label="备注" />
        </el-editable>
      </div>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              prop="step"
              align="center"
              label="当前步骤"
              min-width="150"/>
            <el-table-column
              prop="stepHandlerName"
              align="center"
              label="当前审批人"
              min-width="150"/>
            <el-table-column
              prop="handleTime"
              align="center"
              label="审批时间"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              label="审批意见"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
  </div></el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { updatecount } from '@/api/InventoryCount'
import { batchlist, getQuantity } from '@/api/public'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
export default {
  components: { MyCreate, MyRepository, MyDetail },
  filters: {
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    }
  },
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
      // 审核步骤数据
      reviewList: [],
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 物流车辆信息数据
      personalForm: this.detaildata,
      // 库存数量
      out: '',
      // 货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      loc: [],
      // 明细表控制框
      control: false,
      // 部门数据
      depts: [],
      // 仓库回显
      countRepositoryId: '',
      // 经办人回显
      handlePersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 盘点单明细数据
      list2: [],
      // 盘点单明细列表规则
      validRules: {
      },
      // 库存盘点日期
      Time: [],
      // 库存盘点单规则数据
      personalrules: {
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.handlePersonId = this.personalForm.handlePersonName
      this.countRepositoryId = this.personalForm.countRepositoryName
      this.list2 = this.personalForm.inventoryCountDetailVos
      this.reviewList = this.personalForm.approvalUseVos
      this.getlocation()
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.countRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 盈亏类型
    getdiffType(parm1, parm2, parm3) {
      const panduan = parm2 - parm1
      if (panduan < 0) {
        parm3.diffType = 2
        return '亏'
      } else if (panduan > 0) {
        parm3.diffType = 1
        return '盈'
      } else if (panduan === 0) {
        parm3.diffType = ''
        return '平'
      }
    },
    // 差异数量
    getDiff(par1, par2, par3) {
      console.log(par1)
      par3.diffQuantity = Math.abs(par2 - par1)
      return Math.abs(par2 - par1)
    },
    // 总金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    getquantity(sco) {
      const parms2 = sco.locationId
      const parms3 = sco.productCode
      const parms4 = sco.batch
      if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
        getQuantity(this.personalForm.countRepositoryId, parms2, parms3, parms4).then(res => {
          this.out = res.data.data.content
          sco.inventoryQuantity = res.data.data.content
        })
        return this.out
      }
    },
    updatebatch(event, scope) {
      if (event === true) {
        const parms2 = scope.row.locationId
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.outRepositoryId, parms2, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
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
      this.countRepositoryId = val.repositoryName
      this.personalForm.countRepositoryId = val.id
      this.locationlistparms.repositoryId = val.id
      locationlist(this.locationlistparms).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 盘点单事件
    // 新增盘点单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      // console.log(val)
      // console.log(val[0])
      console.log(this.$refs.editable.getRecords())
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
      // console.log(val)
      // const row = this.$refs.editable.insert(val)
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      if (rest.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      rest.map(function(elem) {
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
        if (elem.inventoryQuantity === null || elem.inventoryQuantity === '' || elem.inventoryQuantity === undefined) {
          delete elem.inventoryQuantity
        }
        if (elem.actualQuantity === null || elem.actualQuantity === '' || elem.actualQuantity === undefined) {
          delete elem.actualQuantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.diffQuantity === null || elem.diffQuantity === '' || elem.diffQuantity === undefined) {
          delete elem.diffQuantity
        }
        if (elem.diffType === null || elem.diffType === '' || elem.diffType === undefined) {
          delete elem.diffType
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        return elem
      })
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms1 = JSON.stringify(Data)
      const parms2 = JSON.stringify(rest)
      updatecount(parms1, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '错误',
            message: '出错了',
            offset: 100
          })
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
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
