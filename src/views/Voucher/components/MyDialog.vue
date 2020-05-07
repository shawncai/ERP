<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.voucherNo +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Voucher.rq')" style="width: 100%;">
                <el-input v-model="personalForm.receiptDate" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Voucher.zdr')" style="width: 100%;">
                <el-input v-model="personalForm.createPersonName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Voucher.hjjfje')" style="width: 100%;">
                <el-input v-model="personalForm.totalDebitMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Voucher.hjdfje')" style="width: 100%;">
                <el-input v-model="personalForm.totalCreditMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('Voucher.qy')" style="width: 100%;">
                <el-input v-model="personalForm.regionName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Voucher.md')" style="width: 100%;">
                <el-input v-model="personalForm.repositoryName" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px;margin-bottom: 40px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Voucher.pzmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="insertEvent(-1)">{{ $t('Voucher.tjpzx') }}</el-button>
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
          <el-editable-column :selectable="selectableEvent" type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.qy')" prop="setcarst" align="center" min-width="200px">
            <template slot="edit" slot-scope="scope">
              <el-cascader
                :options="regions"
                :props="props"
                v-model="scope.row.regionPath"
                :show-all-levels="false"
                :placeholder="$t('Hmodule.xzqy')"
                change-on-select
                filterable
                clearable
                style="width: 150px"
                @change="handlechange4"
              />
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.md')" prop="setcarst" align="center" min-width="200px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.repositoryId" :placeholder="$t('Hmodule.xzmd')" clearable filterable style="width: 150px">
                <el-option
                  v-for="(item, index) in repositories"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.zy')" prop="summary" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input v-model="scope.row.summary" :disabled="scope.row.isdisable && scope.row.source === 1" clearable/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.kjkm')" prop="setcarst" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-cascader
                v-model="scope.row.setcarst"
                :options="suboptions"
                :props="props2"
                :show-all-levels="false"
                :disabled="scope.row.isdisable && scope.row.source === 1"
                filterable
                @change="test(scope.row,$event)"/>
            </template>
          </el-editable-column>
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('Voucher.ybje')" prop="primevalMoney" align="center" min-width="150px"/> -->
          <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.ybje')" prop="primevalMoney" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :disabled="scope.row.isdisable && scope.row.source === 1"
                :min="0.00"
                v-model="scope.row.primevalMoney"
                @change="entermoney(scope.row)"
              />
            </template>
          </el-editable-column> -->
          <el-editable-column :label="$t('Voucher.bb')" prop="currencyname" align="center" min-width="150px"/>
          <!-- <el-editable-column :label="$t('Voucher.hl')" prop="rate" align="center" min-width="150px"/> -->
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('Voucher.jfje')" prop="debitMoney" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('Voucher.dfje')" prop="creditMoney" align="center" min-width="150px"/> -->

          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.jfje')" prop="debitMoney" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :disabled="scope.row.isdisable2"
                :min="0.00"
                v-model="scope.row.debitMoney"
              />
            </template>
          </el-editable-column>

          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.dfje')" prop="creditMoney" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :disabled="scope.row.isdisable3"
                :min="0.00"
                v-model="scope.row.creditMoney"
              />
            </template>
          </el-editable-column>
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

 // source 1 -带过来的， 2是新增的

