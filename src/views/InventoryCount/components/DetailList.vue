<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="$t('updates.kcpdd')" class="edit" append-to-body width="1010px" top="20px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
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
              <el-input v-model="handlePersonId" :autosize="{ minRows: 1}" type="textarea" resize="none" placeholder="请选择经办人" disabled @focus="handlechoose"/>
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
                style="width: 100%"/>
            </el-form-item>
            <el-form-item :label="$t('Inventorydetaillist.endTime')" style="width: 40%;margin-top:1%">
              <el-date-picker
                v-model="personalForm.endTime"
                type="date"
                placeholder="盘点结束日期"
                value-format="yyyy-MM-dd"
                disabled
                style="width: 100%"/>
            </el-form-item>
            <el-form-item :label="$t('InventoryCount.summary')" prop="summary" style="width: 80%;margin-top:1%">
              <el-input v-model="personalForm.summary" placeholder="请输入摘要" type="textarea" disabled/>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.pddmx') }}</h2>
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
            <el-editable-column type="index" fixed="left" width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationCode" align="center" />
            <!--<el-editable-column :edit-render="{name: 'ElSelect', options: batchlist, type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" />-->
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column prop="price" align="center" label="价格" />
            <el-editable-column :label="$t('updates.kcsl')" prop="inventoryQuantity" align="center" >
              <template slot-scope="scope">
                <p>{{ scope.row.inventoryQuantity }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.spsl')" prop="actualQuantity" align="center" />
            <el-editable-column :label="$t('updates.cysl')" prop="diffQuantity" align="center" >
              <template slot-scope="scope">
                <p>{{ getDiff(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.yklx')" prop="diffType" align="center" >
              <template slot-scope="scope">
                <p>{{ getdiffType(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.pdr')" prop="countPersonName" align="center" />
            <el-editable-column :label="$t('updates.pdrq')" prop="countDate" align="center" width="200px"/>
            <el-editable-column v-if="false" prop="totalMoney" align="center" label="总金额" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.actualQuantity, scope.row.price) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.bz')" prop="remarks" align="center" />
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.spjl') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.dqbz')"
              prop="step"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.dqspr')"
              prop="stepHandlerName"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spsj')"
              prop="handleTime"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spyj')"
              prop="stat"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <!-- 合计信息 -->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji1')" style="width: 100%;">
                  <el-input v-model="heji1" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji2')" style="width: 100%;">
                  <el-input v-model="heji2" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji3')" style="width: 100%;">
                  <el-input v-model="heji3" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji4')" style="width: 100%;">
                  <el-input v-model="heji4" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji5')" style="width: 100%;">
                  <el-input v-model="heji5" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InventoryCount.heji6')" style="width: 100%;">
                  <el-input v-model="heji6" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 备注信息 -->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.bzxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('public.createPersonName2')" prop="stockType" style="width: 100%;">
                  {{ personalForm.createPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.createDate2')" style="width: 100%;">
                  {{ personalForm.createDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyDate }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
  </div></el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { updatecount } from '@/api/InventoryCount'
import { batchlist } from '@/api/public'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
var _that
export default {
  components: { MyCreate, MyRepository, MyDetail },
  filters: {
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
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
      // 合计信息
      heji1: 0,
      heji2: 0,
      heji3: 0,
      heji4: 0,
      heji5: 0,
      heji6: 0,
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
      let num1 = 0
      let num2 = 0
      let num3 = 0
      let num4 = 0
      let num5 = 0
      let num6 = 0
      for (const i in this.list2) {
        num1 += this.list2[i].inventoryQuantity
        num2 += this.list2[i].actualQuantity
        num3 += this.list2[i].diffQuantity
        num4 += this.list2[i].price * this.list2[i].inventoryQuantity
        num5 += this.list2[i].price * this.list2[i].actualQuantity
        num6 += this.list2[i].price * this.list2[i].diffQuantity
        this.list2[i].countDate = this.personalForm.createDate
      }
      this.heji1 = num1
      this.heji2 = num2
      this.heji3 = num3
      this.heji4 = num4
      this.heji5 = num5
      this.heji6 = num6
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.getlocation()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
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
      console.log(sco)
      // if (sco.inventoryQuantity) {
      // }
      // const parms2 = sco.locationId
      // const parms3 = sco.productCode
      // const parms4 = sco.batch
      // if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
      //   getQuantity(this.personalForm.countRepositoryId, parms2, parms3, parms4).then(res => {
      //     this.out = res.data.data.content
      //     sco.inventoryQuantity = res.data.data.content
      //   })
      // }
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
.edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
