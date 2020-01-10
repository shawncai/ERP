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
                <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="width: 100%;">
                  <el-input v-model="personalForm.supplierName" placeholder="请输入供应商名称" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="width: 100%;">
                  <el-select ref="clear" v-model="personalForm.typeId" placeholder="请选择供应商类别" style="margin-left: 18px;width: 200px" @focus="updateType">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in typeIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="width: 100%;">
                  <el-input v-model="personalForm.supplierShortName" placeholder="请输入供应商简称" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.supplierIntroduction')" prop="supplierShortName" style="width: 100%;">
                  <el-input v-model="personalForm.supplierIntroduction" placeholder="请输入描述" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--联系信息-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="lianxi" class="form-name">{{ $t('updates.ywxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules2" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('public.countyrId')" prop="countryId" style="width: 100%;">
                  <el-select v-model="personalForm.countryId" placeholder="国家" style="margin-left: 18px;width: 200px" @change ="handlechange">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.provinceId')" style="width: 100%;">
                  <el-select v-model="personalForm.provinceId" filterable placeholder="请选择省" style="margin-left: 18px;width: 200px" @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.cityId')" style="width: 100%;">
                  <el-select v-model="personalForm.cityId" placeholder="请选择市" style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.address')" style="width: 100%;">
                  <el-input v-model="personalForm.detailAddress" placeholder="请输入地址" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.groupId')" prop="groupId" style="width: 100%;">
                  <el-select v-model="personalForm.groupId" multiple placeholder="请选择供应商分组" style="margin-left: 18px;width: 200px" @focus="updateGroup">
                    <el-option
                      v-for="(item, index) in groupIds"
                      :key="index"
                      :label="item.groupName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.zipCode')" style="width: 100%;">
                  <el-input v-model="personalForm.zipCode" placeholder="请输入邮编" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.contactPersonName')" prop="contactPersonName" style="width: 100%;">
                  <el-input v-model="personalForm.contactPersonName" placeholder="请输入联系人" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.contactPersonPhone')" prop="contactPersonPhone" style="width: 100%;">
                  <el-input v-model="personalForm.contactPersonPhone" placeholder="请输入电话" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.regionId')" prop="regionid" style="width: 100%;">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="perregions"
                    :show-all-levels="false"
                    :placeholder="$t('Hmodule.xzqy')"
                    change-on-select
                    filterable
                    clearable
                    style="margin-left: 18px;width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.giveId')" style="width: 100%;">
                  <el-select ref="clear2" v-model="personalForm.deliveryMode" placeholder="请选择交货方式" style="margin-left: 18px;width: 200px" @focus="updateGive">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in deliveryModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.transportId')" style="width: 100%;">
                  <el-select ref="clear3" v-model="personalForm.transportId" placeholder="请选择运送方式" style="margin-left: 18px;width: 200px" @focus="updateTran">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in transportIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat3">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                  <el-select ref="clear4" v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in colseTypes"
                      :value="item.id"
                      :key="index"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat4">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.levelId')" style="width: 100%;">
                  <el-select ref="clear5" v-model="personalForm.levelId" placeholder="请选择供应商优质级别" style="margin-left: 18px;width: 200px" @focus="updateLeve">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in levelIds"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat5">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="width: 100%;">
                  <el-select v-model="personalForm.isHot" :placeholder="$t('updates.qxz')" style="margin-left: 18px;width: 200px">
                    <el-option :label="$t('updates.yes')" value="1"/>
                    <el-option :label="$t('updates.no')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.isEffective')" style="width: 100%;">
                  <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="margin-left: 18px;width: 200px">
                    <el-option :label="$t('updates.qy')" value="1"/>
                    <el-option label="未启用" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.buyerId')" style="width: 100%;">
                  <el-input v-model="buyerId" placeholder="请输入采购员" clearable style="margin-left: 18px;width:200px" @focus="handlechoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <my-emp :control.sync="empcontrol" @personName="personName"/>
                <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="width: 100%;">
                  <el-input v-model="personalForm.businessScopeIntroduction" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ktgspmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 2,controls:false}, type: 'visible'}" prop="proportion" align="center" label="供货比列(%)" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,precision: 2,controls:false}, type: 'visible'}" prop="price" align="center" label="价格" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 2,controls:false}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--财务信息-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 class="form-name">{{ $t('updates.cwxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.settleMode')" style="width: 100%;">
                  <el-select ref="clear6" v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @focus="updatePaymen">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in settleModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat6">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.moneyId')" style="width: 100%;">
                  <el-select v-model="personalForm.moneyId" :value="personalForm.moneyId" placeholder="请选择币种" style="margin-left: 18px;width: 200px">
                    <el-option label="RMB" value="1"/>
                    <el-option label="USD" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.bankName')" style="width: 100%;">
                  <el-input v-model="personalForm.bankName" placeholder="请输入开户行" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.accountName')" style="width: 100%;">
                  <el-input v-model="personalForm.accountName" placeholder="请输入户名" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.account')" style="width: 100%;">
                  <el-input v-model="personalForm.account" placeholder="请输入账号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.fzxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.establishDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.establishDate"
                    type="date"
                    placeholder="选择成立时间"
                    value-format="yyyy-MM-dd"
                    clearable
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.legalPerson')" style="width: 100%;">
                  <el-input v-model="personalForm.legalPerson" placeholder="请输入法人代表" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('Supplier.businessLicense')" style="width: 100%;">-->
              <!--                  <el-input v-model="personalForm.businessLicense" placeholder="请输入营业执照号" style="margin-left: 18px;width:200px" clearable/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.companyTypeId')" style="width: 100%;">
                  <el-select v-model="personalForm.companyTypeId" placeholder="请选择单位性质" style="margin-left: 18px;width: 200px">
                    <el-option label="类型1" value="1"/>
                    <el-option label="类型2" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 动态信息 -->
      <!-- <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="fuzhu" class="form-name">动态信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.amountinvoiced')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.amountpaid')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.amountpayable')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.orderquantity')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card> -->
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click v-permission="['1-22-23-1']" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-22-23-1']" type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button v-permission="['1-22-23-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getRegion, getcountrylist, getprovincelist, getcitylist, regionlist, saveRegion } from '@/api/public'
import { searchCategory, create, searchGroup } from '@/api/Supplier'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'NewSupplier',
  directives: { permission, permission2 },
  components: { MyDetail, MyEmp },
  data() {
    return {
      // 是否显示添加按钮
      isshow: false,
      // 控制可提供商品明细
      control: false,
      // 供应商分组数据
      groupIds: [],
      // 结算方式
      settleModes: [],
      // 优质级别
      levelIds: [],
      // 运送方式
      transportIds: [],
      // 交货方式
      deliveryModes: [],
      // 结算方式数据
      colseTypes: [],
      // 供应商类别
      typeIds: [],
      // 采购员弹窗控制
      empcontrol: false,
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 区域列表
      regions: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 采购员回显
      buyerId: '',
      // 转化区域id
      perregions: [],
      // 供应商信息数据
      personalForm: {
        // 建档人id
        createId: this.$store.getters.userId,
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
        // 业务信息
        countryId: this.$store.getters.countryId,
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: [],
        zipCode: '',
        contactPersonName: '',
        contactPersonPhone: '',
        regionId: '',
        deliveryMode: '',
        transportId: '',
        levelId: '',
        isHot: '1',
        isEffective: '1',
        buyerId: '',
        // 财务信息
        businessScopeIntroduction: '',
        settleMode: '',
        moneyId: '1',
        bankName: '',
        accountName: '',
        account: '',
        establishDate: '',
        legalPerson: '',
        taxNumber: '',
        businessLicense: '',
        companyTypeId: ''
      },
      // 个人信息规则数据
      personalrules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择供应商类别', trigger: 'change' }
        ],
        groupId: [
          { required: true, message: '请选择供应商分组', trigger: 'change' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        contactPersonName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        contactPersonPhone: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      personalrules2: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择供应商类别', trigger: 'change' }
        ],
        groupId: [
          { required: true, message: '请选择供应商分组', trigger: 'change' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        contactPersonName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        contactPersonPhone: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      // 商品明细数据
      list2: [],
      // 商品明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getnationlist()
    this.getTypes()
    this.getRegion()
    this.jungleshow()
    this.handlechange(this.$store.getters.countryId)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-22-28-1')
    },
    getRegion() {
      getRegion(this.$store.getters.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content.zcc !== null && res.data.data.content.zcc !== '' && res.data.data.content.zcc !== undefined) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.perregions = zhuz.map(function(item) {
              return parseInt(item)
            })
          }
        }
      })
    },
    getTypes() {
      // 结算方式数据
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
    },
    checkPermission,
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        val[i].discountRate = 0
        val[i].price = val[i].purchasePrice
        this.$refs.editable.insert(val[i])
      }
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        }
      })
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.deliveryModes = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
          1
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.settleModes = res.data.data.content.list
        }
      })
      // 分组数据
      searchGroup().then(res => {
        if (res.data.ret === 200) {
          this.groupIds = res.data.data.content
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        }
      })
      this.personalForm.provinceId = ''
      this.personalForm.cityId = ''
      this.cities = []
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        }
      })
      this.personalForm.cityId = ''
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.type === null || elem.type === '' || elem.type === undefined) {
          delete elem.type
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.proportion === null || elem.proportion === '' || elem.proportion === undefined) {
          delete elem.proportion
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      saveRegion(this.perregions, this.personalForm.regionId)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.personalForm2.validate((valid) => {
            if (valid) {
              create(this.personalForm, parms2).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                  this.$refs.personalForm3.clearValidate()
                  this.$refs.personalForm3.resetFields()
                  this.$refs.personalForm4.clearValidate()
                  this.$refs.personalForm4.resetFields()
                  this.$router.go(-1)
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
              const anchor2 = this.$refs.geren.offsetTop
              console.log(anchor2)
              document.documentElement.scrollTop = anchor2 - 100
              return false
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
        // 业务信息
        countryId: this.$store.getters.countryId,
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: [],
        zipCode: '',
        contactPersonName: '',
        contactPersonPhone: '',
        regionId: '',
        deliveryMode: '',
        transportId: '',
        levelId: '',
        isHot: '',
        isEffective: '',
        buyerId: '',
        // 财务信息
        businessScopeIntroduction: '',
        settleMode: '',
        moneyId: '',
        bankName: '',
        accountName: '',
        account: '',
        establishDate: '',
        legalPerson: '',
        taxNumber: '',
        businessLicense: '',
        companyTypeId: ''
      }
      this.perregions = []
      this.buyerId = ''
      this.getRegion()
    },
    // 继续录入
    handleentry() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.type === null || elem.type === '' || elem.type === undefined) {
          delete elem.type
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.proportion === null || elem.proportion === '' || elem.proportion === undefined) {
          delete elem.proportion
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.personalForm2.validate((valid) => {
            if (valid) {
              create(this.personalForm, parms2).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                  this.$refs.personalForm3.clearValidate()
                  this.$refs.personalForm3.resetFields()
                  this.$refs.personalForm4.clearValidate()
                  this.$refs.personalForm4.resetFields()
                  const anchor = this.$refs.geren.offsetTop
                  console.log(anchor)
                  document.documentElement.scrollTop = anchor - 100
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
              const anchor2 = this.$refs.geren.offsetTop
              console.log(anchor2)
              document.documentElement.scrollTop = anchor2 - 100
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Supplier/NewSupplier', name: 'NewSupplier', fullPath: '/Supplier/NewSupplier', title: 'NewSupplier' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.buyerId = val.personName
      this.personalForm.buyerId = val.id
    },
    // foucus 更新
    updateType() {
      this.getnationlist()
    },
    updateGroup() {
      this.getnationlist()
    },
    updateGive() {
      this.getnationlist()
    },
    updateTran() {
      this.getnationlist()
    },
    updateLeve() {
      this.getnationlist()
    },
    updatePaymen() {
      this.getnationlist()
    },
    go_creat() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear2.blur()
    },
    go_creat3() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear3.blur()
    },
    go_creat4() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear4.blur()
    },
    go_creat5() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear5.blur()
    },
    go_creat6() {
      this.$router.push('/Supplier/SupplierCategory')
      this.$refs.clear6.blur()
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
