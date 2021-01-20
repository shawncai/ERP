<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.applyNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" shadow="never">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
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
                  <el-option :label="$t('prompt.hqqyqz')" value="1"/>
                  <el-option :label="$t('prompt.zf')" value="2"/>
                  <el-option :label="$t('prompt.zyzf')" value="3"/>
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
                <el-input v-model="personalForm.applyCellPhone" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="haveAccess"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.provinceId')" prop="provinceId" style="width: 100%;">
                <el-select v-model="personalForm.provinceId" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.cityId')" prop="cityId" style="width: 100%;">
                <el-select v-model="personalForm.cityId" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
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
              <el-form-item :label="$t('InstallmentApply.email')" style="width: 100%;">
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
                <el-radio-group v-model="personalForm.marriageStat" style="margin-left: 18px;width: 200px" @change="changepanel">
                  <el-radio :label="1" style="width: 100px">{{ $t('prompt.wh') }}</el-radio>
                  <el-radio :label="2">{{ $t('prompt.yh') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
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
                  <el-option value="11" label="NIC"/>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.certificateNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
                  <el-option value="11" label="NIC"/>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                <el-input v-model="personalForm.certificateNumber2" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstMoney')" prop="firstMoney" style="width: 100%;">
                <el-input-number v-model="personalForm.firstMoney" :precision="6" :controls="false" style="margin-left: 18px;width: 200px" clearable @blur="changeTotalMoney"/>
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
                <el-input-number v-model="personalForm.installmentDays" :min="1.00" :max="28.00" :controls="false" style="margin-left: 18px;width: 200px" clearable/>
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
      <h2 ref="geren" class="form-name">{{ $t('updates.spxx') }}</h2>
      <el-button style="margin-top: 20px;" @click="handleAddpackage">{{ $t('otherlanguage.xztc') }}</el-button>
      <my-package :packagecontrol.sync="packagecontrol" :productnumber.sync="productnumber" :packagerepository.sync="packagerepository" @packagedata="packagedata"/>
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
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">-->
            <!--                <el-input v-model="productForm.carCode" style="margin-left: 18px;width: 200px" @blur="getInfo()"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">-->
            <!--                <el-input v-model="productForm.motorCode" style="margin-left: 18px;width: 200px" @blur="getInfo3()"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">-->
            <!--                <el-input v-model="productForm.batteryCode" style="margin-left: 18px;width: 200px" @blur="getInfo2()"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card v-if="personalForm.marriageStat === 2" class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('newupd.jhg') }}</h2>
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
                  <el-option :label="$t('prompt.hqqyqz')" value="1"/>
                  <el-option :label="$t('prompt.zf')" value="2"/>
                  <el-option :label="$t('prompt.zyzf')" value="3"/>
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
      <h2 ref="geren" class="form-name">{{ $t('updates.gzxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('newupd.vff')" name="first">
            <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                    <el-select v-model="personalForm.workType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                      <el-option :label="$t('prompt.bgy')" value="1"/>
                      <el-option :label="$t('prompt.zyzy')" value="2"/>
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
                    <el-input v-model.number="personalForm.workTime" style="margin-left: 18px;width: 200px">
                      <template slot="append">{{ $t('prompt.yue') }}</template>
                    </el-input>
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
          <el-tab-pane :label="$t('newupd.ddc')" name="second">
            <el-form ref="personalForm5" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                    <el-select v-model="personalForm.mateWorkType" value="personalForm.liveStauts" style="margin-left: 18px;width: 200px" @change="change()">
                      <el-option :label="$t('prompt.bgy')" value="1"/>
                      <el-option :label="$t('prompt.zyzy')" value="2"/>
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
                    <el-input v-model="personalForm.mateWorkTime" style="margin-left: 18px;width: 200px">
                      <template slot="append">{{ $t('prompt.yue') }}</template>
                    </el-input>
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
    <el-card class="box-card" shadow="never" style="margin-top: 10px;margin-bottom:40px">
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
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 60px">

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
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
    <el-dialog :visible.sync="comakerVisible" :title="$t('update4.tjzxr')" class="normal" width="450px" append-to-body center>
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
  </el-dialog>
</template>

<script>
import { updateapply } from '@/api/InstallmentApply'
import { getprovincelist, getcitylist, existList, vehicleInfo } from '@/api/public'
import { adjustlist } from '@/api/AdjustPrice'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
import MyRepository from './MyRepository'
import MyPackage from './MyPackage'
import { isSpecial } from '@/utils/judgeisspecial'

var _that
export default {
  components: { MyMater, MyDetail, MyEmp, MyRepository, MyPackage },
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
    const validatePass12 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('担保人手机号不能为空'))
      }
      setTimeout(() => {
        console.log(String(value).length)
        if (String(value).length !== 11) {
          callback(new Error('请输入担保人正确手机号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass6 = (rule, value, callback) => {
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
      } else if (String(value).length !== 9 && String(value).length !== 10 && (this.$store.getters.useCountry === 5)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else {
        callback()
      }
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
      } else if (String(value).length !== 9 && String(value).length !== 10 && (this.$store.getters.useCountry === 5)) {
        callback(new Error(_that.$t('prompt.qsrzqdsjh')))
      } else {
        callback()
      }
    }
    return {
      packagerepository: '',
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
      packagecontrol: false,
      productnumber: '',
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
        // countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        gender: 1,
        firstMoney: 0.0
      },
      productForm: {},
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
        //   { required: true, message: '请输入电话', trigger: 'blur' }
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
          { required: true, message: validatePass7, trigger: 'blur' }
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
          { required: true, message: '请输入每月还款日期', trigger: 'blur' }
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
          { required: true, validator: validatePass12, trigger: 'blur' }
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
      },
      editVisible: this.editcontrol
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      const lisArr = []
      this.personalForm = this.editdata
      this.salePersonId = this.personalForm.salePersonName
      this.saleRepositoryId = this.personalForm.saleRepositoryName
      this.getprovince()
      this.handlechange2(this.personalForm.provinceId)
      this.handlechangeworkProvince(this.personalForm.workProvinceId)
      this.handlechangesuretyProvince(this.personalForm.suretyProvinceId)
      if (this.personalForm.installmentApplyDetailVos !== null && this.personalForm.installmentApplyDetailVos.length > 0) {
        this.productForm = this.personalForm.installmentApplyDetailVos[0]
        this.typeName = this.personalForm.installmentApplyDetailVos[0].productType
        this.categoryName = this.personalForm.installmentApplyDetailVos[0].productCategory
      }
      const lis = {}
      lis.consultancyName = this.personalForm.consultancyNameOne
      lis.consultancyPhone = this.personalForm.consultancyPhoneOne
      lis.consultancyAddress = this.personalForm.consultancyAddressOne
      lisArr.push(lis)
      console.log('lis', lis)
      if (this.personalForm.consultancyNameTwo !== null && this.personalForm.consultancyPhoneTwo !== null && this.personalForm.consultancyAddressTwo !== null && this.personalForm.consultancyNameTwo !== '' && this.personalForm.consultancyPhoneTwo !== '' && this.personalForm.consultancyAddressTwo !== '' && this.personalForm.consultancyNameTwo !== undefined && this.personalForm.consultancyPhoneTwo !== undefined && this.personalForm.consultancyAddressTwo !== undefined) {
        const lis2 = {}
        lis2.consultancyName = this.personalForm.consultancyNameOne
        lis2.consultancyPhone = this.personalForm.consultancyPhoneOne
        lis2.consultancyAddress = this.personalForm.consultancyAddressOne
        lisArr.push(lis2)
      }
      this.list2 = lisArr
      const lisArr2 = []
      const surobj1 = {}
      surobj1.suretyName = this.personalForm.suretyName
      surobj1.suretyPhone = this.personalForm.suretyPhone
      surobj1.relationship = this.personalForm.relationship
      surobj1.suretyAddress = this.personalForm.suretyAddress
      surobj1.suretyCertificateType = this.personalForm.suretyCertificateType
      surobj1.suretyCertificateNumber = this.personalForm.suretyCertificateNumber
      surobj1.suretyCertificateType2 = this.personalForm.suretyCertificateType1
      surobj1.suretyCertificateNumber2 = this.personalForm.suretyCertificateNumber1
      lisArr2.push(surobj1)

      if (this.personalForm.suretyNameTwo) {
        const surobj2 = {}
        surobj2.suretyName = this.personalForm.suretyNameTwo
        surobj2.suretyPhone = this.personalForm.suretyPhoneTwo
        surobj2.relationship = this.personalForm.relationshipTwo
        surobj2.suretyAddress = this.personalForm.suretyAddressTwo
        surobj2.suretyCertificateType = this.personalForm.suretyCertificateTypeTwo
        surobj2.suretyCertificateNumber = this.personalForm.suretyCertificateNumberTwo
        surobj2.suretyCertificateType2 = this.personalForm.suretyCertificateType1Two
        surobj2.suretyCertificateNumber2 = this.personalForm.suretyCertificateNumber1Two
        lisArr2.push(surobj2)
      }

      if (this.personalForm.suretyNameThree) {
        const surobj3 = {}
        surobj3.suretyName = this.personalForm.suretyNameThree
        surobj3.suretyPhone = this.personalForm.suretyPhoneThree
        surobj3.relationship = this.personalForm.relationshipThree
        surobj3.suretyAddress = this.personalForm.suretyAddressThree
        surobj3.suretyCertificateType = this.personalForm.suretyCertificateTypeThree
        surobj3.suretyCertificateNumber = this.personalForm.suretyCertificateNumberThree
        surobj3.suretyCertificateType2 = this.personalForm.suretyCertificateType1Three
        surobj3.suretyCertificateNumber2 = this.personalForm.suretyCertificateNumber1Three
        lisArr2.push(surobj3)
      }
      this.list3 = lisArr2
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
      if (this.newcomarker.suretyPhone.length !== 11 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrsjhcw'),
          offset: 100
        })
        return false
      }
      if ((this.newcomarker.suretyPhone.length !== 9 && this.newcomarker.suretyPhone.length !== 10) && (this.$store.getters.useCountry === 5)) {
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
          title: '请选择商品',
          message: '请选择商品',
          offset: 100
        })
      } else {
        this.packagerepository = this.personalForm.saleRepositoryId
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
    handlesave2() {
      if (this.personalForm.consultancyPhone.length !== 11 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrsjhcw'),
          offset: 100
        })
        return false
      }
      if ((this.personalForm.consultancyPhone.length !== 9 && this.personalForm.consultancyPhone.length !== 10) && (this.$store.getters.useCountry === 5)) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('update4.dbrsjhcw'),
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
          message: '信息请填写完整',
          offset: 100
        })
      }
    },
    handleAddproduct() {
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 2) {
        this.$notify.error({
          title: 'wrong',
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
    haveAccess() {
      console.log('applyPhone========>', this.personalForm.applyPhone)
      if (this.personalForm.applyPhone.length === 11 && this.personalForm.applyPhone !== null && this.personalForm.applyPhone !== '' && this.personalForm.applyPhone !== undefined) {
        existList(this.personalForm.applyPhone).then(res => {
          if (res.data.data.content === 2) {
            this.$confirm('存在申请未通过!', this.$t('prompt.ts'), {
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
            this.$confirm('存在分期未还完!', this.$t('prompt.ts'), {
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
          }
        })
      }
    },
    // 分期商品focus事件
    handlemater() {
      if (this.personalForm.saleRepositoryId === 0 || this.personalForm.saleRepositoryId === null || this.personalForm.saleRepositoryId === '' || this.personalForm.saleRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
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
      this.personalForm.modifyPersonId = this.$store.getters.userId
      if (Number(this.personalForm.firstMoney) === 0) {
        this.$notify.error({
          title: 'wrong',
          message: 'firstMoney is 0',
          offset: 100
        })
        return false
      }

      if ((this.$store.getters.useCountry === '5' || this.$store.getters.useCountry === 5) && Number(this.personalForm.firstMoney) < 200) {
        this.$notify.error({
          title: 'wrong',
          message: 'the down payment is wrong',
          offset: 100
        })
        return false
      }

      if (this.$store.getters.useCountry === '2' || this.$store.getters.useCountry === 2) {
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
      }

      if (this.productForm.productCode === null || this.productForm.productCode === undefined || this.productForm.productCode === '') {
        this.$notify.error({
          title: 'wrong',
          message: '请选择商品',
          offset: 100
        })
        return false
      }
      const nowlistdata = this.$refs.editable.getRecords()
      if (nowlistdata.length === 0) {
        this.$notify.error({
          title: 'wrong',
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
      const Data2 = this.productForm
      for (const key in Data2) {
        if (Data2[key] === '' || Data2[key] === undefined || Data2[key] === null) {
          delete Data2[key]
        }
      }
      const parms2 = JSON.stringify(Data2)
      this.personalForm.modifyPersonId = this.$store.getters.userId
      if (this.personalForm.email !== null && this.personalForm.email !== undefined && this.personalForm.email !== '') {
        var email2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        const flag = email2.test(this.personalForm.email)
        if (!flag) {
          this.$notify.error({
            title: 'wrong',
            message: '请输入正确的邮箱地址',
            offset: 100
          })
          return false
        }
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
        if (Data[key] === 'judgeStat' || Data[key] === 'receiptStat') {
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
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.editVisible = false
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
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
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
    handlecancel() {
      this.editVisible = false
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
</style>
