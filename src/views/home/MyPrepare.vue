<template>
  <div class="ERP-container">
    <div class="shipei" style="margin-top: 15px;float: left;width: 18%; height: 110px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
      <div class="shipei2" style="width:60%;margin-left: 30%;margin-top: 7%;font-size: 21px; color:black">待办任务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ deskdata.one }}</div>
    </div>
    <div class="shipei" style="margin-top: 15px;margin-left: 2%;float: left;width: 18%; height: 110px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
      <div class="shipei2" style="width:60%;margin-left: 30%;margin-top: 7%;font-size: 21px; color:black">待办事件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ deskdata.two }}</div>
    </div>
    <div class="shipei" style="margin-top: 15px;margin-left: 2%;float: left;width: 18%; height: 110px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
      <div class="shipei2" style="width:60%;margin-left: 30%;margin-top: 7%;font-size: 21px; color:black">待办审批&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ deskdata.three }}</div>
    </div>
    <div class="shipei" style="margin-top: 15px;margin-left: 2%;float: left;width: 18%; height: 110px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
      <div class="shipei2" style="width:60%;margin-left: 30%;margin-top: 7%;font-size: 21px; color:black">待分配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ deskdata.four }}</div>
    </div>
    <div class="shipei" style="margin-top: 15px;margin-left: 2%;float: left;width: 18%; height: 110px;background: white;display: flex;align-items: center;justify-content: center;flex-wrap: wrap" >
      <div class="shipei2" style="width:60%;margin-left: 30%;margin-top: 7%;font-size: 21px; color:black">代付款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ deskdata.five }}</div>
    </div>
    <div class="filter-container">

      <!--      第一大行开始-->
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">盘点任务</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt99()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list99"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/InventoryCount/InventoryCountList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">客户分期收款</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt2()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list1"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/CollectList/index">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">线下任务</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt3()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list2"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>

      <!--      第二大行开始-->

        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">售后维修</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt4()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list3"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/Repair/RepairList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">客户回访</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt5()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list4"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/CustomerMarketing/CustomerVisitList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>


        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">分期申请待查客户</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt6()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list5"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">最新采购任务</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt7()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list6"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/StockPlan/StockPlanList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>


        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">最新生产计划</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt8()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list7"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/ProducePlan/ProducePlanList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">最新生产任务</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt9()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list8"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/ProduceTask/ProduceTaskList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>


        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">待入库</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt10()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list9"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">待出库</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt11()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list10"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/SaleOut/SaleOutList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>

        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">待审批</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list11"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span style="cursor: pointer" @click="getlink2(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 60px">
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">待分配</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt12()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list12"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>

        <!--        我的待办-->
        <el-col :span="12" style="height: 200px;">
          <div style="width: 100%; height: 200px;margin-top: 20px;" >
            <div style="width: 100%; height: 30px;background: #d9e0e8;" >
              <div style="padding-top: 7px;float: left;margin-left: 20px">待付款</div>
              <div style="padding-top: 7px;float: right;color: grey;margin-right: 20px;cursor: pointer" @click="handleReceipt13()">{{ $t('index.more') }}</div>
            </div>
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list13"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/payment/paymentList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
<!--      客户分期收款-->
      <el-dialog :visible.sync="receiptVisible2" title="客户分期收款" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list1"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/CollectList/index">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible3" title="线下任务" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list2"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible4" title="售后维修" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list3"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/Repair/RepairList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible5" title="客户回访" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list4"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/CustomerMarketing/CustomerVisitList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible6" title="分期申请待查客户" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list5"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible7" title="最新采购任务" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list6"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/StockPlan/StockPlanList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible8" title="最新生产计划" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list7"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/ProducePlan/ProducePlanList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible9" title="最新生产任务" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list8"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/ProduceTask/ProduceTaskList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible10" title="待入库" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list9"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible99" title="盘点任务" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list99"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/InventoryCount/InventoryCountList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible11" title="待出库" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list10"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/SaleOut/SaleOutList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
<!--      待审批-->
      <el-dialog :visible.sync="receiptVisible" title="待审批" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; min-height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list11"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="100%">
                  <template slot-scope="scope">
