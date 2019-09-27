<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.applyNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="width: 100%;">
                <el-input v-model="personalForm.firstName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                <el-input v-model="personalForm.middleName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="width: 100%;">
                <el-input v-model="personalForm.lastName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.age')" style="width: 100%;" class="redable">
                <el-input-number v-model="personalForm.age" :precision="0" :controls="false" :step="0.1" :min="1" :max="120" style="margin-left: 18px;width: 200px;text-align: left" @blur="completeRate()"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.liveStauts')" style="width: 100%;">
                <el-select v-model="personalForm.liveStauts" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option value="1" label="和亲戚一起居住"/>
                  <el-option value="2" label="租房"/>
                  <el-option value="3" label="按揭"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyPhone')" style="width: 100%;">
                <el-input-number v-model="personalForm.applyPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyCellPhone')" prop="applyCellPhone" style="width: 100%;">
                <el-input-number v-model="personalForm.applyCellPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
              </el-form-item>
            </el-col>
            <!--              <el-col :span="12">-->
            <!--                <el-form-item :label="$t('InstallmentApply.provinceId')" prop="provinceId" style="width: 100%;">-->
            <!--                  <el-select v-model="personalForm.provinceId" style="margin-left: 18px;width: 200px" @change="handlechange2">-->
            <!--                    <el-option-->
            <!--                      v-for="(item, index) in provinces"-->
            <!--                      :key="index"-->
            <!--                      :label="item.name"-->
            <!--                      :value="item.id"/>-->
            <!--                  </el-select>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->
            <!--              <el-col :span="12">-->
            <!--                <el-form-item :label="$t('InstallmentApply.cityId')" prop="cityId" style="width: 100%;">-->
            <!--                  <el-select v-model="personalForm.cityId" style="margin-left: 18px;width: 200px">-->
            <!--                    <el-option-->
            <!--                      v-for="(item, index) in cities"-->
            <!--                      :key="index"-->
            <!--                      :label="item.name"-->
            <!--                      :value="item.id"/>-->
            <!--                  </el-select>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.currentAddress')" prop="currentAddress" style="width: 100%;">
                <el-input v-model="personalForm.currentAddress" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.permanentAddress')" prop="permanentAddress" style="width: 100%;">
                <el-input v-model="personalForm.permanentAddress" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.email')" prop="email" style="width: 100%;">
                <el-input v-model="personalForm.email" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.gender')" style="width: 100%;">
                <el-radio-group v-model="personalForm.gender" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.marriageStat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.marriageStat" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">未婚</el-radio>
                  <el-radio :label="2">已婚</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                <el-select v-model="personalForm.certificateType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="身份证"/>
                  <el-option value="2" label="其他"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.certificateNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstMoney')" prop="firstMoney" style="width: 100%;">
                <el-input-number v-model="personalForm.firstMoney" :precision="2" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="changeTotalMoney"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentCount')" prop="installmentCount" style="width: 100%;">
                <el-select v-model="personalForm.installmentCount" clearable style="margin-left: 18px;width: 200px" @change="changeRate">
                  <el-option
                    v-for="(item, index) in installmentCounts"
                    :key="index"
                    :value="item.installmentCount"
                    :label="item.installmentCount"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="width: 100%;">
                <el-input-number v-model="personalForm.installmentDays" :controls="false" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="width: 100%;">
                <el-input v-model="personalForm.totalMoney" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="width: 100%;">
                <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" prop="saleRepositoryId" style="width: 100%;">
                <el-input v-model="saleRepositoryId" :disabled="IsSalesaleRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyDate')" prop="applyDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.applyDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">商品信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="productForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="width: 100%;">
                <el-input v-model="productForm.productCode" style="margin-left: 18px;width: 200px" @focus="handlemater" @change="changeTotalMoney"/>
              </el-form-item>
            </el-col>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productName')" style="width: 100%;">
                <el-input v-model="productForm.productName" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.color')" style="width: 100%;">
                <el-input v-model="productForm.color" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.typeId')" style="width: 100%;">
                <el-input v-model="typeName" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.unit')" style="width: 100%;">
                <el-input v-model="productForm.unit" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.categoryId')" style="width: 100%;">
                <el-input v-model="categoryName" disabled style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">
                <el-input v-model="productForm.carCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">
                <el-input v-model="productForm.motorCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">
                <el-input v-model="productForm.batteryCode" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">配偶信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstName')" style="width: 100%;">
                <el-input v-model="personalForm.mateFirstName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                <el-input v-model="personalForm.mateMiddleName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.lastName')" style="width: 100%;">
                <el-input v-model="personalForm.mateLastName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.age')" style="width: 100%;">
                <el-input v-model="personalForm.mateAge" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.mateBirthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.liveStauts')" style="width: 100%;">
                <el-select v-model="personalForm.mateLiveStauts" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                  <el-option value="1" label="和亲戚一起居住"/>
                  <el-option value="2" label="租房"/>
                  <el-option value="3" label="按揭"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.matePhone')" style="width: 100%;">
                <el-input v-model="personalForm.matePhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.email')" style="width: 100%;">
                <el-input v-model="personalForm.mateEmail" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">工作信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="申请者" name="first">
            <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                    <el-select v-model="personalForm.workType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                      <el-option value="1" label="被雇佣"/>
                      <el-option value="2" label="自由职业"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                    <el-input v-model="personalForm.enterpriseName" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                    <el-input v-model="personalForm.workAddress" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                    <el-input v-model="personalForm.currentPost" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workTime')" style="width: 100%;">
                    <el-input v-model="personalForm.workTime" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                    <el-input v-model="personalForm.enterprisePhone" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                    <el-input v-model="personalForm.taxNumber" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                    <el-input v-model="personalForm.salary" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.otherIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.allIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                    <el-input v-model="personalForm.monthlyDebt" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                    <el-input v-model="personalForm.otherExpend" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.monthlyIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="配偶" name="second">
            <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                    <el-select v-model="personalForm.mateWorkType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                      <el-option value="1" label="被雇佣"/>
                      <el-option value="2" label="自由职业"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                    <el-input v-model="personalForm.mateEnterpriseName" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                    <el-input v-model="personalForm.mateWorkAddress" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                    <el-input v-model="personalForm.mateCurrentPost" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workTime')" style="width: 100%;">
                    <el-input v-model="personalForm.mateWorkTime" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                    <el-input v-model="personalForm.mateEnterprisePhone" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                    <el-input v-model="personalForm.mateTaxNumber" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                    <el-input v-model="personalForm.mateSalary" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.mateOtherIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.mateAllIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                    <el-input v-model="personalForm.mateMonthlyDebt" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                    <el-input v-model="personalForm.mateOtherExpend" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="width: 100%;">
                    <el-input v-model="personalForm.mateMonthlyIncome" style="margin-left: 18px;width: 200px"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">征询人信息</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddproduct">添加征询人</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="consultancyName" align="center" label="姓名" min-width="150px"/>
          <el-editable-column prop="consultancyPhone" align="center" label="联系电话" min-width="150px"/>
          <el-editable-column prop="consultancyAddress" align="center" label="地址" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateapply } from '@/api/InstallmentApply'
