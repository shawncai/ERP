<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.moveNumber +$t('updates2.dbdxq')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button style="font-size: 10px;" @click="printdata">{{ $t('otherlanguage.print1') }}</button>
        <button style="font-size: 10px;" @click="printdata2">{{ $t('otherlanguage.print2') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('updates.dbdbh')" class="print2" style="width: 100%;display: none">
                  {{ personalForm.moveNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.applicationName')" prop="applyPersonId" style="width: 100%;">
                  <span>{{ personalForm.applicationName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('otherlanguage.dblx')" prop="applyPersonId" style="width: 100%;">
                  <span>{{ personalForm.moveType | moveTypeFitler }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Storagemove.requestDeptId')" prop="requestDeptId" style="width: 100%;">
                  <span>{{ personalForm.requestDeptName }}</span>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="width: 100%;">
                  <span>{{ personalForm.moveInRepositoryName }}</span>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Storagemove.departmentId')" prop="departmentId" style="width: 100%;">
                  <span>{{ personalForm.departmentName }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveOutRepository" style="width: 100%;">
                  <span>{{ personalForm.moveInRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                  <span>{{ personalForm.moveOutRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                  <span>{{ personalForm.requestArrivalDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.yqchrq')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                  <span>{{ personalForm.moveOutDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.moveReason')" style="width: 100%;">
                  <span>{{ personalForm.moveReason }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="width: 100%;">
                  <span>{{ personalForm.businessStat | businessStatFilter }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调拨单明细-->
      <!-- <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">调出明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column prop="locationCode" align="center" :label="$t('Hmodule.hw')" />
            <el-editable-column prop="batch" align="center" :label="$t('Hmodule.pc')" />
            <el-editable-column prop="productCode" align="center" :label="$t('Hmodule.wpbh')" />
            <el-editable-column prop="productName" align="center" :label="$t('Hmodule.wpmc')" />
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" />
            <el-editable-column prop="typeName" align="center" :label="$t('Hmodule.gg')" />
            <el-editable-column prop="unitName" align="center" :label="$t('Hmodule.dw')" />
            <el-editable-column prop="price" align="center" :label="$t('updates.dbdj')" />
            <el-editable-column prop="movePrice" align="center" label="调拨成本价" />
            <el-editable-column prop="moveQuantity" align="center" label="调拨数量" />
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="remarks" align="center" :label="$t('updates.bz')" />
          </el-editable>
        </div>
      </el-card> -->
      <!--调入数据-->
      <!-- <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">调入明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" fixed="left" width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" :label="$t('Hmodule.wpbh')" />
            <el-editable-column prop="productName" fixed="left" align="center" :label="$t('Hmodule.wpmc')" />
            <el-editable-column prop="locationCode" align="center" :label="$t('Hmodule.hw')" />
            <el-editable-column prop="batch" align="center" :label="$t('Hmodule.pc')" />
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" />
            <el-editable-column prop="typeName" align="center" :label="$t('Hmodule.gg')" />
            <el-editable-column prop="unitName" align="center" :label="$t('Hmodule.dw')" />
            <el-editable-column prop="price" align="center" :label="$t('updates.dbdj')" />
            <el-editable-column prop="movePrice" align="center" label="调拨成本价" />
            <el-editable-column prop="moveQuantity" align="center" label="调拨数量" />
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="remarks" align="center" :label="$t('updates.bz')" />
          </el-editable>
        </div>
      </el-card> -->
      <!--调拨申请明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.dbsqdmx') }}</h2>
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
            <el-editable-column label="编号" width="55" fixed="left" align="center" type="index"/>
            <!-- <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column> -->
            <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
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
            </el-editable-column> -->
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.sqsl')" prop="applyQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" label="调拨成本价" width="150px"/> -->
            <el-editable-column :label="$t('updates.spje')" prop="moveMoney" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 调拨出库明细 -->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbckmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" width="55" fixed="left" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150"/>
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="250"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeName" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.cksli')" prop="moveQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
            <el-editable-column prop="price" align="center" label="调拨成本价" width="150px"/>
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" width="150px" />
            <el-editable-column prop="stat" align="center" label="出库状态" width="150px">
              <template slot-scope="scope">
                <p>{{ scope.row.stat | statFilter }}</p>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!-- 调拨入库明细 -->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbrkmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable3"
            :data.sync="list4"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" width="55" fixed="left" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150"/>
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeName" fixed="left" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.cksli')" prop="moveQuantity" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" />
            <el-editable-column :label="$t('updates.dbdj')" prop="price" align="center" width="150px"/>
            <el-editable-column prop="movePrice" align="center" label="调拨成本价" width="150px"/>
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" width="150px"/>
            <el-editable-column prop="stat" align="center" label="入库状态" width="150px">
              <template slot-scope="scope">
                <p>{{ scope.row.stat | inFilter }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="actualQuantity" align="center" label="实际入库数量" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">配送信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="deliverGoodsdata"
            border
            style="width: 100%">
            <el-table-column
              prop="deliverNumber"
              align="center"
              label="配送单号"
              min-width="150"/>
            <el-table-column
              prop="requireArriveDate"
              align="center"
              label="配送时间"
              min-width="150"/>
            <el-table-column
              prop="deliverPersonName"
              align="center"
              label="配送人"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.clbh')"
              prop="arrivalDate"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.cangk')"
              prop="acceptPersonName"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              label="配送单状态"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
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
                <el-form-item :label="$t('Storagemove.confirmOutPerson')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.confirmOutPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.confirmOutDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.confirmOutDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.confirmInPerson')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.confirmPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Storagemove.confirmInDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.confirmDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.judgePersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.judgePersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.judgeDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.judgeDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                  {{ formatTime(personalForm.modifyDate,'Y-M-D') }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { getPrintCount, addPrint } from '@/api/public'
import { locationlist } from '@/api/WarehouseAdjust'
import { updateStoragemove } from '@/api/Storagemove'
import { getdeptlist } from '@/api/BasicSettings'
import { deliverGoodsList } from '@/api/DeliverGoods'
import { batchlist } from '@/api/public'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyDepot from './MyDepot'
import printJS from 'print-js'
var _that
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail, MyDepot },
  filters: {
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    businessStatFilter(status) {
      const statusMap = {
        1: '调拨申请',
        2: '调拨出库',
        3: '调拨入库',
        4: '调拨完成'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '未出库',
        2: '已出库'
      }
      return statusMap[status]
    },
    moveTypeFitler(status) {
      const statusMap = {
        1: _that.$t('otherlanguage.ptdb'),
        2: _that.$t('otherlanguage.thdb')
      }
      return statusMap[status]
    },
    inFilter(status) {
      const statusMap = {
        1: '未入库',
        2: '已入库'
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
      // 配送信息数据
      deliverGoodsdata: [],
      deliverGoodsListdata: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: 0,
        sourceNumber: this.detaildata.moveNumber
      },
      // 申请人回显
      applyPersonId: '',
      // 审核步骤数据
      reviewList: [],
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 修改row数据
      personalForm: this.detaildata,
      // 部门数据
      depts: [],
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调拨单规则数据
      personalrules: {
        requestDeptId: [
          { required: true, message: '请选择要货部门', trigger: 'change' }
        ],
        moveInRepository: [
          { required: true, message: '请选择调入仓库', trigger: 'focus' }
        ],
        requestArrivalDate: [
          { required: true, message: '请选择要求到货日期', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择调货部门', trigger: 'change' }
        ],
        moveOutRepository: [
          { required: true, message: '请选择调出仓库', trigger: 'focus' }
        ],
        businessStat: [
          { required: true, message: '请选择业务状态', trigger: 'change' }
        ]
      },
      // 调拨申请细数据
      list2: [],
      // 调出明细数据
      list3: [],
      // 调入明细
      list4: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨明细中货位数据
      locationlist: [],
      // 调拨单明细列表规则
      validRules: {}
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.moveOutRepository = this.personalForm.moveOutRepositoryName
      this.moveInRepository = this.personalForm.moveInRepositoryName
      this.applyPersonId = this.personalForm.applicationName
      this.list2 = this.personalForm.storageMoveDetailApplyVos
      this.list3 = this.personalForm.storageMoveDetailVos
      this.list4 = this.personalForm.storageMoveDetailConfirmVos
      this.personalForm.allIncludeTaxMoney = 0
      for (const i in this.list2) {
        this.personalForm.allIncludeTaxMoney = this.personalForm.allIncludeTaxMoney + this.list2[i].moveMoney
      }
      for (const i in this.list4) {
        if (this.list4[i].stat === 1) {
          this.list4[i].actualQuantity = 0
        }
      }
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.getlocation()
      this.deliverGoodsListdata.sourceNumber = this.personalForm.moveNumber
      this.getdeliverGoodsList()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    cutnull(data) {
      for (const x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = ''
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.cutnull(z)
            })
          }
          if (typeof (data[x]) === 'object') { // 是json 递归继续处理
            data[x] = this.cutnull(data[x])
          }
        }
      }
      return data
    },
    // 定义转换函数
    transform(tranvalue) {
      try {
        if (tranvalue === '0') {
          return '零元'
        }
        var i = 1
        // eslint-disable-next-line no-array-constructor
        var dw2 = new Array('', '万', '亿')// 大单位
        // eslint-disable-next-line no-array-constructor
        var dw1 = new Array('拾', '佰', '仟')// 小单位
        // eslint-disable-next-line no-array-constructor
        var dw = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')// 整数部分用
        // 以下是小写转换成大写显示在合计大写的文本框中
        // 分离整数与小数
        var source = this.splits(tranvalue)
        var num = source[0]
        var dig = source[1]

        // 转换整数部分
        var k1 = 0// 计小单位
        var k2 = 0// 计大单位
        var sum = 0
        var str = ''
        var len = source[0].length// 整数的长度
        for (i = 1; i <= len; i++) {
          var n = source[0].charAt(len - i)// 取得某个位数上的数字
          var bn = 0
          if (len - i - 1 >= 0) {
            bn = source[0].charAt(len - i - 1)// 取得某个位数前一位上的数字
          }
          sum = sum + Number(n)
          if (sum !== 0) {
            str = dw[Number(n)].concat(str)// 取得该数字对应的大写数字，并插入到str字符串的前面
            if (n === '0')sum = 0
          }
          if (len - i - 1 >= 0) { // 在数字范围内
            if (k1 !== 3) { // 加小单位
              if (bn !== 0) {
                str = dw1[k1].concat(str)
              }
              k1++
            } else { // 不加小单位，加大单位
              k1 = 0
              var temp = str.charAt(0)
              if (temp === '万' || temp === '亿')// 若大单位前没有数字则舍去大单位
              // eslint-disable-next-line brace-style
              { str = str.substr(1, str.length - 1) }
              str = dw2[k2].concat(str)
              sum = 0
            }
          }
          if (k1 === 3)// 小单位到千则大单位进一
          // eslint-disable-next-line brace-style
          { k2++ }
        }

        // 转换小数部分
        var strdig = ''
        if (dig !== '') {
          // eslint-disable-next-line no-redeclare
          var n = dig.charAt(0)
          if (n !== 0) {
            strdig += dw[Number(n)] + '角'// 加数字
          }
          // eslint-disable-next-line no-redeclare
          var n = dig.charAt(1)
          if (n !== 0) {
            strdig += dw[Number(n)] + '分'// 加数字
          }
        }
        str += '元' + strdig
      } catch (e) {
        return '零元'
      }
      return str
    },

    // 拆分整数与小数
    splits(tranvalue) {
      // eslint-disable-next-line no-array-constructor
      var value = new Array('', '')
      const temp = tranvalue.split('.')
      for (var i = 0; i < temp.length; i++) {
        value[i] = temp[i]
      }
      return value
    },
    // 数组相加
    sum(arr) {
      if (arr.length !== 0) {
        // eslint-disable-next-line no-eval
        return eval(arr.join('+'))
      } else {
        return 0
      }
    },
    printdata() {
      const arr = this.cutnull(this.list2)
      const itemslengt = this.list2.length
      for (const i in arr) {
        arr[i].step = Number(i) + 1
        arr[i].check = ''
      }
      const allapplyquy = this.personalForm.storageMoveDetailApplyVos.map(item => {
        return item.applyQuantity
      })

      const totalqty = this.sum(allapplyquy)
      const allapplymoney = this.personalForm.storageMoveDetailApplyVos.map(item => {
        return item.moveMoney
      })
      const totalMoneys = this.sum(allapplymoney)
      const stringmoney = totalMoneys.toString()
      const daxiemoney = this.transform(stringmoney)
      console.log('allapplyquyallapplyquyallapplyquy', stringmoney)
      let remarks = ''
      if (this.personalForm.summary) {
        remarks = this.personalForm.summary
      }
      console.log(this.reviewList.length - 1)
      let handleperson = ''
      if (this.reviewList.length > 0) {
        handleperson = this.reviewList[this.reviewList.length - 1].stepHandlerName
      }
      console.log(handleperson)

      printJS({
        printable: arr,
        type: 'json',
        properties: [
          { field: 'productCode', displayName: 'Product ID', columnSize: `100px` },
          { field: 'productName', displayName: 'Product Name', columnSize: `100px` },
          { field: 'productName', displayName: '名称', columnSize: `100px` },
          { field: 'color', displayName: 'Color', columnSize: `100px` },
          { field: 'applyQuantity', displayName: 'Qty.', columnSize: `100px` },
          { field: 'check', displayName: 'Out Check', columnSize: `100px` },
          { field: 'check', displayName: 'In Check', columnSize: `100px` }
        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"></div>
                      <br>
                      <div class="ordername">${this.personalForm.moveInRepositoryName} Transfer list/ 送货单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">Stock Out / 调出仓库：</div>
                        <div class="itemcontent">${this.personalForm.moveOutRepositoryName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">Stock In / 调入仓库：</div>
                        <div class="itemcontent">${this.personalForm.moveInRepositoryName}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">Date / 日期：</div>
                        <div class="itemcontent">${this.personalForm.createDate}</div>
                          </div>
                          </div>
                        </div>`,
        bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 100%;height: 40px;align-items: center;border:1px solid;border-top: none;">
                  <div class="allmoneyname" style="width: 29%;margin-right:-10px">Total Items: ${itemslengt}</div>
                  <div class="allmoneynum" style="width: 43%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">Total Qty.: ${totalqty}</div>
                  <div class="allmoneynum" style="width: 28%;height: 40px;display: flex;align-items: center;justify-content: center;">合计:${daxiemoney} ¥ ${totalMoneys}</div>
                  </div>
                  <div style="width: 100%;height: 80px;border:1px solid;border-top: none;">
                  <div>Remark/备注</div>
                  <div>${remarks}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">Hander: </div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">Bill Id:</div>
                        <div class="bottomname">${this.personalForm.moveNumber}</div>
                    </div>
                   </div>
                   <div class="morebottom" style="width: 60%;display:flex;align-items: center;justify-content: space-between;margin: 20px auto">
                   <div>
                   <div style="font-size: 25px">Delivery By:</div>
                   <div style="font-size: 25px">送货人</div>
                   </div>
                   <div>
                   <div style="font-size: 25px">Branch Received By:</div>
                   <div style="font-size: 25px">店面签收人</div>
                   </div>
                   </div>
                  </div>`,
        bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
        style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;}' +
          '.pringtitle { line-height: 10px; }' +
          '.line1 { width: 400px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: space-around; align-items: center;margin-top: 10px}' +
          '.item { width: 40%; justify-content: center; align-items: center; display: flex;line-height: 40px;}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 90%; text-align: right }' +
          '.itemcontent {width: 85%}',
        gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
        gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
        repeatTableHeader: true
      })
    },

    printdata2() {
      const arr = this.cutnull(this.list2)
      const itemslengt = this.list2.length
      for (const i in arr) {
        arr[i].step = Number(i) + 1
        arr[i].check = ''
      }
      const allapplyquy = this.personalForm.storageMoveDetailApplyVos.map(item => {
        return item.applyQuantity
      })

      const totalqty = this.sum(allapplyquy)
      const allapplymoney = this.personalForm.storageMoveDetailApplyVos.map(item => {
        return item.moveMoney
      })
      const totalMoneys = this.sum(allapplymoney)
      const stringmoney = totalMoneys.toString()
      const daxiemoney = this.transform(stringmoney)
      console.log('allapplyquyallapplyquyallapplyquy', stringmoney)
      let remarks = ''
      if (this.personalForm.summary) {
        remarks = this.personalForm.summary
      }
      console.log(this.reviewList.length - 1)
      let handleperson = ''
      if (this.reviewList.length > 0) {
        handleperson = this.reviewList[this.reviewList.length - 1].stepHandlerName
      }
      console.log(handleperson)

      printJS({
        printable: arr,
        type: 'json',
        properties: [
          { field: 'productCode', displayName: 'Product ID', columnSize: `100px` },
          { field: 'productName', displayName: 'Product Name', columnSize: `100px` },
          { field: 'productName', displayName: '名称', columnSize: `100px` },
          { field: 'color', displayName: 'Color', columnSize: `100px` },
          { field: 'check', displayName: 'Location', columnSize: `100px` },
          { field: 'applyQuantity', displayName: 'Qty.', columnSize: `100px` },
          { field: 'check', displayName: 'Mark', columnSize: `100px` }

        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"></div>
                      <br>
                      <div class="ordername">${this.personalForm.moveInRepositoryName} New order/ 店面订货单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">Branch：</div>
                        <div class="itemcontent">${this.personalForm.moveInRepositoryName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">Date：</div>
                        <div class="itemcontent">${this.personalForm.createDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">Slip No：</div>
                        <div class="itemcontent">${this.personalForm.moveNumber}</div>
                          </div>
                          </div>
                        </div>`,
        bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 100%;height: 40px;align-items: center;border:1px solid;border-top: none;">
                  <div class="allmoneyname" style="width: 29%;margin-right:-10px">Total Items: ${itemslengt}</div>
                  <div class="allmoneynum" style="width: 43%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">Total Qty.: ${totalqty}</div>
                  <div class="allmoneynum" style="width: 28%;height: 40px;display: flex;align-items: center;justify-content: center;">合计:${daxiemoney} ¥ ${totalMoneys}</div>
                  </div>
                  <div style="width: 100%;height: 80px;border:1px solid;border-top: none;">
                  <div>Remark</div>
                  <div>${remarks}</div>
                  </div>
                  </div>`,
        bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
        style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;}' +
          '.pringtitle { line-height: 10px; }' +
          '.line1 { width: 400px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: space-around; align-items: center;margin-top: 10px}' +
          '.item { width: 40%; justify-content: center; align-items: center; display: flex;line-height: 40px;}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 90%; text-align: right }' +
          '.itemcontent {width: 85%}',
        gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
        gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
        repeatTableHeader: true
      })
    },

    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      if (!number) {
        return null
      }
      const time = new Date(number)
      const newArr = []
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      newArr.push(time.getFullYear())
      newArr.push(this.formatNumber(time.getMonth() + 1))
      newArr.push(this.formatNumber(time.getDate()))
      newArr.push(this.formatNumber(time.getHours()))
      newArr.push(this.formatNumber(time.getMinutes()))
      newArr.push(this.formatNumber(time.getSeconds()))

      for (const i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
      }
      return format
    },
    getdeliverGoodsList() {
      deliverGoodsList(this.deliverGoodsListdata).then(res => {
        if (res.data.ret === 200) {
          this.deliverGoodsdata = res.data.data.content.list
        }
      })
    },
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
      locationlist(this.personalForm.moveOutRepository).then(res => {
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
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
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
    updatebatch(event, scope) {
      if (event === true) {
        const parms2 = scope.row.locationId
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.moveOutRepository, parms2, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 调拨单事件
    // 新增调拨单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 调拨金额计算
    getSize(quan, pric) {
      return quan * pric
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
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
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
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
          delete elem.movePrice
        }
        if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
          delete elem.moveQuantity
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const parm = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(rest)
      updateStoragemove(parm, parms2).then(res => {
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
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .el-col-12{
    width: 49%;
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
