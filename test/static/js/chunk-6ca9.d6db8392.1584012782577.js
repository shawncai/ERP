(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6ca9"],{"+Khs":function(e,t,a){"use strict";var n=a("Q2AE"),i={inserted:function(e,t,a){var i=t.value,o=n.a.getters&&n.a.getters.roles;if(!i[0])throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var r=i[0];o.some(function(e){return r.includes(e)})||i[1]===n.a.getters.userId||e.parentNode&&e.parentNode.removeChild(e)}},o=function(e){e.directive("permission2",i)};window.Vue&&(window.permission2=i,Vue.use(o)),i.install=o;t.a=i},"0zGY":function(e,t,a){"use strict";a.d(t,"n",function(){return i}),a.d(t,"s",function(){return o}),a.d(t,"f",function(){return r}),a.d(t,"o",function(){return d}),a.d(t,"l",function(){return s}),a.d(t,"j",function(){return l}),a.d(t,"m",function(){return p}),a.d(t,"k",function(){return c}),a.d(t,"i",function(){return m}),a.d(t,"h",function(){return u}),a.d(t,"a",function(){return f}),a.d(t,"v",function(){return g}),a.d(t,"q",function(){return y}),a.d(t,"p",function(){return v}),a.d(t,"c",function(){return h}),a.d(t,"d",function(){return b}),a.d(t,"u",function(){return w}),a.d(t,"g",function(){return C}),a.d(t,"r",function(){return _}),a.d(t,"b",function(){return N}),a.d(t,"t",function(){return $}),a.d(t,"e",function(){return x});var n=a("t3Un");function i(e){return Object(n.a)({url:"/country/getdeptlist",method:"post",params:e})}function o(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("empids",e),""!==t&&null!==t&&a.append("stat",t),Object(n.a)({url:"/employee/startorendemp",method:"post",data:a})}function r(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("empids",e),""!==t&&null!==t&&void 0!==t&&a.append("operatorId",t),Object(n.a)({url:"/employee/deleteemp",method:"post",data:a})}function d(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("id",e),Object(n.a)({url:"/employee/getempinfo",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(n.a)({url:"/employee/getEmpStockInfo",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(n.a)({url:"/employee/getEmpCollect",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(n.a)({url:"/employee/getEmpVisitInfo",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),Object(n.a)({url:"/employee/getEmpServiceInfo",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("handlerid",e.id),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/admin/complaint/listcomplaintsemp",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("empId",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(n.a)({url:"/SaleReport/empCommission",method:"post",data:t})}function f(e){var t=new URLSearchParams;return""!==e.account&&null!==e.account&&void 0!==e.account&&t.append("account",e.account),Object(n.a)({url:"/employee/validation",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e.chargeRegions&&null!==e.chargeRegions&&void 0!==e.chargeRegions&&t.append("chargeRegions",e.chargeRegions),""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("employeeid",e.id),""!==e.firstName&&null!==e.firstName&&void 0!==e.firstName&&t.append("firstname",e.firstName),""!==e.middleName&&null!==e.middleName&&void 0!==e.middleName&&t.append("middlename",e.middleName),""!==e.lastName&&null!==e.lastName&&void 0!==e.lastName&&t.append("lastname",e.lastName),""!==e.password&&null!==e.password&&void 0!==e.password&&t.append("passwd",e.password),""!==e.email&&null!==e.email&&void 0!==e.email&&t.append("email",e.email),""!==e.phone&&null!==e.phone&&void 0!==e.phone&&t.append("phone",e.phone),""!==e.gender&&null!==e.gender&&void 0!==e.gender&&t.append("gender",e.gender),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&t.append("countryid",e.countryId),""!==e.provinceId&&null!==e.provinceId&&void 0!==e.provinceId&&t.append("provinceid",e.provinceId),""!==e.cityId&&null!==e.cityId&&void 0!==e.cityId&&t.append("cityid",e.cityId),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.birthday&&null!==e.birthday&&void 0!==e.birthday&&t.append("birthday",e.birthday),""!==e.deptId&&null!==e.deptId&&void 0!==e.deptId&&t.append("deptid",e.deptId),""!==e.postId&&null!==e.postId&&void 0!==e.postId&&t.append("postid",e.postId),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryid",e.repositoryId),""!==e.roleId&&null!==e.roleId&&void 0!==e.roleId&&t.append("roleid",e.roleId),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionid",e.regionId),""!==e.certificateType&&null!==e.certificateType&&void 0!==e.certificateType&&t.append("certificatetype",e.certificateType),""!==e.certificateNumber&&null!==e.certificateNumber&&void 0!==e.certificateNumber&&t.append("certificatenumber",e.certificateNumber),Object(n.a)({url:"/employee/updateemp",method:"post",data:t})}function y(e){var t=new URLSearchParams;return t.append("firstname",e.firstname),t.append("middlename",e.middlename),t.append("lastname",e.lastname),t.append("passwd",e.passwd),t.append("email",e.email),t.append("phone",e.phone),t.append("gender",e.gender),t.append("countryid",e.country),t.append("provinceid",e.provinceid),t.append("cityid",e.cityid),t.append("address",e.address),""===e.birthday&&null===e.birthday||t.append("birthday",e.birthday),t.append("account",e.account),t.append("jobnumber",e.jobnumber),t.append("deptid",e.deptid),t.append("roleid",e.roleid),t.append("postid",e.postid),t.append("repositoryid",e.repositoryid),t.append("regionid",e.regionid1),t.append("certificatetype",e.certificatetype),t.append("certificatenumber",e.certificatenumber),""!==e.chargeRegions&&null!==e.chargeRegions&&void 0!==e.chargeRegions&&t.append("chargeRegions",e.chargeRegions),Object(n.a)({url:"/employee/register",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.roleid&&null!==e.roleid&&void 0!==e.roleid&&t.append("roleid",e.roleid),""!==e.repositoryid&&null!==e.repositoryid&&void 0!==e.repositoryid&&t.append("repositoryid",e.repositoryid),""!==e.regionid&&null!==e.regionid&&void 0!==e.regionid&&t.append("regionid",e.regionid),""!==e.loginRepositoryId&&void 0!==e.loginRepositoryId&&null!==e.loginRepositoryId&&t.append("loginRepositoryId",e.loginRepositoryId),""!==e.regionIds&&void 0!==e.regionIds&&null!==e.regionIds&&t.append("regionIds",e.regionIds),""!==e.postid&&null!==e.postid&&void 0!==e.postid&&t.append("postid",e.postid),""!==e.deptid&&null!==e.deptid&&void 0!==e.deptid&&t.append("deptid",e.deptid),""!==e.employeename&&null!==e.employeename&&void 0!==e.employeename&&t.append("employeename",e.employeename),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.time&&null!==e.time&&t.append("time",e.time),""!==e.jobnumber&&null!==e.jobnumber&&void 0!==e.jobnumber&&t.append("jobnumber",e.jobnumber),""!==e.phonenumber&&void 0!==e.phonenumber&&null!==e.phonenumber&&t.append("phonenumber",e.phonenumber),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/employee/getemplist",method:"post",data:t})}function h(e){var t=new URLSearchParams;return""!==e.employeeid&&t.append("employeeid",e.employeeid),""!==e.contractname&&t.append("contractname",e.contractname),""!==e.signtime&&null!==e.signtime&&t.append("signtime",e.signtime),""!==e.expiredtime&&null!==e.expiredtime&&t.append("expiredtime",e.expiredtime),""!==e.effectivetime&&null!==e.effectivetime&&t.append("effectivetime",e.effectivetime),""!==e.typeid&&t.append("typeid",e.typeid),""!==e.attribute&&t.append("attribute",e.attribute),""!==e.period&&t.append("period",e.period),""!==e.iscorrection&&t.append("iscorrection",e.iscorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceday&&t.append("advanceday",e.advanceday),""!==e.trialsalary&&t.append("trialsalary",e.trialsalary),""!==e.correctionsalary&&t.append("correctionsalary",e.correctionsalary),""!==e.remindpersonid&&t.append("remindpersonid",e.remindpersonid),Object(n.a)({url:"/contract/addcontract",method:"post",data:t})}function b(e){var t=new URLSearchParams;return""!==e.contractname&&t.append("contractname",e.contractname),""!==e.contractnumber&&t.append("contractnumber",e.contractnumber),""!==e.empnumber&&t.append("empnumber",e.empnumber),""!==e.empname&&t.append("empname",e.empname),""!==e.isEnd&&void 0!==e.isEnd&&null!==e.isEnd&&t.append("isEnd",e.isEnd),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/contract/contractlist",method:"post",data:t})}function w(e){var t=new URLSearchParams;return""!==e.id&&t.append("contractid",e.id),""!==e.contractName&&t.append("contractname",e.contractName),""!==e.signTime&&t.append("signtime",e.signTime),""!==e.expiredTime&&t.append("expiredtime",e.expiredTime),""!==e.effectiveTime&&t.append("effectivetime",e.effectiveTime),""!==e.type&&t.append("typeid",e.type),""!==e.contractAttribute&&t.append("attribute",e.contractAttribute),""!==e.contractAttribute&&t.append("period",e.period),""!==e.isCorrection&&t.append("iscorrection",e.isCorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceDay&&t.append("advanceday",e.advanceDay),""!==e.trialSalary&&t.append("trialsalary",e.trialSalary),""!==e.correctionSalary&&t.append("correctionsalary",e.correctionSalary),""!==e.expiredRemindPersonId&&null!==e.expiredRemindPersonId&&t.append("remindpersonid",e.expiredRemindPersonId),Object(n.a)({url:"/contract/updatecontract",method:"post",data:t})}function C(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("empcontractids",e),""!==t&&null!==t&&void 0!==t&&a.append("operatorId",t),Object(n.a)({url:"/contract/deleteempcontract",method:"post",data:a})}function _(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/employee/searchEmpCategory",method:"post",data:t})}function N(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(n.a)({url:"/employee/addEmpCategory",method:"post",data:t})}function $(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(n.a)({url:"/employee/updateEmpCategory",method:"post",data:t})}function x(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("ids",e),""!==t&&null!==t&&void 0!==t&&a.append("operatorId",t),Object(n.a)({url:"/employee/delateEmpCategory",method:"post",data:a})}},"1HN+":function(e,t,a){},"41Be":function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a("Q2AE");function i(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(n.a.getters&&n.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles!"),!1}},Q4Eu:function(e,t,a){"use strict";var n=a("Q2AE"),i={inserted:function(e,t,a){var i=t.value,o=n.a.getters&&n.a.getters.roles;if(!(i&&i instanceof Array&&i.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var r=i;o.some(function(e){return r.includes(e)})||e.parentNode&&e.parentNode.removeChild(e)}},o=function(e){e.directive("permission",i)};window.Vue&&(window.permission=i,Vue.use(o)),i.install=o;t.a=i},Y5bG:function(e,t,a){"use strict";a.d(t,"a",function(){return i}),Math.easeInOutQuad=function(e,t,a,n){return(e/=n/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-i,r=0;t=void 0===t?500:t;!function e(){r+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(r,i,o,t)),r<t?n(e):a&&"function"==typeof a&&a()}()}},ZySA:function(e,t,a){"use strict";var n=a("P2sY"),i=a.n(n),o=(a("jUE0"),{bind:function(e,t){e.addEventListener("click",function(a){var n=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),r=o.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var d=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(d.width,d.height)+"px",r.appendChild(s)),o.type){case"center":s.style.top=d.height/2-s.offsetHeight/2+"px",s.style.left=d.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-d.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-d.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=o.color,s.className="waves-ripple z-active",!1}},!1)}}),r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t.a=o},jUE0:function(e,t,a){},sUlV:function(e,t,a){"use strict";var n=a("1HN+");a.n(n).a},"uFM+":function(e,t,a){"use strict";a.r(t);var n=a("P2sY"),i=a.n(n),o=a("0zGY"),r=a("ZySA"),d=a("Mz3J"),s=a("Q4Eu"),l=a("+Khs"),p=a("41Be"),c={name:"EmpCategory",directives:{waves:r.a,permission:s.a,permission2:l.a},components:{Pagination:d.a},filters:{typeFilter:function(e){return{1:"合同属性",2:"职位类别",3:"合同类别"}[e]},iseffectiveFilter:function(e){return{1:"启用",2:"停用"}[e]}},data:function(){return{moreaction:[],categoryVisible:!1,addCategoryForm:{categoryname:"",type:"",iseffective:"1"},addCategoryFormRules:{category:[{required:!0,message:"请输入",trigger:"blur"}],categoryname:[{required:!0,message:"请输入",trigger:"blur"}],type:[{required:!0,message:"请选择",trigger:"change"}],iseffective:[{required:!0,message:"请选择",trigger:"change"}]},editcategoryVisible:!1,editCategoryForm:{categoryName:"",type:"",isEffective:""},editCategoryFormRules:{categoryName:[{required:!0,message:"请输入",trigger:"blur"}],isEffective:[{required:!0,message:"请选择",trigger:"change"}]},downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{categoryname:"",type:"",iseffective:"",pagenum:1,pagesize:10}}},activated:function(){this.getlist()},mounted:function(){this.getlist()},beforeCreate:function(){this},methods:{checkPermission:p.a,getlist:function(){var e=this;this.listLoading=!0,Object(o.r)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):console.log("列表出错"),setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(o.r)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):console.log("搜索出错")})},handleSelectionChange:function(e){this.moreaction=e},handleCommand:function(e){var t=this,a=this.moreaction.map(function(e){return e.id}).join();"delete"===e&&this.$confirm(this.$t("prompt.scts"),this.$t("prompt.ts"),{confirmButtonText:this.$t("prompt.qd"),cancelButtonText:this.$t("prompt.qx"),type:"warning"}).then(function(){Object(o.e)(a,t.$store.getters.userId).then(function(e){200===e.data.ret||100===e.data.ret?(t.$notify({title:t.$t("prompt.sccg"),type:"success",offset:100}),t.getlist()):t.$notify.error({title:"wrong",message:"wrong",offset:100})})}).catch(function(){t.$message({type:"info",message:t.$t("prompt.yqxsc")})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?",this.$t("prompt.ts"),{confirmButtonText:this.$t("prompt.qd"),cancelButtonText:this.$t("prompt.qx"),type:"warning"}).then(function(){Object(o.e)(e.id,t.$store.getters.userId).then(function(e){200===e.data.ret||100===e.data.ret?(t.$notify({title:t.$t("prompt.sccg"),type:"success",offset:100}),t.getlist()):t.$notify.error({title:"wrong",message:"wrong",offset:100})})}).catch(function(){t.$message({type:"info",message:t.$t("prompt.yqxsc")})})},handleEdit:function(e){console.log(e),this.editcategoryVisible=!0,this.editCategoryForm=i()({},e),this.editCategoryForm.type=String(e.type),this.editCategoryForm.isEffective=String(e.isEffective)},handleNo:function(){this.editcategoryVisible=!1},handleOk:function(){var e=this;this.$refs.editCategoryForm.validate(function(t){if(!t)return e.$notify.error({title:"wrong",message:"Information is incomplete",offset:100}),!1;Object(o.t)(e.editCategoryForm).then(function(t){200===t.data.ret?(e.$notify({title:"successful",message:"修改成功",type:"success",offset:100}),e.getlist(),e.$refs.editCategoryForm.clearValidate(),e.$refs.editCategoryForm.resetFields(),e.editcategoryVisible=!1):console.log("列表出错")})})},handleAdd:function(){this.categoryVisible=!0},handlecancel:function(){this.categoryVisible=!1},restAddCategoryForm:function(){this.addCategoryForm={categoryname:"",type:"",iseffective:"1"}},handlesave:function(){var e=this;console.log(this.addCategoryForm),this.$refs.addCategoryForm.validate(function(t){if(!t)return e.$notify.error({title:"wrong",message:"Information is incomplete",offset:100}),!1;Object(o.b)(e.addCategoryForm).then(function(t){200===t.data.ret?(e.$notify({title:"successful",message:"新建成功",type:"success",offset:100}),e.getlist(),e.$refs.addCategoryForm.clearValidate(),e.$refs.addCategoryForm.resetFields(),e.restAddCategoryForm(),e.categoryVisible=!1):e.$notify.error({title:"wrong",message:"wrong",offset:100})})})},handleContract:function(){console.log(123)},handleExport:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-ef4a"),a.e("chunk-7c4b")]).then(a.bind(null,"S/jZ")).then(function(t){var a=e.formatJson(["id","jobNumber","account","firstName","gender","birthday","email","postName","deptName","regionName","repositoryName","createTime","dimissionTime","stat"],e.list);t.export_json_to_excel({header:["编号","工号","员工登陆账号","姓名","性别","生日","邮箱","职位","所属部门","所属区域","所属门店","入职时间","离职时间","状态"],data:a,filename:"员工资料表"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},handlePrint:function(){console.log(456)}}},m=(a("sUlV"),a("KHd+")),u=Object(m.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ERP-container"},[a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("updates.flmc"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.categoryname,callback:function(t){e.$set(e.getemplist,"categoryname",t)},expression:"getemplist.categoryname"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.type,placeholder:e.$t("updates.fllb"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.type,callback:function(t){e.$set(e.getemplist,"type",t)},expression:"getemplist.type"}},[a("el-option",{attrs:{label:"合同属性",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"职位类别",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"合同类别",value:"3"}})],1),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.iseffective,placeholder:e.$t("updates.qyzt"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.iseffective,callback:function(t){e.$set(e.getemplist,"iseffective",t)},expression:"getemplist.iseffective"}},[a("el-option",{attrs:{label:e.$t("updates.qy"),value:"1"}}),e._v(" "),a("el-option",{attrs:{label:e.$t("updates.ty"),value:"2"}})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search",round:""},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[a("el-dropdown",{on:{command:e.handleCommand}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"0"},attrs:{type:"primary"}},[e._v("\n        "+e._s(e.$t("public.batchoperation"))+" "),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{staticStyle:{width:"140px"},attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-2"],expression:"['1-2-8-2']"}],staticStyle:{"text-align":"left"},attrs:{command:"delete"}},[a("svg-icon",{staticStyle:{width:"40px"},attrs:{"icon-class":"shanchu"}}),e._v(e._s(e.$t("public.delete")))],1)],1)],1),e._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-6"],expression:"['1-2-8-6']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{loading:e.downloadLoading},on:{click:e.handleExport}},[a("svg-icon",{attrs:{"icon-class":"daochu"}}),e._v(e._s(e.$t("public.export")))],1),e._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-7"],expression:"['1-2-8-7']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-printer"},on:{click:e.handlePrint}},[e._v(e._s(e.$t("public.print")))]),e._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-1"],expression:"['1-2-8-1']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))]),e._v(" "),a("el-dialog",{staticClass:"normal",attrs:{visible:e.categoryVisible,title:e.$t("updates.xjflsx"),width:"600px",center:""},on:{"update:visible":function(t){e.categoryVisible=t}}},[a("el-form",{ref:"addCategoryForm",staticClass:"demo-ruleForm",staticStyle:{margin:"0 auto",width:"400px"},attrs:{rules:e.addCategoryFormRules,model:e.addCategoryForm}},[a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.type"),"label-width":"100px",prop:"type"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择类别"},model:{value:e.addCategoryForm.type,callback:function(t){e.$set(e.addCategoryForm,"type",t)},expression:"addCategoryForm.type"}},[a("el-option",{attrs:{label:"合同属性",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"职位类别",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"合同类别",value:"3"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.categoryname"),"label-width":"100px",prop:"categoryname"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.addCategoryForm.categoryname,callback:function(t){e.$set(e.addCategoryForm,"categoryname",t)},expression:"addCategoryForm.categoryname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.iseffective"),"label-width":"100px",prop:"iseffective"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择状态"},model:{value:e.addCategoryForm.iseffective,callback:function(t){e.$set(e.addCategoryForm,"iseffective",t)},expression:"addCategoryForm.iseffective"}},[a("el-option",{attrs:{label:e.$t("updates.qy"),value:"1"}}),e._v(" "),a("el-option",{attrs:{label:e.$t("updates.ty"),value:"2"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v(e._s(e.$t("Hmodule.baoc")))]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v(e._s(e.$t("Hmodule.cancel")))])],1)],1)],1),e._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.id"),resizable:!1,align:"center","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.type"),resizable:!1,align:"center","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("typeFilter")(t.row.type)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.categoryname"),resizable:!1,align:"center","min-width":"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.categoryName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.iseffective"),resizable:!1,align:"center","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("iseffectiveFilter")(t.row.isEffective)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-3"],expression:"['1-2-8-3']"}],attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["1-2-8-2"],expression:"['1-2-8-2']"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("public.delete")))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("el-dialog",{staticClass:"normal",attrs:{visible:e.editcategoryVisible,title:e.$t("updates.xgflsx"),width:"600px",center:""},on:{"update:visible":function(t){e.editcategoryVisible=t}}},[a("el-form",{ref:"editCategoryForm",staticClass:"demo-ruleForm",staticStyle:{margin:"0 auto",width:"400px"},attrs:{rules:e.editCategoryFormRules,model:e.editCategoryForm}},[a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.type"),"label-width":"100px"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择类别",disabled:""},model:{value:e.editCategoryForm.type,callback:function(t){e.$set(e.editCategoryForm,"type",t)},expression:"editCategoryForm.type"}},[a("el-option",{attrs:{label:"合同属性",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"职位类别",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"合同类别",value:"3"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.categoryname"),"label-width":"100px",prop:"categoryName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.editCategoryForm.categoryName,callback:function(t){e.$set(e.editCategoryForm,"categoryName",t)},expression:"editCategoryForm.categoryName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("NewEmployeeInformation.iseffective"),"label-width":"100px",prop:"isEffective"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择状态"},model:{value:e.editCategoryForm.isEffective,callback:function(t){e.$set(e.editCategoryForm,"isEffective",t)},expression:"editCategoryForm.isEffective"}},[a("el-option",{attrs:{label:e.$t("updates.qy"),value:"1"}}),e._v(" "),a("el-option",{attrs:{label:e.$t("updates.ty"),value:"2"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleOk()}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handleNo()}}},[e._v(e._s(e.$t("Hmodule.cancel")))])],1)],1)],1)],1)},[],!1,null,"69cea5a7",null);u.options.__file="EmpCategory.vue";t.default=u.exports}}]);