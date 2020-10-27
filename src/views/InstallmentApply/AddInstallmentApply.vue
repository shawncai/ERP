<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.firstName" style="width: 200px" clearable @blur="havaAccessFirstName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.middleName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.middleName" style="width: 200px" clearable @blur="havaAccessMiddleName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.lastName" style="width: 200px" clearable @blur="havaAccessLastName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.age')" style="margin-left: 18px;width: 100%;margin-bottom: 0" class="redable">
                  <el-input-number v-model="personalForm.age" :precision="0" :controls="false" :step="0.1" :min="1" :max="120" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.liveStauts" value="personalForm.liveStauts" style="width: 200px" @change="change()">
                    <el-option :label="$t('prompt.hqqyqz')" value="1"/>
                    <el-option :label="$t('prompt.zf')" value="2"/>
                    <el-option :label="$t('prompt.zyzf')" value="3"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.applyPhone')" prop="applyPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.applyPhone" :controls="false" style="width: 200px" @blur="haveAccess"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.applyCellPhone')" prop="applyCellPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.applyCellPhone" :controls="false" style="width: 200px" @blur ="haveAccess2"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.provinceId')" prop="provinceId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.provinceId" style="width: 200px" @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.cityId')" prop="cityId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.cityId" style="width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.currentAddress')" prop="currentAddress" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.currentAddress" style="width: 200px" clearable @blur="haveAccessAddress"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.permanentAddress')" prop="permanentAddress" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.permanentAddress" style="width: 200px" clearable @blur="haveAccessAddress2"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.email')" prop="email" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.email" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('InstallmentApply.gender')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.gender" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('prompt.nan') }}</el-radio>
                    <el-radio :label="2">{{ $t('prompt.nv') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.birthday')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('InstallmentApply.marriageStat')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.marriageStat" style="width: 200px" @change="changepanel">
                    <el-radio :label="1" style="width: 100px">{{ $t('prompt.wh') }}</el-radio>
                    <el-radio :label="2">{{ $t('prompt.yh') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateType')" prop="certificateType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.certificateType" style="width: 200px">
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
                    <el-option value="11" label="NIC"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" prop="certificateNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.certificateNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateType')" prop="certificateType2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.certificateType2" style="width: 200px">
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
                    <el-option value="11" label="NIC"/>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" prop="certificateNumber2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.certificateNumber2" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstMoney')" prop="firstMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.firstMoney" :precision="6" :controls="false" style="width: 200px" clearable @change="changeTotalMoney"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.installmentCount')" prop="installmentCount" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.installmentCount" clearable style="width: 200px" @change="changeRate">
                    <el-option
                      v-for="(item, index) in installmentCounts"
                      :key="index"
                      :value="item.installmentCount"
                      :label="item.installmentCount"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.installmentDays" :min="1.00" :max="31.00" :controls="false" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.totalMoney" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="salePersonId" style="width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" prop="saleRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" :disabled="IsSalesaleRepositoryId" style="width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.applyDate')" prop="applyDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.applyDate"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.spxx') }}</div>
        <el-button style="margin-top: 50px;" @click="handleAddpackage">{{ $t('otherlanguage.xztc') }}</el-button>
        <my-package :packagecontrol.sync="packagecontrol" :packagerepository.sync="packagerepository" :productnumber.sync="productnumber" @packagedata="packagedata"/>
        <div class="container" style="margin-top:25px">
          <el-form ref="personalForm2" :model="productForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productForm.productCode" style="width: 200px" @focus="handlemater" @change="changeTotalMoney"/>
                </el-form-item>
              </el-col>
              <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.productName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productForm.productName" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.color')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productForm.color" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.typeId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="typeName" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.unit')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productForm.unit" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.categoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="categoryName" disabled style="width: 200px"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.carCode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="productForm.carCode" style="width: 200px" @blur="getInfo()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.motorCode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="productForm.motorCode" style="width: 200px" @blur="getInfo3()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('InstallmentApply.batteryCode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="productForm.batteryCode" style="width: 200px" @blur="getInfo2()"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;padding-bottom: 10px">

        <div ref="geren" class="form-name">{{ $t('newupd.jhg') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.firstName')" :required="personalForm.marriageStat === 2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.mateFirstName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.middleName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.mateMiddleName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.lastName')" :required="personalForm.marriageStat === 2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.mateLastName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('InstallmentApply.age')" :required="personalForm.marriageStat === 2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.mateAge" :precision="0" :controls="false" :step="0.1" :min="1" :max="120" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.birthday')" :required="personalForm.marriageStat === 2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.mateBirthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" :required="personalForm.marriageStat === 2" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.mateLiveStauts" value="personalForm.liveStauts" style="width: 200px" @change="change()">
                    <el-option :label="$t('prompt.hqqyqz')" value="1"/>
                    <el-option :label="$t('prompt.zf')" value="2"/>
                    <el-option :label="$t('prompt.zyzf')" value="3"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.matePhone')" :required="personalForm.marriageStat === 2" prop="matePhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.matePhone" style="width: 200px" @blur="haveAccess3"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('InstallmentApply.email')" prop="mateEmail" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.mateEmail" style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.gzxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('newupd.vff')" name="first">
              <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-select v-model="personalForm.workType" value="personalForm.liveStauts" style="width: 200px" @change="change()">
                        <el-option :label="$t('prompt.bgy')" value="1"/>
                        <el-option :label="$t('prompt.zyzy')" value="2"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.enterpriseName" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.workAddress" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.currentPost" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.workTime')" prop="workTime" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model.number="personalForm.workTime" style="width: 200px">
                        <template slot="append">{{ $t('prompt.yue') }}</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" prop="enterprisePhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.enterprisePhone" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.taxNumber" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.salary" :precision="0" :controls="false" :min="0" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.otherIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.allIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.monthlyDebt" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.otherExpend" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.monthlyIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('newupd.ddc')" name="second">
              <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-select v-model="personalForm.mateWorkType" value="personalForm.liveStauts" style="width: 200px" @change="change()">
                        <el-option :label="$t('prompt.bgy')" value="1"/>
                        <el-option :label="$t('prompt.zyzy')" value="2"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.mateEnterpriseName" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.mateWorkAddress" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.mateCurrentPost" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height: 57px">
                    <el-form-item :label="$t('InstallmentApply.workTime')" prop="mateWorkTime" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model.number="personalForm.mateWorkTime" style="width: 200px">
                        <template slot="append">{{ $t('prompt.yue') }}</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" prop="mateEnterprisePhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.mateEnterprisePhone" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input v-model="personalForm.mateTaxNumber" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.mateSalary" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.mateOtherIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">

                      <el-input-number v-model="personalForm.mateAllIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.mateMonthlyDebt" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.mateOtherExpend" :precision="0" :controls="false" :min="0" style="width: 200px"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="height:57px">
                    <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                      <el-input-number v-model="personalForm.mateMonthlyIncome" :precision="0" :controls="false" :min="0" style="width: 200px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.zxrxx') }}</div>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.xmi')" prop="consultancyName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.lxdh')" prop="consultancyPhone" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dz')" prop="consultancyAddress" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('newupd.asds') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct2">{{ $t('update4.tjzxr') }}</el-button>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
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
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('InstallmentApply.suretyName')" prop="suretyName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('InstallmentApply.suretyPhone')" prop="suretyPhone" align="center" min-width="150px"/>
            <el-editable-column :label="$t('InstallmentApply.relationship')" prop="relationship" align="center" min-width="150px"/>
            <el-editable-column :label="$t('InstallmentApply.suretyAddress')" prop="suretyAddress" align="center" min-width="150px"/>
            <el-editable-column :label="$t('InstallmentApply.suretyCertificateType')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.suretyCertificateType | suretyCertificateTypeFilter }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('InstallmentApply.suretyCertificateNumber')" prop="suretyCertificateNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('InstallmentApply.suretyCertificateType')" prop="suretyCertificateType2" align="center" min-width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.suretyCertificateType2 | suretyCertificateTypeFilter }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('InstallmentApply.suretyCertificateNumber')" prop="suretyCertificateNumber2" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 上传附件（接口未调试） -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="geren" class="form-name">{{ $t('updates.zjsc') }}</div>
        <div class="upload" style="margin-top: 25px">
          <el-upload
            ref="upload"
            :auto-upload="true"
            :action="`${uplodaapi}/upload/uploadpic`"
            :data="paperData"
            :on-success="handlepicsuccess"
            class="upload-demo"
            drag
            multiple>
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button :loading="isclick" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave3()">{{ $t('collectAndPay.lsbc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="peopleVisible" :title="$t('newupd.fdss')" class="normal" width="450px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 3%; width: 400px">
          <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyName')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                  <el-input v-model="personalForm.consultancyName" style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                  <el-input v-model="personalForm.consultancyPhone" style="width: 200px" clearable/>
                <!-- <el-input-number v-model="personalForm.consultancyPhone" :controls="false" style="width: 200px" clearable/> -->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('InstallmentApply.consultancyAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                  <el-input v-model="personalForm.consultancyAddress" style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="buttons" style="margin-left: 27%;margin-top: 20px">
              <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave2()">{{ $t('Hmodule.baoc') }}</el-button>
              <el-button type="danger" @click="handlecance2()">{{ $t('Hmodule.cancel') }}</el-button>
            </div>
          </el-form>
        </el-form>
      </el-dialog>

      <el-dialog :visible.sync="comakerVisible" :title="$t('update4.tjzxr')" class="normal" width="450px" center>
        <el-form :model="newcomarker" :inline="true" status-icon class="demo-ruleForm" label-width="130px">

          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyName')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.suretyName" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.suretyPhone" style="width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.relationship')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.relationship" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.suretyAddress" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-select v-model="newcomarker.suretyCertificateType" style="width: 200px">
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
                  <el-option value="11" label="NIC"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.suretyCertificateNumber" style="width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-select v-model="newcomarker.suretyCertificateType2" style="width: 200px">
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
                  <el-option value="11" label="NIC"/>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 5px">
                <el-input v-model="newcomarker.suretyCertificateNumber2" style="width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="buttons" style="margin-left: 27%;margin-top: 20px">
          <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave4()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="cancel2()">{{ $t('Hmodule.cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import '@/directive/noMoreClick/index.js'
import { addinstallmentapply, confirmPhone, confirmAddress, confirmName } from '@/api/InstallmentApply'
import { ratelist } from '@/api/Installmentrate'
import { adjustlist } from '@/api/AdjustPrice'
import { getprovincelist, getcitylist, existList, vehicleInfo } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyRepository from './components/MyRepository'
import MyPackage from './components/MyPackage'
import { isSpecial } from '@/utils/judgeisspecial'

var _that
export default {
  name: 'AddInstallmentApply',
  components: { MyRepository, MyMater, MyDetail, MyEmp, MyPackage },
  filters: {
    suretyCertificateTypeFilter(status) {
      const statusMap = {
        1: 'passport',
        2: 'voters ID',
        3: 'UMID ID',
        4: 'license',
        5: 'SSS',
        6: 'phili health',
        7: 'Pag-big',
        8: 'NBI',
        9: 'POLICE ID',
        10: 'others'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePass12 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('comaker phone can not be blank'))
      }
      setTimeout(() => {
        console.log(String(value).length)
        if (String(value).length !== 11 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (this.salePersonId === undefined || this.salePersonId === null || this.salePersonId === '') {
        callback(new Error('please select salePerson'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.productForm.productCode === undefined || this.productForm.productCode === null || this.productForm.productCode === '') {
        callback(new Error('please select product'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.saleRepositoryId === undefined || this.saleRepositoryId === null || this.saleRepositoryId === '') {
        callback(new Error('please select branch'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      if (this.personalForm.totalMoney === undefined || this.personalForm.totalMoney === null || this.personalForm.totalMoney === '') {
        callback(new Error('please input  baseinformation'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      if (this.personalForm.installmentCount === undefined || this.personalForm.installmentCount === null || this.personalForm.installmentCount === '') {
        callback(new Error('please select installmentCount'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      setTimeout(() => {
        console.log(String(value).length)
        if (String(value).length !== 10 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
          callback(new Error('phone number is wrong'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass7 = (rule, value, callback) => {
      if (value === null || value === undefined || value === '') {
        callback()
      }
      if (value !== null && value !== undefined && value !== '' && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
        var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        const flag = email.test(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('please input right email'))
        }
      }

      if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else {
        callback()
      }
    }
    // 判断是否为数字(必填)
    const validisnumber3 = (rule, value, callback) => {
      console.log('value', value)
      if (value !== null && value !== undefined && value !== '') {
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
      }
    }
    // 判断是否为数字(非必填)
    const validisnumber = (rule, value, callback) => {
      console.log('value', value)
      if (value === null || value === undefined || value === '') {
        callback()
      }
      if (value !== null && value !== undefined && value !== '' && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
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
      }
      if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else {
        callback()
      }
    }

    // 判断是否为数字(非必填)
    const validisnumber2 = (rule, value, callback) => {
      console.log('value', value)
      if (value === null || value === undefined || value === '') {
        callback()
      }
      if (value !== null && value !== undefined && value !== '' && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
        var re = /^0?0[3|4|5|6|7|8|9][0-9]\d{8}$/
        const flag = re.test(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('phone number is wrong'))
        }
      }
      if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else {
        callback()
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
      packagerepository: '',
      uplodaapi: this.$store.getters.uploadApi,
      newcomarker: {
        suretyName: '',
        suretyPhone: '',
        relationship: '',
        suretyAddress: '',
        suretyCertificateType: '',
        suretyCertificateNumber: '',
        suretyCertificateType2: '',
        suretyCertificateNumber2: ''
      },
      comakerVisible: false,
      list3: [],
      uploadapi: this.$store.getters.uploadApi,
      isclick: false,
      // 上传图片
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.transDate).getTime() - 8.64e7
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 30 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
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
        applyDate: null,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        // countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        gender: 1,
        firstMoney: 0.0,
        salePersonId: this.$store.getters.userId,
        saleRepositoryId: this.$store.getters.repositoryId,
        picids: [],
        isManila: 2
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
          { required: true, validator: validisnumber, trigger: 'blur' }
        ],
        matePhone: [
          { validator: validisnumber, trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'please input age', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: 'please input firstName', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'please input lastName', trigger: 'blur' }
        ],
        applyPhone: [
          { validator: validisnumber2, trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: 'please select province', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: 'please select city', trigger: 'change' }
        ],
        email: [
          { validator: validatePass7, trigger: 'blur' }
        ],
        currentAddress: [
          { required: true, message: 'please input currentAddress', trigger: 'blur' }
        ],
        permanentAddress: [
          { required: true, message: 'please input permanentAddress', trigger: 'blur' }
        ],
        installmentCount: [
          { required: true, validator: validatePass5, trigger: 'change' }
        ],
        firstMoney: [
          { required: true, message: 'please input firstMoney', trigger: 'blur' }
        ],
        totalMoney: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ],
        installmentDays: [
          { required: true, message: 'please input installmentDays', trigger: 'blur' }
        ],
        salePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: 'please select applyDate', trigger: 'change' }
        ],
        productCode: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        suretyName: [
          { required: true, message: 'please input suretyName', trigger: 'blur' }
        ],
        suretyPhone: [
          { required: true, validator: validisnumber3, trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: 'please select relationship', trigger: 'blur' }
        ],
        suretyProvinceId: [
          { required: true, message: 'please select suretyProvince', trigger: 'change' }
        ],
        suretyCityId: [
          { required: true, message: 'please select suretyCity', trigger: 'change' }
        ],
        saleRepositoryId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        certificateType: [
          { required: true, message: 'please select certificateType', trigger: 'change' }
        ],
        certificateNumber: [
          { required: true, message: 'please input certificateNumber', trigger: 'change' }
        ],

        certificateType2: [
          { required: true, message: 'please select certificatetype', trigger: 'change' }
        ],
        certificateNumber2: [
          { required: true, message: 'please input certificateNumber', trigger: 'change' }
        ],
        // 结婚验证
        mateFirstName: [
          { message: 'please input mateFirstName', trigger: 'change' }
        ],
        mateMiddleName: [
          { message: 'please input mateMiddleName', trigger: 'change' }
        ],
        mateLastName: [
          { message: 'please input mateLastName', trigger: 'change' }
        ],
        mateAge: [
          { message: 'please input mateAge', trigger: 'change' }
        ],
        mateBirthday: [
          { message: 'please input mateBirthday', trigger: 'change' }
        ],
        mateLiveStauts: [
          { message: 'please select mateLiveStauts', trigger: 'change' }
        ],
        mateEmail: [
          { validator: validatePass7, trigger: 'blur' }
        ],
        enterprisePhone: [
          { validator: validatePass6, trigger: 'blur' }
        ],
        mateEnterprisePhone: [
          { validator: validatePass6, trigger: 'blur' }
        ],
        workTime: [
          { type: 'number', trigger: 'blur', message: 'workTime must number' }
        ],
        mateWorkTime: [
          { type: 'number', trigger: 'blur', message: 'mateWorkTime must number' }
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
    haveAccessAddress2() {
      confirmAddress(this.personalForm.permanentAddress).then(res => {
        console.log('xxx', res)
        if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('update4.gdzycz'),
            offset: 100
          })
        }
      })
    },
    haveAccessAddress() {
      confirmAddress(this.personalForm.currentAddress).then(res => {
        console.log('xxx', res)
        if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('update4.gdzycz'),
            offset: 100
          })
        }
      })
    },

    havaAccessFirstName(val) {
      confirmName(this.personalForm.firstName, null, null).then(res => {
        console.log('xxx', res)
        if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('update4.yczgx'),
            offset: 100
          })
        }
      })
    },

    havaAccessMiddleName(val) {
      confirmName(null, this.personalForm.middleName, null).then(res => {
        console.log('xxx', res)
        if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('update4.yczgx'),
            offset: 100
          })
        }
      })
    },

    havaAccessLastName(val) {
      confirmName(null, null, this.personalForm.lastName).then(res => {
        console.log('xxx', res)
        if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('update4.yczgx'),
            offset: 100
          })
        }
      })
    },
    cancel2() {
      this.comakerVisible = false
      this.newcomarker = {}
    },
    handlesave4() {
      if (!this.newcomarker.suretyName) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrxmwk'),
          offset: 100
        })
        return false
      }
      if (!this.newcomarker.suretyPhone) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrdhwk'),
          offset: 100
        })
        return false
      }
      if (this.newcomarker.suretyPhone.length !== 11) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrsjhcw'),
          offset: 100
        })
        return false
      }
      if (!this.newcomarker.relationship) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrgxwk'),
          offset: 100
        })
        return false
      }
      if (!this.newcomarker.suretyAddress) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrdzwk'),
          offset: 100
        })
        return false
      }
      if (!this.newcomarker.suretyCertificateType || !this.newcomarker.suretyCertificateType2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrzjlxwk'),
          offset: 100
        })
        return false
      }
      if (!this.newcomarker.suretyCertificateNumber || !this.newcomarker.suretyCertificateNumber2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrzjhmwk'),
          offset: 100
        })
        return false
      }
      this.$refs.editable2.insert(this.newcomarker)
      this.comakerVisible = false
      this.newcomarker = {}
    },
    handleAddproduct2() {
      const nowlistdata = this.$refs.editable2.getRecords()
      if (nowlistdata.length === 3) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrgscgsx'),
          offset: 100
        })
        return false
      }
      this.comakerVisible = true
    },
    packagedata(val) {
      console.log('val1222222', val)
      this.productForm.price = val
      this.personalForm.isManila = val.isManila
      this.changeTotalMoney()
    },
    // 选择套餐
    handleAddpackage() {
      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        this.$notify.error({
          title: 'please select product',
          message: 'please select product',
          offset: 100
        })
      } else {
        console.log('this.personalForm', this.personalForm)

        this.productnumber = this.productForm.productCode
        this.packagerepository = String(this.personalForm.saleRepositoryId)
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
              title: 'wrong',
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
              title: 'wrong',
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
              title: 'wrong',
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
          title: 'wrong',
          message: 'consultancy Phone number is wrong',
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
          title: 'wrong',
          message: 'complete information',
          offset: 100
        })
      }
    },
    handleAddproduct() {
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 2) {
        this.$notify.error({
          title: 'wrong',
          message: 'Reference quantity over 2',
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
          if (this.rate !== null && this.rate !== '' && this.rate !== undefined && this.rate !== 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
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
          } else if (this.rate === 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
          }
        }
      }
      if (this.personalForm.isManila === 1) {
        const sendparms = {
          count: this.personalForm.installmentCount,
          typeId: this.productForm.typeId,
          first: this.personalForm.firstMoney
        }
        isSpecial(sendparms).then(res => {
        // console.log(res)
          if (res.data.ret === 200 && res.data.data.flag === 1) {
            this.personalForm.totalMoney = Number(res.data.data.eachMoney) * this.personalForm.installmentCount
          }
        })
      }
    },
    changeRate(val) {
      this.getratelist()
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
          if (needval.rate != null && needval.rate !== '' && needval.rate !== undefined && needval.rate !== 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
          } else if (needval.rate === 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
          }
        }
      }

      if (this.personalForm.isManila === 1) {
        const sendparms = {
          count: this.personalForm.installmentCount,
          typeId: this.productForm.typeId,
          first: this.personalForm.firstMoney
        }
        isSpecial(sendparms).then(res => {
        // console.log(res)
          if (res.data.ret === 200 && res.data.data.flag === 1) {
            this.personalForm.totalMoney = Number(res.data.data.eachMoney) * this.personalForm.installmentCount
          }
        })
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
    haveAccess3(val) {
      console.log('val', val)
      console.log('consultancyPhone=========>', this.personalForm.matePhone)
      if (this.personalForm.matePhone.length === 11 && this.personalForm.matePhone !== null && this.personalForm.matePhone !== '' && this.personalForm.matePhone !== undefined) {
        existList(this.personalForm.matePhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('have application not approve', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 3) {
            this.$confirm('have mpbalance!', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 1) {
            confirmPhone(this.personalForm.matePhone).then(res => {
              console.log('xxx', res)
              if (res.data.data.content === true) {
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('update4.gdhycz'),
                  offset: 100
                })
              }
            })
          }
        })
      }
    },
    // 通过手机号判断是否有申请的资格
    haveAccess2(val) {
      console.log('val', val)
      console.log('applyCellPhone=========>', this.personalForm.applyCellPhone)
      if (this.personalForm.applyCellPhone.length === 11 && this.personalForm.applyCellPhone !== null && this.personalForm.applyCellPhone !== '' && this.personalForm.applyCellPhone !== undefined) {
        existList(this.personalForm.applyCellPhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('have application not approve!', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 3) {
            this.$confirm('have mpbalance!', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 1) {
            confirmPhone(this.personalForm.applyCellPhone).then(res => {
              console.log('xxx', res)
              if (res.data.data.content === true) {
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('update4.gdhycz'),
                  offset: 100
                })
              }
            })
          }
        })
      }
    },
    // 通过手机号判断是否有申请的资格
    haveAccess(val) {
      console.log('val', val)
      console.log('applyPhone=========>', this.personalForm.applyPhone)
      if (this.personalForm.applyPhone.length === 11 && this.personalForm.applyPhone !== null && this.personalForm.applyPhone !== '' && this.personalForm.applyPhone !== undefined) {
        existList(this.personalForm.applyPhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('have application not approve!', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 3) {
            this.$confirm('have mpbalance!', this.$t('prompt.ts'), {
              confirmButtonText: this.$t('prompt.qd'),
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
                message: this.$t('prompt.yqxsc')
              })
            })
          } else if (res.data.data.content === 1) {
            confirmPhone(this.personalForm.applyCellPhone).then(res => {
              console.log('xxx', res)
              if (res.data.data.content === true) {
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('update4.gdhycz'),
                  offset: 100
                })
              }
            })
          }
        })
      }
    },
    // 分期商品focus事件
    handlemater() {
      if (this.personalForm.saleRepositoryId === 0 || this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === '' || this.personalForm.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: 'please select branch',
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
          if (this.rate != null && this.rate !== '' && this.rate !== undefined && this.rate !== 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
            if (each % 100 < 25) {
              this.personalForm.totalMoney = Math.floor((each / 100)) * 100 * this.personalForm.installmentCount
            } else if (each % 100 >= 25 && each % 100 < 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 50) * this.personalForm.installmentCount
            } else if (each % 100 >= 75) {
              this.personalForm.totalMoney = (Math.floor((each / 100)) * 100 + 100) * this.personalForm.installmentCount
            }
          } else if (this.rate === 0) {
            this.personalForm.totalMoney = ((Number(this.productForm.price) - Number(this.personalForm.firstMoney)) * (1 + Number(this.rate))).toFixed(6)
            const each = Math.ceil(this.personalForm.totalMoney / this.personalForm.installmentCount)
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
        // countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        gender: 1,
        firstMoney: 0.0,
        picids: [],
        isManila: 2
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
    handlesave3() {
      console.log(this.personalForm)
      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: '请选择商品',
        //   offset: 100
        // })
        // return false
      }
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 0) {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: '请添加征询人',
        //   offset: 100
        // })
        // return false
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
      this.personalForm.judgeStat = 4
      this.$refs.upload.submit()
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.isclick = true
      // this.$refs.personalForm.validate((valid) => {
      //   if (valid) {
      addinstallmentapply(parms, parms2, this.personalForm).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: 'save successful',
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
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
          this.isclick = false
        }
      })
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'Information is incomplete',
      //       offset: 100
      //     })
      //     this.isclick = false
      //     return false
      //   }
      // })

      setTimeout(() => {
        this.isclick = false
      }, 5000)
    },
    // 保存操作
    handlesave() {
      if (Number(this.personalForm.firstMoney) === 0) {
        this.$notify.error({
          title: 'wrong',
          message: 'firstMoney is 0',
          offset: 100
        })
        return false
      }
      if (Number(this.personalForm.totalMoney) < 0) {
        this.$notify.error({
          title: 'wrong',
          message: 'totalMoney is wrong',
          offset: 100
        })
        return false
      }
      const judgeissecond = this.productForm.productCode.slice(10, 12)
      const judgecartype = this.productForm.productCode.slice(3, 7)
      console.log('judgeissecond', judgeissecond)
      console.log('judgecartype', judgecartype)
      console.log('this.personalForm.firstMoney', Number(this.personalForm.firstMoney))

      // 二手gb2
      if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0002') && Number(this.personalForm.firstMoney) < 5000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the down payment of second hands unit is wrong',
          offset: 100
        })
        return false
      }

      // 二手ars和二手ep
      if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0003' || judgecartype === '0005') && Number(this.personalForm.firstMoney) < 6000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the down payment of second hands unit is wrong',
          offset: 100
        })
        return false
      }

      // 二手erv和二手tk
      if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype === '0001' || judgecartype === '0007') && Number(this.personalForm.firstMoney) < 7000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the down payment of second hands unit is wrong',
          offset: 100
        })
        return false
      }

      // 二手其他车
      if ((judgeissecond === '18' || judgeissecond === '04') && (judgecartype !== '0002' && judgecartype !== '0005' && judgecartype !== '0003' && judgecartype !== '0001' && judgecartype !== '0007') && Number(this.personalForm.firstMoney) < 7000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the down payment of second hands unit is wrong',
          offset: 100
        })
        return false
      }

      // 新gb2
      if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype === '0002' || judgecartype === '0005') && Number(this.personalForm.firstMoney) < 5000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the car firstMoney is wrong',
          offset: 100
        })
        return false
      }
      // 新ep
      if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype === '0005') && Number(this.personalForm.firstMoney) < 7000) {
        this.$notify.error({
          title: 'wrong',
          message: 'the car firstMoney is wrong',
          offset: 100
        })
        return false
      }

      // 其他新车
      if ((judgeissecond !== '18' && judgeissecond !== '04') && (judgecartype !== '0002' && judgecartype !== '0005') && Number(this.personalForm.firstMoney) < 10000) {
        console.log('123')
        this.$notify.error({
          title: 'wrong',
          message: 'the new car firstMoney is wrong',
          offset: 100
        })
        return false
      }

      console.log(this.personalForm)
      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        this.$notify.error({
          title: 'wrong',
          message: 'please select product',
          offset: 100
        })
        return false
      }
      if (this.personalForm.email !== null && this.personalForm.email !== undefined && this.personalForm.email !== '') {
        var email2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        const flag = email2.test(this.personalForm.email)
        if (!flag) {
          this.$notify.error({
            title: 'wrong',
            message: 'please input right email',
            offset: 100
          })
          return false
        }
      }
      const nowlistdata2 = this.$refs.editable2.getRecords()
      if (nowlistdata2.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.zxrwek'),
          offset: 100
        })
        return false
      }

      if (nowlistdata2.length === 1) {
        this.personalForm.suretyName = nowlistdata2[0].suretyName
        this.personalForm.suretyPhone = nowlistdata2[0].suretyPhone
        this.personalForm.relationship = nowlistdata2[0].relationship
        this.personalForm.suretyAddress = nowlistdata2[0].suretyAddress
        this.personalForm.suretyCertificateType = nowlistdata2[0].suretyCertificateType
        this.personalForm.suretyCertificateNumber = nowlistdata2[0].suretyCertificateNumber
        this.personalForm.suretyCertificateType1 = nowlistdata2[0].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1 = nowlistdata2[0].suretyCertificateNumber2
      } else if (nowlistdata2.length === 2) {
        this.personalForm.suretyName = nowlistdata2[0].suretyName
        this.personalForm.suretyPhone = nowlistdata2[0].suretyPhone
        this.personalForm.relationship = nowlistdata2[0].relationship
        this.personalForm.suretyAddress = nowlistdata2[0].suretyAddress
        this.personalForm.suretyCertificateType = nowlistdata2[0].suretyCertificateType
        this.personalForm.suretyCertificateNumber = nowlistdata2[0].suretyCertificateNumber
        this.personalForm.suretyCertificateType1 = nowlistdata2[0].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1 = nowlistdata2[0].suretyCertificateNumber2
        this.personalForm.suretyNameTwo = nowlistdata2[1].suretyName
        this.personalForm.suretyPhoneTwo = nowlistdata2[1].suretyPhone
        this.personalForm.relationshipTwo = nowlistdata2[1].relationship
        this.personalForm.suretyAddressTwo = nowlistdata2[1].suretyAddress
        this.personalForm.suretyCertificateTypeTwo = nowlistdata2[1].suretyCertificateType
        this.personalForm.suretyCertificateNumberTwo = nowlistdata2[1].suretyCertificateNumber
        this.personalForm.suretyCertificateType1Two = nowlistdata2[1].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1Two = nowlistdata2[1].suretyCertificateNumber2
      } else if (nowlistdata2.length === 3) {
        this.personalForm.suretyName = nowlistdata2[0].suretyName
        this.personalForm.suretyPhone = nowlistdata2[0].suretyPhone
        this.personalForm.relationship = nowlistdata2[0].relationship
        this.personalForm.suretyAddress = nowlistdata2[0].suretyAddress
        this.personalForm.suretyCertificateType = nowlistdata2[0].suretyCertificateType
        this.personalForm.suretyCertificateNumber = nowlistdata2[0].suretyCertificateNumber
        this.personalForm.suretyCertificateType1 = nowlistdata2[0].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1 = nowlistdata2[0].suretyCertificateNumber2
        this.personalForm.suretyNameTwo = nowlistdata2[1].suretyName
        this.personalForm.suretyPhoneTwo = nowlistdata2[1].suretyPhone
        this.personalForm.relationshipTwo = nowlistdata2[1].relationship
        this.personalForm.suretyAddressTwo = nowlistdata2[1].suretyAddress
        this.personalForm.suretyCertificateTypeTwo = nowlistdata2[1].suretyCertificateType
        this.personalForm.suretyCertificateNumberTwo = nowlistdata2[1].suretyCertificateNumber
        this.personalForm.suretyCertificateType1Two = nowlistdata2[1].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1Two = nowlistdata2[1].suretyCertificateNumber2
        this.personalForm.suretyNameThree = nowlistdata2[2].suretyName
        this.personalForm.suretyPhoneThree = nowlistdata2[2].suretyPhone
        this.personalForm.relationshipThree = nowlistdata2[2].relationship
        this.personalForm.suretyAddressThree = nowlistdata2[2].suretyAddress
        this.personalForm.suretyCertificateTypeThree = nowlistdata2[2].suretyCertificateType
        this.personalForm.suretyCertificateNumberThree = nowlistdata2[2].suretyCertificateNumber
        this.personalForm.suretyCertificateType1Three = nowlistdata2[2].suretyCertificateType2
        this.personalForm.suretyCertificateNumber1Three = nowlistdata2[2].suretyCertificateNumber2
      }
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: 'please add Reference ',
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
      this.isclick = true
      const Data2 = this.productForm
      for (const key in Data2) {
        if (Data2[key] === '' || Data2[key] === undefined || Data2[key] === null) {
          delete Data2[key]
        }
      }
      const parms2 = JSON.stringify(Data2)

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          // this.$refs.upload.submit()
          console.log('this.personalForm', this.personalForm)
          const Data = this.personalForm
          for (const key in Data) {
            if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
              delete Data[key]
            }
          }
          console.log('Data2', Data)
          const parms = JSON.stringify(Data)
          console.log('parms', parms)
          addinstallmentapply(parms, parms2, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.isclick = false
              this.restAllForm()
              this.$refs.upload.clearFiles()
              this.$refs.editable2.clear()
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
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
              this.isclick = false
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          this.isclick = false
          return false
        }
      })
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
  .ERP-container{
    margin-right: 0;
  }
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

</style>
