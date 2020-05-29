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
                <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.supplierName" placeholder="请输入供应商名称" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="personalForm.typeId" placeholder="请选择供应商类别" style="width: 200px" filterable @focus="updateType">
                    <el-option v-show="judgeflag" label="" value="" disabled/>
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
                <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.supplierShortName" placeholder="请输入供应商简称" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.supplierIntroduction')" prop="supplierShortName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.supplierIntroduction" placeholder="请输入描述" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--联系信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="lianxi" class="form-name">{{ $t('updates.ywxx') }}</div>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules2" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('public.countyrId')" prop="countryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.countryId" placeholder="国家" style="width: 200px" @change ="handlechange">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.provinceId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.provinceId" filterable placeholder="请选择省" style="width: 200px" @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.cityId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.cityId" placeholder="请选择市" style="width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.address')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.detailAddress" placeholder="请输入地址" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="height: 57px">
                <el-form-item :label="$t('Supplier.groupId')" prop="groupId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.groupId" filterable multiple placeholder="请选择供应商分组" style="width: 200px" @focus="updateGroup">
                    <el-option
                      v-for="(item, index) in groupIds"
                      :key="index"
                      :label="item.groupName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('employee.email')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.zipCode" placeholder="请输入邮箱" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.contactPersonName')" prop="contactPersonName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.contactPersonName" placeholder="请输入联系人" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.contactPersonPhone')" prop="contactPersonPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.contactPersonPhone" placeholder="请输入电话" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.regionId')" prop="regionid" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="perregions"
                    :show-all-levels="false"
                    :placeholder="$t('Hmodule.xzqy')"
                    change-on-select
                    filterable
                    clearable
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.giveId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear2" v-model="personalForm.deliveryMode" placeholder="请选择交货方式" style="width: 200px" @focus="updateGive">
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
                <el-form-item :label="$t('Supplier.transportId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear3" v-model="personalForm.transportId" placeholder="请选择运送方式" style="width: 200px" @focus="updateTran">
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
                <el-form-item :label="$t('Supplier.payMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear4" v-model="personalForm.payMode" clearable style="width: 200px">
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
                <el-form-item :label="$t('Supplier.levelId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear5" v-model="personalForm.levelId" placeholder="请选择供应商优质级别" style="width: 200px" @focus="updateLeve">
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
                <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.isHot" :placeholder="$t('updates.qxz')" style="width: 200px">
                    <el-option :label="$t('updates.yes')" value="1"/>
                    <el-option :label="$t('updates.no')" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.isEffective')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="width: 200px">
                    <el-option :label="$t('updates.qy')" value="1"/>
                    <el-option label="未启用" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.buyerId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="buyerId" placeholder="请输入采购员" clearable style="width: 200px" @focus="handlechoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <my-emp :control.sync="empcontrol" @personName="personName"/>
                <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.businessScopeIntroduction" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name" >{{ $t('updates.ktgspmx') }}</div>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column prop="proportion" align="center" label="供货比列(%)" min-width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,precision: 6,controls:false}, type: 'visible'}" prop="price" align="center" label="价格" min-width="150px" @change="getprice(scope.row)"/> -->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.price"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.includeTaxPrice"
                  @input="getincludeTaxPrice(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.taxRate"
                  @input="gettaxRate(scope.row)"/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--财务信息111-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div class="form-name">{{ $t('updates.cwxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" label-position="left" size="mini" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.settleMode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear6" v-model="personalForm.settleMode" placeholder="请选择结算方式" style="width: 200px" @focus="updatePaymen">
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
                <el-form-item :label="$t('Supplier.moneyId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.moneyId" :value="personalForm.moneyId" placeholder="请选择币种" style="width: 200px">
                    <el-option label="RMB" value="1"/>
                    <el-option label="USD" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.bankName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.bankName" placeholder="请输入开户行" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.accountName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.accountName" placeholder="请输入户名" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.account')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.account" placeholder="请输入账号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('prompt.yfkbl') + '%'" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input-number v-model="personalForm.proportion" :controls="false" :step="0.1" :min="0" style="width: 200px" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="mmargin-top: 5px;margin-bottom: 30px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.fzxx') }}</div>
        <div class="container" style="margin-top: 20px">
          <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.establishDate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.establishDate"
                    type="date"
                    placeholder="选择成立时间"
                    value-format="yyyy-MM-dd"
                    clearable
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.legalPerson')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.legalPerson" placeholder="请输入法人代表" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.taxNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('Supplier.businessLicense')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="personalForm.businessLicense" placeholder="请输入营业执照号" style="width: 200px" clearable/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.companyTypeId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.companyTypeId" placeholder="请选择单位性质" style="width: 200px">
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
                <el-form-item :label="$t('Supplier.amountinvoiced')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.amountpaid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.amountpayable')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Supplier.orderquantity')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card> -->
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;">
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
      judgeflag: false,
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
        proportion: 0,
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
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.includeTaxPrice !== 0) {
        row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(6)
        console.log(row.taxRate)
      }
    },
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
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')

      for (let i = 0; i < filterdata.length; i++) {
        console.log(filterdata[i].price)
        let m = 1
        for (let j = 0; j < nowlistdata.length; j++) {
          if (filterdata[i].productCode === nowlistdata[j].productCode) {
            m = 2
            // this.$notify.error({
            //   title: 'wrong',
            //   message: this.$t('prompt.wpytj'),
            //   offset: 100
            // })
            // return false
          }
        }
        // filterdata[i].discountRate = 0
        // filterdata[i].price = filterdata[i].purchasePrice
        if (m === 1) {
          this.$refs.editable.insert(filterdata[i])
        }
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
      let mk = 0
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          mk = 1
        }
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          mk = 2
        }
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
      if (mk === 1) {
        this.$notify.error({
          title: 'wrong',
          message: '商品明细中价格必填',
          offset: 100
        })
        return false
      }
      if (mk === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '商品明细中折扣必填',
          offset: 100
        })
        return false
      }
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
                    title: 'successful',
                    message: 'save successful',
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
              const anchor2 = this.$refs.geren.offsetTop
              console.log(anchor2)
              document.documentElement.scrollTop = anchor2 - 100
              return false
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
      let mk = 0
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          mk = 1
        }
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          mk = 2
        }
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
      if (mk === 1) {
        this.$notify.error({
          title: 'wrong',
          message: '商品明细中价格必填',
          offset: 100
        })
        return false
      }
      if (mk === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '商品明细中折扣必填',
          offset: 100
        })
        return false
      }
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
                    title: 'successful',
                    message: 'save successful',
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
              const anchor2 = this.$refs.geren.offsetTop
              console.log(anchor2)
              document.documentElement.scrollTop = anchor2 - 100
              return false
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
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
