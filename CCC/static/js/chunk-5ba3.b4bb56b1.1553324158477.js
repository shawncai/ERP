(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5ba3"],{FCAQ:function(e,t,a){},Ov4Y:function(e,t,a){"use strict";a.r(t);var o=a("gDS+"),r=a.n(o),n=a("LVwP"),l=a("+bJ2"),i=a("moiu"),d=a("owuD"),s=a("TPLF"),c=a("yzDo"),p={name:"AddInventorydamaged",components:{MyCreate:d.a,MyRepository:s.a,MyDetail:c.a},data:function(){return{locationlistparms:{pageNum:1,pageSize:1999,repositoryId:""},control:!1,depts:[],locationlist:[],damagedRepositoryId:"",handlePersonId:"",repositorycontrol:!1,createcontrol:!1,list2:[],validRules:{step:[{required:!0,message:"请输入流程步骤",trigger:"blur"}],money:[{required:!0,message:"请输入流转条件",trigger:"blue"}],handlerName:[{required:!0,message:"请选择步骤处理人",trigger:"blue"}]},personalForm:{repositoryId:438,regionId:2,createPersonId:3,countryId:1},personalrules:{handlePersonId:[{required:!0,message:"请选择经办人",trigger:"blue"}],damagedRepositoryId:[{required:!0,message:"请选择报损仓库",trigger:"blue"}],damagedDate:[{required:!0,message:"请选择报损日期",trigger:"change"}]}}},mounted:function(){this.getlist()},methods:{getlist:function(){var e=this;Object(i.m)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)})},handlesave:function(){var e=this,t=this.$refs.editable.getRecords();if(0===t.length)return this.$notify.error({title:"错误",message:"明细表不能为空",offset:100}),!1;t.map(function(e){return e}).forEach(function(e){return null!==e.locationId&&""!==e.locationId&&void 0!==e.locationId||delete e.locationId,null!==e.productCode&&""!==e.productCode&&void 0!==e.productCode||delete e.productCode,null!==e.productName&&""!==e.productName&&void 0!==e.productName||delete e.productName,null!==e.color&&""!==e.color&&void 0!==e.color||delete e.color,null!==e.typeId&&""!==e.typeId&&void 0!==e.typeId||delete e.typeId,null!==e.unit&&""!==e.unit&&void 0!==e.unit||delete e.unit,null!==e.damagedQuantity&&""!==e.damagedQuantity&&void 0!==e.damagedQuantity||delete e.damagedQuantity,null!==e.costPrice&&""!==e.costPrice&&void 0!==e.costPrice||delete e.costPrice,null!==e.remarks&&""!==e.remarks&&void 0!==e.remarks||delete e.remarks,null!==e.damagedMoney&&""!==e.damagedMoney&&void 0!==e.damagedMoney||delete e.damagedMoney,e});var a=r()(t),o=r()(this.personalForm);this.$refs.personalForm.validate(function(t){if(!t)return e.$notify.error({title:"错误",message:"信息未填完整",offset:100}),!1;Object(l.a)(o,a,e.personalForm.repositoryId,e.personalForm.regionId).then(function(t){console.log(t),200===t.data.ret?(e.$notify({title:"成功",message:"保存成功",type:"success",offset:100}),e.restAllForm(),e.$refs.editable.clear(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields()):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})})},restAllForm:function(){this.personalForm={repositoryId:438,regionId:2,createPersonId:3,countryId:1},this.handlePersonId="",this.damagedRepositoryId=""},handlecancel:function(){this.$router.go(-1);this.$store.dispatch("delView",{path:"/Inventorydamaged/NewInventorydamaged",name:"NewInventorydamaged",fullPath:"/Inventorydamaged/NewInventorydamaged",title:"NewInventorydamaged"}).then(function(e){e.visitedViews})},handlechoose:function(){this.createcontrol=!0},createname:function(e){console.log(e),this.handlePersonId=e.personName,this.personalForm.handlePersonId=e.id},handlechooseRep:function(){this.repositorycontrol=!0},repositoryname:function(e){var t=this;console.log(e),this.damagedRepositoryId=e.repositoryName,this.personalForm.damagedRepositoryId=e.id,this.locationlistparms.repositoryId=e.id,Object(n.g)(this.locationlistparms).then(function(e){200===e.data.ret&&(t.locationlist=e.data.data.content.list.map(function(e){return{value:e.id,label:e.locationName}}))})},updatedept:function(){this.getlist()},handleAddproduct:function(){this.control=!0},productdetail:function(e){console.log(this.$refs.editable.getRecords());for(var t=this.$refs.editable.getRecords(),a=0;a<e.length;a++){for(var o=0;o<t.length;o++)if(e[a].productCode===t[o].productCode)return this.$notify.error({title:"错误",message:"物品已添加",offset:100}),!1;this.$refs.editable.insert(e[a])}},getSize:function(e,t){return e*t}}},m=(a("tp60"),a("KHd+")),u=Object(m.a)(p,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ERP-container"},[a("div",{staticClass:"app-container"},[a("h2",{ref:"geren",staticClass:"form-name"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"container"},[a("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,inline:!0,"status-icon":"","label-position":"top","label-width":"300px"}},[a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.title")}},[a("el-input",{attrs:{placeholder:"请输入报损单主题",clearable:""},model:{value:e.personalForm.title,callback:function(t){e.$set(e.personalForm,"title",t)},expression:"personalForm.title"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.handlePersonId"),prop:"handlePersonId"}},[a("el-input",{attrs:{placeholder:"请选择经办人",clearable:""},on:{focus:e.handlechoose},model:{value:e.handlePersonId,callback:function(t){e.handlePersonId=t},expression:"handlePersonId"}})],1),e._v(" "),a("my-create",{attrs:{createcontrol:e.createcontrol},on:{"update:createcontrol":function(t){e.createcontrol=t},createname:e.createname}}),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.damagedDeptId")}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择报损部门",clearable:""},on:{focus:e.updatedept},model:{value:e.personalForm.damagedDeptId,callback:function(t){e.$set(e.personalForm,"damagedDeptId",t)},expression:"personalForm.damagedDeptId"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.deptName}})}))],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.damagedRepositoryId"),prop:"countRepositoryId"}},[a("el-input",{attrs:{placeholder:"请选择报损仓库",clearable:""},on:{focus:e.handlechooseRep},model:{value:e.damagedRepositoryId,callback:function(t){e.damagedRepositoryId=t},expression:"damagedRepositoryId"}})],1),e._v(" "),a("my-repository",{attrs:{repositorycontrol:e.repositorycontrol},on:{"update:repositorycontrol":function(t){e.repositorycontrol=t},repositoryname:e.repositoryname}}),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.damagedDate"),prop:"damagedDate"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"报损日期","value-format":"yyyy-MM-dd",clearable:""},model:{value:e.personalForm.damagedDate,callback:function(t){e.$set(e.personalForm,"damagedDate",t)},expression:"personalForm.damagedDate"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"80%","margin-top":"1%"},attrs:{label:e.$t("Inventorydamaged.damagedReason")}},[a("el-input",{attrs:{placeholder:"请输入报损原因",type:"textarea",clearable:""},model:{value:e.personalForm.damagedReason,callback:function(t){e.$set(e.personalForm,"damagedReason",t)},expression:"personalForm.damagedReason"}})],1)],1)],1),e._v(" "),a("h2",{ref:"fuzhu",staticClass:"form-name"},[e._v("报损单明细")]),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"50px"}},[a("el-button",{attrs:{type:"success"},on:{click:e.handleAddproduct}},[e._v("添加商品")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.$refs.editable.removeSelecteds()}}},[e._v("删除")])],1),e._v(" "),a("my-detail",{attrs:{control:e.control},on:{"update:control":function(t){e.control=t},product:e.productdetail}}),e._v(" "),a("div",{staticClass:"container"},[a("el-editable",{ref:"editable",staticClass:"click-table1",staticStyle:{width:"100%"},attrs:{data:e.list2,"edit-config":{showIcon:!0,showStatus:!0},"edit-rules":e.validRules,stripe:"",border:"",size:"medium"},on:{"update:data":function(t){e.list2=t}}},[a("el-editable-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-editable-column",{attrs:{label:"编号",width:"55",align:"center",type:"index"}}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElSelect",options:e.locationlist,type:"visible"},prop:"locationId",align:"center",label:"货位",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"productCode",align:"center",label:"物品编号",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"productName",align:"center",label:"物品名称",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"color",align:"center",label:"颜色",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"typeId",align:"center",label:"规格",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"unit",align:"center",label:"单位",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElInputNumber",attrs:{min:0},type:"visible"},prop:"damagedQuantity",align:"center",label:"报损数量",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"costPrice",align:"center",label:"成本单价",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"damagedMoney",align:"center",label:"报损金额",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(e._s(e.getSize(t.row.damagedQuantity,t.row.costPrice)))])]}}])}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElInput",type:"visible"},prop:"remarks",align:"center",label:"备注",width:"150px"}})],1)],1),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v("取消")])],1)],1)])},[],!1,null,"51be9550",null);u.options.__file="AddInventorydamaged.vue";t.default=u.exports},tp60:function(e,t,a){"use strict";var o=a("FCAQ");a.n(o).a}}]);