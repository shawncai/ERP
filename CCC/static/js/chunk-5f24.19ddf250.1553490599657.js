(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5f24"],{"0zGY":function(e,t,a){"use strict";a.d(t,"g",function(){return n}),a.d(t,"l",function(){return i}),a.d(t,"e",function(){return o}),a.d(t,"h",function(){return l}),a.d(t,"o",function(){return p}),a.d(t,"j",function(){return s}),a.d(t,"i",function(){return d}),a.d(t,"b",function(){return c}),a.d(t,"c",function(){return u}),a.d(t,"n",function(){return m}),a.d(t,"f",function(){return f}),a.d(t,"k",function(){return v}),a.d(t,"a",function(){return y}),a.d(t,"m",function(){return g}),a.d(t,"d",function(){return h});var r=a("t3Un");function n(e){return Object(r.a)({url:"/erp/country/getdeptlist",method:"post",params:e})}function i(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("empids",e),""!==t&&null!==t&&a.append("stat",t),Object(r.a)({url:"/erp/employee/startorendemp",method:"post",data:a})}function o(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("empids",e),Object(r.a)({url:"/erp/employee/deleteemp",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("id",e),Object(r.a)({url:"/erp/employee/getempinfo",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("employeeid",e.id),""!==e.firstName&&null!==e.firstName&&void 0!==e.firstName&&t.append("firstname",e.firstName),""!==e.middleName&&null!==e.middleName&&void 0!==e.middleName&&t.append("middlename",e.middleName),""!==e.lastName&&null!==e.lastName&&void 0!==e.lastName&&t.append("lastname",e.lastName),""!==e.password&&null!==e.password&&void 0!==e.password&&t.append("passwd",e.password),""!==e.email&&null!==e.email&&void 0!==e.email&&t.append("email",e.email),""!==e.phone&&null!==e.phone&&void 0!==e.phone&&t.append("phone",e.phone),""!==e.gender&&null!==e.gender&&void 0!==e.gender&&t.append("gender",e.gender),""!==e.countryid&&null!==e.countryid&&void 0!==e.countryid&&t.append("countryid",e.countryid),""!==e.provinceid&&null!==e.provinceid&&void 0!==e.provinceid&&t.append("provinceid",e.provinceid),""!==e.cityid&&null!==e.cityid&&void 0!==e.cityid&&t.append("cityid",e.cityid),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.birthday&&null!==e.birthday&&void 0!==e.birthday&&t.append("birthday",e.birthday),""!==e.deptId&&null!==e.deptId&&void 0!==e.deptId&&t.append("deptid",e.deptId),""!==e.postId&&null!==e.postId&&void 0!==e.postId&&t.append("postid",e.postId),""!==e.repositoryid2&&null!==e.repositoryid2&&void 0!==e.repositoryid2&&t.append("repositoryid",e.repositoryid2),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionid",e.regionId),""!==e.certificateType&&null!==e.certificateType&&void 0!==e.certificateType&&t.append("certificatetype",e.certificateType),""!==e.certificateNumber&&null!==e.certificateNumber&&void 0!==e.certificateNumber&&t.append("certificatenumber",e.certificateNumber),Object(r.a)({url:"/erp/employee/updateemp",method:"post",data:t})}function s(e){var t=new URLSearchParams;return t.append("firstname",e.firstname),t.append("middlename",e.middlename),t.append("lastname",e.lastname),t.append("passwd",e.passwd),t.append("email",e.email),t.append("phone",e.phone),t.append("gender",e.gender),t.append("countryid",e.country),t.append("provinceid",e.provinceid),t.append("cityid",e.cityid),t.append("address",e.address),""===e.birthday&&null===e.birthday||t.append("birthday",e.birthday),t.append("account",e.account),t.append("jobnumber",e.jobnumber),t.append("deptid",e.deptid),t.append("roleid",e.roleid),t.append("postid",e.postid),t.append("repositoryid",e.repositoryid),t.append("regionid",e.regionid1),t.append("certificatetype",e.certificatetype),t.append("certificatenumber",e.certificatenumber),Object(r.a)({url:"/erp/employee/register",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.repositoryid&&t.append("repositoryid",e.repositoryid),""!==e.regionid&&void 0!==e.regionid&&t.append("regionid",e.regionid),""!==e.postid&&t.append("postid",e.postid),""!==e.deptid&&t.append("deptid",e.deptid),""!==e.employeename&&t.append("employeename",e.employeename),""!==e.stat&&t.append("stat",e.stat),""!==e.time&&null!==e.time&&t.append("time",e.time),""!==e.jobnumber&&t.append("jobnumber",e.jobnumber),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/employee/getemplist",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.employeeid&&t.append("employeeid",e.employeeid),""!==e.contractname&&t.append("contractname",e.contractname),""!==e.signtime&&null!==e.signtime&&t.append("signtime",e.signtime),""!==e.expiredtime&&null!==e.expiredtime&&t.append("expiredtime",e.expiredtime),""!==e.effectivetime&&null!==e.effectivetime&&t.append("effectivetime",e.effectivetime),""!==e.typeid&&t.append("typeid",e.typeid),""!==e.attribute&&t.append("attribute",e.attribute),""!==e.period&&t.append("period",e.period),""!==e.iscorrection&&t.append("iscorrection",e.iscorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceday&&t.append("advanceday",e.advanceday),""!==e.trialsalary&&t.append("trialsalary",e.trialsalary),""!==e.correctionsalary&&t.append("correctionsalary",e.correctionsalary),""!==e.remindpersonid&&t.append("remindpersonid",e.remindpersonid),Object(r.a)({url:"/erp/contract/addcontract",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e.contractname&&t.append("contractname",e.contractname),""!==e.contractnumber&&t.append("contractnumber",e.contractnumber),""!==e.empnumber&&t.append("empnumber",e.empnumber),""!==e.empname&&t.append("empname",e.empname),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/contract/contractlist",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.id&&t.append("contractid",e.id),""!==e.contractName&&t.append("contractname",e.contractName),""!==e.signTime&&t.append("signtime",e.signTime),""!==e.expiredTime&&t.append("expiredtime",e.expiredTime),""!==e.effectiveTime&&t.append("effectivetime",e.effectiveTime),""!==e.type&&t.append("typeid",e.type),""!==e.contractAttribute&&t.append("attribute",e.contractAttribute),""!==e.contractAttribute&&t.append("period",e.period),""!==e.isCorrection&&t.append("iscorrection",e.isCorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceDay&&t.append("advanceday",e.advanceDay),""!==e.trialSalary&&t.append("trialsalary",e.trialSalary),""!==e.correctionSalary&&t.append("correctionsalary",e.correctionSalary),""!==e.expiredRemindPersonId&&null!==e.expiredRemindPersonId&&t.append("remindpersonid",e.expiredRemindPersonId),Object(r.a)({url:"/erp/contract/updatecontract",method:"post",data:t})}function f(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("empcontractids",e),Object(r.a)({url:"/erp/contract/deleteempcontract",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/employee/searchEmpCategory",method:"post",data:t})}function y(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(r.a)({url:"/erp/employee/addEmpCategory",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(r.a)({url:"/erp/employee/updateEmpCategory",method:"post",data:t})}function h(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("ids",e),Object(r.a)({url:"/erp/employee/delateEmpCategory",method:"post",data:t})}},"2H35":function(e,t,a){"use strict";a.d(t,"f",function(){return n}),a.d(t,"b",function(){return i}),a.d(t,"h",function(){return o}),a.d(t,"j",function(){return l}),a.d(t,"g",function(){return p}),a.d(t,"a",function(){return s}),a.d(t,"k",function(){return d}),a.d(t,"c",function(){return c}),a.d(t,"d",function(){return u}),a.d(t,"i",function(){return m}),a.d(t,"e",function(){return f});var r=a("t3Un");function n(){var e=new URLSearchParams;return e.append("pagenum",1),e.append("pagesize",99999),Object(r.a)({url:"/erp/repository/searchRepCategory",method:"post",data:e})}function i(e){var t=new URLSearchParams;return""!==e.repositoryName&&null!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.address&&null!==e.address&&t.append("address",e.address),""!==e.longitude&&null!==e.longitude&&t.append("longitude",e.longitude),""!==e.latitude&&null!==e.latitude&&t.append("latitude",e.latitude),""!==e.managerPeopleId&&null!==e.managerPeopleId&&t.append("managerPeopleId",e.managerPeopleId),""!==e.createTime&&null!==e.createTime&&t.append("createTime",e.createTime),""!==e.stat&&null!==e.stat&&t.append("stat",e.stat),""!==e.description&&null!==e.description&&t.append("description",e.description),""!==e.regionId&&null!==e.regionId&&t.append("regionId",e.regionId),""!==e.type&&null!==e.type&&t.append("type",e.type),""!==e.regionManagerId&&null!==e.regionManagerId&&t.append("regionManagerId",e.regionManagerId),""!==e.attributes&&null!==e.attributes&&t.append("attributes",e.attributes),""!==e.countryId&&null!==e.countryId&&t.append("countryId",e.countryId),Object(r.a)({url:"/erp/repository/create",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.repositoryName&&null!==e.repositoryName&&void 0!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionId",e.regionId),""!==e.countyrId&&null!==e.countyrId&&void 0!==e.countyrId&&t.append("countyrId",e.countyrId),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/repository/searchRepository",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.repositoryName&&null!==e.repositoryName&&void 0!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.longitude&&null!==e.longitude&&void 0!==e.longitude&&t.append("longitude",e.longitude),""!==e.latitude&&null!==e.latitude&&void 0!==e.latitude&&t.append("latitude",e.latitude),""!==e.createTime&&null!==e.createTime&&void 0!==e.createTime&&t.append("createTime",e.createTime),""!==e.managerPeopleId&&null!==e.managerPeopleId&&void 0!==e.managerPeopleId&&t.append("managerPeopleId",e.managerPeopleId),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.description&&null!==e.description&&void 0!==e.description&&t.append("description",e.description),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionId",e.regionId),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.regionManagerId&&null!==e.regionManagerId&&void 0!==e.regionManagerId&&t.append("regionManagerId",e.regionManagerId),""!==e.attributes&&null!==e.attributes&&void 0!==e.attributes&&t.append("attributes",e.attributes),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&t.append("countryId",e.countryId),""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/repository/update",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(r.a)({url:"/erp/repository/searchRepCategory",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(r.a)({url:"/erp/repository/addRepCategory",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(r.a)({url:"/erp/repository/updateRepCategory",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("modelids",e),Object(r.a)({url:"/erp/repository/delateRepCategory",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("modelids",e),Object(r.a)({url:"/erp/repository/deleteRepository",method:"post",data:t})}function m(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("modelids",e),""!==t&&null!==t&&a.append("iseffective",t),Object(r.a)({url:"/erp/repository/startorend",method:"post",data:a})}function f(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("repositoryJson",e),Object(r.a)({url:"/erp/repository/manyinsert",method:"post",data:t})}},"4pCK":function(e,t,a){},IZPg:function(e,t,a){"use strict";var r=a("K7Et");a.n(r).a},K7Et:function(e,t,a){},Se7q:function(e,t,a){"use strict";var r=a("4pCK");a.n(r).a},"gDS+":function(e,t,a){e.exports={default:a("oh+g"),__esModule:!0}},"oh+g":function(e,t,a){var r=a("WEpk"),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},wPog:function(e,t,a){"use strict";a.r(t);var r=a("gDS+"),n=a.n(r),i=a("moiu"),o=a("6HaC"),l=a("8mNt"),p=a("aiY5"),s=a("oCvA"),d=a("kCaz"),c=a("7tPT"),u={name:"AddStoragemove",components:{MyDepot:a("fHvh").a,MyRepository:p.a,MyDetail:d.a,MyCreate:c.a,MyAccept:s.a},data:function(){return{batchlist:[],depts:[],moveOutRepository:"",moveInRepository:"",repositorycontrol:!1,depotcontrol:!1,control:!1,personalForm:{createPersonId:3,countryId:1,repositoryId:438,regionId:2,sourceType:"1"},personalrules:{requestDeptId:[{required:!0,message:"请选择要货部门",trigger:"change"}],moveInRepository:[{required:!0,message:"请选择调入仓库",trigger:"focus"}],requestArrivalDate:[{required:!0,message:"请选择要求到货日期",trigger:"change"}],departmentId:[{required:!0,message:"请选择调货部门",trigger:"change"}],moveOutRepository:[{required:!0,message:"请选择调出仓库",trigger:"focus"}],businessStat:[{required:!0,message:"请选择业务状态",trigger:"change"}]},list2:[],locationlistparms:{pageNum:1,pageSize:1999,repositoryId:""},locationlist:[],validRules:{}}},mounted:function(){this.getlist()},methods:{getlist:function(){var e=this;Object(i.m)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)})},handlechooseDep:function(){this.depotcontrol=!0},depotname:function(e){this.moveInRepository=e.repositoryName,this.personalForm.moveInRepository=e.id},handlechooseRep:function(){this.repositorycontrol=!0},repositoryname:function(e){console.log(e),this.moveOutRepository=e.repositoryName,this.personalForm.moveOutRepository=e.id},updatebatch:function(e,t){var a=this;if(!0===e){if(console.log(this.personalForm.moveOutRepository),void 0===this.personalForm.moveOutRepository||""===this.personalForm.moveOutRepository)return this.$notify.error({title:"错误",message:"请先选择仓库",offset:100}),!1;Object(o.e)(this.personalForm.moveOutRepository,t.row).then(function(e){if(200===e.data.ret)if(0!==e.data.data.content.length)a.locationlist=e.data.data.content,a.updatebatch3(t);else if(0===e.data.data.content.length)return a.$notify.error({title:"错误",message:"该仓库没有该商品",offset:100}),a.locationlist=[],!1})}},updatebatch3:function(e){var t=this,a=e.row.productCode;Object(o.a)(this.personalForm.moveOutRepository,a).then(function(e){t.batchlist=e.data.data.content})},updatebatch2:function(e,t){var a=this;if(!0===e){var r=t.row.productCode;Object(o.a)(this.personalForm.moveOutRepository,r).then(function(e){a.batchlist=e.data.data.content})}},handleAddproduct:function(){this.control=!0},productdetail:function(e){console.log(e);for(var t=this.$refs.editable.getRecords(),a=0;a<e.length;a++){for(var r=0;r<t.length;r++)if(e[a].productCode===t[r].productCode)return this.$notify.error({title:"错误",message:"物品已添加",offset:100}),!1;this.$refs.editable.insert(e[a])}},getSize:function(e,t){return e*t},restAllForm:function(){this.personalForm={createPersonId:3,countryId:1,repositoryId:438,regionId:2,sourceType:"1"},this.moveOutRepository="",this.moveInRepository=""},handlesave:function(){var e=this,t=this.$refs.editable.getRecords();if(console.log(this.personalForm),console.log(t),0===t.length)return this.$notify.error({title:"错误",message:"明细表不能为空",offset:100}),!1;t.map(function(e){return e}).forEach(function(e){return null!==e.locationId&&""!==e.locationId&&void 0!==e.locationId||delete e.locationId,null!==e.productCode&&""!==e.productCode&&void 0!==e.productCode||delete e.productCode,null!==e.productName&&""!==e.productName&&void 0!==e.productName||delete e.productName,null!==e.batch&&""!==e.batch&&void 0!==e.batch||delete e.batch,null!==e.color&&""!==e.color&&void 0!==e.color||delete e.color,null!==e.typeId&&""!==e.typeId&&void 0!==e.typeId||delete e.typeId,null!==e.unit&&""!==e.unit&&void 0!==e.unit||delete e.unit,null!==e.price&&""!==e.price&&void 0!==e.price||delete e.price,null!==e.movePrice&&""!==e.movePrice&&void 0!==e.movePrice||delete e.movePrice,null!==e.moveQuantity&&""!==e.moveQuantity&&void 0!==e.moveQuantity||delete e.moveQuantity,null!==e.totalMoney&&""!==e.totalMoney&&void 0!==e.totalMoney||delete e.totalMoney,null!==e.remarks&&""!==e.remarks&&void 0!==e.remarks||delete e.remarks,e});var a=this.personalForm;for(var r in a)""!==a[r]&&void 0!==a[r]&&null!==a[r]||delete a[r];var i=n()(a),o=n()(t),p=this.personalForm;this.$refs.personalForm.validate(function(t){if(!t)return e.$notify.error({title:"错误",message:"信息未填完整",offset:100}),!1;e.$refs.editable.validate().then(function(t){t&&Object(l.a)(i,o,p).then(function(t){console.log(t),200===t.data.ret?(e.$notify({title:"成功",message:"保存成功",type:"success",offset:100}),e.restAllForm(),e.$refs.editable.clear(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields()):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})}).catch(function(t){return e.$notify.error({title:"错误",message:"信息未填完整",offset:100}),!1})})},handlecancel:function(){this.$router.go(-1);this.$store.dispatch("delView",{path:"/Storagemove/NewStoragemove",name:"NewStoragemove",fullPath:"/Storagemove/NewStoragemove",title:"NewStoragemove"}).then(function(e){e.visitedViews})}}},m=(a("IZPg"),a("KHd+")),f=Object(m.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ERP-container"},[a("div",{staticClass:"app-container",staticStyle:{"padding-right":"0"}},[a("el-card",{staticClass:"box-card"},[a("h2",{ref:"geren",staticClass:"form-name"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"container"},[a("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,inline:!0,"status-icon":"","label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.title")}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请输入调拨单主题",clearable:""},model:{value:e.personalForm.title,callback:function(t){e.$set(e.personalForm,"title",t)},expression:"personalForm.title"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.requestDeptId"),prop:"requestDeptId"}},[a("el-select",{staticStyle:{"margin-left":"18px",width:"218px"},attrs:{placeholder:"请选择要货部门",clearable:""},model:{value:e.personalForm.requestDeptId,callback:function(t){e.$set(e.personalForm,"requestDeptId",t)},expression:"personalForm.requestDeptId"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.deptName}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.moveInRepository"),prop:"moveInRepository"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请选择调入仓库",clearable:""},on:{focus:e.handlechooseDep},model:{value:e.moveInRepository,callback:function(t){e.moveInRepository=t},expression:"moveInRepository"}})],1),e._v(" "),a("my-depot",{attrs:{depotcontrol:e.depotcontrol},on:{"update:depotcontrol":function(t){e.depotcontrol=t},depotname:e.depotname}})],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.requestArrivalDate"),"label-width":"110px",prop:"requestArrivalDate"}},[a("el-date-picker",{staticStyle:{"margin-left":"8px"},attrs:{type:"date",placeholder:"选择要求到货日期","value-format":"yyyy-MM-dd"},model:{value:e.personalForm.requestArrivalDate,callback:function(t){e.$set(e.personalForm,"requestArrivalDate",t)},expression:"personalForm.requestArrivalDate"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.moveReason")}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请输入调拨原因",clearable:""},model:{value:e.personalForm.moveReason,callback:function(t){e.$set(e.personalForm,"moveReason",t)},expression:"personalForm.moveReason"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.departmentId"),prop:"departmentId"}},[a("el-select",{staticStyle:{"margin-left":"18px",width:"218px"},attrs:{placeholder:"请选择调货部门",clearable:""},model:{value:e.personalForm.departmentId,callback:function(t){e.$set(e.personalForm,"departmentId",t)},expression:"personalForm.departmentId"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.deptName}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.moveOutRepository"),prop:"moveOutRepository"}},[a("el-input",{staticStyle:{"margin-left":"18px",width:"218px"},attrs:{placeholder:"请选择调出仓库",clearable:""},on:{focus:e.handlechooseRep},model:{value:e.moveOutRepository,callback:function(t){e.moveOutRepository=t},expression:"moveOutRepository"}})],1),e._v(" "),a("my-repository",{attrs:{repositorycontrol:e.repositorycontrol},on:{"update:repositorycontrol":function(t){e.repositorycontrol=t},repositoryname:e.repositoryname}})],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("Storagemove.businessStat"),prop:"businessStat"}},[a("el-select",{staticStyle:{"margin-left":"18px",width:"218px"},attrs:{placeholder:"请选择业务",clearable:""},model:{value:e.personalForm.businessStat,callback:function(t){e.$set(e.personalForm,"businessStat",t)},expression:"personalForm.businessStat"}},[a("el-option",{attrs:{value:"1",label:"调拨申请"}})],1)],1)],1)],1)],1)],1)]),e._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[a("h2",{ref:"fuzhu",staticClass:"form-name"},[e._v("调拨单明细")]),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"58px"}},[a("el-button",{staticStyle:{background:"#3696fd","border-color":"#3696fd"},attrs:{type:"success"},on:{click:e.handleAddproduct}},[e._v("添加商品")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.$refs.editable.removeSelecteds()}}},[e._v("删除")])],1),e._v(" "),a("my-detail",{attrs:{control:e.control},on:{"update:control":function(t){e.control=t},product:e.productdetail}}),e._v(" "),a("div",{staticClass:"container"},[a("el-editable",{ref:"editable",staticClass:"click-table1",staticStyle:{width:"100%"},attrs:{data:e.list2,"edit-config":{showIcon:!0,showStatus:!0},"edit-rules":e.validRules,stripe:"",border:"",size:"medium"},on:{"update:data":function(t){e.list2=t}}},[a("el-editable-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-editable-column",{attrs:{label:"编号",width:"55",align:"center",type:"index"}}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{type:"default"},prop:"locationId",align:"center",label:"货位",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{value:t.row.locationId,placeholder:"请选择货位",filterable:"",clearable:""},on:{"visible-change":function(a){e.updatebatch(a,t)}},model:{value:t.row.locationId,callback:function(a){e.$set(t.row,"locationId",a)},expression:"scope.row.locationId"}},e._l(e.locationlist,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.locationCode}})}))]}}])}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{type:"default"},prop:"batch",align:"center",label:"批次",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{value:t.row.batch,placeholder:"请选择批次",filterable:"",clearable:""},on:{"visible-change":function(a){e.updatebatch2(a,t)}},model:{value:t.row.batch,callback:function(a){e.$set(t.row,"batch",a)},expression:"scope.row.batch"}},e._l(e.batchlist,function(e,t){return a("el-option",{key:t,attrs:{value:e,label:e}})}))]}}])}),e._v(" "),a("el-editable-column",{attrs:{prop:"productCode",align:"center",label:"物品编号",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"productName",align:"center",label:"物品名称",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"color",align:"center",label:"颜色",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"typeName",align:"center",label:"规格",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"unitName",align:"center",label:"单位",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"price",align:"center",label:"调拨单价",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElInputNumber",type:"visible"},prop:"movePrice",align:"center",label:"调拨成本价",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElInputNumber",type:"visible"},prop:"moveQuantity",align:"center",label:"调拨数量",width:"150px"}}),e._v(" "),a("el-editable-column",{attrs:{prop:"totalMoney",align:"center",label:"调拨金额",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(e._s(e.getSize(t.row.movePrice,t.row.moveQuantity)))])]}}])}),e._v(" "),a("el-editable-column",{attrs:{"edit-render":{name:"ElInput",type:"visible"},prop:"remarks",align:"center",label:"备注",width:"150px"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[a("el-button",{staticStyle:{background:"#3696fd","border-color":"#3696fd",width:"98px"},attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v("取消")])],1)],1)])},[],!1,null,"75466dbc",null);f.options.__file="AddStoragemove.vue";t.default=f.exports},"yo+U":function(e,t,a){"use strict";var r=a("6HaC"),n=a("/PQ/"),i=a("ZySA"),o=a("Mz3J"),l={directives:{waves:i.a},components:{Pagination:o.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{visible2:!1,choosedata:"",moreaction:"",levelIds:[],typeIds:[],downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{id:"",supplierName:"",typeId:"",regionId:"",levelId:"",pagenum:1,pagesize:10},depts:[],props:{value:"id",label:"regionName",children:"regionListVos"},regions:[],getemplistregions:[],repositories:[],employeeVisible:this.control,regionManagerVisible:!1}},watch:{control:function(){this.employeeVisible=this.control}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(n.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(n.i)(1).then(function(t){200===t.data.ret&&(e.typeIds=t.data.data.content.list)}),Object(n.i)(4).then(function(t){200===t.data.ret&&(e.levelIds=t.data.data.content.list)}),Object(r.h)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,this.getemplist.regionId=this.getemplistregions[this.getemplistregions.length-1],Object(n.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.$router.push("/Supplier/NewSupplier")},handlechange4:function(e){var t=this;console.log(e);var a=e[e.length-1];Object(r.i)(a).then(function(e){200===e.data.ret&&(console.log(e),t.repositories=e.data.data.content.list)})},handleConfirm:function(){this.employeeVisible=!1,this.$emit("supplierName",this.choosedata)},handleCurrentChange:function(e){this.choosedata=e}}},p=(a("Se7q"),a("KHd+")),s=Object(p.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择供应商","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Supplier.id"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.id,callback:function(t){e.$set(e.getemplist,"id",t)},expression:"getemplist.id"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Supplier.supplierName"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.supplierName,callback:function(t){e.$set(e.getemplist,"supplierName",t)},expression:"getemplist.supplierName"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.typeId,placeholder:"请选择供应商",clearable:""},model:{value:e.getemplist.typeId,callback:function(t){e.$set(e.getemplist,"typeId",t)},expression:"getemplist.typeId"}},e._l(e.typeIds,function(e,t){return a("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[a("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions,props:e.props,"show-all-levels":!1,placeholder:"所在区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择优质级别",clearable:""},model:{value:e.getemplist.levelId,callback:function(t){e.$set(e.getemplist,"levelId",t)},expression:"getemplist.levelId"}},e._l(e.levelIds,function(e,t){return a("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px",float:"right"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("Supplier.id"),resizable:!1,prop:"id",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.supplierName"),resizable:!1,prop:"supplierName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.supplierName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.supplierShortName"),resizable:!1,prop:"supplierShortName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.supplierShortName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.typeId"),resizable:!1,align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.typeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.regionId"),resizable:!1,prop:"regionName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.buyerId"),resizable:!1,prop:"buyerName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.buyerName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.levelId"),resizable:!1,prop:"levelName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.levelName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.createId"),resizable:!1,prop:"createId",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Supplier.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("public.delete")))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")])],1)},[],!1,null,"308c523a",null);s.options.__file="MySupplier.vue";t.a=s.exports}}]);