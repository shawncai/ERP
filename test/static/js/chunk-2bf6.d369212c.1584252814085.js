(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2bf6"],{"+Khs":function(e,t,n){"use strict";var r=n("Q2AE"),a={inserted:function(e,t,n){var a=t.value,i=r.a.getters&&r.a.getters.roles;if(!a[0])throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=a[0];i.some(function(e){return o.includes(e)})||a[1]===r.a.getters.userId||e.parentNode&&e.parentNode.removeChild(e)}},i=function(e){e.directive("permission2",a)};window.Vue&&(window.permission2=a,Vue.use(i)),a.install=i;t.a=a},"41Be":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n("Q2AE");function a(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(r.a.getters&&r.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles!"),!1}},"8P2M":function(e,t,n){"use strict";var r=n("bnPl");n.n(r).a},Q4Eu:function(e,t,n){"use strict";var r=n("Q2AE"),a={inserted:function(e,t,n){var a=t.value,i=r.a.getters&&r.a.getters.roles;if(!(a&&a instanceof Array&&a.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=a;i.some(function(e){return o.includes(e)})||e.parentNode&&e.parentNode.removeChild(e)}},i=function(e){e.directive("permission",a)};window.Vue&&(window.permission=a,Vue.use(i)),a.install=i;t.a=a},Y5bG:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),Math.easeInOutQuad=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function a(e,t,n){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=e-a,o=0;t=void 0===t?500:t;!function e(){o+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(o,a,i,t)),o<t?r(e):n&&"function"==typeof n&&n()}()}},YJEl:function(e,t,n){"use strict";n.r(t);var r=n("P2sY"),a=n.n(r),i=n("w77N"),o=n("ZySA"),s=n("Q4Eu"),d=n("+Khs"),l=n("41Be"),p=n("Mz3J"),c=n("VG0r"),u={name:"Sample",components:{Pagination:p.a},directives:{waves:o.a,permission:s.a,permission2:d.a},data:function(){return{categoriesform:{price:"",itemid:""},tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pagenum:1,pagesize:10,productType:""},dialogFormVisible:!1,dialogStatus:"",options:[],form:{producttype:"",name:"",price:"",desc:"",mark:""},formLabelWidth:"120px",dialogVisible:!1,addproject:!1,centerDialogVisible:!1}},activated:function(){this.getlist()},created:function(){this.getList()},beforeCreate:function(){this},methods:{checkPermission:l.a,getList:function(){var e=this;this.listLoading=!0,Object(i.t)(this.listQuery).then(function(t){e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){this.listQuery.pagenum=1,this.getList()},handleDelete:function(e){var t=this;this.$confirm("This will permanently delete the record. Continue?","Warning",{confirmButtonText:"ok",cancelButtonText:"cancel",type:"warning"}).then(function(){Object(i.e)(e.id).then(function(e){200===e.data.ret&&t.getList()}),t.$message({type:"success",message:"Delete completed!"})}).catch(function(){t.$message({type:"info",message:"Delete canceled"})})},getproducts:function(){var e=this;Object(c.v)(2).then(function(t){200===t.data.ret&&(e.options=t.data.data.content.list)})},handleCreate:function(){this.getproducts(),this.addproject=!0},createData:function(){var e=this;Object(i.a)(this.form).then(function(t){e.getList(),e.addproject=!1,e.$notify({title:"successful",message:"创建成功",type:"success",duration:2e3})})},handleUpdate:function(e){this.categoriesform=a()({},e),this.dialogFormVisible=!0},updateData:function(){var e=this,t=a()({},this.categoriesform).id;Object(i.i)(this.categoriesform.price,t,this.categoriesform.otherPrice).then(function(t){200===t.data.ret&&(e.getList(),e.dialogFormVisible=!1,e.$notify({title:"successful",message:"修改成功",type:"success",duration:2e3}))})}}},m=(n("8P2M"),n("KHd+")),f=Object(m.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tab-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("repair.model"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.productType,callback:function(t){e.$set(e.listQuery,"productType",t)},expression:"listQuery.productType"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("table.search")))]),e._v(" "),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["54-67-80-1"],expression:"['54-67-80-1']"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("table.add")))])],1),e._v(" "),n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:e.$t("repair.SerialNumber"),resizable:!1,prop:"id",align:"center","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("repair.itemName"),resizable:!1,prop:"name","min-width":"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("repair.model"),resizable:!1,align:"center",prop:"productType","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("repair.price2"),resizable:!1,prop:"price","min-width":"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.price))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("otherlanguage.fbdkh"),resizable:!1,prop:"price","min-width":"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.otherPrice))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("repair.Description2"),resizable:!1,prop:"description","min-width":"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.description))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("repair.createTime"),resizable:!1,prop:"createTime","min-width":"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{resizable:!1,label:e.$t("table.actions"),align:"center","min-width":"200","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["54-67-80-3"],expression:"['54-67-80-3']"}],attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleUpdate(t.row)}}},[e._v(e._s(e.$t("table2.edit")))]),e._v(" "),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["54-67-80-2"],expression:"['54-67-80-2']"}],attrs:{size:"mini",type:"danger"},on:{click:function(n){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("repair.delete")))])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pagenum,limit:e.listQuery.pagesize},on:{"update:page":function(t){e.$set(e.listQuery,"pagenum",t)},"update:limit":function(t){e.$set(e.listQuery,"pagesize",t)},pagination:e.getList}})],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogFormVisible,title:e.$t("repair.itemModification"),width:"45%",center:"","lock-scroll":""},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{staticStyle:{width:"400px",margin:"0 auto"},attrs:{model:e.categoriesform}},[n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.price2")}},[n("el-input",{model:{value:e.categoriesform.price,callback:function(t){e.$set(e.categoriesform,"price",t)},expression:"categoriesform.price"}})],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("otherlanguage.fbdkh")}},[n("el-input",{model:{value:e.categoriesform.otherPrice,callback:function(t){e.$set(e.categoriesform,"otherPrice",t)},expression:"categoriesform.otherPrice"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(e._s(e.$t("repair.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v(e._s(e.$t("repair.ok")))])],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.addproject,title:e.$t("repair.Additem"),width:"50%",center:"","lock-scroll":""},on:{"update:visible":function(t){e.addproject=t}}},[n("el-form",{staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:e.form}},[n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.model")}},[n("el-select",{attrs:{placeholder:"please choose"},model:{value:e.form.producttype,callback:function(t){e.$set(e.form,"producttype",t)},expression:"form.producttype"}},e._l(e.options,function(e,t){return n("el-option",{key:t,attrs:{label:e.categoryName,value:e.categoryName}})}))],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.itemName2")}},[n("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.price2")}},[n("el-input",{model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("otherlanguage.fbdkh")}},[n("el-input",{model:{value:e.form.otherPrice,callback:function(t){e.$set(e.form,"otherPrice",t)},expression:"form.otherPrice"}})],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.KPIScore")}},[n("el-input",{model:{value:e.form.mark,callback:function(t){e.$set(e.form,"mark",t)},expression:"form.mark"}})],1),e._v(" "),n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.Description3")}},[n("el-input",{model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addproject=!1}}},[e._v(e._s(e.$t("repair.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v(e._s(e.$t("repair.ok")))])],1)],1)],1)},[],!1,null,"5bcee954",null);f.options.__file="RepairProject.vue";t.default=f.exports},ZySA:function(e,t,n){"use strict";var r=n("P2sY"),a=n.n(r),i=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var r=a()({},t.value),i=a()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},r),o=i.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var s=o.getBoundingClientRect(),d=o.querySelector(".waves-ripple");switch(d?d.className="waves-ripple":((d=document.createElement("span")).className="waves-ripple",d.style.height=d.style.width=Math.max(s.width,s.height)+"px",o.appendChild(d)),i.type){case"center":d.style.top=s.height/2-d.offsetHeight/2+"px",d.style.left=s.width/2-d.offsetWidth/2+"px";break;default:d.style.top=(n.pageY-s.top-d.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",d.style.left=(n.pageX-s.left-d.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return d.style.backgroundColor=i.color,d.className="waves-ripple z-active",!1}},!1)}}),o=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(o)),i.install=o;t.a=i},bnPl:function(e,t,n){},jUE0:function(e,t,n){},w77N:function(e,t,n){"use strict";n.d(t,"l",function(){return a}),n.d(t,"s",function(){return i}),n.d(t,"r",function(){return o}),n.d(t,"z",function(){return s}),n.d(t,"j",function(){return d}),n.d(t,"w",function(){return l}),n.d(t,"o",function(){return p}),n.d(t,"u",function(){return c}),n.d(t,"v",function(){return u}),n.d(t,"q",function(){return m}),n.d(t,"t",function(){return f}),n.d(t,"i",function(){return v}),n.d(t,"e",function(){return h}),n.d(t,"a",function(){return g}),n.d(t,"n",function(){return b}),n.d(t,"A",function(){return y}),n.d(t,"p",function(){return w}),n.d(t,"h",function(){return k}),n.d(t,"c",function(){return _}),n.d(t,"x",function(){return I}),n.d(t,"y",function(){return L}),n.d(t,"b",function(){return S}),n.d(t,"f",function(){return P}),n.d(t,"g",function(){return x}),n.d(t,"k",function(){return j}),n.d(t,"m",function(){return $}),n.d(t,"B",function(){return N}),n.d(t,"d",function(){return O});var r=n("t3Un");function a(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("repositoryId",e),Object(r.a)({url:"/repository/getServiceEmp",method:"post",data:t})}function i(e){var t=new URLSearchParams;return t.append("pagenum",e.pagenum),t.append("stat",e.stat),t.append("username",e.username),t.append("begintime",e.begintime),t.append("endtime",e.endtime),t.append("pagesize",e.pagesize),t.append("regionid",e.regionid),t.append("expectrepositoryid",e.expectrepositoryid),Object(r.a)({url:"/admin/service/getservicelistbycondition",method:"post",data:t})}function o(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(r.a)({url:"/admin/service/getservicedetail",method:"post",data:t})}function s(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(r.a)({url:"/admin/service/serviceretoemp",method:"post",data:t})}function d(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(r.a)({url:"/admin/service/endservicebackground",method:"post",data:t})}function l(e,t){var n=new URLSearchParams;return n.append("serviceid",e),n.append("repositoryid",t),Object(r.a)({url:"/admin/service/retoreposervice",method:"post",data:n})}function p(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(r.a)({url:"/admin/serviceposition/getserviceschedule",method:"post",data:t})}function c(e,t){var n=new URLSearchParams;return n.append("serviceorderid",e),n.append("handlerid",t),Object(r.a)({url:"/admin/service/serviceordertoemp",method:"post",data:n})}function u(e){var t=new URLSearchParams;return t.append("pageNum",1),t.append("pageSize",9999),Object(r.a)({url:"/repository/getRepositoryList",method:"post",params:t})}function m(e){var t=new URLSearchParams;return""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.detail&&null!==e.detail&&void 0!==e.detail&&t.append("detail",e.detail),""!==e.producttype&&null!==e.producttype&&void 0!==e.producttype&&t.append("producttype",e.producttype),""!==e.userid&&null!==e.userid&&void 0!==e.userid&&t.append("userid",e.userid),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.personname&&null!==e.personname&&void 0!==e.personname&&t.append("personname",e.personname),""!==e.phonenumber&&null!==e.phonenumber&&void 0!==e.phonenumber&&t.append("phonenumber",e.phonenumber),""!==e.servicexpecttime&&null!==e.servicexpecttime&&void 0!==e.servicexpecttime&&t.append("servicexpecttime",e.servicexpecttime),""!==e.repositoryid&&null!==e.repositoryid&&void 0!==e.repositoryid&&t.append("repositoryid",e.repositoryid),""!==e.cityid&&null!==e.cityid&&void 0!==e.cityid&&t.append("cityid",e.cityid),""!==e.provinceid&&null!==e.provinceid&&void 0!==e.provinceid&&t.append("provinceid",e.provinceid),""!==e.components&&null!==e.components&&void 0!==e.components&&t.append("components",e.components),""!==e.servicemode&&null!==e.servicemode&&void 0!==e.servicemode&&t.append("servicemode",e.servicemode),Object(r.a)({url:"/admin/service/newservice",method:"post",data:t})}function f(e){var t=new URLSearchParams;return t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),t.append("producttype",e.productType),Object(r.a)({url:"/admin/service/listserviceitem",method:"post",data:t})}function v(e,t,n){var a=new URLSearchParams;return a.append("price",e),a.append("otherPrice",n),a.append("itemid",t),Object(r.a)({url:"/admin/service/updateserviceitem",method:"post",data:a})}function h(e){var t=new URLSearchParams;return t.append("itemid",e),Object(r.a)({url:"/admin/service/deleteserviceitem",method:"post",data:t})}function g(e){var t=new URLSearchParams;return t.append("producttype",e.producttype),t.append("name",e.name),t.append("price",e.price),t.append("otherPrice",e.otherPrice),t.append("desc",e.desc),t.append("mark",e.mark),Object(r.a)({url:"/admin/service/addserviceitem",method:"post",data:t})}function b(e,t){var n=new URLSearchParams;return n.append("loginRepositoryId",e),""!==t&&null!==t&&void 0!==t&&n.append("regionIds",t),n.append("stat",1),n.append("pagenum",1),n.append("pagesize",999),Object(r.a)({url:"/employee/getemplist",method:"post",data:n})}function y(e,t){var n=new URLSearchParams;return n.append("loginRepositoryId",e),n.append("regionIds",t),n.append("pagesize",1e3),n.append("pagenum",1),Object(r.a)({url:"/employee/getemplist",method:"post",data:n})}function w(e){var t=new URLSearchParams;return""!==e.result&&null!==e.result&&void 0!==e.result&&t.append("result",e.result),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.employeeid&&null!==e.employeeid&&void 0!==e.employeeid&&t.append("employeeId",e.employeeid),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),t.append("regionIds",e.regionid),t.append("repositoryId",e.repositoryid),""!==e.begintime&&null!==e.begintime&&void 0!==e.begintime&&t.append("beginTime",e.begintime),""!==e.endtime&&null!==e.endtime&&void 0!==e.endtime&&t.append("endTime",e.endtime),Object(r.a)({url:"/taskoffline/gettaskofflinelist",method:"post",data:t})}function k(e){var t=new URLSearchParams;return t.append("taskid",e.id),Object(r.a)({url:"/taskoffline/deletetaskoffline",method:"post",data:t})}function _(e){var t=new URLSearchParams;return t.append("taskName",e.taskname),t.append("taskAddress",e.taskaddress),t.append("taskContent",e.taskcontent),t.append("createId",e.createId),t.append("employeeId",e.employeeId),t.append("taskType",e.taskType),t.append("repositoryId",e.repositoryId),t.append("remarks",e.remarks),""!==e.customerId&&null!==e.customerId&&void 0!==e.customerId&&t.append("customerId",e.customerId),t.append("customerName",e.customerName),Object(r.a)({url:"/taskoffline/addtaskoffline",method:"post",data:t})}function I(e){return Object(r.a)({url:"/admin/fault/search",method:"post",params:e})}function L(e){return Object(r.a)({url:"/admin/selfchecking/search",method:"post",params:e})}function S(e){var t=new URLSearchParams;return t.append("name",e.name),t.append("level",e.level),t.append("parentid",e.parentid),t.append("content",e.content),t.append("employeeguide",e.employeeguide),Object(r.a)({url:"/admin/selfchecking/addselfchecking",method:"post",data:t})}function P(e){var t=new URLSearchParams;return t.append("id",e.id),Object(r.a)({url:"/admin/selfchecking/deleteselfchecking",method:"post",data:t})}function x(e){var t=new URLSearchParams;return t.append("serviceid",e.id),Object(r.a)({url:"/admin/service/deleteservice",method:"post",data:t})}function j(){return Object(r.a)({url:"/admin/fault/search",method:"post"})}function $(e){var t=new URLSearchParams;return""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.result&&null!==e.result&&void 0!==e.result&&t.append("result",e.result),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.begintime&&null!==e.begintime&&void 0!==e.begintime&&t.append("begintime",e.begintime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(r.a)({url:"/taskoffline/gettaskofflinelist",data:t,method:"post"})}function N(e){var t=new URLSearchParams;return""!==e.taskId&&null!==e.taskId&&void 0!==e.taskId&&t.append("taskId",e.taskId),""!==e.taskName&&null!==e.taskName&&void 0!==e.taskName&&t.append("taskName",e.taskName),""!==e.taskAddress&&null!==e.taskAddress&&void 0!==e.taskAddress&&t.append("taskAddress",e.taskAddress),""!==e.taskContent&&null!==e.taskContent&&void 0!==e.taskContent&&t.append("taskContent",e.taskContent),""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.remarks&&null!==e.remarks&&void 0!==e.remarks&&t.append("remarks",e.remarks),""!==e.customerId&&null!==e.customerId&&void 0!==e.customerId&&t.append("customerId",e.customerId),Object(r.a)({url:"taskoffline/updatetaskoffline",data:t,method:"post"})}function O(e){var t=new URLSearchParams;return t.append("taskId",e),Object(r.a)({url:"taskoffline/cancelTask",data:t,method:"post"})}}}]);