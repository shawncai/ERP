<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px; padding-bottom: 30px" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.applicationName')" prop="applyPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="applyPersonId" style="width: 200px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
              </el-col>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              <el-col :span="6">
                <el-form-item :label="$t('otherlanguage.dblx')" prop="moveType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.moveType" :placeholder="$t('otherlanguage.dblx')" style="width: 200px" clearable @change="choosemovetype" @clear="clearmovetype">
                    <el-option
                      :label="$t('otherlanguage.ptdb')"
                      value="1"/>
                    <el-option
                      :label="$t('otherlanguage.thdb')"
                      value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 普通调拨时仓库逻辑 开始-->
              <el-col v-show="ismovetype" :span="6">
                <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="moveInRepository" style="width: 200px" clearable @focus="handlechooseDep"/>
                </el-form-item>
                <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>
              </el-col>
              <el-col v-show="ismovetype" :span="6">
                <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="moveOutRepository" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" :personform="personalForm" @repositoryname="repositoryname"/>
              </el-col>
              <!-- 普通调拨时仓库逻辑 结束-->
              <!-- 退货调拨时仓库逻辑 开始-->
              <el-col v-show="isreturntype" :span="6">
                <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="moveInRepository" style="width: 200px" clearable @focus="handlechooseDep2"/>
                </el-form-item>
                <my-depot :depotcontrol.sync="depotcontrol2" @depotname="depotname2"/>
              </el-col>
              <el-col v-show="isreturntype" :span="6">
                <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="moveOutRepository" style="width: 200px" clearable @focus="handlechooseRep2"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol2" :personform="personalForm" @repositoryname="repositoryname2"/>
              </el-col>
              <!-- 退货调拨时仓库逻辑 结束-->
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.requestArrivalDate"
                    type="date"

                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.yqchrq')" label-width="110px" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.moveOutDate"
                    type="date"

                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.moveReason')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.moveReason" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.applyPhone')" prop="applyPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.applyPhone" :controls="false" style="width: 200px" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.acceptPhone')" prop="acceptPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.acceptPhone" :controls="false" style="width: 200px" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.emergencyPhone')" prop="emergencyPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.emergencyPhone" :controls="false" style="width: 200px" />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.departmentId')" prop="departmentId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.departmentId" placeholder="请选择调货部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>               -->
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.businessStat" style="width: 200px" disabled >
                    <el-option :label="$t('prompt.dbsq')" value="1"/>
                    <el-option :label="$t('prompt.dbck')" value="2"/>
                    <el-option :label="$t('prompt.dbrk')" value="3"/>
                    <el-option :label="$t('prompt.dbwc')" value="4"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMovePerson')" prop="storageMovePerson" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="storageMovePerson" placeholder="请选择调拨出库人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept2"/>
                </el-form-item>
              </el-col>
              <my-out :outcontrol.sync="outcontrol" @outName="outName"/> -->
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMoveDate')" label-width="110px" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.storageMoveDate"
                    type="date"
                    placeholder="选择调拨出库日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 8px"/>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调拨申请明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.dbsqdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddBom">{{ $t('updates.xzbom') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
        <my-materials :materialcontrol.sync="materialcontrol" @product4="productdetail4" @detailproduct="detailproduct"/>
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
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <!-- <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column> -->
            <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch2($event,scope)">
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
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeName" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('otherlanguage.kcsl')" prop="existStock" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 6}, type: 'visible'}" :label="$t('updates.sqsl')" prop="applyQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.applyQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" label="调拨成本价" width="150px"/> -->
            <el-editable-column :label="$t('updates.spje')" prop="moveMoney" align="center" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 调拨出库明细 -->
      <!-- <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbckmx') }}</h2>
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
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" :label="$t('Hmodule.wpbh')" width="150px"/>
            <el-editable-column prop="productName" align="center" :label="$t('Hmodule.wpmc')" width="150px"/>
            <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" width="150px"/>
            <el-editable-column prop="typeName" align="center" :label="$t('Hmodule.gg')" width="150px"/>
            <el-editable-column prop="unitName" align="center" :label="$t('Hmodule.dw')" width="150px"/>
            <el-editable-column prop="moveQuantity" align="center" :label="$t('updates.cksli')" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.moveQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="carCode" align="center" :label="$t('updates.cjbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable/>
                <span v-else>{{ scope.row.carCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="motorCode" align="center" :label="$t('updates.djbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable/>
                <span v-else>{{ scope.row.motorCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batteryCode" align="center" :label="$t('updates.dcbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.batteryCode" clearable/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="price" align="center" :label="$t('updates.dbdj')" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" label="调拨成本价" width="150px"/>
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="totalMoney" align="center" label="出库状态" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
              <template slot-scope="scope">
                <el-button v-permission="['54-55-98']" v-show="scope.row.judgeStat === 2&&scope.row.confirmPersonId === null&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" title="确认" type="primary" size="mini" icon="el-icon-check" circle @click="handleEdit2(scope.row)"/>
              </template>
            </el-table-column>
          </el-editable>
        </div>
      </el-card> -->
      <!-- 调拨入库明细 -->
      <!-- <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbrkmx') }}</h2>
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
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" :label="$t('Hmodule.wpbh')" width="150px"/>
            <el-editable-column prop="productName" align="center" :label="$t('Hmodule.wpmc')" width="150px"/>
            <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" width="150px"/>
            <el-editable-column prop="typeName" align="center" :label="$t('Hmodule.gg')" width="150px"/>
            <el-editable-column prop="unitName" align="center" :label="$t('Hmodule.dw')" width="150px"/>
            <el-editable-column prop="moveQuantity" align="center" :label="$t('updates.cksli')" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.moveQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column prop="carCode" align="center" :label="$t('updates.cjbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable/>
                <span v-else>{{ scope.row.carCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="motorCode" align="center" :label="$t('updates.djbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable/>
                <span v-else>{{ scope.row.motorCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="batteryCode" align="center" :label="$t('updates.dcbm')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.batteryCode" clearable/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column prop="price" align="center" :label="$t('updates.dbdj')" width="150px"/>
            <el-editable-column prop="movePrice" align="center" label="调拨成本价" width="150px"/>
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="totalMoney" align="center" label="出库状态" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 6}, type: 'visible'}" prop="quantity" align="center" label="实际入库" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  :min="0.00"
                  :value="scope.row.quantity"
                />
              </template>
            </el-editable-column>
            <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
              <template slot-scope="scope">
                <el-button v-permission="['54-55-98']" v-show="scope.row.judgeStat === 2&&scope.row.confirmPersonId === null&&(scope.row.receiptStat === 1||scope.row.receiptStat === 2||scope.row.receiptStat === 3)" title="确认" type="primary" size="mini" icon="el-icon-check" circle @click="handleEdit2(scope.row)"/>
              </template>
            </el-table-column>
          </el-editable>
        </div>
      </el-card> -->
      <!-- 操作 -->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <!-- 备注 -->
      <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" :label="$t('updates.bz')" width="150px"/> -->
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
// import { getAllBatch } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { batchlist, getlocation, productlist } from '@/api/public'
import { createstoragemove } from '@/api/Storagemove'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyOut from './components/MyOut'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import MyDepot from './components/MyDepot'
import MyMaterials from './components/MyMaterials'
var _that
export default {
  name: 'AddStoragemove',
  components: { MyDepot, MyRepository, MyDetail, MyCreate, MyAccept, MyOut, MyMaterials },
  data() {
    // 判断是否为数字(非必填)
    const validisnumber2 = (rule, value, callback) => {
      console.log('value', value)
      if (value !== null && value !== undefined && value !== '' && this.$store.getters.useCountry === 2) {
        var re = /^0?0[3|4|5|6|7|8|9][0-9]\d{8}$/
        const flag = re.test(value)
        if (flag) {
          if (value.length !== 11) {
            callback(new Error('phone number length is wrong'))
          } else {
            callback()
          }
        } else {
          callback(new Error('phone number is wrong'))
        }
      } else if (this.$store.getters.useCountry === 1) {
        callback()
      } else {
        callback(new Error('phone number is wrong'))
      }
    }
    return {
      depotcontrol2: false,
      repositorycontrol2: false,
      isreturntype: false,
      ismovetype: false,
      // 申请人回显
      applyPersonId: this.$store.getters.name,
      // 申请人控制
      accetpcontrol: false,
      // 调拨出库人回显
      storageMovePerson: '',
      // 出库人控制
      outcontrol: false,
      // 批次列表
      batchlist: [],
      // 部门数据
      depts: [],
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: this.$store.getters.repositoryName,
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 控制商品列表窗口
      control: false,
      // bom清单窗口
      materialcontrol: false,
      // 调拨信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        applyPersonId: this.$store.getters.userId,
        requestDeptId: this.$store.getters.deptId,
        businessStat: '1',
        moveOutRepository: '',
        moveInRepository: ''
      },
      // 调拨单规则数据
      personalrules: {
        emergencyPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        acceptPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        applyPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        applyPersonId: [
          { required: true, message: 'please select applyPerson', trigger: 'focus' }
        ],
        moveType: [
          { required: true, message: 'please select moveType', trigger: 'change' }
        ],
        moveInRepository: [
          { required: true, message: 'please select moveIn branch', trigger: 'focus' }
        ],
        requestArrivalDate: [
          { required: true, message: 'please select requestArrivalDate', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: 'please select  department', trigger: 'change' }
        ],
        moveOutRepository: [
          { required: true, message: 'please select  moveOut branch', trigger: 'focus' }
        ],
        businessStat: [
          { required: true, message: 'please select  businessStat', trigger: 'change' }
        ]
      },
      // 调拨单明细数据
      list2: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨明细中货位数据
      locationlist: [],
      // 调拨单明细列表规则
      validRules: {
      }
    }
  },

  mounted() {
    this.getlist()
    this.getdatatime()
  },
  activated() {
    this.getinformation4()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // bom传回来事件
    productdetail4(val) {
    },
    async detailproduct(val) {
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const newArr = []
      alldata.forEach(el => {
        const result = newArr.findIndex(ol => { return el.productCode === ol.productCode })
        if (result !== -1) {
          if (el.quantity !== null && el.quantity !== '' && el.quantity !== undefined) {
            newArr[result].quantity = newArr[result].quantity + el.quantity
          } else {
            newArr.push(el)
          }
        } else {
          newArr.push(el)
        }
      })
      this.list2 = this._.concat(this.list2, newArr)
      console.log('this.list2=================', this.list2)
    },
    choosemovetype(val) {
      console.log(val)
      if (val === '1') {
        this.isreturntype = false
        this.ismovetype = true
        this.clearmovetype()
      } else if (val === '2') {
        this.isreturntype = true
        this.ismovetype = false
        this.clearmovetype()
      }
    },
    clearmovetype() {
      console.log('clearsuccess')
      this.moveOutRepository = ''
      this.personalForm.moveOutRepository = ''
      this.moveInRepository = ''
      this.personalForm.moveInRepository = ''
    },
    getdatatime() { // 默认显示今天
      this.personalForm.storageMoveDate = new Date()
    },
    // 获取智能补货信息
    async getinformation4() {
      if (this.$store.getters.empcontract4) {
        console.log(this.$store.getters.empcontract4)
        if (this.$store.getters.empcontract4.length) {
          this.moveOutRepository = this.$store.getters.empcontract4[0].repositoryName
          this.personalForm.moveOutRepository = this.$store.getters.empcontract4[0].repositoryId
          for (const i in this.$store.getters.empcontract4) {
            const productDetail = []
            await productlist(this.$store.getters.empcontract4[i].productCode).then(res => {
              if (res.data.data.content.list[i].isBatch === 2) {
                this.$store.getters.empcontract4[i].batch = '不使用'
              }
              productDetail.push(res.data.data.content.list[0])
            })
            this.list2 = productDetail.map(function(item) {
              return {
                productCode: item.code,
                productName: item.productName,
                locationId: '',
                color: item.color,
                typeId: item.typeId,
                enterQuantity: 0,
                taxRate: 0,
                unit: item.stockMeasu,
                unitName: item.stockMeasu,
                actualEnterQuantity: 0,
                basicQuantity: 0,
                enterPrice: item.costPrice,
                productType: item.productType,
                totalMoney: 0,
                enterMoney: 0,
                price: item.costPrice,
                typeName: item.productType,
                movePrice: 0,
                batch: item.batch,
                moveQuantity: 0
              }
            })
            console.log(this.list2)
            console.log('one', productDetail)
          }
        } else {
          this.moveOutRepository = this.$store.getters.empcontract4.repositoryName
          this.personalForm.moveOutRepository = this.$store.getters.empcontract4.repositoryId
          productlist(this.$store.getters.empcontract4.productCode).then(res => {
            if (res.data.data.content.list[0].isBatch === 2) {
              this.moreaction.batch = '不使用'
            }
            const productDetail = res.data.data.content.list.map(function(item) {
              return {
                productCode: item.code,
                productName: item.productName,
                locationId: '',
                color: item.color,
                typeId: item.typeId,
                enterQuantity: 0,
                taxRate: 0,
                unit: item.stockMeasu,
                unitName: item.stockMeasu,
                actualEnterQuantity: 0,
                basicQuantity: 0,
                enterPrice: item.costPrice,
                productType: item.productType,
                totalMoney: 0,
                enterMoney: 0,
                price: item.costPrice,
                typeName: item.productType,
                movePrice: 0,
                batch: item.batch,
                moveQuantity: 0
              }
            })
            this.list2 = productDetail
          })
        }
        this.$store.dispatch('getempcontract4', '')
      }
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
      console.log(1233)
    },
    depotname(val) {
      console.log(1233)
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    handlechooseDep2() {
      this.repositorycontrol2 = true
    },
    depotname2(val) {
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.moveQuantity = 1
      })
      console.log(val)
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
      // this.locationlistparms.repositoryId = val.id
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
    handlechooseRep2() {
      this.depotcontrol2 = true
    },
    repositoryname2(val) {
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    queryStock(row) {
      console.log(this.$refs.editable.getRecords())
      if (row.existStock !== null) {
        if (row.applyQuantity > row.existStock) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          row.applyQuantity = 1
        }
      }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.moveOutRepository, row).then(res => {
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
    // 批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.moveOutRepository)
        if (this.personalForm.moveOutRepository === undefined || this.personalForm.moveOutRepository === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.qxxzck'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.moveOutRepository, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.gckmygsp'),
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
      batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 申请人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
    },
    // 调拨出库人触发
    handlechooseAccept2() {
      this.outcontrol = true
      console.log(this.outcontrol)
    },
    outName(val) {
      this.storageMovePerson = val.personName
      this.personalForm.storageMovePerson = val.id
    },
    // 调拨单事件
    // 新增调拨单明细
    handleAddproduct() {
      if (this.moveOutRepository === null || this.moveOutRepository === '' || this.moveOutRepository === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    handleAddBom() {
      if (this.moveOutRepository === null || this.moveOutRepository === '' || this.moveOutRepository === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.materialcontrol = true
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
    productdetail(val) {
      console.log('val====', val)
      const nowlistdata = this.$refs.editable.getRecords()
      const newarr = Object.assign([], val, nowlistdata)
      const needarr = this.uniqueArray(newarr, 'productCode')
      console.log('needarr', needarr)
      this.list2 = needarr
      // for (let i = 0; i < val.length; i++) {
      //   for (let j = 0; j < nowlistdata.length; j++) {
      //     if (val[i].productCode === nowlistdata[j].productCode) {
      //       break
      //     }
      //   }
      //   this.$refs.editable.insert(val[i])
      // }
      // console.log('nowlistdata=====', nowlistdata)
      // if (nowlistdata.length === 0) {
      //   this.list2 = val
      // } else {
      //   const newarr = Object.assign([], val, nowlistdata)
      //   console.log('newarr===', newarr)
      //   this.list2 = newarr
      // }
    },
    // 调拨金额计算
    getSize(row) {
      row.moveMoney = row.movePrice * row.applyQuantity
      return row.moveMoney
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        applyPersonId: this.$store.getters.userId,
        requestDeptId: this.$store.getters.deptId,
        moveInRepository: this.$store.getters.repositoryId,
        businessStat: '1'
      }
      this.moveOutRepository = this.$store.getters.repositoryName
      this.moveInRepository = ''
      this.applyPersonId = this.$store.getters.name
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      // 保存时同样商品不能有同一个批次
      // let i = 0
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   EnterDetail.map(function(elem2) {
      //     return elem2
      //   }).forEach(function(elem2) {
      //     if (elem2.productCode === elem.productCode && elem2.batch === elem.batch) {
      //       i++
      //     }
      //   })
      // })
      // console.log(i)
      // if (i > EnterDetail.length) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: '同样商品不能有同一个批次',
      //     offset: 100
      //   })
      //   return false
      // }
      // // 批次货位不能为空
      // let j = 1
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
      //     j = 2
      //   }
      // })
      // console.log(j)
      // if (j === 2) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: this.$t('prompt.pchwbnwk'),
      //     offset: 100
      //   })
      //   return false
      // }
      // console.log(this.personalForm)
      // console.log(EnterDetail)
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
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        // if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
        //   delete elem.productCode
        // }
        // if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
        //   delete elem.productName
        // }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        // if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
        //   delete elem.unit
        // }
        // if (elem.price === null || elem.price === '' || elem.price === undefined) {
        //   delete elem.price
        // }
        // if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
        //   delete elem.movePrice
        // }
        // if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
        //   delete elem.moveQuantity
        // }
        // if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
        //   delete elem.totalMoney
        // }
        // if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
        //   delete elem.remarks
        // }
        return elem
      })
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      const parms2 = JSON.stringify(EnterDetail)
      const parm3 = this.personalForm
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              createstoragemove(parms, parms2, parm3).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: 'save successful',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            return false
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Storagemove/NewStoragemove', name: 'NewStoragemove', fullPath: '/Storagemove/NewStoragemove', title: 'NewStoragemove' }
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
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
