<template>
  <el-dialog :visible.sync="editVisible" :incontrol="incontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="10px" title="修改库存盘点单" @close="$emit('update:incontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('InventoryCount.title')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入入盘点单主题" clearable/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.handlePersonId')" prop="handlePersonId" style="width: 40%;margin-top:1%">
            <el-input v-model="handlePersonId" :autosize="{ minRows: 1}" type="textarea" resize="none" placeholder="请选择经办人" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          <el-form-item :label="$t('InventoryCount.countDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countDeptId" placeholder="请选择盘点部门" clearable style="width: 100%;">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.countRepositoryId')" prop="countRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="countRepositoryId" placeholder="请选择盘点仓库" clearable @focus="handlechooseRep"/>
          </el-form-item>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          <el-form-item :label="$t('InventoryCount.countType')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countType" placeholder="请选择盘点类型" clearable style="width: 100%;">
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
              style="width: 350px"/>
          </el-form-item>
          <el-form-item :label="$t('Inventorydetaillist.endTime')" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.endTime"
              type="date"
              placeholder="盘点结束日期"
              value-format="yyyy-MM-dd"
              style="width: 350px"/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.summary')" prop="summary" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.summary" placeholder="请输入摘要" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="fuzhu" class="form-name">盘点单明细</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="success" @click="handleAddproduct">添加商品</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </div>
      <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: false, showStatus: true,trigger: 'click', mode: 'cell'}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column type="index" width="55" align="center"/>
          <el-editable-column :edit-render="{type: 'default'}" prop="locationId" align="center" label="货位" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <!--<el-editable-column :edit-render="{name: 'ElSelect', options: batchlist, type: 'visible'}" prop="batch" align="center" label="批次" width="150px"/>-->
          <el-editable-column :edit-render="{type: 'default'}" prop="batch" align="center" label="批次" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" placeholder="请选择批次" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="typeId" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="price" align="center" label="价格" width="150px"/>
          <el-editable-column prop="inventoryQuantity" align="center" label="库存数量" width="150px">
            <template slot-scope="scope">
              <p>{{ getquantity(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="actualQuantity" align="center" label="实盘数量" width="150px"/>
          <el-editable-column prop="diffQuantity" align="center" label="差异数量" width="150px">
            <template slot-scope="scope">
              <p>{{ getDiff(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="diffType" align="center" label="盈亏类型" width="150px">
            <template slot-scope="scope">
              <p>{{ getdiffType(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="countPersonName" align="center" label="盘点人" />
          <el-editable-column prop="countDate" align="center" label="盘点日期" width="200px"/>
          <el-editable-column v-if="false" prop="totalMoney" align="center" label="总金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualQuantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
    </el-card>

    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">合计信息</h2>
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
    <!--操作-->
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { updatecount, deletecountdetail } from '@/api/InventoryCount'
import { batchlist, getQuantity, getlocation } from '@/api/public'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
export default {
  components: { MyCreate, MyRepository, MyDetail },
  props: {
    incontrol: {
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
      // 合计信息
      heji1: 0,
      heji2: 0,
      heji3: 0,
      heji4: 0,
      heji5: 0,
      heji6: 0,
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.incontrol,
      // 物流车辆信息数据
      personalForm: this.editdata,
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
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        countRepositoryId: [
          { required: true, message: '请选择盘点仓库', trigger: 'blue' }
        ]
      },
      // 多选操作
      moreaction: []
    }
  },
  watch: {
    incontrol() {
      this.editVisible = this.incontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.countRepositoryId = this.personalForm.countRepositoryName
      this.list2 = this.personalForm.inventoryCountDetailVos
      this.getlocation()
    },
    list2: {
      handler() {
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
      },
      deep: true
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    // 删除明细
    handleDelete() {
      this.$refs.editable.removeSelecteds()
      const ids = this.moreaction.map(item => item.id).join()
      console.log('ids', ids)
      console.log(ids)
      deletecountdetail(ids).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$emit('rest', true)
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除失败',
            offset: 100
          })
        }
      })
    },
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
          this.locationlist = res.data.data.content.list
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
    async getquantity(sco) {
      const parms2 = sco.locationId
      const parms3 = sco.productCode
      const parms4 = sco.batch
      if (parms4 !== '' && parms4 !== null && parms4 !== undefined && parms2 !== '' && parms2 !== null && parms2 !== undefined) {
        await getQuantity(this.personalForm.countRepositoryId, parms2, parms3, parms4).then(res => {
          this.out = res.data.data.content
          // sco.inventoryQuantity = res.data.data.content
        })
        console.log('111112222222222', this.out)
        return 'aaaaaaaa'
      } else {
        this.out = 0
        return this.out
      }
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.countRepositoryId)
        if (this.personalForm.countRepositoryId === undefined || this.personalForm.countRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.countRepositoryId, scope.row).then(res => {
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
      batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
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
      const arr = []
      const arr2 = []
      for (const i in val) {
        arr.push(val[i].personName)
        arr2.push(val[i].id)
      }
      console.log(arr, arr2)
      this.handlePersonId = arr.join(',').replace(/\s*/g, '')
      this.personalForm.handlePersonId = arr2.join(',')
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
      // const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        // for (let j = 0; j < nowlistdata.length; j++) {
        //   if (val[i].productCode === nowlistdata[j].productCode) {
        //     this.$notify.error({
        //       title: '错误',
        //       message: '物品已添加',
        //       offset: 100
        //     })
        //     return false
        //   }
        // }
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
    padding-top: 20px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
