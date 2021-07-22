<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 30px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierName')" prop="supplierName" style="width: 100%;">
                <el-input v-model="personalForm.supplierName" placeholder="请输入供应商名称" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.typeId')" prop="typeId" style="width: 100%;">
                <el-select v-model="personalForm.typeId" placeholder="请选择供应商类别" style="margin-left: 18px;width: 200px" @focus="updateType">
                  <el-option
                    v-for="(item, index) in typeIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierShortName')" prop="supplierShortName" style="width: 100%;">
                <el-input v-model="personalForm.supplierShortName" placeholder="请输入供应商简称" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.supplierIntroduction')" prop="supplierShortName" style="width: 100%;">
                <el-input v-model="personalForm.supplierIntroduction" placeholder="请输入描述" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 5px">
      <h2 ref="lianxi" class="form-name">{{ $t('updates.ywxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
          <el-row>
            <el-col :span="12">
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
            <el-col :span="12">
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
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item :label="$t('public.address')" style="width: 100%;">
                <el-input v-model="personalForm.detailAddress" placeholder="请输入地址" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.groupId')" prop="groupId" style="width: 100%;">
                <el-select v-model="personalForm.groupId" filterable multiple placeholder="请选择供应商分组" style="margin-left: 18px;width: 200px" @focus="updateGroup">
                  <el-option
                    v-for="(item, index) in groupIds"
                    :key="index"
                    :label="item.groupName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('employee.email')" style="width: 100%;">
                <el-input v-model="personalForm.zipCode" placeholder="请输入邮编" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonName')" prop="contactPersonName" style="width: 100%;">
                <el-input v-model="personalForm.contactPersonName" placeholder="请输入联系人" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.contactPersonPhone')" prop="contactPersonPhone" style="width: 100%;">
                <el-input v-model="personalForm.contactPersonPhone" placeholder="请输入电话" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.giveId')" style="width: 100%;">
                <el-select v-model="personalForm.deliveryMode" placeholder="请选择交货方式" style="margin-left: 18px;width: 200px" @focus="updateGive">
                  <el-option
                    v-for="(item, index) in deliveryModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.transportId')" style="width: 100%;">
                <el-select v-model="personalForm.transportId" placeholder="请选择运送方式" style="margin-left: 18px;width: 200px" @focus="updateTran">
                  <el-option
                    v-for="(item, index) in transportIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                <el-select v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in colseTypes"
                    :value="item.id"
                    :key="index"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.levelId')" style="width: 100%;">
                <el-select v-model="personalForm.levelId" placeholder="请选择供应商优质级别" style="margin-left: 18px;width: 200px" @focus="updateLeve">
                  <el-option
                    v-for="(item, index) in levelIds"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isHot')" prop="isHot" style="width: 100%;">
                <el-select v-model="personalForm.isHot" :placeholder="$t('updates.qxz')" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('updates.yes')" value="1"/>
                  <el-option :label="$t('updates.no')" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.isEffective')" style="width: 100%;">
                <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('updates.qy')" value="1"/>
                  <el-option label="未启用" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.buyerId')" style="width: 100%;">
                <el-input v-model="buyerId" placeholder="请输入采购员" clearable style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <my-emp :control.sync="empcontrol" @personName="personName"/>
              <el-form-item :label="$t('Supplier.businessScopeIntroduction')" style="width: 100%;">
                <el-input v-model="personalForm.businessScopeIntroduction" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 5px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.ktgspmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button type="danger" @click="removedetail">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :key="tableKey2"
          :data.sync="showlist"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          height="600px"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center" fixed/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index" fixed/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="100px" fixed/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="100px" fixed/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="100px" fixed/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="100px" fixed/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="100px" fixed/>
          <!--          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" prop="proportion" align="center" label="供货比列(%)" min-width="150px"/>-->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" label="供货比列(%)" prop="proportion" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input v-model="scope.row.proportion" @focus="handlechoose2(scope)" @change="handlechangeproportion"/>
              <!--              <my-supplier :control.sync="proporcontrol" :procode="procode" @supplierName="personName2(scope, $event)"/>-->
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.price"
                disabled
                @input="getprice(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.discountRate"
                disabled/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.includeTaxPrice"
                disabled
                @input="getincludeTaxPrice(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-show="jundgeprice()"
                :precision="6"
                v-model="scope.row.taxRate"
                disabled
                @input="gettaxRate(scope.row)"/>
            </template>
          </el-editable-column>
        </el-editable>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="getemplist.pageNum"
          :limit.sync="getemplist.pageSize"
          @pagination="getlist"
        />
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 class="form-name">{{ $t('updates.cwxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.paymentId')" style="width: 100%;">
                <el-select v-model="personalForm.settleMode" placeholder="请选择结算方式" style="margin-left: 18px;width: 200px" @focus="updatePaymen">
                  <el-option
                    v-for="(item, index) in settleModes"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.moneyId')" style="width: 100%;">
                <el-select v-model="personalForm.moneyId" :value="personalForm.moneyId" placeholder="请选择币种" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                  <el-option value="4" label="LKR"/>
                  <el-option value="5" label="THB"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.bankName')" style="width: 100%;">
                <el-input v-model="personalForm.bankName" placeholder="请输入开户行" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.accountName')" style="width: 100%;">
                <el-input v-model="personalForm.accountName" placeholder="请输入户名" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.account')" style="width: 100%;">
                <el-input v-model="personalForm.account" placeholder="请输入账号" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('prompt.yfkbl') + '%'" style="width: 100%;">
                <el-input-number v-model="personalForm.proportion" :controls="false" :step="0.1" :min="0" style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px;margin-bottom: 20px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.fzxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
          <el-row>
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.legalPerson')" style="width: 100%;">
                <el-input v-model="personalForm.legalPerson" placeholder="请输入法人代表" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Supplier.taxNumber')" style="width: 100%;">
                <el-input v-model="personalForm.taxNumber" placeholder="请输入税务登记号" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('Supplier.businessLicense')" style="width: 100%;">-->
            <!--                <el-input v-model="personalForm.businessLicense" placeholder="请输入营业执照号" style="margin-left: 18px;width: 200px" clearable/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
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
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
    <el-dialog :visible.sync="proporcontrol" :close-on-press-escape="false" append-to-body title="供货比例" class="normal" width="608px" center>
      <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
        <el-form-item label-width="100px;" style="width: 550px;">
          <div style="width: 100%; height: 427px;overflow: hidden;background: white;" >
            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="list"
              height="390"
              style="width: 100%;">
              <el-table-column :resizable="false" label="供应商" min-width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.supplierName }}</span>
                </template>
              </el-table-column>
              <el-table-column :resizable="false" label="供货比例(%)" min-width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.proportion" :precision="0" :controls="false" :step="1" :min="0" style="width: 150px"/>
                  <!--                  <span>{{ scope.row.proportion }}</span>-->
                </template>
              </el-table-column>
            </el-table>

            <el-button v-waves type="success" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, regionlist, saveRegion, getRegion } from '@/api/public'
import { searchCategory, searchGroup, update, supplierDetail, updateSupplierDetail } from '@/api/Supplier'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import waves from '@/directive/waves'
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination'

// import { forEach } from '../../../../../../OA前台代码/nwow_oa/src/lib/util' // Waves directive
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves, permission },
  components: { MyDetail, MyEmp, Pagination },

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
    return {
      showlist: [],
      getemplist: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,

      tableKey: 0,
      tableKey2: 0,
      listLoading: true,
      proporcontrol: false,
      procode: null,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      list: [],
      // 商品明细数据
      list2: [],
      // 商品明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
      this.getemplist.pageNum = 1
      this.getemplist.pageSize = 10
    },
    editdata() {
      this.personalForm = this.editdata
      this.buyerId = this.editdata.buyerName
      this.list2 = this._.cloneDeep(this.personalForm.supplierDetailVos)
      this.total = this.personalForm.supplierDetailVos.length
      this.showlist = this.list2.slice(0, 10)
      this.handlechange(this.personalForm.countryId)
      this.handlechange2(this.personalForm.provinceId)
      getRegion(this.personalForm.regionId).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.perregions = res.data.data.content.zcc.split(',').map(function(item) {
            return Number(item)
          })
        }
      })
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handlechangeproportion() {
      this.updateList()
    },
    updateList() {
      const previndex = (this.getemplist.pageNum - 1) * this.getemplist.pageSize
      const nextindex = this.getemplist.pageNum * this.getemplist.pageSize

      for (let i = 0; i < this.showlist.length; i++) {
        this.list2[previndex + i] = this.showlist[i]
      }
    },
    removedetail() {
      this.$refs.editable.removeSelecteds()
      console.log('this.$refs.editable.getRemoveRecords()', this.$refs.editable.getRemoveRecords())
      const deleteData = this.$refs.editable.getRemoveRecords()
      console.log('showlist', this.showlist)
      for (let i = 0; i < deleteData.length; i++) {
        for (let j = 0; j < this.list2.length; j++) {
          if (deleteData[i].id === this.list2[j].id) {
            this.list2.splice(j, 1)
            j--
          }
        }
      }
      this.total = this.list2.length

      // const previndex = (this.getemplist.pageNum - 1) * this.getemplist.pageSize
      // const nextindex = this.getemplist.pageNum * this.getemplist.pageSize

      // for (let i = 0; i < this.showlist.length; i++) {
      //   this.list2[previndex + i] = this.showlist[i]
      // }

      console.log('this.getemplist', this.getemplist)
    },
    getlist(val) {
      console.log('val', val)
      console.log('this.list2', this.list2)
      const previndex = (val.page - 1) * val.limit
      const nextindex = val.page * val.limit
      const quanlity = val.limit
      console.log('previndex', previndex)
      console.log('nextindex', nextindex)
      this.showlist = this.list2.slice(previndex, nextindex)

      console.log('showlist', this.showlist)
      for (let i = 0; i < this.showlist.length; i++) {
        this.list2[previndex + i] = this.showlist[i]
      }
    },
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      // console.log('hasPermission=======', hasPermission)
      return hasPermission
    },
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
    handleConfirm() {
      console.log('this.list', this.list)
      const that = this
      // console.log('this.list2', this.list2)
      // for (const i in this.list2) {
      //   this.$refs.editable.insert(this.list2[i])
      // }

      let num = 0
      for (let i = 0; i < this.list.length; i++) {
        num += this.list[i].proportion
      }
      if (num === 100) {
        // this.proporcontrol = false
        const parms2 = JSON.stringify(this.list)
        updateSupplierDetail(parms2).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            this.$notify({
              title: 'successful',
              message: 'save successful',
              type: 'success',
              offset: 100
            })
            // this.$emit('rest', true)
            for (const i in that.list) {
              for (const j in that.list2) {
                if (that.list[i].productCode === that.list2[j].productCode && that.list[i].supplierId === that.list2[j].supplierId) {
                  // this.list2[j].proportion = this.list[i].proportion
                  // console.log('this.list[i].proportion', this.that[i].proportion)
                  that.$nextTick(() => {
                    that.$set(that.list2[j], 'proportion', that.list[i].proportion)
                    that.tableKey2 = Math.random()
                    // that.$set(that.list2[j], 'unit', 11111)
                  })

                  // console.log('this.list2[j].proportion', that.list2[j].proportion)
                  // console.log('this.list2', that.list2)
                }
              }
            }
            this.proporcontrol = false
          }
        })
      } else {
        this.$notify.error({
          title: 'wrong',
          message: '比例之和应为100',
          offset: 100
        })
      }
    },
    handlechoose2(scope) {
      console.log('12')
      this.listLoading = true
      this.proporcontrol = true
      // this.kongscope = scope
      this.procode = scope.row.productCode
      supplierDetail(this.procode).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
      })
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 100)
    },
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
      const nowlistdata = this.list2
      this.list2 = []
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')
      console.log('filterdata', filterdata)
      for (let i = 0; i < filterdata.length; i++) {
        if (filterdata[i]) {
          this.list2.push(filterdata[i])
        }
      }

      console.log('this.list2', this.list2)
      this.showlist = this.list2.slice(0, 10)
      this.total = this.list2.length
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
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        }
      })
      // 结算方式数据
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        supplierName: '',
        typeId: '',
        supplierShortName: '',
        supplierIntroduction: '',
        // 业务信息
        countryId: '',
        provinceId: '',
        cityId: '',
        detailAddress: '',
        groupId: '',
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
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.list2
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
              update(this.personalForm, parms2).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: 'save successful',
                    type: 'success',
                    offset: 100
                  })
                  this.$emit('rest', true)
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
                  this.editVisible = false
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
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
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
