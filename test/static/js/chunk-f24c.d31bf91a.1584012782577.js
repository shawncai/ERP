(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f24c"],{"/EQ2":function(e,t,o){},"3qjA":function(e,t,o){"use strict";var r=o("VG0r"),n={props:{treecontrol:{type:Boolean,default:!1}},data:function(){return{digui:"",choosedata:"",editVisible:this.treecontrol,filterText:"",detalist:[],detaillistProps:{children:"productClassfyVos",label:"categoryName"}}},watch:{treecontrol:function(){this.editVisible=this.treecontrol,this.gettree()},filterText:function(e){this.$refs.tree2.filter(e)}},created:function(){this.gettree()},beforeCreate:function(){this},methods:{filterNode:function(e,t,o){if(!e)return!0;var r=[];this.getReturnNode(o,r,e);var n=!1;return r.forEach(function(e){n=n||e}),n},getReturnNode:function(e,t,o){var r=e.data&&e.data.categoryName&&-1!==e.data.categoryName.toUpperCase().indexOf(o.toUpperCase());r&&t.push(r),this.index++,!r&&1!==e.level&&e.parent&&this.getReturnNode(e.parent,t,o)},gettree:function(){var e=this;Object(r.l)().then(function(t){200===t.data.ret&&(e.detalist=t.data.data.content)})},handleNodeClick:function(e,t){return console.log(t),1===t.level?(this.$notify.error({title:"wrong",message:"顶层不可选择",offset:100}),!1):(this.digui=t,this.choosedata=e,1===this.choosedata.level?(this.$notify.error({title:"wrong",message:"顶层不可选择",offset:100}),this.editVisible=!0,!1):(this.$emit("tree",this.choosedata),this.$emit("finder",this.digui),this.editVisible=!1,void this.gettree()))},handleConfirm:function(){console.log(this.choosedata)}}},a=(o("QZz9"),o("KHd+")),s=Object(a.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{attrs:{visible:e.editVisible,treecontrol:e.treecontrol,"close-on-press-escape":!1,"append-to-body":"",top:"10px"},on:{"update:visible":function(t){e.editVisible=t},close:function(t){e.$emit("update:treecontrol",!1)}}},[o("h2",{ref:"geren",staticClass:"form-name"},[e._v("物品分类")]),e._v(" "),o("el-card",{staticClass:"box-card"},[o("el-input",{staticStyle:{"margin-bottom":"30px"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),o("el-tree",{ref:"tree2",staticClass:"filter-tree",attrs:{data:e.detalist,props:e.detaillistProps,"filter-node-method":e.filterNode,"default-expand-all":""},on:{"node-click":e.handleNodeClick}})],1)],1)},[],!1,null,"25d2c5e4",null);s.options.__file="MyTree.vue";t.a=s.exports},FpJA:function(e,t,o){"use strict";o.r(t);var r=o("moiu"),n=o("uNNS"),a=o("6HaC"),s=o("Q4Eu"),i=o("+Khs"),l=o("41Be"),c=o("1ZjH"),d=o("3qjA"),u={name:"Commission",directives:{permission:s.a,permission2:i.a},components:{MyEmp:c.a,MyTree:d.a},data:function(){return{paymentIds:[],levelIds:[],transportIds:[],giveIds:[],typeIds:[],empcontrol:!1,nations:[],provinces:[],cities:[],regions:[],props:{value:"id",label:"regionName",children:"regionListVos"},buyerId:"",roleIds:[],perregions:[],treecontrol:!1,productCategoryId:"",personalForm:{roleId:"",commissionCategory:1,commissionType:1,commissionValue:"",countryId:""},personalrules:{roleId:[{required:!0,message:"请选择职位",trigger:"change"}],productCategoryId:[{required:!0,message:"请选择物品分类",trigger:"change"}],commissionType:[{required:!0,message:"请选择供应商分组",trigger:"change"}],commissionValue:[{required:!0,message:"请输入提成",trigger:"blur"}],countryId:[{required:!0,message:"请选择国家",trigger:"change"}]}}},created:function(){this.getnationlist()},beforeCreate:function(){this},methods:{checkPermission:l.a,tree:function(e){console.log(e),this.productCategoryId=e.categoryName,this.personalForm.productCategoryId=e.id},treechoose:function(){console.log("this.treecontrol",this.treecontrol),this.treecontrol=!0,console.log("this.treecontrol",this.treecontrol)},getnationlist:function(){var e=this;Object(a.v)().then(function(t){200===t.data.ret&&(e.nations=t.data.data.content)}),Object(a.E)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))});var t={iseffective:1};t.iseffective=1,t.type=2,t.pagesize=999,Object(n.c)().then(function(t){200===t.data.ret?e.roleIds=t.data.data.content:e.$notify.error({title:"wrong",message:"wrong",offset:100})})},handlechange:function(e){var t=this;Object(a.y)(e).then(function(e){200===e.data.ret?t.provinces=e.data.data.content:t.$notify.error({title:"wrong",message:"wrong",offset:100})})},handlechange2:function(e){var t=this;Object(a.u)(e).then(function(e){console.log(e),200===e.data.ret?t.cities=e.data.data.content:t.$notify.error({title:"wrong",message:"wrong",offset:100})})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handlesave:function(){var e=this;this.$refs.personalForm.validate(function(t){if(!t)return e.$notify.error({title:"wrong",message:"Information is incomplete",offset:100}),!1;Object(r.d)(e.personalForm).then(function(t){console.log(t),200===t.data.ret?(e.$notify({title:"successful",message:"save successful",type:"success",offset:100}),e.restAllForm(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields()):e.$notify.error({title:"wrong",message:t.data.msg,offset:100})})})},restAllForm:function(){this.personalForm={commissionType:1,BasicSettingsName:"",typeId:"",BasicSettingsShortName:"",BasicSettingsIntroduction:"",countryId:"",provinceId:"",cityId:"",detailAddress:"",groupId:"",zipCode:"",contactPersonName:"",contactPersonPhone:"",regionId:"",giveId:"",transportId:"",levelId:"",isHot:"",isEffective:"",buyerId:"",businessScopeIntroduction:"",paymentId:"",moneyId:"",bankName:"",accountName:"",account:"",establishDate:"",legalPerson:"",taxNumber:"",commissionCategory:1,companyTypeId:""},this.productCategoryId="",this.perregions=[],this.buyerId=""},handleentry:function(){this.personalForm.regionId=this.perregions[this.perregions.length-1]},handlecancel:function(){this.$router.go(-1);this.$store.dispatch("delView",{path:"/BasicSettings/NewBasicSettings",name:"NewBasicSettings",fullPath:"/BasicSettings/NewBasicSettings",title:"NewBasicSettings"}).then(function(e){e.visitedViews})},handlechoose:function(){this.empcontrol=!0},personName:function(e){console.log(e),this.buyerId=e.personName,this.personalForm.buyerId=e.id}}},m=(o("PTOs"),o("KHd+")),p=Object(m.a)(u,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"ERP-container"},[o("div",{staticClass:"app-container"},[o("h2",{ref:"geren",staticClass:"form-name"},[e._v(e._s(e.$t("Hmodule.basicinfo")))]),e._v(" "),o("div",{staticClass:"container"},[o("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,"status-icon":"","label-position":"left","label-width":"300px"}},[o("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.roleId"),prop:"roleId"}},[o("el-select",{staticStyle:{width:"100%"},on:{change:e.handlechange},model:{value:e.personalForm.roleId,callback:function(t){e.$set(e.personalForm,"roleId",t)},expression:"personalForm.roleId"}},e._l(e.roleIds,function(e,t){return o("el-option",{key:t,attrs:{label:e.roleName,value:e.id}})}))],1),e._v(" "),o("el-form-item",{staticStyle:{width:"40%"},attrs:{label:e.$t("Product.categoryid"),prop:"productCategoryId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:e.$t("Hmodule.wpfl"),clearable:""},model:{value:e.personalForm.productCategoryId,callback:function(t){e.$set(e.personalForm,"productCategoryId",t)},expression:"personalForm.productCategoryId"}},[o("el-option",{attrs:{label:e.$t("otherlanguage.zc"),value:"1"}}),e._v(" "),o("el-option",{attrs:{label:e.$t("otherlanguage.pj"),value:"2"}}),e._v(" "),o("el-option",{attrs:{label:e.$t("otherlanguage.jgj"),value:"3"}}),e._v(" "),o("el-option",{attrs:{label:e.$t("otherlanguage.xhp"),value:"4"}}),e._v(" "),o("el-option",{attrs:{label:e.$t("otherlanguage.dc"),value:"5"}})],1)],1),e._v(" "),o("el-form-item",{staticStyle:{width:"35%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.commissionCategory"),prop:"commissionType"}},[o("el-radio-group",{model:{value:e.personalForm.commissionCategory,callback:function(t){e.$set(e.personalForm,"commissionCategory",t)},expression:"personalForm.commissionCategory"}},[o("el-radio",{attrs:{label:1}},[e._v(e._s(e.$t("updates.lrtc")))]),e._v(" "),o("el-radio",{attrs:{label:2}},[e._v(e._s(e.$t("updates.xssrtc")))])],1)],1),e._v(" "),o("el-form-item",{staticStyle:{width:"35%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.commissionType"),prop:"commissionType"}},[o("el-radio-group",{model:{value:e.personalForm.commissionType,callback:function(t){e.$set(e.personalForm,"commissionType",t)},expression:"personalForm.commissionType"}},[o("el-radio",{attrs:{label:1}},[e._v(e._s(e.$t("updates.tcbl")))]),e._v(" "),o("el-radio",{attrs:{label:2}},[e._v(e._s(e.$t("updates.gdje")))])],1)],1),e._v(" "),o("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("BasicSettings.commissionValue"),prop:"commissionValue"}},[o("el-input",{attrs:{placeholder:"请输入提成",clearable:""},model:{value:e.personalForm.commissionValue,callback:function(t){e.$set(e.personalForm,"commissionValue",t)},expression:"personalForm.commissionValue"}})],1),e._v(" "),o("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("public.countyrId"),prop:"countryId"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"国家"},on:{change:e.handlechange},model:{value:e.personalForm.countryId,callback:function(t){e.$set(e.personalForm,"countryId",t)},expression:"personalForm.countryId"}},e._l(e.nations,function(e,t){return o("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1)],1),e._v(" "),o("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-39-44-1"],expression:"['1-39-44-1']"}],attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v(e._s(e.$t("Hmodule.baoc")))]),e._v(" "),o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-39-44-1"],expression:"['1-39-44-1']"}],attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v(e._s(e.$t("Hmodule.cancel")))])],1)])])},[],!1,null,"4b831dad",null);p.options.__file="Commission.vue";t.default=p.exports},IcGC:function(e,t,o){},PTOs:function(e,t,o){"use strict";var r=o("/EQ2");o.n(r).a},QZz9:function(e,t,o){"use strict";var r=o("IcGC");o.n(r).a},uNNS:function(e,t,o){"use strict";o.d(t,"c",function(){return n}),o.d(t,"b",function(){return a}),o.d(t,"a",function(){return s}),o.d(t,"d",function(){return i});var r=o("t3Un");function n(){return Object(r.a)({url:"/role/getrolelist",method:"post"})}function a(){return Object(r.a)({url:"/role/getauthoritydetaillist",method:"post"})}function s(e){var t=new URLSearchParams;return""!==e.rolename&&null!==e.rolename&&void 0!==e.rolename&&t.append("rolename",e.rolename),""!==e.createPersonId&&null!==e.createPersonId&&void 0!==e.createPersonId&&t.append("createPersonId",e.createPersonId),Object(r.a)({url:"/role/addrole",method:"post",data:t})}function i(e,t,o){var n=new URLSearchParams;return n.append("roleid",e),n.append("roleName",o),n.append("authority",t),Object(r.a)({url:"/role/updaterole",method:"post",data:n})}}}]);