<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="-30px" title="修改其他出库单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.title')" prop="title" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入出库单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 150px" clearable >
                  <el-option value="1" label="无来源"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.sendAddress')" prop="sendAddress" style="width: 100%;">
                <el-input v-model="personalForm.sendAddress" placeholder="请输入发货地址" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.receiverAddress')" style="width: 100%;">
                <el-input v-model="personalForm.receiverAddress" placeholder="请输入收货地址" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.outDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.outDeptId" placeholder="请选择出库部门" style="margin-left: 18px;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.outPersonId')" prop="outPersonId" style="width: 100%;">
                <el-input v-model="outPersonId" placeholder="请选择出库人" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.outReasonId')" style="width: 100%;">
                <el-select v-model="personalForm.outReasonId" placeholder="请选择出库原因" style="margin-left: 18px;width: 150px" clearable >
                  <el-option value="1" label="原因1"/>
                  <el-option value="2" label="原因2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.outRepositoryId')" prop="outRepositoryId" style="width: 100%;">
                <el-input v-model="outRepositoryId" placeholder="请选择出库仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.time')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.outDate"
                  placeholder="出库时间"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.summary')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--出库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">出库单明细</h2>
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
          <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
            <template slot-scope="scope">
              <p>{{ getLocationData(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
              <span v-else>{{ scope.row.batch }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 2}, type: 'visible'}" prop="outQuantity" align="center" label="出库数量" min-width="150">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                :controls="true"
                :min="1.00"
                v-model="scope.row.outQuantity"
                @change="queryStock(scope.row)"
              />
            </template>
          </el-editable-column>          <el-editable-column :label="$t('Hmodule.dj')" prop="outPrice" align="center" width="150px"/>
          <el-editable-column prop="totalMoney" align="center" label="出库金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.outQuantity, scope.row.outPrice) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput' ,type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!-- 合计信息 -->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">合计信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.heji')" style="width: 100%;">
                <el-input v-model="heji1" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('StockOut.heji2')" style="width: 100%;">
                <el-input v-model="heji2" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllBatch } from '@/api/public'
import { locationlist } from '@/api/WarehouseAdjust'
import { updateotherout } from '@/api/StockOut'
import { getdeptlist } from '@/api/BasicSettings'
import { batchlist, getlocation, countlist } from '@/api/public'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail },
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
      heji1: 0,
      heji2: 0,
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 部门数据
      depts: [],
      // 出库仓库回显
      outRepositoryId: '',
      // 出库人回显
      outPersonId: '',
      // 出库人控制框
      accetpcontrol: false,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 出库单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, message: '请输入源单编号', trigger: 'blur' }
        ],
        sendAddress: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ],
        outPersonId: [
          { required: true, message: '请选择出库人', trigger: 'focus' }
        ],
        outRepositoryId: [
          { required: true, message: '请选择出库仓库', trigger: 'focus' }
        ]
      },
      // 出库单明细数据
      list2: [],
      // 出库明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 出库明细中货位数据
      locationlist: [],
      // 出库单明细列表规则
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
      this.outPersonId = this.personalForm.outPersonName
      this.outRepositoryId = this.personalForm.outRepositoryName
      this.list2 = this.personalForm.otherOutDetails
      this.heji1 = this.personalForm.outQuantity
      for (const i in this.list2) {
        this.list2[i].location = this.list2[i].locationName
        if (this.list2[i].taxRate < 1) {
          this.list2[i].taxRate = (this.list2[i].taxRate) * 100
        }
      }
      this.getlocation()
    },
    list2: {
      handler() {
        let num = 0
        let num1 = 0
        for (const i in this.list2) {
          console.log(this.list2[i])
          num += Number(this.list2[i].outQuantity)
          num1 += Number(this.list2[i].outQuantity * this.list2[i].outPrice)
        }
        this.heji1 = num
        this.heji2 = num1
      },
      deep: true
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.outRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    // 批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.outRepositoryId)
        if (this.personalForm.outRepositoryId === undefined || this.personalForm.outRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.outRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '该仓库没有该商品',
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 出库人列表返回数据
    acceptName(val) {
      this.outPersonId = val.personName
      this.personalForm.outPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.outQuantity = 1
      })
      console.log(val)
      this.outRepositoryId = val.repositoryName
      this.personalForm.outRepositoryId = val.id
    },
    queryStock(row) {
      if (row.location === null || row.location === '' || row.location === undefined) {
        this.$notify.error({
          title: '错误',
          message: '仓库不存在此商品!',
          offset: 100
        })
        row.outQuantity = 1
        return false
      }
      // 1.批次只有一个 不能超过总库存
      // 2.批次有多个 不能超过单个批次数量
      let i = 0
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === row.productCode) {
          i++
        }
      })
      if (i === 1) {
        // 1.批次只有一个 不能超过总库存
        countlist(this.personalForm.outRepositoryId, 0, row.productCode).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content.list.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '仓库内无该物品',
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
            if (row.outQuantity > res.data.data.content.list[0].ableStock) {
              this.$notify.error({
                title: '错误',
                message: '出库数量超出了当前仓库可用存量，请输入正确出库数量!',
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        // 2.批次有多个 不能超过单个批次数量
        const param = {}
        param.productCode = row.productCode
        param.batch = row.batch
        param.repositoryId = row.repositoryId
        getAllBatch(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (row.outQuantity > res.data.data.content[0].outQuantity) {
              this.$notify.error({
                title: '错误',
                message: '出库数量超出了当前批次可用存量，请输入正确出库数量!',
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }

      if (row.discountRate === 0) {
        row.discountMoney = row.taxprice * row.outQuantity
      } else {
        row.discountMoney = (row.taxprice * row.outQuantity * (1 - row.discountRate / 100)).toFixed(2)
      }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.outRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationId', row.locationId)
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      if (this.outRepositoryId === null || this.outRepositoryId === '' || this.outRepositoryId === undefined) {
        this.$notify.error({
          title: '错误',
          message: '请先选择出库仓库',
          offset: 100
        })
        return false
      }
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
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 修改和取消按钮
    // 修改按钮
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    handleEditok() {
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      // 保存时同样商品不能有同一个批次
      let i = 0
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        EnterDetail.map(function(elem2) {
          return elem2
        }).forEach(function(elem2) {
          if (elem2.productCode === elem.productCode && elem2.batch === elem.batch) {
            i++
          }
        })
      })
      console.log(i)
      if (i > EnterDetail.length) {
        this.$notify.error({
          title: '错误',
          message: '同样商品不能有同一个批次',
          offset: 100
        })
        return false
      }
      // 批次货位不能为空
      let j = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
          j = 2
        }
      })
      console.log(j)
      if (j === 2) {
        this.$notify.error({
          title: '错误',
          message: '批次货位不能为空',
          offset: 100
        })
        return false
      }
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
        if (elem.outQuantity === null || elem.outQuantity === '' || elem.outQuantity === undefined) {
          delete elem.outQuantity
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.outPrice === null || elem.outPrice === '' || elem.outPrice === undefined) {
          delete elem.outPrice
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const parms2 = JSON.stringify(rest)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updateotherout(parms, parms2).then(res => {
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
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
