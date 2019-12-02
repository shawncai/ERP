<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.rq')" style="width: 100%;">
                  <el-input v-model="personalForm.receiptDate" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.zdr')" style="width: 100%;">
                  <el-input v-model="createPerson" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.hjjfje')" style="width: 100%;">
                  <el-input v-model="personalForm.totalDebitMoney" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.hjdfje')" style="width: 100%;">
                  <el-input v-model="personalForm.totalCreditMoney" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.qy')" style="width: 100%;">
                  <el-input v-model="personalForm.region" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Voucher.md')" style="width: 100%;">
                  <el-input v-model="personalForm.repository" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('Voucher.pzmx') }}</h2>
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
            size="medium"
            style="width: 100%">
            <el-editable-column :selectable="selectableEvent" type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.zy')" prop="summary" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.summary" :disabled="scope.row.isdisable" clearable/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.kjkm')" prop="setcarst" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-cascader
                  v-model="scope.row.setcarst"
                  :options="suboptions"
                  :props="props2"
                  :show-all-levels="false"
                  :disabled="scope.row.isdisable"
                  filterable
                  @change="test(scope.row,$event)"/>
              </template>
            </el-editable-column>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('Voucher.ybje')" prop="primevalMoney" align="center" min-width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.ybje')" prop="primevalMoney" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :disabled="scope.row.isdisable"
                  :min="0.00"
                  v-model="scope.row.primevalMoney"
                  @change="entermoney(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Voucher.bb')" prop="currencyname" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Voucher.hl')" prop="rate" align="center" min-width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('Voucher.jfje')" prop="debitMoney" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('Voucher.dfje')" prop="creditMoney" align="center" min-width="150px"/> -->

            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.jfje')" prop="debitMoney" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :disabled="scope.row.isdisable2"
                  :min="0.00"
                  v-model="scope.row.debitMoney"
                />
              </template>
            </el-editable-column>

            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Voucher.dfje')" prop="creditMoney" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :disabled="scope.row.isdisable3"
                  :min="0.00"
                  v-model="scope.row.creditMoney"
                />
              </template>
            </el-editable-column>

          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

// 主表 sourceType 1: 支出单， sourceNumber
// 明细表  source 1 -新增的， 2是带过来的