<script>
import { subjectList } from '@/api/SubjectFinance'
import { getSubjectDetail, addvoucher, updatevoucher } from '@/api/voucher'
import { regionlist2, searchRepository2 } from '@/api/public'
var _that
export default {
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
    return {
      selectid: [],
      carstdata: '',
      treedata: [],
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      suboptions: [],
      options: [],
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
      personalrules: {},
      // 收入单明细数据
      list2: [],
      regions: [],
      repositories: {},
      // 收入单明细列表规则
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
      this.list2 = this.editdata.voucherDetails
      this.getarrs()
      this.getnationlist()
      this.handlechange5()
      this.gettree()
    },
    list2: {
      handler() {
        let num = 0
        let num1 = 0
        if (this.list2.length > 0) {
          for (const i in this.list2) {
            console.log(this.list2[i])
            num += Number(this.list2[i].debitMoney)
            num1 += Number(this.list2[i].creditMoney)
          }
        }
        this.personalForm.totalDebitMoney = num
        this.personalForm.totalCreditMoney = num1
      },
      deep: true
    }
  },
  methods: {
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
      for (let i = 0; i < this.list2.length; i++) {
        console.log('222', 222)
        // console.log('this.list2', this.list2[i].regionId)
        if (this.list2[i].regionId !== null && this.list2[i].regionId !== '' && this.list2[i].regionId !== undefined) {
          // this.list2[i].regionId = this.list2[i].regionPath
          // console.log('this.list2', this.list2[i].regionId)
          // const needata = this.findPathByLeafId(this.list2[i].regionId, this.regions)
          // console.log('needata', needata)
          // this.list2[i].regionId = needata
          // const finalid = needata[needata.length - 1]
          // console.log(finalid)
          // this.region = finalid
        } else {
          this.list2[i].regionId = null
          this.list2[i].regionPath = []
        }
      }
      console.log('this.list2', this.list2)
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
    handlechange5() {
      searchRepository2().then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('区域选择门店')
        }
      })
    },
    // 区域列表数据
    getnationlist() {
      // 区域列表数据
      regionlist2().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          console.log('区域列表出错')
        }
      })
    },
    entermoney(row) {
      console.log(row)
      if (row.balanceTrend) {
        if (row.balanceTrend === 1) {
          row.debitMoney = row.primevalMoney
        } else if (row.balanceTrend === 2) {
          row.creditMoney = row.primevalMoney
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
    selectableEvent(row, index) {
      // return this.selectid.includes(row.id)
      const isselect = this.selectid.some(function(value, index, array) {
        return row.id === value.id
      })
      if (isselect && row.source === 1) {
        return false
      } else {
        return true
      }
    },
    findPathByLeafId2(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].subjectFinanceVos) {
          var findResult = this.findPathByLeafId2(leafId, nodes[i].subjectFinanceVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    async setvoucherdata() {
      console.log('this.editdata222222', this.editdata)
      const voucherdata = this.personalForm
      this.selectid = this.personalForm.voucherDetails.map(item => {
        return {
          id: item.id
        }
      })
      if (voucherdata) {
        const voucherdetaildata = await Promise.all(voucherdata.voucherDetails.map(item => {
          return getSubjectDetail(item.subjectCode).then(res => {
            return res.data.data.content
          })
        }))
        this.list2 = voucherdata.voucherDetails.filter(item => {
          return (item.total === 1 || item.total === 3)
        })

        for (const i in voucherdetaildata) {
          const carstdata = this.findPathByLeafId2(voucherdetaildata[i].subjectId, this.treedata)
          voucherdetaildata[i].setcarst = carstdata
        }
        console.log('voucherdetaildata222222222', voucherdetaildata)
        for (const i in this.list2) {
          for (const j in voucherdetaildata) {
            if (this.list2[i].subjectCode === voucherdetaildata[j].itemCode) {
              this.list2[i].setcarst = voucherdetaildata[j].setcarst
              this.list2[i].balanceTrend = voucherdetaildata[j].balanceTrend
            }
          }
        }
        console.log('this.list2', this.list2)
        for (const i in this.list2) {
          this.list2[i].isdisable = true
          this.list2[i].currency = 1
          this.list2[i].currencyname = 'PHP'
          this.list2[i].rate = '1.00'
          if (this.list2[i].balanceTrend === 1 && this.list2[i].source === 1) {
            this.list2[i].isdisable2 = true
            this.list2[i].isdisable3 = true
          } else if (this.list2[i].balanceTrend === 2 && this.list2[i].source === 1) {
            this.list2[i].isdisable3 = true
            this.list2[i].isdisable2 = true
          } else if (this.list2[i].balanceTrend === 1 && this.list2[i].source === 2) {
            this.list2[i].isdisable3 = false
            this.list2[i].isdisable2 = false
          } else if (this.list2[i].balanceTrend === 2 && this.list2[i].source === 2) {
            this.list2[i].isdisable3 = false
            this.list2[i].isdisable2 = false
          }
        }
      }
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
    async test(row, val) {
      console.log(row, val)
      const finid = val[val.length - 1]
      console.log(finid)
      row.subjectCode = finid
      const needata = this.findtreedata(this.treedata, finid)
      console.log(needata)
      const voucherdetaildata = await getSubjectDetail(needata.subjectNumber)
        .then(res => {
          return res.data.data.content
        })
      row.balanceTrend = voucherdetaildata.balanceTrend
      row.subjectName = voucherdetaildata.itemName
      row.subjectCode = voucherdetaildata.itemCode
      console.log('voucherdetaildata', voucherdetaildata)
      if (voucherdetaildata.balanceTrend === 1) {
        row.isdisable2 = false
        row.isdisable3 = true
      } else if (voucherdetaildata.balanceTrend === 2) {
        row.isdisable2 = true
        row.isdisable3 = false
      }
    },
    gettree() {
      console.log(123)
      subjectList().then(res => {
        if (res.data.ret === 200) {
          const newarr = res.data.data.content
          const testarr = this.switchtreedata(newarr)
          this.suboptions = this.processchildren(newarr)
          this.treedata = res.data.data.content
          this.setvoucherdata()
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
      this.$refs.editable.insertAt({ currencyname: 'PHP', rate: '1.00' }, index)
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log('this.personalForm', this.personalForm)
      if (this.personalForm.totalCreditMoney !== this.personalForm.totalDebitMoney) {
        this.$notify.error({
          title: 'wrong',
          message: '贷方金额和借方金额不匹配',
          offset: 100
        })
        return false
      }
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
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
      for (const i in EnterDetail) {
        if (EnterDetail[i].regionPath) {
          EnterDetail[i].regionId = EnterDetail[i].regionPath[EnterDetail[i].regionPath.length - 1]
        }
      }
      const expresndata = this.personalForm.voucherDetails.filter(item => {
        return item.total === 2
      })
      const arr4 = [...EnterDetail, ...expresndata]
      const parms2 = JSON.stringify(arr4)
      const Data = {}
      Data.id = this.personalForm.id
      Data.createPersonId = this.personalForm.createPersonId
      Data.countryId = this.personalForm.countryId
      Data.regionId = this.personalForm.regionId
      Data.totalCreditMoney = this.personalForm.totalCreditMoney
      Data.totalDebitMoney = this.personalForm.totalDebitMoney
      Data.receiptDate = this.personalForm.receiptDate
      Data.sourceType = this.personalForm.sourceType
      Data.region = this.personalForm.region
      const parms = JSON.stringify(Data)
      console.log(parms)
      console.log(parms2)
      updatevoucher(parms, parms2).then(res => {
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
