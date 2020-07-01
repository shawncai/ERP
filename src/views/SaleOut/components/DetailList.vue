<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-if="personalForm.judgeStat !== 0 || personalForm.judgeStat !== 3" class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <button v-if="personalForm.sourceType === 5" style="font-size: 10px;margin-left: 10px" @click="handleMyReceipt2()">{{ $t('updates.fzdj') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="销售出库单编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerType')" prop="customerType" style="width: 100%;">
                  <span>{{ personalForm.customerType | customerTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerName')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.invoiceNumber')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.invoiceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerPhone')" style="width: 100%;">
                  <span>{{ personalForm.phoneNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.customerAccount')" style="width: 100%;">
                  <span>{{ personalForm.customerAccount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outType')" prop="outType" style="width: 100%;">
                  <span>{{ personalForm.outType | outTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.salePersonId')" prop="salePersonId" style="width: 100%;">
                  <span>{{ personalForm.salePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.saleType')" style="width: 100%;">
                  <span>{{ personalForm.saleType | saleTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.sendDate')" style="width: 100%;">
                  <span>{{ personalForm.sendDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.closeType')" style="width: 100%;">
                  <span>{{ personalForm.settleModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.invoiceType')" style="width: 100%;">
                  <span>{{ personalForm.invoiceTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.payType')" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.transferPersonId')" style="width: 100%;">
                  <span>{{ personalForm.transferPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.saleRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.saleRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.address')" style="width: 100%;">
                  <span>{{ personalForm.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outPersonId')" style="width: 100%;">
                  <span>{{ personalForm.outPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.outDate')" style="width: 100%;">
                  <span>{{ personalForm.outDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.pointSupport')" style="width: 100%;">
                  <span>{{ personalForm.pointSupport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPay.couponSupportOld')" style="width: 100%;">
                  <span>{{ personalForm.couponSupportOld }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.couponSupport')" style="width: 100%;">
                  <span>{{ personalForm.couponSupport }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPay.couponNumbers')" style="width: 100%;">
                  <span>{{ personalForm.couponNumbers }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.ridMoney')" style="width: 100%;">
                  <span>{{ personalForm.ridMoney }}</span>
                </el-form-item>
                <!-- <span style="color: red;font-size: 14px">预售款金额：{{ yushou }}</span> -->
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.ridBikeMoney')" style="width: 100%;">
                  <span>{{ personalForm.ridBikeMoney }}</span>
                </el-form-item>
                <!-- <span style="color: red;font-size: 14px">回收车金额：{{ huishou }}</span> -->
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('SaleOut.receivableMoney')" style="width: 100%;">
                  <span>{{ personalForm.receivableMoneyForDetail }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('update4.shouldMoney')" style="width: 100%;">
                  <span>{{ personalForm.shouldMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.customerPay')" style="width: 100%;">
                  <span>{{ personalForm.customerPay }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.changeMoney')" style="width: 100%;">
                  <span>{{ personalForm.changeMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.receivableMoney')" style="width: 100%;">
                  <span>{{ personalForm.receivableMoney }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('update4.unpayMoney')" style="width: 100%;">
                  <span>{{ personalForm.unpayMoney }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('otherlanguage.yskdk')" style="width: 100%;">
                  <span>{{ personalForm.advanceMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPay.isfree')" style="width: 100%;">
                  <span>{{ personalForm.isFree | isFreeTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tongyo.zbyy')" style="width: 100%;">
                  <span>{{ personalForm.freeReasonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tongyo.useType')" style="width: 100%;">
                  <span>{{ personalForm.useType | useTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tongyo.useMonth')" style="width: 100%;">
                  <span>{{ personalForm.useMonth }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.isAppService')" style="width: 100%;">
                  <span>{{ personalForm.isAppService | isFreeTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.appDiscount')" style="width: 100%;">
                  <span>{{ personalForm.appDiscount }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.ddmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: false, showStatus: false}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" />
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
            <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" />
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.ggxh')" prop="typeName" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" />
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" />
            <el-editable-column :label="$t('updates.cksli')" prop="quantity" align="center" />
            <el-editable-column :label="$t('updates.thsl')" prop="retreatQuantity" align="center" />
            <!-- <el-editable-column prop="salePrice" align="center" :label="$t('updates.lsj')" />
            <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" /> -->
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.ckj')" prop="salePrice" align="center" />
            <!-- <el-editable-column prop="costMoney" align="center" label="成本金额" />
            <el-editable-column prop="includeTaxMoney" align="center" :label="$t('updates.hsje')" /> -->
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" />
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" />
            <!-- <el-editable-column prop="money" align="center" :label="$t('Hmodule.je')" /> -->
            <el-editable-column v-if="jundgeprice()" :label="$t('updates.ckje')" prop="includeTaxCostMoney" align="center" />
            <el-editable-column :formatter="formatter" :label="$t('updates.ckl')" prop="discountRate" align="center"/>
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" />
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" />
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" />
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" />
            <el-editable-column :label="$t('tongyo.chargeCode')" prop="chargeCode" align="center" />
            <el-editable-column :label="$t('tongyo.controlCode')" prop="controlCode" align="center" />

            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" />
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.zpmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" />
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
            <!--            <el-editable-column :label="$t('updates.wpfl')" prop="categoryName" align="center" />-->
            <!--            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" />-->
            <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" />
            <!--            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />-->
            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" />
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" />
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" />
          </el-editable>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('tongyo.zbthd') }}</h2>
        <div class="container">
          <el-editable
            ref="editable3"
            :data.sync="returnlist"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <!-- <el-editable-column type="selection" width="55" align="center"/> -->
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" width="200px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="200px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productTypeName" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <!-- <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/> -->
            <el-editable-column :label="$t('updates.rksl')" prop="quantity" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.djbm')" prop="batteryCode" align="center" />
            <el-editable-column :label="$t('tongyo.chargeCode')" prop="chargeCode" align="center" />
            <el-editable-column :label="$t('tongyo.controlCode')" prop="controlCode" align="center" />
            <el-editable-column :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('update4.wxxm') }}</h2>
        <div class="container">
          <el-editable
            ref="editable4"
            :data.sync="itemlist"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <!-- <el-editable-column type="selection" width="55" align="center"/> -->
            <el-editable-column width="55" align="center" type="index"/>
            <el-editable-column :label="$t('update4.wxcx')" prop="productType" align="center"/>
            <el-editable-column :label="$t('update4.xmmc')" prop="name" align="center" min-width="200"/>
            <el-editable-column :label="$t('update4.bdkhjg')" prop="price" align="center"/>
            <el-editable-column :label="$t('update4.fbdkhjg')" prop="otherPrice" align="center"/>
            <el-editable-column :label="$t('update4.ms')" prop="description" align="center"/>
          </el-editable>
        </div>
      </el-card>

      <!--审核状态-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji1')" style="width: 100%;">
                  <span>{{ personalForm.allQuantity }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji2')" style="width: 100%;">
                  <span>{{ personalForm.allMoney }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji3')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji4')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji5')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji6')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji7')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                  <span>{{ personalForm.allCostMoney }}</span>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji9')" style="width: 100%;">
                  <span>{{ personalForm.allGiftQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji10')" style="width: 100%;">
                  <span>{{ personalForm.allGiftMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
                  <span>{{ personalForm.otherMoney }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
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
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">利润明细</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji3')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji4')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji11')" style="width: 100%;">
                  <span>{{ personalForm.otherMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.heji8')" style="width: 100%;">
                  <span>{{ personalForm.allCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.profit')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxCostMoney - personalForm.allDiscountMoney - personalForm.otherMoney - personalForm.allCostMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.ProfitMargin')" style="width: 100%;">
                  <span>{{ ((personalForm.allIncludeTaxCostMoney - personalForm.allDiscountMoney - personalForm.otherMoney - personalForm.allCostMoney) / personalForm.allCostMoney).toFixed(6) }}</span>
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
import printJS from 'print-js'
import { productlist } from '@/api/public'
var _that
export default {
  filters: {
    useTypeFilter(sta) {
      const statusMap = {
        1: _that.$t('tongyo.jy'),
        2: _that.$t('tongyo.yy')
      }
      return statusMap[sta]
    },
    isFreeTypeFilter(sta) {
      const statusMap = {
        1: 'yes',
        2: 'no'
      }
      return statusMap[sta]
    },
    saleTypeFilter(sta) {
      const statusMap = {

        1: '现金',
        2: '分期'

      }
      return statusMap[sta]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.xsdd'),
        2: _that.$t('updates.xsht'),
        3: _that.$t('updates.ysd'),
        4: _that.$t('updates.xsjh'),
        5: _that.$t('Hmodule.Nosource'),
        6: _that.$t('prompt.eshsd'),
        7: 'bom'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '零售'
      }
      return statusMap[status]
    },
    payModeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    outTypeFilter(status) {
      const statusMap = {
        1: '销售出库',
        2: '换货出库',
        3: '以旧换新'
      }
      return statusMap[status]
    },
    customerTypeFliter(status) {
      const statusMap = {
        1: '经销商',
        2: '零售商'
      }
      return statusMap[status]
    },
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg'),
        4: _that.$t('collectAndPay.lsbc')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
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
      itemlist: [],
      // 退货入库数据
      returnlist: [],
      huishou: '',
      yushou: '',
      // 合计数据
      heji1: '',
      heji2: '',
      // 审核数据
      reviewList: [],
      // 详细表数据
      list2: [],
      list3: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      console.log('this.detaildata', this.detaildata)
      console.log('this.personalForm.receivableMoney', this.personalForm.receivableMoney)
      this.list2 = this.personalForm.saleOutDetailVos
      this.list3 = this.personalForm.saleOutGiftVos
      this.itemlist = this.personalForm.saleOutItems
      this.returnlist = this.personalForm.saleOutRetreatVos
      for (const i in this.list2) {
        this.list2[i].categoryName = this.list2[i].productCategoryName
        this.list2[i].typeName = this.list2[i].productTypeName
      }
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      console.log('list2', this.list2)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleMyReceipt2() {
      console.log('this.detaildata', this.personalForm)
      this.editVisible = false
      this.$store.dispatch('getsaleoutcopy', this.personalForm)
      if (this.detaildata.isFree === 1) {
        this.$router.push('/SaleOut/NewAccessoriesOut')
      } else if (this.detaildata.useMonth) {
        this.$router.push('/SaleOut/NewBatteryOut')
      } else if (this.detaildata.isAppService === 1) {
        this.$router.push('/SaleOut/NewAccessoriesOut')
      } else {
        this.$router.push('/SaleOut/AddSaleOut')
      }
    },
    jundgeprice() {
      if (this.$store.getters.countryId === 2) {
        return true
      }
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
    // 格式化折扣
    formatter(row, column) {
      if (row.discountRate === 1) {
        return 100
      } else {
        return row.discountRate
      }
    },
    // 计划金额
    planMoney(row) {
      row.planMoney = row.basicPrice * row.planQuantity
      return row.planMoney
    },
    // 计算单价和供应商
    basicPrice(row) {
      productlist(row.productCode).then(res => {
        if (res.data.ret === 200) {
          row.basicPrice = res.data.data.content.list[0].purchasePrice
        }
      })
      return row.basicPrice
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      this.heji1 = sums[8]
      this.heji2 = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      return sums
    },
    handlecancel() {
      this.editVisible = false
    },
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
    async printdata() {
      const arr = this.cutnull(this.list2)
      for (const i in arr) {
        arr[i].step = Number(i) + 1
      }
      const handleperson = this.reviewList.map(item => {
        if (item.actualStepHandler) {
          return item.stepHandlerName
        }
      }).join(',')
      console.log(handleperson)
      // 先根据权限判断
      // 权限没有再判断次数是否可以打印
      const param = {}
      param.receiptId = this.personalForm.id
      param.receiptTypeId = 28
      // 有权限跳过管理
      const value = ['1-386-82']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
      if (hasPermission) {
        printJS({
          printable: arr,
          type: 'json',
          properties: [
            { field: 'step', displayName: '行号', columnSize: `100px` },
            { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
            { field: 'productName', displayName: '物料名称', columnSize: `100px` },
            { field: 'productTypeName', displayName: '规格型号', columnSize: `100px` },
            { field: 'unit', displayName: '单位', columnSize: `100px` },
            { field: 'quantity', displayName: '订单数量', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">销售出货单列表</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">客户名称：</div>
                        <div class="itemcontent">${this.personalForm.customerName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">送货日期：</div>
                        <div class="itemcontent">${this.personalForm.sendDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">订单编号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName || ''}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">业务员：</div>
                        <div class="bottomname">${this.personalForm.salePersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">制单：</div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                   </div>
                  </div>`,
          bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
          style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
          '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
          '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: center; align-items: center;margin-top: 10px}' +
          '.item { width: 33%; justify-content: center; align-items: center; display: flex}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 40% }' +
          '.itemcontent {width: 80%}',
          gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
          gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
          repeatTableHeader: true
        })
      } else {
        const printres = await getPrintCount(param)
        if (printres.data.ret === 200) {
          const res2 = printres.data.data.content
          if (res2 !== null && res2.printCount > 0) {
            this.$message.error('打印次数已经消耗完')
            return false
          }
        }
        this.$confirm('该单据只能打印一次，是否确认打印？（此操作为不可逆操作）', 'Warning', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            param.opreaterId = this.$store.getters.userId
            // 加await
            addPrint(param).then(res => {
              if (res.data.ret === 200) {
                const res = res.data.data.content
                console.log('res', res)
              }
            })
            printJS({
              printable: arr,
              type: 'json',
              properties: [
                { field: 'step', displayName: '行号', columnSize: `100px` },
                { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
                { field: 'productName', displayName: '物料名称', columnSize: `100px` },
                { field: 'productTypeName', displayName: '规格型号', columnSize: `100px` },
                { field: 'unit', displayName: '单位', columnSize: `100px` },
                { field: 'quantity', displayName: '订单数量', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">销售出货单列表</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">客户名称：</div>
                        <div class="itemcontent">${this.personalForm.customerName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">送货日期：</div>
                        <div class="itemcontent">${this.personalForm.sendDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">订单编号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName || ''}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">业务员：</div>
                        <div class="bottomname">${this.personalForm.salePersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">制单：</div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                   </div>
                  </div>`,
              bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
              style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
          '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
          '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: center; align-items: center;margin-top: 10px}' +
          '.item { width: 33%; justify-content: center; align-items: center; display: flex}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 40% }' +
          '.itemcontent {width: 80%}',
              gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
              gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
              repeatTableHeader: true
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '确认取消'
                : '停留在当前页面'
            })
          })
      }
      // 点击取消后执行的操作
    }
  }
}
</script>

<style scoped>
/* 修改css样式 */
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