<script>
import { subjectList } from '@/api/SubjectFinance'
import { getSubjectDetail, addvoucher } from '@/api/voucher'
import '@/directive/noMoreClick/index.js'
var _that
export default {
  name: 'Newvoucher',
  data() {
    return {
      selectid: [],
      carstdata: '',
      treedata: [],
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      suboptions: [],
      // 制单人回显
      createPerson: this.$store.getters.name,
      // 凭证信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: '',
        regionId: '',
        totalCreditMoney: 0,
        totalDebitMoney: 0
      },
      ownregion: {
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 凭证规则数据
      personalrules: {},
      // 凭证明细数据
      list2: [],
      // 凭证明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    list2: {
      handler() {
        let num = 0
        let num1 = 0
        for (const i in this.list2) {
          console.log(this.list2[i])
          num += Number(this.list2[i].debitMoney)
          num1 += Number(this.list2[i].creditMoney)
        }
        this.personalForm.totalDebitMoney = num
        this.personalForm.totalCreditMoney = num1
      },
      deep: true
    }
  },
  created() {
    this.getdatatime()
    this.gettree()
  },
  methods: {
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
      console.log(row.id)
      const isselect = this.selectid.some(function(value, index, array) {
        return row.id === value.id
      })
      console.log('isselect', isselect)
      console.log('this.selectid', this.selectid)
      return !isselect
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
        if (nodes[i].subjectFinanceVos) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].subjectFinanceVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    async setvoucherdata() {
      const voucherdata = this.$store.getters.voucherdata
      this.selectid = this.$store.getters.voucherdata.expensesDetailVos.map(item => {
        return {
          id: item.id
        }
      })
      console.log('voucherdata122222', voucherdata)
      if (voucherdata) {
        if (voucherdata.sourceType === 1) {
          this.personalForm.sourceNumber = voucherdata.number
        }
        this.personalForm.sourceType = voucherdata.sourceType
        this.personalForm.region = voucherdata.expensesRegionName
        this.personalForm.repository = voucherdata.expensesRepositoryName
        this.personalForm.regionId = voucherdata.expensesRegionId
        this.personalForm.repositoryId = voucherdata.expensesRepositoryId
        const voucherdetaildata = await Promise.all(voucherdata.expensesDetailVos.map(item => {
          return getSubjectDetail(item.subjectCode).then(res => {
            return res.data.data.content
          })
        }))
        this.list2 = voucherdata.expensesDetailVos
        for (const i in voucherdetaildata) {
          const carstdata = this.findPathByLeafId(voucherdetaildata[i].subjectId, this.treedata)
          voucherdetaildata[i].setcarst = carstdata
        }
        for (const i in this.list2) {
          for (const j in voucherdetaildata) {
            if (this.list2[i].subjectCode === voucherdetaildata[j].itemCode) {
              this.list2[i].source = 1
              this.list2[i].setcarst = voucherdetaildata[j].setcarst
              this.list2[i].balanceTrend = voucherdetaildata[j].balanceTrend
            }
          }
        }
        console.log(this.list2)
        for (const i in this.list2) {
          this.list2[i].primevalMoney = this.list2[i].money
          this.list2[i].isdisable = true
          this.list2[i].currency = 1
          this.list2[i].currencyname = '人民币'
          this.list2[i].rate = '1.00'
          if (this.list2[i].balanceTrend === 1) {
            this.list2[i].debitMoney = this.list2[i].money
            this.list2[i].isdisable2 = true
            this.list2[i].isdisable3 = true
          } else if (this.list2[i].balanceTrend === 2) {
            this.list2[i].creditMoney = this.list2[i].money
            this.list2[i].isdisable3 = true
            this.list2[i].isdisable2 = true
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

      const needata = this.findtreedata(this.treedata, finid)
      console.log(needata)
      const voucherdetaildata = await getSubjectDetail(needata.subjectNumber)
        .then(res => {
          return res.data.data.content
        })
      console.log('voucherdetaildatavoucherdetaildata', voucherdetaildata)
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
          this.suboptions = this.processchildren(res.data.data.content)
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
      this.$refs.editable.insertAt({ currencyname: '人民币', rate: '1.00', source: 2, currency: 1 }, index)
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
      this.personalForm.receiptDate = currentdate
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // // 清空记录
    // restAllForm() {
    //   this.personalForm = {
    //     createPersonId: this.$store.getters.userId,
    //     countryId: this.$store.getters.countryId,
    //     repositoryId: this.$store.getters.repositoryId,
    //     regionId: this.$store.getters.regionId,
    //     currency: '1',
    //     handlePersonId: this.$store.getters.userId
    //   }
    //   this.handlePersonId = null
    //   this.personalForm.handlePersonId = null
    //   this.expensesRepositoryId = null
    //   this.personalForm.expensesRepositoryId = null
    // },
    // 保存操作
    handlesave() {
      if (this.personalForm.totalCreditMoney !== this.personalForm.totalDebitMoney) {
        this.$notify.error({
          title: '错误',
          message: '贷方金额和借方金额不匹配',
          offset: 100
        })
        return false
      }

      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
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
            addvoucher(parms, parms2, this.ownregion).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  offset: 100
                })
                // this.restAllForm()
                this.$store.dispatch('getvoucherdata', '')
                this.handlecancel()
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          }).catch(valid => {
            console.log('error submit!!')
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
      const view = { path: '/Voucher/Newvoucher', name: 'Newvoucher', fullPath: '/Voucher/Newvoucher', title: 'Newvoucher' }
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
  }
</style>
