<template>
  <el-dialog :visible.sync="editVisible" :incontrol="incontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="10px" title="修改库存盘点单" @close="$emit('update:incontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
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
            <el-select v-model="personalForm.countDeptId" :placeholder="$t('update4.qszpdbm')" clearable style="width: 100%;">
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
            <el-input v-model="personalForm.summary" :placeholder="$t('update4.qsrzy')" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.pddmx') }}</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="success" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="handleDelete">{{ $t('Hmodule.delete') }}</el-button>
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
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column type="index" width="55" align="center"/>
          <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" >
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ getBatch(scope.row) }}</span>
            </template>
          </el-editable-column>
          <!-- <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationCode" align="center" width="200px">
            <template slot-scope="scope">
              <p>{{ getLocationData(scope.row) }}</p>
            </template>
          </el-editable-column> -->
          <!--<el-editable-column :edit-render="{name: 'ElSelect', options: batchlist, type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" width="150px"/>-->
          <!--<el-editable-column :edit-render="{name: 'ElSelect', options: batchlist, type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" width="150px"/>-->
          <!--          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in batchlist"-->
          <!--                  :key="index"-->
          <!--                  :value="item"-->
          <!--                  :label="item"/>-->
          <!--              </el-select>-->
          <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" /> -->
          <!-- <template slot="edit" slot-scope="scope">
              <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
              <span v-else>{{ scope.row.batch }}</span>
            </template>
          </el-editable-column> -->
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeId" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('update4.jg')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.kcsl')" prop="inventoryQuantity" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getquantity(scope.row) }}</p>
            </template>
          </el-editable-column>

          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('updates.spsl')" prop="actualQuantity" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.cysl')" prop="diffQuantity" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getDiff(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.yklx')" prop="diffType" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getdiffType(scope.row.inventoryQuantity, scope.row.actualQuantity, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.pdr')" prop="countPersonName" align="center" />
          <el-editable-column :label="$t('updates.pdrq')" prop="countDate" align="center" width="200px"/>
          <el-editable-column v-if="false" prop="totalMoney" align="center" label="总金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualQuantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>

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
    <!--操作-->
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { locationlist } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { updatecount, deletecountdetail } from '@/api/InventoryCount'
import { batchlist, getQuantity, getlocation, countlist, locationlist } from '@/api/public'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
var _that
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
    const validatePass = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.countRepositoryId === undefined || this.countRepositoryId === null || this.countRepositoryId === '') {
        callback(new Error('请选择盘点仓库'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.Time)
      if (this.Time === undefined || this.Time === null || this.Time === '') {
        callback(new Error('请选择盘点时间'))
      } else {
        callback()
      }
    }
    const validatePass9 = (rule, value, callback) => {
      console.log(value)
      if (value === undefined || value === null || value === '' || value < 0) {
        callback(new Error('请填写实盘数量'))
      } else {
        callback()
      }
    }
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
        locationId: [
          { required: true, message: '请选择货位', trigger: 'change' }
        ],
        actualQuantity: [
          // { required: true, message: '请填写实盘数量', trigger: 'change' }
          { required: true, validator: validatePass9, trigger: 'change' }
        ]
      },
      // 库存盘点日期
      Time: [],
      // 库存盘点单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        countRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        Time: [
          { required: true, validator: validatePass3, trigger: 'change' }
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
  beforeCreate() {
    _that = this
  },
  methods: {
    getBatch(row) {
      if (!row.flag) {
        row.flag = true
      } else {
        return row.batch
      }
      if (row.flag) {
        const parms3 = row.productCode
        // batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
        //   if (res.data.data.content.length !== 0) {
        //     row.batch = res.data.data.content[0]
        //   }
        // })
        getlocation(this.personalForm.countRepositoryId, row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              if (res.data.data.content.length === 1) {
                row.locationId = res.data.data.content[0].id
              }
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.countRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
        return row.batch
      }
      row.flag = true
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.countRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.locationCode = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationCode', row.locationCode)
          } else {
            row.locationCode = null
            row.locationId = null
          }
        }
      })
      return row.locationCode
    },
    handleSelectionChange(val) {
      console.log(val)
      this.moreaction = val
    },
    // 删除明细
    handleDelete() {
      this.$refs.editable.removeSelecteds()
      // const ids = this.moreaction.map(item => item.id).join()
      // console.log('ids', ids)
      // console.log(ids)
      // deletecountdetail(ids).then(res => {
      //   console.log(res)
      //   if (res.data.ret === 200) {
      //     this.$emit('rest', true)
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: '删除失败',
      //       offset: 100
      //     })
      //   }
      // })
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
    // 获取数量
    changequantity(sco) {
      if (sco.flag2 === undefined) {
        sco.flag2 = true
      }
      console.log(sco.flag2)
      if (sco.flag2) {
        const parms2 = sco.locationId
        const parms3 = sco.productCode
        const parms4 = sco.batch
        if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
          getQuantity(this.personalForm.countRepositoryId, parms2, parms3, parms4).then(res => {
            this.out = res.data.data.content
            sco.inventoryQuantity = res.data.data.content
          })
          return sco.inventoryQuantity
        } else {
          sco.inventoryQuantity = 0
          return sco.inventoryQuantity
        }
      }
      sco.flag2 = false
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
        console.log('this.list2[i].diffQuantity', this.list2[i].diffQuantity)
      }
      this.heji1 = num1
      this.heji2 = num2
      this.heji3 = num3
      this.heji4 = num4
      this.heji5 = num5
      this.heji6 = num6
      return Math.abs(par2 - par1)
    },
    // 总金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    getquantity(sco) {
      if (!sco.flag2) {
        sco.flag2 = true
      }
      console.log(sco.flag2)
      if (sco.flag2) {
        const parms2 = sco.locationId
        const parms3 = sco.productCode
        const parms4 = sco.batch
        if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
          getQuantity(this.personalForm.countRepositoryId, parms2, parms3, parms4).then(res => {
            this.out = res.data.data.content
            sco.inventoryQuantity = res.data.data.content
          })
          return sco.inventoryQuantity
        } else {
          sco.inventoryQuantity = 0
          return sco.inventoryQuantity
        }
      }
      sco.flag2 = true
    },
    // updatebatch(event, scope) {
    //   if (event === true) {
    //     console.log(this.personalForm.countRepositoryId)
    //     if (this.personalForm.countRepositoryId === undefined || this.personalForm.countRepositoryId === '') {
    //       this.$notify.error({
    //         title: 'wrong',
    //         message: this.$t('prompt.sqslcg'),
    //         offset: 100
    //       })
    //       return false
    //     }
    //     getlocation(this.personalForm.countRepositoryId, scope.row).then(res => {
    //       if (res.data.ret === 200) {
    //         if (res.data.data.content.length !== 0) {
    //           this.locationlist = res.data.data.content
    //           this.updatebatch3(scope)
    //         } else if (res.data.data.content.length === 0) {
    //           this.$notify.error({
    //             title: 'wrong',
    //             message: this.$t('prompt.gckmygsp'),
    //             offset: 100
    //           })
    //           this.locationlist = []
    //           return false
    //         }
    //       }
    //     })
    //   }
    // },
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
      this.$refs.editable.clear()
      // locationlist(this.locationlistparms).then(res => {
      //   if (res.data.ret === 200) {
      //     this.locationlist = res.data.data.content.list.map(function(item) {
      //       return {
      //         'value': item.id,
      //         'label': item.locationName
      //       }
      //     })
      //   }
      // })
    },
    // 盘点单事件
    // 新增盘点单明细
    handleAddproduct() {
      this.control = true
    },
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    async productdetail(val) {
      const nowlistdata = this.$refs.editable.getRecords()
      this.$refs.editable.clear()
      console.log('val============', val)
      const alldata = [...nowlistdata, ...val]
      const filterdata = this.uniqueArray(alldata, 'productCode')
      console.log('filterdata=====', filterdata)

      const batcharr = await Promise.all(filterdata.map(item => {
        return batchlist(this.personalForm.countRepositoryId, item.productCode)
      }))
      console.log('batcharr', batcharr)
      const nonebatch = []
      for (const i in batcharr) {
        for (const j in filterdata) {
          if (batcharr[i].data.data.content.length === 0) {
            if (batcharr[i].data.data.pCode === filterdata[j].productCode) {
              nonebatch.push(filterdata[j])
            }
          }
        }
      }
      console.log('nonebatch', nonebatch)
      const newbatch = batcharr.map(item => {
        return {
          pcode: item.data.data.pCode,
          batchs: item.data.data.content
        }
      })
      console.log('newbatch---======', newbatch)

      const needarr = newbatch.map(item => {
        const arrned = item.batchs.map(zitem => {
          return {
            productCode: item.pcode,
            batch: zitem
          }
        })
        return arrned
      })
      console.log('needarr', needarr)
      const onearr = [].concat.apply([], needarr)
      for (const i in filterdata) {
        for (const j in onearr) {
          if (filterdata[i].productCode === onearr[j].productCode) {
            onearr[j].productName = filterdata[i].productName
            onearr[j].color = filterdata[i].color
            onearr[j].locationId = filterdata[i].locationId
            onearr[j].typeId = filterdata[i].typeId
            onearr[j].inventoryQuantity = filterdata[i].inventoryQuantity
            onearr[j].actualQuantity = filterdata[i].actualQuantity
            onearr[j].enterQuantity = filterdata[i].enterQuantity
            onearr[j].taxRate = filterdata[i].taxRate
            onearr[j].unit = filterdata[i].unit
            onearr[j].totalMoney = filterdata[i].totalMoney
            onearr[j].actualEnterQuantity = filterdata[i].actualEnterQuantity
            onearr[j].basicQuantity = filterdata[i].basicQuantity
            onearr[j].price = filterdata[i].price
            onearr[j].productType = filterdata[i].productType
            onearr[j].countPerson = filterdata[i].countPerson
            onearr[j].countPersonId = filterdata[i].countPersonId
            onearr[j].countDate = filterdata[i].countDate
          }
        }
      }
      console.log('needarr---======', onearr)
      const finallyarr = [...nonebatch, ...onearr]
      this.list2 = finallyarr

      // this.list2 = filterdata
      // for (let i = 0; i < filterdata.length; i++) {
      //   // val[i].quantity = 1
      //   this.$refs.editable.insert(filterdata[i])
      // }
    },
    // async productdetail(val) {
    //   const nowlistdata = this.$refs.editable.getRecords()
    //   if (nowlistdata.length === 0) {
    //     const batcharr = await Promise.all(val.map(item => {
    //       return batchlist(this.personalForm.countRepositoryId, item.productCode)
    //     }))
    //     const newbatch = batcharr.map(item => {
    //       return {
    //         pcode: item.data.data.pCode,
    //         batchs: item.data.data.content
    //       }
    //     })
    //     console.log('newbatch---======', newbatch)

    //     const needarr = newbatch.map(item => {
    //       const arrned = item.batchs.map(zitem => {
    //         return {
    //           productCode: item.pcode,
    //           batch: zitem
    //         }
    //       })
    //       return arrned
    //     })
    //     const onearr = [].concat.apply([], needarr)
    //     for (const i in val) {
    //       for (const j in onearr) {
    //         if (val[i].productCode === onearr[j].productCode) {
    //           onearr[j].productName = val[i].productName
    //           onearr[j].color = val[i].color
    //           onearr[j].locationId = val[i].locationId
    //           onearr[j].typeId = val[i].typeId
    //           onearr[j].inventoryQuantity = val[i].inventoryQuantity
    //           onearr[j].actualQuantity = val[i].actualQuantity
    //           onearr[j].enterQuantity = val[i].enterQuantity
    //           onearr[j].taxRate = val[i].taxRate
    //           onearr[j].unit = val[i].unit
    //           onearr[j].totalMoney = val[i].totalMoney
    //           onearr[j].actualEnterQuantity = val[i].actualEnterQuantity
    //           onearr[j].basicQuantity = val[i].basicQuantity
    //           onearr[j].price = val[i].price
    //           onearr[j].productType = val[i].productType
    //           onearr[j].countPerson = val[i].countPerson
    //           onearr[j].countPersonId = val[i].countPersonId
    //           onearr[j].countDate = val[i].countDate
    //         }
    //       }
    //     }
    //     console.log('needarr---======', onearr)
    //     this.list2 = onearr
    //   } else {
    //     const batcharr = await Promise.all(val.map(item => {
    //       return batchlist(this.personalForm.countRepositoryId, item.productCode)
    //     }))
    //     const newbatch = batcharr.map(item => {
    //       return {
    //         pcode: item.data.data.pCode,
    //         batchs: item.data.data.content
    //       }
    //     })
    //     console.log('newbatch---======', newbatch)

    //     const needarr = newbatch.map(item => {
    //       const arrned = item.batchs.map(zitem => {
    //         return {
    //           productCode: item.pcode,
    //           batch: zitem
    //         }
    //       })
    //       return arrned
    //     })
    //     const onearr = [].concat.apply([], needarr)
    //     for (const i in val) {
    //       for (const j in onearr) {
    //         if (val[i].productCode === onearr[j].productCode) {
    //           onearr[j].productName = val[i].productName
    //           onearr[j].color = val[i].color
    //           onearr[j].locationId = val[i].locationId
    //           onearr[j].typeId = val[i].typeId
    //           onearr[j].inventoryQuantity = val[i].inventoryQuantity
    //           onearr[j].actualQuantity = val[i].actualQuantity
    //           onearr[j].enterQuantity = val[i].enterQuantity
    //           onearr[j].taxRate = val[i].taxRate
    //           onearr[j].unit = val[i].unit
    //           onearr[j].totalMoney = val[i].totalMoney
    //           onearr[j].actualEnterQuantity = val[i].actualEnterQuantity
    //           onearr[j].basicQuantity = val[i].basicQuantity
    //           onearr[j].price = val[i].price
    //           onearr[j].productType = val[i].productType
    //           onearr[j].countPerson = val[i].countPerson
    //           onearr[j].countPersonId = val[i].countPersonId
    //           onearr[j].countDate = val[i].countDate
    //         }
    //       }
    //     }
    //     console.log('needarr---======', onearr)
    //     const newarr = Object.assign([], onearr, nowlistdata)
    //     this.list2 = newarr
    //   }
    // },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.approvalUseVos
      delete this.personalForm.inventoryCountDetailVos
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      let judgestat = 1
      for (const i in rest) {
        if (!rest[i].locationId) {
          judgestat = 2
        }
      }
      if (judgestat === 2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.pchwbnwk'),
          offset: 100
        })
        this.saveloading = false
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
      let parms2 = ''
      if (rest.length !== 0) {
        parms2 = JSON.stringify(rest)
      }
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              updatecount(parms1, parms2).then(res => {
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
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'Information is incomplete',
                offset: 100
              })
              return false
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
