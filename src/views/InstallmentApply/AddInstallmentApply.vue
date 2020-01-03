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
                <el-form-item :label="$t('InstallmentApply.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="width: 100%;">
                  <el-input v-model="personalForm.firstName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                  <el-input v-model="personalForm.middleName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="width: 100%;">
                  <el-input v-model="personalForm.lastName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.age')" style="width: 100%;" class="redable">
                  <el-input-number v-model="personalForm.age" :precision="0" :controls="false" :step="0.1" :min="1" :max="120" style="margin-left: 18px;width: 200px;text-align: left" @blur="completeRate()"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" style="width: 100%;">
                  <el-select v-model="personalForm.liveStauts" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="和亲戚一起居住"/>
                    <el-option value="2" label="租房"/>
                    <el-option value="3" label="自有住房"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.applyPhone')" prop="applyPhone" style="width: 100%;">
                  <el-input v-model="personalForm.applyPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.applyCellPhone')" prop="applyCellPhone" style="width: 100%;">
                  <el-input v-model="personalForm.applyCellPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
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
              <!--              <el-col :span="6">-->
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
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.currentAddress')" prop="currentAddress" style="width: 100%;">
                  <el-input v-model="personalForm.currentAddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.permanentAddress')" prop="permanentAddress" style="width: 100%;">
                  <el-input v-model="personalForm.permanentAddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.email')" prop="email" style="width: 100%;">
                  <el-input v-model="personalForm.email" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.gender')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.gender" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.marriageStat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.marriageStat" style="margin-left: 18px;width: 200px" @change="changepanel">
                    <el-radio :label="1" style="width: 100px">未婚</el-radio>
                    <el-radio :label="2">已婚</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateType')" prop="certificateType" style="width: 100%;">
                  <el-select v-model="personalForm.certificateType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="passport"/>
                    <el-option value="2" label="voters ID"/>
                    <el-option value="3" label="UMID ID"/>
                    <el-option value="4" label="license"/>
                    <el-option value="5" label="SSS"/>
                    <el-option value="6" label="phili health"/>
                    <el-option value="7" label="Pag-big"/>
                    <el-option value="8" label="NBI"/>
                    <el-option value="9" label="POLICE ID"/>
                    <el-option value="10" label="others"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" prop="certificateNumber" style="width: 100%;">
                  <el-input v-model="personalForm.certificateNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                  <el-select v-model="personalForm.certificateType2" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="passport"/>
                    <el-option value="2" label="voters ID"/>
                    <el-option value="3" label="UMID ID"/>
                    <el-option value="4" label="license"/>
                    <el-option value="5" label="SSS"/>
                    <el-option value="6" label="phili health"/>
                    <el-option value="7" label="Pag-big"/>
                    <el-option value="8" label="NBI"/>
                    <el-option value="9" label="POLICE ID"/>
                    <el-option value="10" label="others"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.certificateNumber2" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstMoney')" prop="firstMoney" style="width: 100%;">
                  <el-input-number v-model="personalForm.firstMoney" :precision="2" :controls="false" style="margin-left: 18px;width: 200px" clearable @change="changeTotalMoney"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="width: 100%;">
                  <el-input-number v-model="personalForm.installmentDays" :controls="false" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="width: 100%;">
                  <el-input v-model="personalForm.totalMoney" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="width: 100%;">
                  <el-input v-model="salePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" prop="saleRepositoryId" style="width: 100%;">
                  <el-input v-model="saleRepositoryId" :disabled="IsSalesaleRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
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
        <h2 ref="geren" class="form-name">{{ $t('updates.spxx') }}</h2>
        <el-button style="margin-top: 50px;" @click="handleAddpackage">{{ $t('otherlanguage.xztc') }}</el-button>
        <my-package :packagecontrol.sync="packagecontrol" :productnumber.sync="productnumber" @packagedata="packagedata"/>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="productForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="width: 100%;">
                  <el-input v-model="productForm.productCode" style="margin-left: 18px;width: 200px" @focus="handlemater" @change="changeTotalMoney"/>
                </el-form-item>
              </el-col>
              <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.productName')" style="width: 100%;">
                  <el-input v-model="productForm.productName" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.color')" style="width: 100%;">
                  <el-input v-model="productForm.color" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.typeId')" style="width: 100%;">
                  <el-input v-model="typeName" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.unit')" style="width: 100%;">
                  <el-input v-model="productForm.unit" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.categoryId')" style="width: 100%;">
                  <el-input v-model="categoryName" disabled style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">-->
              <!--                  <el-input v-model="productForm.carCode" style="margin-left: 18px;width: 200px" @blur="getInfo()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">-->
              <!--                  <el-input v-model="productForm.motorCode" style="margin-left: 18px;width: 200px" @blur="getInfo3()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">-->
              <!--                  <el-input v-model="productForm.batteryCode" style="margin-left: 18px;width: 200px" @blur="getInfo2()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">{{ $t('newupd.jhg') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstName')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-input v-model="personalForm.mateFirstName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.middleName')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-input v-model="personalForm.mateMiddleName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.lastName')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-input v-model="personalForm.mateLastName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.age')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-input v-model="personalForm.mateAge" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.birthday')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.mateBirthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-select v-model="personalForm.mateLiveStauts" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                    <el-option value="1" label="和亲戚一起居住"/>
                    <el-option value="2" label="租房"/>
                    <el-option value="3" label="按揭"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.matePhone')" :required="personalForm.marriageStat === 2" style="width: 100%;">
                  <el-input v-model="personalForm.matePhone" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.email')" style="width: 100%;">
                  <el-input v-model="personalForm.mateEmail" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">{{ $t('updates.gzxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('newupd.vff')" name="first">
              <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                      <el-select v-model="personalForm.workType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                        <el-option value="1" label="被雇佣"/>
                        <el-option value="2" label="自由职业"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                      <el-input v-model="personalForm.enterpriseName" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                      <el-input v-model="personalForm.workAddress" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                      <el-input v-model="personalForm.currentPost" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workTime')" prop="workTime" style="width: 100%;">
                      <el-input v-model.number="personalForm.workTime" style="margin-left: 18px;width: 200px">
                        <template slot="append">月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" prop="enterprisePhone" style="width: 100%;">
                      <el-input v-model="personalForm.enterprisePhone" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                      <el-input v-model="personalForm.taxNumber" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                      <el-input v-model="personalForm.salary" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                      <el-input v-model="personalForm.otherIncome" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                      <el-input v-model="personalForm.allIncome" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                      <el-input v-model="personalForm.monthlyDebt" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                      <el-input v-model="personalForm.otherExpend" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="width: 100%;">
                      <el-input v-model="personalForm.monthlyIncome" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('newupd.ddc')" name="second">
              <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                      <el-select v-model="personalForm.mateWorkType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                        <el-option value="1" label="被雇佣"/>
                        <el-option value="2" label="自由职业"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                      <el-input v-model="personalForm.mateEnterpriseName" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                      <el-input v-model="personalForm.mateWorkAddress" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                      <el-input v-model="personalForm.mateCurrentPost" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workTime')" style="width: 100%;">
                      <el-input v-model="personalForm.mateWorkTime" style="margin-left: 18px;width: 200px">
                        <template slot="append">月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                      <el-input v-model="personalForm.mateEnterprisePhone" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                      <el-input v-model="personalForm.mateTaxNumber" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                      <el-input v-model="personalForm.mateSalary" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                      <el-input v-model="personalForm.mateOtherIncome" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                      <el-input v-model="personalForm.mateAllIncome" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                      <el-input v-model="personalForm.mateMonthlyDebt" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                      <el-input v-model="personalForm.mateOtherExpend" style="margin-left: 18px;width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
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
        <h2 ref="geren" class="form-name">{{ $t('updates.zxrxx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('newupd.fdss') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.xmi')" prop="consultancyName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.lxdh')" prop="consultancyPhone" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dz')" prop="consultancyAddress" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">{{ $t('newupd.asds') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.suretyName')" prop="suretyName" style="width: 100%;">
                  <el-input v-model="personalForm.suretyName" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.suretyPhone')" prop="suretyPhone" style="width: 100%;">
                  <el-input v-model="personalForm.suretyPhone" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.relationship')" prop="relationship" style="width: 100%;">
                  <el-input v-model="personalForm.relationship" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.suretyProvinceId')" prop="suretyProvinceId" style="width: 100%;">-->
              <!--                  <el-select v-model="personalForm.suretyProvinceId" style="margin-left: 18px;width: 200px" @change="handlechangesuretyProvince">-->
              <!--                    <el-option-->
              <!--                      v-for="(item, index) in provinces"-->
              <!--                      :key="index"-->
              <!--                      :label="item.name"-->
              <!--                      :value="item.id"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.suretyCityId')" prop="suretyCityId" style="width: 100%;">-->
              <!--                  <el-select v-model="personalForm.suretyCityId" style="margin-left: 18px;width: 200px">-->
              <!--                    <el-option-->
              <!--                      v-for="(item, index) in cities3"-->
              <!--                      :key="index"-->
              <!--                      :label="item.name"-->
              <!--                      :value="item.id"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.suretyAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.suretyAddress" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="width: 100%;">
                  <el-select v-model="personalForm.suretyCertificateType" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="身份证"/>
                    <el-option value="2" label="其他"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.suretyCertificateNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 上传附件（接口未调试） -->
      <el-card class="box-card" style="margin-top: 10px" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.zjsc') }}</h2>
        <div class="upload">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :action="`${$upload}/erp/upload/uploadpic`"
            :data="paperData"
            :on-success="handlepicsuccess"
            class="upload-demo"
            drag
            multiple>
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx...</div>
          </el-upload>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="peopleVisible" title="添加征询人" class="normal" width="450px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 3%; width: 400px">
          <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyName')" style="width: 100%;">
                  <el-input v-model="personalForm.consultancyName" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.consultancyPhone" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
                  <!-- <el-input-number v-model="personalForm.consultancyPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable/> -->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.consultancyAddress" style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="buttons" style="margin-left: 27%;margin-top: 20px">
              <el-button :loading="isclick" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave2()">{{ $t('Hmodule.baoc') }}</el-button>
              <el-button type="danger" @click="handlecance2()">{{ $t('Hmodule.cancel') }}</el-button>
            </div>
          </el-form>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addinstallmentapply } from '@/api/InstallmentApply'
import { ratelist } from '@/api/Installmentrate'
import { adjustlist } from '@/api/AdjustPrice'
import { getprovincelist, getcitylist, existList, vehicleInfo } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyRepository from './components/MyRepository'
import MyPackage from './components/MyPackage'
var _that
export default {
  name: 'AddInstallmentApply',
  components: { MyRepository, MyMater, MyDetail, MyEmp, MyPackage },
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
    const validatePass6 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        console.log(String(value).length)
        if (String(value).length !== 11) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass7 = (rule, value, callback) => {
      console.log('valueeeeeeeeeeeeeeeeeee', value)
      if (value === null || value === undefined || value === '') {
        callback()
      }
      if (value !== null && value !== undefined && value !== '') {
        var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        const flag = email.test(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱地址'))
        }
      }
    }
    // const validatePass8 = (rule, value, callback) => {
    //   console.log(!Number.isInteger(value))
    //   if (!Number.isInteger(value)) {
    //     callback(new Error('请输入数字值'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      isclick: false,
      // 上传图片
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
      // 证件额外参数
      paperData: {
        type: 13
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
      packagecontrol: false,
      productnumber: '',
      rate: '',
      // 申请人市数据
      cities: [],
      // 申请人省数据
      provinces: [],
      activeName: 'first',
      // 回显门店
      saleRepositoryId: this.$store.getters.repositoryName,
      // 控制销售门店
      repositorycontrol: false,
      // 销售人员回显
      salePersonId: this.$store.getters.name,
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
        firstMoney: 0.0,
        salePersonId: this.$store.getters.userId,
        saleRepositoryId: this.$store.getters.repositoryId,
        picids: []
      },
      productForm: {
        batteryCode: '',
        carCode: '',
        motorCode: '',
        snCode: ''
      },
      // 销售订单规则数据
      personalrules: {
        applyCellPhone: [
          { required: true, validator: validatePass6, trigger: 'blur' }
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
        // applyPhone: [
        //   { validator: validatePass6, trigger: 'blur' }
        // ],
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        email: [
          { validator: validatePass7, trigger: 'blur' }
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
          { required: true, message: '请选择担保人关系', trigger: 'blur' }
        ],
        suretyProvinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        suretyCityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        saleRepositoryId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        certificateType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        certificateNumber: [
          { required: true, message: '请输入身份证号码', trigger: 'change' }
        ],
        // 结婚验证
        mateFirstName: [
          { message: '请输入名', trigger: 'change' }
        ],
        mateMiddleName: [
          { message: '请输入中间名', trigger: 'change' }
        ],
        mateLastName: [
          { message: '请输入姓', trigger: 'change' }
        ],
        mateAge: [
          { message: '请输入年龄', trigger: 'change' }
        ],
        mateBirthday: [
          { message: '请输入出生日期', trigger: 'change' }
        ],
        mateLiveStauts: [
          { message: '请输入居住状况', trigger: 'change' }
        ],
        matePhone: [
          { message: '请输入电话', trigger: 'change' }
        ],
        mateEmail: [
          { message: '请输入电子邮箱', trigger: 'change' }
        ],
        enterprisePhone: [
          { validator: validatePass6, trigger: 'blur' }
        ],
        workTime: [
          { type: 'number', trigger: 'blur', message: '年龄必须为数字值' }
        ]
      }
    }
  },
  created() {
    this.getdatatime()
    this.getprovince()
    this.getratelist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    packagedata(val) {
      console.log('val1222222', val)
      this.productForm.price = val
      this.changeTotalMoney()
    },
    // 选择套餐
    handleAddpackage() {
      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        this.$notify.error({
          title: '请选择商品',
          message: '请选择商品',
          offset: 100
        })
      } else {
        this.productnumber = this.productForm.productCode
        this.packagecontrol = true
      }
    },
    getInfo() {
      if (this.productForm.carCode !== null && this.productForm.carCode !== '' && this.productForm.carCode !== undefined) {
        const param = {}
        param.carCode = this.productForm.carCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content.motorCode', res.data.data.content.motorCode)
            if (res.data.data.content !== null) {
              this.productForm.carCode = res.data.data.content.carCode
              this.productForm.batteryCode = res.data.data.content.batteryCode
              this.productForm.motorCode = res.data.data.content.motorCode
              this.productForm.snCode = res.data.data.content.snCode
            }
            console.log(this.productForm.batteryCode)
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    getInfo2() {
      if (this.productForm.motorCode !== null && this.productForm.motorCode !== '' && this.productForm.motorCode !== undefined) {
        const param = {}
        param.batteryCode = this.productForm.motorCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content !== null) {
              this.productForm.carCode = res.data.data.content.carCode
              this.productForm.batteryCode = res.data.data.content.batteryCode
              this.productForm.motorCode = res.data.data.content.motorCode
              this.productForm.snCode = res.data.data.content.snCode
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    getInfo3() {
      if (this.productForm.batteryCode !== null && this.productForm.batteryCode !== '' && this.productForm.batteryCode !== undefined) {
        const param = {}
        param.motorCode = this.productForm.batteryCode
        vehicleInfo(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content !== null) {
              this.productForm.carCode = res.data.data.content.carCode
              this.productForm.batteryCode = res.data.data.content.batteryCode
              this.productForm.motorCode = res.data.data.content.motorCode
              this.productForm.snCode = res.data.data.content.snCode
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    // 选择已未婚，标签变化
    changepanel(val) {
      console.log(val)
      if (val === 1) {
        this.activeName = 'first'
      }
    },
    // 上传图片
    handlepicsuccess(response) {
      this.personalForm.picids.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    handlesave2() {
      if (this.personalForm.consultancyPhone.length !== 11) {
        this.$notify.error({
          title: '错误',
          message: '手机号码错误',
          offset: 100
        })
        return false
      }
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
      console.log('首付款', this.personalForm.firstMoney)
      console.log('单价', this.productForm.price)
      console.log('折扣', this.rate)
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (this.rate != null && this.rate !== '' && this.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(2)
            console.log('未计算每期金额', this.personalForm.totalMoney / this.personalForm.installmentCount)
            console.log('取整', Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount))
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
            console.log('计算每期金额', this.personalForm.totalMoney / this.personalForm.installmentCount)
          }
        }
      }
    },
    changeRate(val) {
      console.log('首付款', this.personalForm.firstMoney)
      console.log('单价', this.productForm.price)
      console.log('折扣1', this.rate)
      // console.log('val', val)
      // console.log('this.installmentCounts', this.installmentCounts)
      const needval = this.installmentCounts.find(item => {
        if (item.installmentCount === val) {
          return (item)
        }
      })
      // console.log('needval', needval)
      this.rate = needval.rate
      console.log('折扣2', this.rate)
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (needval.rate != null && needval.rate !== '' && needval.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(2)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
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
      if (this.personalForm.saleRepositoryId === 0 || this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === '' || this.personalForm.saleRepositoryId === undefined) {
        this.$notify.error({
          title: '错误',
          message: '请先选择销售门店',
          offset: 100
        })
        return false
      } else {
        this.matercontrol = true
      }
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
      console.log('this.productForm.price', this.productForm.price)
      const params = {}
      params.pageNum = 1
      params.pageSize = 1
      params.productCode = val.code
      params.adjustRepositoryId = this.personalForm.saleRepositoryId
      params.judgestat = 2
      params.repositoryId = 0
      params.repositoryId = 0
      params.regionIds = 44
      adjustlist(params).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          if (res.data.data.content.list.length > 0) {
            this.productForm.price = res.data.data.content.list[0].repoAdjustPriceDetailVos[0].newSalePrice
          }
        } else {
          console.log('出错')
        }
      })
      if (this.personalForm.firstMoney != null && this.personalForm.firstMoney !== '' && this.personalForm.firstMoney !== undefined) {
        if (this.productForm.price != null && this.productForm.price !== '' && this.productForm.price !== undefined) {
          if (this.rate != null && this.rate !== '' && this.rate !== undefined) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(2)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
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
        regionId: this.$store.getters.regionId,
        gender: 1,
        firstMoney: 0.0
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
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
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
      this.isclick = true
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          addinstallmentapply(parms, parms2, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.isclick = false
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
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
              this.isclick = false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          this.isclick = false
          return false
        }
      })

      setTimeout(() => {
        this.isclick = false
      }, 5000)
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/InstallmentApply/AddInstallmentApply', name: 'AddInstallmentApply', fullPath: '/InstallmentApply/AddInstallmentApply', title: 'AddInstallmentApply' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    handlecance2() {
      this.peopleVisible = false
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

<style rel="stylesheet/css" scoped>
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
  .upload {
    text-align: center;
    margin-top: 10px;
  }
</style>