import { getprovincelist, getcitylist, existList } from '@/api/public'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
export default {
  components: { MyMater, MyDetail, MyEmp },
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
    const validatePass = (rule, value, callback) => {
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('请选择销售人员'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.productForm.productCode === undefined || this.productForm.productCode === null || this.productForm.productCode === '') {
        callback(new Error('请选择商品'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.saleRepositoryId === undefined || this.saleRepositoryId === null || this.saleRepositoryId === '') {
        callback(new Error('请选择销售门店'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.totalMoney === undefined || this.personalForm.totalMoney === null || this.personalForm.totalMoney === '') {
        callback(new Error('请输入基本信息'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.installmentCount === undefined || this.personalForm.installmentCount === null || this.personalForm.installmentCount === '') {
        callback(new Error('请选择分期期数'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.transDate).getTime() - 8.64e7
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 分期数据
      installmentCounts: [],
      list2: [],
      // 分期期数参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 回显规格型号
      typeName: '',
      // 回显分类
      categoryName: '',
      // 控制编辑分期商品数据
      IsProductName: false,
      IsColor: false,
      IsTypeId: false,
      IsUnit: false,
      IsCategoryId: false,
      IskpiGrade: false,
      Ispoint: false,
      IsCarCode: false,
      IsmotorCode: false,
      IsbatteryCode: false,
      IstotalMoney: false,
      peopleVisible: false,
      // 控制编辑销售门店
      IsSalesaleRepositoryId: false,
      // 担保人市数据
      cities3: [],
      // 工作企业市数据
      cities2: [],
      rate: '',
      // 申请人市数据
      cities: [],
      // 申请人省数据
      provinces: [],
      activeName: 'first',
      // 回显门店
      saleRepositoryId: '',
      // 控制销售门店
      repositorycontrol: false,
      // 销售人员回显
      salePersonId: '',
      // 控制销售人员
      stockControl: false,
      // 控制分期商品列表窗口
      matercontrol: false,
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        gender: 1,
        firstMoney: 0.0
      },
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        applyCellPhone: [
          { required: true, message: '请输入移动电话', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        applyPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        currentAddress: [
          { required: true, message: '请输入当前地址', trigger: 'blur' }
        ],
        permanentAddress: [
          { required: true, message: '请输入永久地址', trigger: 'blur' }
        ],
        installmentCount: [
          { required: true, validator: validatePass5, trigger: 'change' }
        ],
        firstMoney: [
          { required: true, message: '请输入首付金额', trigger: 'blur' }
        ],
        totalMoney: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ],
        installmentDays: [
          { required: true, message: '请输入第一期收款天数', trigger: 'blur' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        productCode: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        suretyName: [
          { required: true, message: '请输入担保人姓名', trigger: 'blur' }
        ],
        suretyPhone: [
          { required: true, message: '请输入担保人电话', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请选择担保人关系', trigger: 'change' }
        ],
        suretyProvinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        suretyCityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        saleRepositoryId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      editVisible: this.editcontrol
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.salePersonId = this.personalForm.salePersonName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.getprovince()
      this.handlechange2(this.personalForm.provinceId)
      this.handlechangeworkProvince(this.personalForm.workProvinceId)
      this.handlechangesuretyProvince(this.personalForm.suretyProvinceId)
      this.productForm = this.personalForm.installmentApplyDetailVos[0]
      this.typeName = this.personalForm.installmentApplyDetailVos[0].productType
      this.categoryName = this.personalForm.installmentApplyDetailVos[0].productCategory
      const lis = {}
      lis.consultancyName = this.personalForm.consultancyNameOne
      lis.consultancyPhone = this.personalForm.consultancyPhoneOne
      lis.consultancyAddress = this.personalForm.consultancyAddressOne
      this.list2.push(lis)
      console.log('lis', lis)
      if (this.personalForm.consultancyNameTwo !== null && this.personalForm.consultancyPhoneTwo !== null && this.personalForm.consultancyAddressTwo !== null && this.personalForm.consultancyNameTwo !== '' && this.personalForm.consultancyPhoneTwo !== '' && this.personalForm.consultancyAddressTwo !== '' && this.personalForm.consultancyNameTwo !== undefined && this.personalForm.consultancyPhoneTwo !== undefined && this.personalForm.consultancyAddressTwo !== undefined) {
        const lis2 = {}
        lis2.consultancyName = this.personalForm.consultancyNameOne
        lis2.consultancyPhone = this.personalForm.consultancyPhoneOne
        lis2.consultancyAddress = this.personalForm.consultancyAddressOne
        this.list2.push(lis2)
      }
    }
  },
  created() {
    this.getdatatime()
    this.getprovince()
    this.getratelist()
  },
  methods: {
    handlesave2() {
      if (this.personalForm.consultancyName !== null && this.personalForm.consultancyPhone !== null && this.personalForm.consultancyAddress !== null && this.personalForm.consultancyName !== '' && this.personalForm.consultancyPhone !== '' && this.personalForm.consultancyAddress !== '' && this.personalForm.consultancyName !== undefined && this.personalForm.consultancyPhone !== undefined && this.personalForm.consultancyAddress !== undefined) {
        const lis = {}
        lis.consultancyName = this.personalForm.consultancyName
        lis.consultancyPhone = this.personalForm.consultancyPhone
        lis.consultancyAddress = this.personalForm.consultancyAddress
        this.$refs.editable.insert(lis)
        this.peopleVisible = false
        this.personalForm.consultancyName = null
        this.personalForm.consultancyPhone = undefined
        this.personalForm.consultancyAddress = null
        console.log('consultancyPhone', this.personalForm.consultancyPhone)
      } else {
        this.$notify.error({
          title: '错误',
          message: '信息请填写完整',
          offset: 100
        })
      }
    },
    handleAddproduct() {
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 2) {
        this.$notify.error({
          title: '错误',
          message: '征询人最多两位',
          offset: 100
        })
      } else {
        this.peopleVisible = true
      }
    },
    changeTotalMoney() {
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (this.rate != null && this.rate !== '' && this.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + (Number(this.rate) /
              100)) + Number(this.personalForm.firstMoney)).toFixed(2)
          }
        }
      }
    },
    changeRate(val) {
      console.log('val', val)
      console.log('this.installmentCounts', this.installmentCounts)
      const needval = this.installmentCounts.find(item => {
        if (item.installmentCount === val) {
          return (item)
        }
      })
      console.log('needval', needval)
      this.rate = needval.rate
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (needval.rate != null && needval.rate !== '' && needval.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + (Number(needval.rate))) + Number(this.personalForm.firstMoney)).toFixed(2)
          }
        }
      }
    },
    // 获取分期期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
    },
    // 通过手机号判断是否有申请的资格
    haveAccess() {
      console.log(this.personalForm.applyPhone)
      if (this.personalForm.applyPhone !== null && this.personalForm.applyPhone !== '' && this.personalForm.applyPhone !== undefined) {
        existList(this.personalForm.applyPhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('存在申请未通过!', '提示', {
              confirmButtonText: '确定',
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              showCancelButton: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.go(-1)
              const view = { path: '/InstallmentApply/AddInstallmentApply', name: 'AddInstallmentApply', fullPath: '/InstallmentApply/AddInstallmentApply', title: 'AddInstallmentApply' }
              this.$store.dispatch('delView', view).then(({ visitedViews }) => {
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else if (res.data.data.content === 3) {
            this.$confirm('存在分期未还完!', '提示', {
              confirmButtonText: '确定',
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              showCancelButton: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.go(-1)
              const view = { path: '/InstallmentApply/AddInstallmentApply', name: 'AddInstallmentApply', fullPath: '/InstallmentApply/AddInstallmentApply', title: 'AddInstallmentApply' }
              this.$store.dispatch('delView', view).then(({ visitedViews }) => {
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        })
      }
    },
    // 分期商品focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      console.log(val)
      this.productForm.productCode = val.code
      this.productForm.unit = val.saleMeasu
      if (val.productName !== null && val.productName !== undefined && val.productName !== '') {
        this.IsProductName = true
        this.productForm.productName = val.productName
      }
      if (val.color !== null && val.color !== undefined && val.color !== '') {
        this.IsColor = true
        this.productForm.color = val.color
      }
      if (val.typeId !== null && val.typeId !== undefined && val.typeId !== '') {
        this.IsTypeId = true
        this.productForm.typeId = val.typeId
        this.typeName = val.productType
      }
      if (val.unit !== null && val.unit !== undefined && val.unit !== '') {
        this.IsUnit = true
        this.productForm.unit = val.unit
      }
      if (val.categoryId !== null && val.categoryId !== undefined && val.categoryId !== '') {
        this.IsCategoryId = true
        this.productForm.categoryId = val.categoryId
        this.categoryName = val.category
      }
      if (val.kpiGrade !== null && val.kpiGrade !== undefined && val.kpiGrade !== '') {
        this.IskpiGrade = true
        this.productForm.kpiGrade = val.kpiGrade
      }
      if (val.point !== null && val.point !== undefined && val.point !== '') {
        this.Ispoint = true
        this.productForm.point = val.point
      }
      if (val.carCode !== null && val.carCode !== undefined && val.carCode !== '') {
        this.IsCarCode = true
        this.productForm.carCode = val.carCode
      }
      if (val.motorCode !== null && val.motorCode !== undefined && val.motorCode !== '') {
        this.IsmotorCode = true
        this.productForm.motorCode = val.motorCode
      }
      if (val.batteryCode !== null && val.batteryCode !== undefined && val.batteryCode !== '') {
        this.IsbatteryCode = true
        this.productForm.batteryCode = val.batteryCode
      }
      if (val.salePrice !== null && val.salePrice !== undefined && val.salePrice !== '') {
        this.IstotalMoney = true
        this.productForm.price = val.salePrice
      }
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (this.rate != null && this.rate !== '' && this.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + (Number(this.rate) /
              100)) + Number(this.personalForm.firstMoney)).toFixed(2)
          }
        }
      }
    },
    handlechangesuretyProvince(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities3 = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    handlechangeworkProvince(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities2 = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    // 申请人省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    // 申请人省
    getprovince() {
      getprovincelist(this.personalForm.countryId).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省出错')
        }
      })
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
      this.personalForm.applyDate = currentdate
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    // 销售人员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 销售员回显
    stockName(val) {
      this.salePersonId = val.personName
      this.personalForm.salePersonId = val.id
      if (val.repositoryId !== null && val.repositoryId !== undefined && val.repositoryId !== '') {
        this.saleRepositoryId = val.repositoryName
        this.personalForm.saleRepositoryId = val.repositoryId
        this.IsSalesaleRepositoryId = true
      }
    },
    // 清空记录
    restAllForm() {
      this.list2 = {}
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.productForm = {}
      this.personalForm.applyDate = new Date()
      this.salePersonId = null
      this.saleRepositoryId = null
      this.typeName = ''
      this.categoryName = ''
      this.IsProductName = false
      this.IsColor = false
      this.IsTypeId = false
      this.IsUnit = false
      this.IsCategoryId = false
      this.IskpiGrade = false
      this.Ispoint = false
      this.IsCarCode = false
      this.IsmotorCode = false
      this.IsbatteryCode = false
      this.IstotalMoney = false
      this.IsSalesaleRepositoryId = false
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        this.$notify.error({
          title: '错误',
          message: '请选择商品',
          offset: 100
        })
        return false
      }
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请添加征询人',
          offset: 100
        })
        return false
      } else {
        if (nowlistdata.length > 0) {
          this.personalForm.consultancyNameOne = nowlistdata[0].consultancyName
          this.personalForm.consultancyPhoneOne = nowlistdata[0].consultancyPhone
          this.personalForm.consultancyAddressOne = nowlistdata[0].consultancyAddress
        }
        if (nowlistdata.length > 1) {
          this.personalForm.consultancyNameTwo = nowlistdata[1].consultancyName
          this.personalForm.consultancyPhoneTwo = nowlistdata[1].consultancyPhone
          this.personalForm.consultancyAddressTwo = nowlistdata[1].consultancyAddress
        }
      }
      const Data2 = this.productForm
      for (const key in Data2) {
        if (Data2[key] === '' || Data2[key] === undefined || Data2[key] === null) {
          delete Data2[key]
        }
      }
      const parms2 = JSON.stringify(Data2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateapply(parms, parms2, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$emit('rest', true)
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
              this.$refs.personalForm5.clearValidate()
              this.$refs.personalForm5.resetFields()
              this.editVisible = false
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
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
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.personalForm3.clearValidate()
      this.$refs.personalForm3.resetFields()
      this.$refs.personalForm4.clearValidate()
      this.$refs.personalForm4.resetFields()
      this.$refs.personalForm5.clearValidate()
      this.$refs.personalForm5.resetFields()
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
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