<!--                    <span @click="getlink(scope.row)"><router-link to=step1>{{ scope.row.name }}</router-link></span>-->
                    <span style="cursor: pointer" @click="getlink2(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible12" title="待分配" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list12"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="receiptVisible13" title="待付款" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list13"
                height="390"
                :show-header="false"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
                <el-table-column :resizable="false" align="left" min-width="150">
                  <template slot-scope="scope">
                    <span @click="getlink(scope.row)"><router-link to="/payment/paymentList">{{ scope.row.name }}</router-link></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { searchsaleOrder, deletesaleOrder, updatesaleOrder2 } from '@/api/SaleOrder'
  import { searchalarm } from '@/api/StockAlarm'
  import { applyList } from '@/api/StockApply'
  import { workDesk1, workDesk2, workDesk3 } from '@/api/home'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination'
  import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import MyEmp from './components/MyEmp'
  import DetailList from './components/DetailList'
  import MyDialog from './components/MyDialog'
  import MyCustomer from './components/MyCustomer'
  import MyAgent from './components/MyAgent'

  export default {
    name: 'MyPrepare',
    directives: { waves, permission, permission2 },
    components: { MyDialog, DetailList, MyEmp, MyCustomer, MyAgent, Pagination },
    filters: {
      judgeStatFilter(status) {
        const statusMap = {
          0: '未审核',
          1: '审核中',
          2: '审核通过',
          3: '审核不通过'
        }
        return statusMap[status]
      },
      receiptStatFilter(status) {
        const statusMap = {
          1: '制单',
          2: '执行',
          3: '结单'
        }
        return statusMap[status]
      },
      stockTypeFilter(status) {
        const statusMap = {
          1: '采购1'
        }
        return statusMap[status]
      },
      sendTypeFilter(status) {
        const statusMap = {
          1: '已发货',
          2: '未发货'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        step1: '',
        step2: '',
        step3: '',
        step4: '',
        step5: '',
        step6: '',
        step7: '',
        step8: '',
        receiptVisible: false,
        receiptVisible2: false,
        receiptVisible3: false,
        receiptVisible4: false,
        receiptVisible5: false,
        receiptVisible6: false,
        receiptVisible7: false,
        receiptVisible8: false,
        receiptVisible9: false,
        receiptVisible99: false,
        receiptVisible10: false,
        receiptVisible11: false,
        receiptVisible12: false,
        receiptVisible13: false,
        editVisible: false,
        deskdata: {
          ones: ''
        },
        // 回显客户
        customerName: '',
        // 控制客户
        customercontrol: false,
        agentcontrol: false,
        // 类别获取参数
        typeparms: {
          pagenum: 1,
          pagesize: 99999
        },
        // 采购类别数据
        types: [],
        // 申请部门数据
        depts: [],
        // 审核传参
        reviewParms: {
          id: '',
          judgePersonId: '',
          judgeStat: ''
        },
        // 详情组件数据
        detailvisible: false,
        // 更多搜索条件问题
        visible2: false,
        // 供应商回显
        supplierId: '',
        // 供应商控制框
        empcontrol: false,
        // 采购人回显
        stockPersonId: '',
        // 采购人控制框
        stockControl: false,
        // 批量操作
        moreaction: '',
        // 加载操作控制
        downloadLoading: false,
        // 表格数据
        list: [],
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list7: [],
        list8: [],
        list9: [],
        list10: [],
        list11: [],
        list12: [],
        list13: [],
        list99: [],
        applyList: [],
        // 表格数据条数
        total: 0,
        // 表格识别
        tableKey: 0,
        // 加载表格
        listLoading: true,
        // 采购申请查询加展示参数
        getemplist: {
          pageNum: 1,
          pageSize: 10,
          repositoryId: this.$store.getters.repositoryId,
          regionIds: this.$store.getters.regionId
        },
        getemplist2: {
          pageNum: 1,
          pageSize: 999,
          repositoryId: this.$store.getters.repositoryId,
          regionIds: this.$store.getters.regionId,
          employeeId: this.$store.getters.userId
        },
        // 传给组件的数据
        personalForm: {},
        // 修改控制组件数据
        editVisible: false,
        // 开始时间到结束时间
        date: []
      }
    },
    mounted() {
      this.getlist()
    },
    methods: {
      // 进程操作
      handleReceipt(row) {
        this.receiptVisible = true
        console.log('row', row)
      },
      handleReceipt2(row) {
        this.receiptVisible2 = true
        console.log('row', row)
      },
      handleReceipt99(row) {
        this.receiptVisible99 = true
        console.log('row', row)
      },
      handleReceipt3(row) {
        this.receiptVisible3 = true
        console.log('row', row)
      },
      handleReceipt4(row) {
        this.receiptVisible4 = true
        console.log('row', row)
      },
      handleReceipt5(row) {
        this.receiptVisible5 = true
        console.log('row', row)
      },handleReceipt6(row) {
        this.receiptVisible6 = true
        console.log('row', row)
      },handleReceipt7(row) {
        this.receiptVisible7 = true
        console.log('row', row)
      },handleReceipt8(row) {
        this.receiptVisible8 = true
        console.log('row', row)
      },handleReceipt9(row) {
        this.receiptVisible9 = true
        console.log('row', row)
      },handleReceipt10(row) {
        this.receiptVisible10 = true
        console.log('row', row)
      },handleReceipt11(row) {
        this.receiptVisible11 = true
        console.log('row', row)
      },handleReceipt12(row) {
        this.receiptVisible12 = true
        console.log('row', row)
      },handleReceipt13(row) {
        this.receiptVisible13 = true
        console.log('row', row)
      },
      // 修改操作
      handleEdit(row) {
        console.log(row)
        this.editVisible = true
      },
      getlink2(row){
        console.log('123', row.receiptTypeId)
        if (row.receiptTypeId === 5) {
          this.$router.push("/StockApply/StockApplyList");
        }
        if (row.receiptTypeId === 6) {
          this.$router.push("/StockPlan/StockPlanList");
        }
        if (row.receiptTypeId === 7) {
          this.$router.push("/StockInquiry/StockInquiryList");
        }
        if (row.receiptTypeId === 8) {
          this.$router.push("/StockContract/StockContractList");
        }
        if (row.receiptTypeId === 9) {
          this.$router.push("/StockOrder/StockOrderList");
        }
        if (row.receiptTypeId === 10) {
          this.$router.push("/QualityCheck/QualityCheckList");
        }
        if (row.receiptTypeId === 11) {
          this.$router.push("/CheckReport/CheckReportList");
        }
        if (row.receiptTypeId === 12) {
          this.$router.push("/CheckFail/CheckFailList");
        }
        if (row.receiptTypeId === 13) {
          this.$router.push("/StockArrival/StockArrivalList");
        }
        if (row.receiptTypeId === 14) {
          this.$router.push("/StockRetreat/StockRetreatList");
        }
        if (row.receiptTypeId === 24) {
          this.$router.push("/InstallmentApply/InstallmentApplyList");
        }
        if (row.receiptTypeId === 25) {
          this.$router.push("/PrepReceipt/PrepReceiptList");
        }
        if (row.receiptTypeId === 26) {
          this.$router.push("/payment/paymentList");
        }
        if (row.receiptTypeId === 28) {
          this.$router.push("/SaleOut/SaleOutList");
        }
        if (row.receiptTypeId === 29) {
          this.$router.push("/SaleOrder/SaleOrderList");
        }
        if (row.receiptTypeId === 30) {
          this.$router.push("/SaleReturn/SaleReturnList");
        }
        if (row.receiptTypeId === 31) {
          this.$router.push("/SalePlan/SalePlanList");
        }
        if (row.receiptTypeId === 32) {
          this.$router.push("/SaleOpportunity/SaleOpportunityList");
        }
        if (row.receiptTypeId === 33) {
          this.$router.push("/SaleContract/SaleContractList");
        }
        if (row.receiptTypeId === 36) {
          this.$router.push("/Advancemanage/AdvanceOrderList");
        }
        if (row.receiptTypeId === 37) {
          this.$router.push("/Advancemanage/PrepReturnList");
        }
        if (row.receiptTypeId === 38) {
          this.$router.push("/income/IncomeList");
        }
        if (row.receiptTypeId === 39) {
          this.$router.push("/Expenses/ExpensesList");
        }
        if (row.receiptTypeId === 40) {
          this.$router.push("/Transfer/TransferList");
        }
        if (row.receiptTypeId === 41) {
          this.$router.push("/Recycling/RecyclingList");
        }
        if (row.receiptTypeId === 42) {
          this.$router.push("/PrepReceipt/PrepReceiptList");
        }
        if (row.receiptTypeId === 45) {
          this.$router.push("/Stockenter/Stockenterlist");
        }
        if (row.receiptTypeId === 46) {
          this.$router.push("/Stockenter/ProduceEnterList");
        }
        if (row.receiptTypeId === 47) {
          this.$router.push("/Stockenter/OtherEnterList");
        }
        if (row.receiptTypeId === 48) {
          this.$router.push("/StockOut/OtherStockOutList");
        }
        if (row.receiptTypeId === 49) {
          this.$router.push("/Storagemove/StoragemoveList");
        }
        if (row.receiptTypeId === 51) {
          this.$router.push("/Inventorydamaged/InventorydamagedList");
        }
        if (row.receiptTypeId === 52) {
          this.$router.push("/InventoryCount/InventoryCountList");
        }
        if (row.receiptTypeId === 53) {
          this.$router.push("/InventoryOverflow/OverflowList");
        }
        if (row.receiptTypeId === 54) {
          this.$router.push("/AdjustPrice/AdjustPriceList");
        }
        if (row.receiptTypeId === 55) {
          this.$router.push("/BuildUp/BuildUpList");
        }
        if (row.receiptTypeId === 56) {
          this.$router.push("/TearDown/TearDownList");
        }
        if (row.receiptTypeId === 57) {
          this.$router.push("/DailyAdjust/DailyAdjustList");
        }
        if (row.receiptTypeId === 58) {
          this.$router.push("/WarehouseAdjust/Enterlist");
        }
        if (row.receiptTypeId === 60) {
          this.$router.push("/locationAdjust/LocationAdjustList");
        }
        if (row.receiptTypeId === 61) {
          this.$router.push("/Collection/RecoverVehicleList");
        }
        if (row.receiptTypeId === 63) {
          this.$router.push("/Receipt/ReceiptList");
        }
        if (row.receiptTypeId === 65) {
          this.$router.push("/ProducePlan/ProducePlanList");
        }
        if (row.receiptTypeId === 66) {
          this.$router.push("/RequirePlan/RequirePlanList");
        }
        if (row.receiptTypeId === 67) {
          this.$router.push("/ProduceTask/ProduceTaskList");
        }
        if (row.receiptTypeId === 68) {
          this.$router.push("/ProduceTask/ProduceReportList");
        }
        if (row.receiptTypeId === 69) {
          this.$router.push("/AccessMaterials/AccessMaterialsList");
        }
        if (row.receiptTypeId === 70) {
          this.$router.push("/AccessMaterials/RetreatMaterialsList");
        }
        if (row.receiptTypeId === 71) {
          this.$router.push("/OutSourcing/OutSourcingList");
        }
        if (row.receiptTypeId === 76) {
          this.$router.push("/ProductCost/ProductCostList");
        }
      },
      getlink(row){
        console.log('123', row)
      },
      checkPermission,
      // 不让勾选
      selectInit(row, index) {
        if (row.judgeStat !== 0) {
          return false
        } else {
          return true
        }
      },
      // 选择客户类型时清理客户名称
      clearCustomer() {
        this.getemplist.customerId = ''
        this.customerName = ''
      },
      // 选择客户focus
      chooseCustomer() {
        if (this.getemplist.customerType === '1') {
          this.agentcontrol = true
        } else if (this.getemplist.customerType === '2') {
          this.customercontrol = true
        }
      },
      customerdata(val) {
        this.getemplist.customerId = val.id
        this.customerName = val.customerName
      },
      agentdata(val) {
        this.getemplist.customerId = val.id
        this.customerName = val.agentName
      },
      // 更新采购类型
      updatecountry() {
        this.getlist()
      },
      getlist() {
        this.listLoading = true
        workDesk3(this.getemplist2).then(res => {
          if (res.data.ret === 200) {
            console.log('toDoTask', res.data.data.toDoTask)
            this.deskdata.one = res.data.data.toDoTask
            console.log(this.deskdata.ones)
            this.deskdata.two = res.data.data.toDoEvent
            this.deskdata.three = res.data.data.toJudge
            this.deskdata.four = 0
            this.deskdata.five = res.data.data.toPay
            this.list1 = res.data.data.installmentOrderDetailVos.map(function (item) {
              return {
                name: '你有分期收款明细序号为'+item.id + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list2 = res.data.data.taskOfflineVos.map(function (item) {
              return {
                name: '你有线下任务序号为'+item.id + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list3 = res.data.data.serviceList.map(function (item) {
              return {
                name: '你有售后维修序号为'+item.id + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list4 = res.data.data.customerVisitVos.map(function (item) {
              return {
                name: '你有客户回访单编号为'+item.visitNumber + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list5 = res.data.data.installmentApplyVos.map(function (item) {
              return {
                name: '你有分期申请单编号为'+item.applyNumber + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list6 = res.data.data.stockPlanVos.map(function (item) {
              return {
                name: '你有采购计划单编号为'+item.planNumber + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list7 = res.data.data.producePlanVos.map(function (item) {
              return {
                name: '你有生产计划单编号为'+item.planNumber + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list8 = res.data.data.produceTaskVos.map(function (item) {
              return {
                name: '你有采购计划单编号为'+item.taskNumber + '的事件请尽快处理',
                createTime: item.createTime
              }
            })
            this.list99 = res.data.data.inventoryCountVos.map(function (item) {
              return {
                name: '你有库存盘点单编号为'+item.countNumber + '的任务请尽快处理',
                createTime: item.createTime
              }
            })
            this.list9 = res.data.data.producePlanVos.map(function (item) {
              // return {
              //   name: '你有采购出库单编号为'+item.number + '的事件请尽快处理',
              //   createTime: item.createTime
              // }
            })
            this.list10 = res.data.data.saleOutVos.map(function (item) {
              return {
                name: '你有采购出库单编号为'+item.number + '的事件请尽快处理',
                createTime: item.createTime
              }
            })
            this.list11 = res.data.data.approvalUseVos.map(function (item) {
              return {
                name: '有'+item.recieptName + '需要你审批，请尽快处理',
                createTime: item.createTime,
                receiptTypeId: item.receiptTypeId
              }
            })
            this.list12 = res.data.data.produceTaskVos.map(function (item) {
              // return {
              //   name: '你有采购计划单编号为'+item.taskNumber + '的任务请尽快处理',
              //   createTime: item.createTime
              // }
            })
            this.list13 = res.data.data.paymentVos.map(function (item) {
              return {
                name: '你有付款单编号为'+item.paymentNumber + '的待付款请尽快处理',
                createTime: item.createTime
              }
            })
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      },
      // 清空搜索条件
      restFilter() {
        this.customerName = ''
        this.getemplist.customerId = ''
        this.stockPersonId = ''
        this.getemplist.stockPersonId = ''
      },
      // 搜索
      handleFilter() {
        this.getemplist.pageNum = 1
        searchsaleOrder(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
            this.restFilter()
          } else {
            this.restFilter()
          }
        })
      },
      // 采购人focus事件
      handlechooseStock() {
        this.stockControl = true
      },
      // 采购人回显
      stockName(val) {
        this.stockPersonId = val.personName
        this.getemplist.stockPersonId = val.id
      },
      // 供应商输入框focus事件触发
      handlechoose() {
        this.empcontrol = true
      },
      // 供应商列表返回数据
      supplierName(val) {
        console.log(val)
        this.supplierId = val.supplierName
        this.getemplist.supplierId = val.id
      },
      // 修改操作
      handleEdit(row) {
        console.log(row)
        this.editVisible = true
        this.personalForm = Object.assign({}, row)
        // this.personalForm.sourceType = String(row.sourceType)
        if (row.currency !== null) {
          this.personalForm.currency = String(row.currency)
        }
        if (row.customerType !== null) {
          this.personalForm.customerType = String(row.customerType)
        }
        if (row.payMode !== null) {
          this.personalForm.payMode = String(row.payMode)
        }
        if (row.saleType !== null) {
          this.personalForm.saleType = String(row.saleType)
        }
        if (row.payType !== null) {
          this.personalForm.payType = String(row.payType)
        }
        if (row.payType !== null) {
          this.personalForm.payType = String(row.payType)
        }
      },
      // 修改组件修改成功后返回
      refreshlist(val) {
        if (val === true) {
          this.getlist()
        }
      },
      // 详情操作
      handleDetail(row) {
        console.log(row)
        this.detailvisible = true
        this.personalForm = Object.assign({}, row)
      },
      // 判断审核按钮
      isReview(row) {
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
      // 审批操作
      handleReview(row) {
        this.reviewParms.id = row.id
        this.reviewParms.judgePersonId = this.$store.getters.userId
        this.$confirm('请审核', '审核', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '不通过',
          type: 'warning'
        }).then(() => {
          this.reviewParms.judgeStat = 2
          const parms = JSON.stringify(this.reviewParms)
          updatesaleOrder2(parms).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: '审核成功!'
              })
              this.getlist()
            }
          })
        }).catch(action => {
          if (action === 'cancel') {
            this.reviewParms.judgeStat = 3
            const parms = JSON.stringify(this.reviewParms)
            updatesaleOrder2(parms).then(res => {
              if (res.data.ret === 200) {
                this.$message({
                  type: 'success',
                  message: '审核成功!'
                })
                this.getlist()
              }
            })
          }
        })
      },
      // 批量操作
      handleSelectionChange(val) {
        this.moreaction = val
      },
      // 多条删除
      // 批量删除
      handleCommand(command) {
        const ids = this.moreaction.map(item => item.id).join()
        if (command === 'delete') {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deletesaleOrder(ids, this.$store.getters.userId).then(res => {
              if (res.data.ret === 200 || res.data.ret === 100) {
                this.$notify({
                  title: '删除成功',
                  type: 'success',
                  offset: 100
                })
                this.getlist()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '出错了',
                  offset: 100
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      // 单条删除
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletesaleOrder(row.id, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 新增数据
      handleAdd() {
        this.$router.push('/SaleOrder/AddSaleOrder')
      },
      // 导出
      handleExport() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'SaleOrderName', 'SaleOrderShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '经销商资料表'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
      // 打印
      handlePrint() {
        console.log(456)
      },
      // 仓库列表focus事件触发
      handlechooseRep() {
        this.repositorycontrol = true
      },
      repositoryname(val) {
        console.log(val)
        this.enterRepositoryId = val.repositoryName
        this.getemplist.enterRepositoryId = val.id
      },
      // 部门列表focus刷新
      updatedept() {
        this.getlist()
      },
      // 交货人foucs事件触发
      handlechooseDelivery() {
        this.deliverycontrol = true
      },
      deliveryName(val) {
        this.deliveryPersonId = val.personName
        this.getemplist.deliveryPersonId = val.id
      },
      // 验收人focus事件触发
      handlechooseAccept() {
        this.accetpcontrol = true
      },
      acceptName(val) {
        this.acceptPersonId = val.personName
        this.getemplist.acceptPersonId = val.id
      }
    }
  }
</script>

<style rel="stylesheet/css" scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 400px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
  @media screen and (max-width: 1400px) {
    .shipei {
      height: 80px !important;
      font-size: 14px !important;
    }
    .shipei2 {
      /*width: 63% !important;*/
      font-size: 14px !important;
    }
    .shipei3 {
      width: 100% !important;
      font-size: 14px !important;
    }
    .shipei4 {
      width: 66% !important;
      font-size: 14px !important;
    }
    .shipei5 {
      width: 52% !important;
      font-size: 14px !important;
    }
  }
</style>
