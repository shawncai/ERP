<template>
  <div class="install-container">
    <div class="filter-container">
      <el-input v-model="install.applicantname" :placeholder="$t('order.applicant')" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-select v-model="install.stat" :placeholder="$t('order.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in xiala" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="first">
          <el-table
            :key="tableKey"
            :data="list"
            height="547"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.idcard')" prop="identityCard" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.identityCard }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Living')" prop="currentAddress" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.currentAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.monthlyincome')" prop="monthlyPay" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.monthlyPay }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.emergencycontact')" prop="emergencyContact" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.emergencyContact }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicationtime')" prop="createTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Installmentamount')" prop="totalmoney" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalmoney }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button v-if="scope.row.stat == '1'" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('order.Review') }}</el-button>
                <el-button v-if="scope.row.stat !== '1'" size="mini" plain >{{ $t('order.Reviewed') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="installList.pagenum" :limit.sync="installList.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane label="待审核" >
          <el-table
            :key="tableKey"
            :data="list2"
            height="535"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.idcard')" prop="identityCard" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.identityCard }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Living')" prop="currentAddress" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.currentAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.monthlyincome')" prop="monthlyPay" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.monthlyPay }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.emergencycontact')" prop="emergencyContact" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.emergencyContact }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicationtime')" prop="createTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Installmentamount')" prop="totalmoney" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalmoney }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button v-if="scope.row.stat == '1'" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('order.Review') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total2>0" :total="total2" :page.sync="installList2.pagenum" :limit.sync="installList2.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane label="通过" >
          <el-table
            :key="tableKey"
            :data="list3"
            height="547"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.idcard')" prop="identityCard" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.identityCard }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Living')" prop="currentAddress" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.currentAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.monthlyincome')" prop="monthlyPay" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.monthlyPay }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.emergencycontact')" prop="emergencyContact" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.emergencyContact }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicationtime')" prop="createTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Installmentamount')" prop="totalmoney" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalmoney }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total3>0" :total="total3" :page.sync="installList3.pagenum" :limit.sync="installList3.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane label="未通过" >
          <el-table
            :key="tableKey"
            :data="list4"
            height="547"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('order.coding')" prop="code" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicant')" prop="applicantName" width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.applicantName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center" prop="phone" width="110px">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.idcard')" prop="identityCard" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.identityCard }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Living')" prop="currentAddress" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.currentAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.monthlyincome')" prop="monthlyPay" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.monthlyPay }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.emergencycontact')" prop="emergencyContact" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.emergencyContact }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.applicationtime')" prop="createTime" width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stages')" prop="count" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.Installmentamount')" prop="totalmoney" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalmoney }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.stat')" prop="stat" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total4>0" :total="total4" :page.sync="installList4.pagenum" :limit.sync="installList4.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
      </el-tabs>
      <el-dialog :visible.sync="isvisible" title="分期审核" width="30%" center lock-scroll>
        <el-form :model="dispatchform" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('order.stat')">
            <el-select v-model="dispatchform.id" placeholder="请选择">
              <el-option
                v-for="(item, index) in xiala"
                :key="index"
                :label="item.display_name"
                :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isvisible = false">取 消</el-button>
          <el-button type="primary" @click="dispatch">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getjudgeinfolist, installmentjudge, applicationseach } from '@/api/order'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const xiala = [
  { key: '1', display_name: '待审核' },
  { key: '2', display_name: '通过' },
  { key: '3', display_name: '未通过' }
]
export default {
  name: 'InstallmentApplication',
  directives: { waves },
  components: { Pagination },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return '待审核'
      } else if (val === 2) {
        return '通过'
      } else if (val === 3) {
        return '不通过'
      }
    }
  },
  data() {
    return {
      xiala,
      installList: {
        pagenum: 1,
        pagesize: 10
      },
      installList2: {
        pagenum: 1,
        pagesize: 10,
        stat: 1
      },
      installList3: {
        pagenum: 1,
        pagesize: 10,
        stat: 2
      },
      installList4: {
        pagenum: 1,
        pagesize: 10,
        stat: 3
      },
      install: {
        stat: '',
        pagenum: 1,
        pagesize: 10,
        applicantname: ''
      },
      activeName: 'first',
      listLoading: true,
      list: null,
      list2: null,
      list3: null,
      list4: null,
      tableKey: 0,
      tableKey2: 0,
      centerDialogVisible: false,
      formdata: [],
      installment: [],
      isinstallment: false,
      orderDetaillist: [],
      total: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      isvisible: false,
      dispatchform: {
        id: ''
      },
      options: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getinstalllist()
  },
  methods: {
    getinstalllist() {
      getjudgeinfolist(this.installList).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
      })
      getjudgeinfolist(this.installList2).then(res => {
        this.list2 = res.data.data.content.list
        this.total2 = res.data.data.content.totalCount
      })
      getjudgeinfolist(this.installList3).then(res => {
        this.list3 = res.data.data.content.list
        this.total3 = res.data.data.content.totalCount
      })
      getjudgeinfolist(this.installList4).then(res => {
        this.list4 = res.data.data.content.list
        this.total4 = res.data.data.content.totalCount
      })
    },
    handleFilter() {
      applicationseach(this.install).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
      })
    },
    handleDispatch(row) {
      this.formdata = Object.assign({}, row)
      this.isvisible = true
    },
    dispatch() {
      const tempData = Object.assign({}, this.formdata)
      const installmentjudgeid = tempData.id
      const employeeid = this.$store.getters.userId
      const stat = this.dispatchform.id
      installmentjudge(stat, employeeid, installmentjudgeid).then(res => {
        if (res.data.ret === 200) {
          this.getinstalllist()
          this.isvisible = false
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .install-container{
    margin: 30px;
  }
  .filter-container{
    margin-left: 20px;
  }
</style>
