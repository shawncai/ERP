<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.applyNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.title')" style="width: 100%;">
                  {{ personalForm.title }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="width: 100%;">
                  {{ personalForm.firstName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                  {{ personalForm.middleName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="width: 100%;">
                  {{ personalForm.lastName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.age')" style="width: 100%;" class="redable">
                  {{ personalForm.age }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" style="width: 100%;">
                  {{ personalForm.liveStauts | liveFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.applyPhone')" style="width: 100%;">
                  {{ personalForm.applyPhone }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.applyCellPhone')" prop="applyCellPhone" style="width: 100%;">
                  {{ personalForm.applyCellPhone }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.provinceId')" prop="applyCellPhone" style="width: 100%;">
                  {{ personalForm.provinceName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.cityId')" prop="applyCellPhone" style="width: 100%;">
                  {{ personalForm.cityName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.currentAddress')" prop="currentAddress" style="width: 100%;">
                  {{ personalForm.currentAddress }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.permanentAddress')" prop="permanentAddress" style="width: 100%;">
                  {{ personalForm.permanentAddress }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.email')" prop="email" style="width: 100%;">
                  {{ personalForm.email }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.gender')" style="width: 100%;">
                  {{ personalForm.gender | genderFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                  {{ personalForm.birthday }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.marriageStat')" style="width: 100%;">
                  {{ personalForm.marriageStat | marriageStatFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                  {{ personalForm.certificateType | certificateTypeFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                  {{ personalForm.certificateNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                  {{ personalForm.certificateType2 | certificateTypeFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                  {{ personalForm.certificateNumber2 }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.firstMoney')" prop="firstMoney" style="width: 100%;">
                  {{ personalForm.firstMoney }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.installmentCount')" prop="installmentCount" style="width: 100%;">
                  {{ personalForm.installmentCount }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="width: 100%;">
                  {{ personalForm.installmentDays }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="width: 100%;">
                  {{ personalForm.totalMoney }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="width: 100%;">
                  {{ personalForm.salePersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" prop="saleRepositoryId" style="width: 100%;">
                  {{ personalForm.saleRepositoryName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.applyDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.applyDate }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">{{ $t('updates.spxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="width: 100%;">
                  {{ personalForm.productCode }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.productName')" style="width: 100%;">
                  {{ personalForm.productName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.color')" style="width: 100%;">
                  {{ personalForm.color }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.typeId')" style="width: 100%;">
                  {{ personalForm.typeName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.unit')" style="width: 100%;">
                  {{ personalForm.unit }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.categoryId')" style="width: 100%;">
                  {{ personalForm.categoryName }}
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">-->
              <!--                  {{ personalForm.carCode }}-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">-->
              <!--                  {{ personalForm.motorCode }}-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">-->
              <!--                  {{ personalForm.batteryCode }}-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card v-if="personalForm.marriageStat === 2" class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name">{{ $t('updates.spxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.firstName')" style="width: 100%;">
                  {{ personalForm.mateFirstName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                  {{ personalForm.mateMiddleName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.lastName')" style="width: 100%;">
                  {{ personalForm.mateLastName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.age')" style="width: 100%;">
                  {{ personalForm.mateAge }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                  {{ personalForm.mateBirthday }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.liveStauts')" style="width: 100%;">
                  {{ personalForm.mateLiveStauts | liveFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.matePhone')" style="width: 100%;">
                  {{ personalForm.matePhone }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.email')" style="width: 100%;">
                  {{ personalForm.mateEmail }}
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
              <el-form ref="personalForm4" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                      {{ personalForm.workType | workStatFilter }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                      {{ personalForm.enterpriseName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                      {{ personalForm.workAddress }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                      {{ personalForm.currentPost }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workTime')" style="width: 100%;">
                      {{ personalForm.workTime }}月
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                      {{ personalForm.enterprisePhone }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                      {{ personalForm.taxNumber }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                      {{ personalForm.salary }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                      {{ personalForm.otherIncome }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                      {{ personalForm.allIncome }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                      {{ personalForm.monthlyDebt }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                      {{ personalForm.otherExpend }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="width: 100%;">
                      {{ personalForm.monthlyIncome }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('newupd.ddc')" name="second">
              <el-form ref="personalForm5" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workType')" style="width: 100%;">
                      {{ personalForm.mateWorkType | workStatFilter }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                      {{ personalForm.mateEnterpriseName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                      {{ personalForm.mateWorkAddress }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.currentPost')" style="width: 100%;">
                      {{ personalForm.mateCurrentPost }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.workTime')" style="width: 100%;">
                      {{ personalForm.mateWorkTime }}月
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                      {{ personalForm.mateEnterprisePhone }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.taxNumber')" style="width: 100%;">
                      {{ personalForm.mateTaxNumber }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                      {{ personalForm.mateSalary }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.otherIncome')" style="width: 100%;">
                      {{ personalForm.mateOtherIncome }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.allIncome')" style="width: 100%;">
                      {{ personalForm.mateAllIncome }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.monthlyDebt')" style="width: 100%;">
                      {{ personalForm.mateMonthlyDebt }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.otherExpend')" style="width: 100%;">
                      {{ personalForm.mateOtherExpend }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('InstallmentApply.monthlyIncome')" style="width: 100%;">
                      {{ personalForm.mateMonthlyIncome }}
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
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.xmi')" prop="consultancyName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.lxdh')" prop="consultancyPhone" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.dz')" prop="consultancyAddress" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px;margin-bottom: 30px">
        <h2 ref="geren" class="form-name">{{ $t('newupd.asds') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm5" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.suretyName')" prop="suretyName" style="width: 100%;">
                  <span>{{ personalForm.suretyName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.suretyPhone')" prop="suretyPhone" style="width: 100%;">
                  <span>{{ personalForm.suretyPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.relationship')" prop="relationship" style="width: 100%;">
                  <span>{{ personalForm.relationship }}</span>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('InstallmentApply.suretyProvinceId')" prop="suretyProvinceId" style="width: 100%;">-->
              <!--                  <span>{{ personalForm.suretyProvinceName }}</span>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('InstallmentApply.suretyCityId')" prop="suretyCityId" style="width: 100%;">-->
              <!--                  <span>{{ personalForm.suretyCityName }}</span>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.suretyAddress')" style="width: 100%;">
                  <span>{{ personalForm.suretyAddress }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="width: 100%;">
                  <span>{{ personalForm.suretyCertificateType | suretyCertificateTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="width: 100%;">
                  <span>{{ personalForm.suretyCertificateNumber }}</span>
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
    </div>
  </el-dialog>
</template>

<script>
var _that
export default {
  filters: {
    liveFilter(status) {
      const statusMap = {
        1: '和亲戚一起居住',
        2: '租房',
        3: '自有住房'
      }
      return statusMap[status]
    },
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        1: '方式1',
        2: '方式2'
      }
      return statusMap[status]
    },
    marriageStatFilter(status) {
      const statusMap = {
        1: '未婚',
        2: '已婚'
      }
      return statusMap[status]
    },
    certificateTypeFilter(status) {
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
    },
    workStatFilter(status) {
      const statusMap = {
        1: '被雇佣',
        2: '自由职业'
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
    mateCertificateTypeFilter(status) {
      const statusMap = {
        1: '身份证',
        2: '其他'
      }
      return statusMap[status]
    },
    mateWorkStatFilter(status) {
      const statusMap = {
        1: '在职',
        2: '无业'
      }
      return statusMap[status]
    },
    enterpriseNatureFilter(status) {
      const statusMap = {
        1: '国企',
        2: '民营'
      }
      return statusMap[status]
    },
    suretyCertificateTypeFilter(status) {
      const statusMap = {
        1: '身份证',
        2: '其他'
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
      activeName: 'first',
      list2: [],
      // 审核数据
      reviewList: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      productForm: {}
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      const lisArr = []
      this.personalForm = this.detaildata
      this.personalForm.productCode = this.detaildata.installmentApplyDetailVos[0].productCode
      this.personalForm.productName = this.detaildata.installmentApplyDetailVos[0].productName
      this.personalForm.color = this.detaildata.installmentApplyDetailVos[0].color
      this.personalForm.typeName = this.detaildata.installmentApplyDetailVos[0].productType
      this.personalForm.unit = this.detaildata.installmentApplyDetailVos[0].unit
      this.personalForm.categoryName = this.detaildata.installmentApplyDetailVos[0].productCategory
      this.personalForm.carCode = this.detaildata.installmentApplyDetailVos[0].carCode
      this.personalForm.motorCode = this.detaildata.installmentApplyDetailVos[0].motorCode
      this.personalForm.batteryCode = this.detaildata.installmentApplyDetailVos[0].batteryCode
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      console.log('this.personalForm', this.personalForm)
      const lis = {}
      lis.consultancyName = this.personalForm.consultancyNameOne
      lis.consultancyPhone = this.personalForm.consultancyPhoneOne
      lis.consultancyAddress = this.personalForm.consultancyAddressOne
      // console.log('lis', lis)
      lisArr.push(lis)
      if (this.personalForm.consultancyNameTwo !== null && this.personalForm.consultancyPhoneTwo !== null && this.personalForm.consultancyAddressTwo !== null && this.personalForm.consultancyNameTwo !== '' && this.personalForm.consultancyPhoneTwo !== '' && this.personalForm.consultancyAddressTwo !== '' && this.personalForm.consultancyNameTwo !== undefined && this.personalForm.consultancyPhoneTwo !== undefined && this.personalForm.consultancyAddressTwo !== undefined) {
        const lis2 = {}
        lis2.consultancyName = this.personalForm.consultancyNameOne
        lis2.consultancyPhone = this.personalForm.consultancyPhoneOne
        lis2.consultancyAddress = this.personalForm.consultancyAddressOne
        lisArr.push(lis2)
      }
      this.list2 = lisArr
    }
  },
  created() {
    // this.getdata()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getdata() {
      const lis = {}
      // if (this.$refs.editable.getRecords()) {
      // 1
      // }
      lis.consultancyName = this.personalForm.consultancyNameOne
      lis.consultancyPhone = this.personalForm.consultancyPhoneOne
      lis.consultancyAddress = this.personalForm.consultancyAddressOne
      console.log('lis', lis)
      console.log('lis', lis)
      this.$refs.editable.insert(lis)
      if (this.personalForm.consultancyNameTwo !== null && this.personalForm.consultancyPhoneTwo !== null && this.personalForm.consultancyAddressTwo !== null && this.personalForm.consultancyNameTwo !== '' && this.personalForm.consultancyPhoneTwo !== '' && this.personalForm.consultancyAddressTwo !== '' && this.personalForm.consultancyNameTwo !== undefined && this.personalForm.consultancyPhoneTwo !== undefined && this.personalForm.consultancyAddressTwo !== undefined) {
        const lis2 = {}
        lis2.consultancyName = this.personalForm.consultancyNameOne
        lis2.consultancyPhone = this.personalForm.consultancyPhoneOne
        lis2.consultancyAddress = this.personalForm.consultancyAddressOne
        this.$refs.editable.insert(lis2)
      }
    },
    handlecancel() {
      this.editVisible = false
    }
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
