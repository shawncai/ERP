(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0c44"],{"1Ru+":function(e,t,a){"use strict";var i=a("tCNy");a.n(i).a},"EyX/":function(e,t,a){"use strict";var i=a("6HaC"),n=a("2H35"),o=a("ZySA"),r=a("Mz3J"),l={directives:{waves:o.a},components:{Pagination:r.a},filters:{iseffectiveFilter:function(e){return{1:"启用",2:"停用"}[e]},genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{repositorycontrol:{type:Boolean,default:!1}},data:function(){return{repositoryVisible:this.repositorycontrol,choosedata:"",types:[],nations:[],downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryName:"",type:"",iseffective:"",regionId:"",countyrId:"",id:"",pagenum:1,pagesize:10},depts:[],props:{value:"id",label:"regionName",children:"regionListVos"},regions:[],getemplistregions:[],getemplistregions0:[]}},watch:{repositorycontrol:function(){this.repositoryVisible=this.repositorycontrol}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;Object(i.d)().then(function(t){200===t.data.ret?e.nations=t.data.data.content:e.$notify.error({title:"错误",message:"出错了",offset:100})}),this.listLoading=!0,Object(n.h)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):e.$notify.error({title:"错误",message:"出错了",offset:100}),setTimeout(function(){e.listLoading=!1},50)}),Object(n.f)().then(function(t){200===t.data.ret?(console.log(t),e.types=t.data.data.content.list):e.$notify.error({title:"错误",message:"出错了",offset:100})}),Object(i.h)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,this.getemplist.regionId=this.getemplistregions[this.getemplistregions.length-1],console.log(this.getemplist),Object(n.h)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.repositoryVisible=!0):e.$notify.error({title:"错误",message:"出错了",offset:100})})},handleAdd:function(){this.$router.push("/Repository/NewRepository"),this.repositoryVisible=!1},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleConfirm:function(){this.$emit("repositoryname",this.choosedata),this.repositoryVisible=!1},handleCurrentChange:function(e){this.choosedata=e}}},s=(a("Zm39"),a("KHd+")),p=Object(s.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.repositoryVisible,repositorycontrol:e.repositorycontrol,"close-on-press-escape":!1,top:"10px",title:"选择仓库","append-to-body":""},on:{"update:visible":function(t){e.repositoryVisible=t},close:function(t){e.$emit("update:repositorycontrol",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Repository.id"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.id,callback:function(t){e.$set(e.getemplist,"id",t)},expression:"getemplist.id"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Repository.repositoryname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.repositoryName,callback:function(t){e.$set(e.getemplist,"repositoryName",t)},expression:"getemplist.repositoryName"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.type,placeholder:e.$t("Repository.type2"),clearable:""},model:{value:e.getemplist.type,callback:function(t){e.$set(e.getemplist,"type",t)},expression:"getemplist.type"}},e._l(e.types,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.categoryName}})})),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.iseffective,placeholder:e.$t("Repository.iseffective"),clearable:""},model:{value:e.getemplist.iseffective,callback:function(t){e.$set(e.getemplist,"iseffective",t)},expression:"getemplist.iseffective"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}})],1),e._v(" "),a("el-cascader",{staticClass:"filter-item",attrs:{options:e.regions,props:e.props,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择国家",clearable:""},model:{value:e.getemplist.countyrId,callback:function(t){e.$set(e.getemplist,"countyrId",t)},expression:"getemplist.countyrId"}},e._l(e.nations,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px",float:"right"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("Repository.id"),resizable:!1,prop:"id",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.repositoryname"),resizable:!1,prop:"repositoryName",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.repositoryName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.type2"),resizable:!1,prop:"categoryName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.categoryName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.iseffective"),resizable:!1,prop:"stat",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("iseffectiveFilter")(t.row.stat)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.managerPeople"),resizable:!1,align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.managerName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.regionId"),resizable:!1,prop:"regionName",align:"center",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-top":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")]),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}})],1)},[],!1,null,"0df25103",null);p.options.__file="MyRepository.vue";t.a=p.exports},VfgD:function(e,t,a){"use strict";var i=a("glOs");a.n(i).a},XGri:function(e,t,a){"use strict";var i=a("6HaC"),n=a("0zGY"),o=a("ZySA"),r=a("Mz3J"),l={directives:{waves:o.a},components:{Pagination:r.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{createcontrol:{type:Boolean,default:!1}},data:function(){return{choosedata:"",managerPeople:"",regionManagerId:"",currentRow:null,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},depts:[],props2:{value:"id",label:"regionName",children:"regionListVos"},regions2:[],getemplistregions:[],repositories:[],employeeVisible:this.createcontrol,regionManagerVisible:!1}},watch:{createcontrol:function(){this.employeeVisible=this.createcontrol}},created:function(){this.gitemplist()},methods:{gitemplist:function(){var e=this;this.listLoading=!0,console.log(this.getemplist),Object(n.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(n.g)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)}),Object(i.h)().then(function(t){200===t.data.ret&&(e.regions2=e.tranKTree(t.data.data.content))})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.regionid=this.getemplistregions[this.getemplistregions.length-1],Object(n.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/EmployeeInformation/NewEmployeeInformation")},handlechange4:function(e){var t=this;console.log(e);var a=e[e.length-1];Object(i.i)(a).then(function(e){200===e.data.ret?(console.log(e),t.repositories=e.data.data.content.list):t.$message.error("出错了")})},restemplist:function(){this.getemplist={repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},this.getemplistregions=[]},handleCurrentChange:function(e){this.choosedata=e},handleConfirm:function(){this.$emit("createname",this.choosedata),this.employeeVisible=!1}}},s=(a("VfgD"),a("KHd+")),p=Object(s.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,createcontrol:e.createcontrol,"close-on-press-escape":!1,top:"10px",title:"选择经办人","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:createcontrol",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.employeename"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.employeename,callback:function(t){e.$set(e.getemplist,"employeename",t)},expression:"getemplist.employeename"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.jobnumber2"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.jobnumber,callback:function(t){e.$set(e.getemplist,"jobnumber",t)},expression:"getemplist.jobnumber"}}),e._v(" "),a("el-date-picker",{staticClass:"filter-item",attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.getemplist.time,callback:function(t){e.$set(e.getemplist,"time",t)},expression:"getemplist.time"}}),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[a("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions2,props:e.props2,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择门店",clearable:"",filterable:""},model:{value:e.getemplist.repositoryid,callback:function(t){e.$set(e.getemplist,"repositoryid",t)},expression:"getemplist.repositoryid"}},e._l(e.repositories,function(e,t){return a("el-option",{key:t,attrs:{label:e.repositoryName,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"left","margin-top":"10px","margin-left":"20px"},attrs:{value:e.getemplist.postid,placeholder:e.$t("NewEmployeeInformation.postid2"),clearable:""},model:{value:e.getemplist.postid,callback:function(t){e.$set(e.getemplist,"postid",t)},expression:"getemplist.postid"}},[a("el-option",{attrs:{label:"xxx",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"xxx",value:"2"}})],1),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"right","margin-top":"10px","margin-right":"20px"},attrs:{placeholder:e.$t("NewEmployeeInformation.deptid2"),clearable:""},model:{value:e.getemplist.deptid,callback:function(t){e.$set(e.getemplist,"deptid",t)},expression:"getemplist.deptid"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{label:e.deptName,value:e.id}})})),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.id"),resizable:!1,property:"id",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.jobNumber"),resizable:!1,property:"jobNumber",align:"center",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.account"),resizable:!1,property:"account",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.name"),resizable:!1,align:"center",width:"109"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.firstName)+" "+e._s(t.row.middleName)+" "+e._s(t.row.lastName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.gender"),resizable:!1,prop:"gender",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("genderFilter")(t.row.gender)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.deptName"),resizable:!1,prop:"deptName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.regionName"),resizable:!1,prop:"regionName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.repositoryName"),resizable:!1,prop:"repositoryName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.repositoryName))])]}}])})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-top":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")]),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.gitemplist}})],1)},[],!1,null,"ecea324a",null);p.options.__file="MyCreate.vue";t.a=p.exports},Zm39:function(e,t,a){"use strict";var i=a("ftrZ");a.n(i).a},ftrZ:function(e,t,a){},glOs:function(e,t,a){},moiu:function(e,t,a){"use strict";a.d(t,"t",function(){return n}),a.d(t,"p",function(){return o}),a.d(t,"h",function(){return r}),a.d(t,"c",function(){return l}),a.d(t,"u",function(){return s}),a.d(t,"n",function(){return p}),a.d(t,"b",function(){return c}),a.d(t,"y",function(){return d}),a.d(t,"k",function(){return u}),a.d(t,"r",function(){return m}),a.d(t,"f",function(){return f}),a.d(t,"x",function(){return v}),a.d(t,"j",function(){return g}),a.d(t,"o",function(){return y}),a.d(t,"l",function(){return h}),a.d(t,"e",function(){return b}),a.d(t,"d",function(){return _}),a.d(t,"q",function(){return w}),a.d(t,"s",function(){return N}),a.d(t,"g",function(){return k}),a.d(t,"w",function(){return S}),a.d(t,"m",function(){return $}),a.d(t,"a",function(){return x}),a.d(t,"v",function(){return C}),a.d(t,"i",function(){return P});var i=a("t3Un");function n(){return Object(i.a)({url:"/erp/NumberingRules/searchcategory",method:"post"})}function o(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(i.a)({url:"/erp/NumberingRules/search",method:"post",data:t})}function r(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(i.a)({url:"/erp/NumberingRules/delete",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(i.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(i.a)({url:"/erp/NumberingRules/update",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(i.a)({url:"/erp/messageModel/modellist",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(i.a)({url:"/erp/messageModel/addmodel",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("modelid",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.modelName&&null!==e.modelName&&void 0!==e.modelName&&t.append("modelname",e.modelName),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(i.a)({url:"/erp/messageModel/updatemodel",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(i.a)({url:"/erp/messageModel/deletemodel",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(i.a)({url:"/erp/measurement/search",method:"post",data:t})}function f(e){var t=new URLSearchParams;return""!==e.category&&null!==e.category&&void 0!==e.category&&t.append("category",e.category),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),Object(i.a)({url:"/erp/measurement/create",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.categoryName&&null!==e.categoryName&&void 0!==e.categoryName&&t.append("categoryname",e.categoryName),Object(i.a)({url:"/erp/measurement/update",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(i.a)({url:"/erp/measurement/delete",method:"post",data:t})}function y(){return Object(i.a)({url:"/erp/parameter/search",method:"post"})}function h(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("isEffective",e.isEffective),Object(i.a)({url:"/erp/parameter/effective",method:"post",data:t})}function b(e,t){var a=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&a.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&a.append("type",e.type),""!==e.is_message&&null!==e.is_message&&void 0!==e.is_message&&a.append("is_message",e.is_message),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&a.append("is_effective",e.is_effective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&a.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&a.append("effect_repository",e.effect_repository),""!==e.country_id&&null!==e.country_id&&void 0!==e.country_id&&a.append("country_id",e.country_id),""!==t&&null!==t&&void 0!==t&&a.append("detailJson",t),Object(i.a)({url:"/erp/approvalProcess/create",method:"post",data:a})}function _(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(i.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function w(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("id",e),Object(i.a)({url:"/erp/approvalProcess/searchDetail",method:"post",data:t})}function N(e){var t=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&t.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&t.append("is_effective",e.is_effective),t.append("pagesize",e.pagesize),t.append("pagenum",e.pagenum),Object(i.a)({url:"/erp/approvalProcess/search",method:"post",data:t})}function k(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(i.a)({url:"/erp/approvalProcess/delete",method:"post",data:t})}function S(e,t){var a=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&a.append("id",e.id),""!==e.processName&&null!==e.processName&&void 0!==e.processName&&a.append("process_name",e.processName),""!==e.type&&null!==e.type&&void 0!==e.type&&a.append("type",e.type),""!==e.isMessage&&null!==e.isMessage&&void 0!==e.isMessage&&a.append("is_message",e.isMessage),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&a.append("is_effective",e.isEffective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&a.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&a.append("effect_repository",e.effect_repository),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&a.append("country_id",e.countryId),""!==t&&null!==t&&void 0!==t&&a.append("detailJson",t),Object(i.a)({url:"/erp/approvalProcess/update",method:"post",data:a})}function $(){return Object(i.a)({url:"/erp/country/getdeptlist",method:"post"})}function x(e){var t=new URLSearchParams;return""!==e.deptno&&null!==e.deptno&&void 0!==e.deptno&&t.append("deptno",e.deptno),""!==e.deptname&&null!==e.deptname&&void 0!==e.deptname&&t.append("deptname",e.deptname),Object(i.a)({url:"/erp/country/adddept",method:"post",data:t})}function C(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("deptid",e.id),""!==e.deptNo&&null!==e.deptNo&&void 0!==e.deptNo&&t.append("deptno",e.deptNo),""!==e.deptName&&null!==e.deptName&&void 0!==e.deptName&&t.append("deptname",e.deptName),Object(i.a)({url:"/erp/country/updatedept",method:"post",data:t})}function P(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(i.a)({url:"/erp/country/deletedept",method:"post",data:t})}},"n+Zr":function(e,t,a){"use strict";a.d(t,"b",function(){return n}),a.d(t,"c",function(){return o}),a.d(t,"a",function(){return r}),a.d(t,"d",function(){return l}),a.d(t,"e",function(){return s});var i=a("t3Un");function n(e){var t=new URLSearchParams;return""!==e.countId&&null!==e.countId&&void 0!==e.countId&&t.append("countId",e.countId),""!==e.title&&null!==e.title&&void 0!==e.title&&t.append("title",e.title),""!==e.sourceNumber&&null!==e.sourceNumber&&void 0!==e.sourceNumber&&t.append("sourceNumber",e.sourceNumber),""!==e.countNumber&&null!==e.countNumber&&void 0!==e.countNumber&&t.append("countNumber",e.countNumber),""!==e.handlePersonId&&null!==e.handlePersonId&&void 0!==e.handlePersonId&&t.append("handlePersonId",e.handlePersonId),""!==e.countDeptId&&null!==e.countDeptId&&void 0!==e.countDeptId&&t.append("countDeptId",e.countDeptId),""!==e.countRepositoryId&&null!==e.countRepositoryId&&void 0!==e.countRepositoryId&&t.append("countRepositoryId",e.countRepositoryId),""!==e.receiptStat&&null!==e.receiptStat&&void 0!==e.receiptStat&&t.append("receiptStat",e.receiptStat),""!==e.createPersonId&&null!==e.createPersonId&&void 0!==e.createPersonId&&t.append("createPersonId",e.createPersonId),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(i.a)({url:"/erp/inventorycount/countlist",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("countIds",e),Object(i.a)({url:"/erp/inventorycount/deletecount",method:"post",data:t})}function r(e,t,a,n){var o=new URLSearchParams;return o.append("inventoryCountDetailJson",t),o.append("inventoryCountJson",e),""!==a&&null!==a&&void 0!==a&&o.append("repositoryId",a),""!==n&&null!==n&&void 0!==n&&o.append("regionId",n),Object(i.a)({url:"/erp/inventorycount/addinventorycount",method:"post",data:o})}function l(e,t){var a=new URLSearchParams;return a.append("inventoryCountDetailJson",t),a.append("inventoryCountJson",e),Object(i.a)({url:"/erp/inventorycount/updatecount",method:"post",data:a})}function s(e){var t=new URLSearchParams;return t.append("inventoryCountJson",e),Object(i.a)({url:"/erp/inventorycount/updatecount",method:"post",data:t})}},pdew:function(e,t,a){"use strict";var i=a("VG0r"),n=a("ZySA"),o=a("Mz3J"),r={directives:{waves:n.a},components:{Pagination:o.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{productVisible:this.control,moreaction:"",list:[],total:0,tableKey:0,listLoading:!0,getemplist:{productid:"",code:"",productname:"",categoryid:"",typeid:"",isactive:"",Productid:"",pagenum:1,pagesize:10}}},watch:{control:function(){this.productVisible=this.control,console.log(this.control),this.getlist()}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(i.m)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(i.m)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleSelectionChange:function(e){this.moreaction=e},handleAdd:function(){this.$router.push("/Product/NewProduct"),this.productVisible=!1},handleAddTo:function(){this.productVisible=!1,console.log(this.moreaction);var e=this.moreaction.map(function(e){return{productCode:e.code,productName:e.productName,locationId:"",color:e.color,typeId:e.typeId,inventoryQuantity:"",actualQuantity:"",enterQuantity:0,taxRate:0,unit:e.purMeasu,totalMoney:0,actualEnterQuantity:0,basicQuantity:0,batch:"",price:e.costPrice,productType:e.productType}});console.log(e),this.$emit("product",e)}}},l=(a("1Ru+"),a("KHd+")),s=Object(l.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.productVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择商品","append-to-body":""},on:{"update:visible":function(t){e.productVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.supplierid")},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.supplierid,callback:function(t){e.$set(e.getemplist,"supplierid",t)},expression:"getemplist.supplierid"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.categoryid,placeholder:"物品分类",clearable:""},model:{value:e.getemplist.categoryid,callback:function(t){e.$set(e.getemplist,"categoryid",t)},expression:"getemplist.categoryid"}},[a("el-option",{attrs:{value:"1",label:"类1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"类2"}})],1),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[a("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"请选择规格型号",clearable:""},model:{value:e.getemplist.typeid,callback:function(t){e.$set(e.getemplist,"typeid",t)},expression:"getemplist.typeid"}},[a("el-option",{attrs:{value:"1",label:"类1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"类2"}})],1),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择上下架",clearable:""},model:{value:e.getemplist.isactive,callback:function(t){e.$set(e.getemplist,"isactive",t)},expression:"getemplist.isactive"}},[a("el-option",{attrs:{value:"1",label:"上1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"下2"}})],1),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.code"),resizable:!1,prop:"code",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.productname"),resizable:!1,prop:"ProductName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.categoryid"),resizable:!1,prop:"category",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.category))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.typeid"),resizable:!1,align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.color"),resizable:!1,prop:"color",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.kpigrade"),resizable:!1,prop:"kpiGrade",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.kpiGrade))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.point"),resizable:!1,prop:"point",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.point))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.costprice"),resizable:!1,prop:"costPrice",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.costPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.purchaseprice"),resizable:!1,prop:"purchasePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.purchasePrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createid"),resizable:!1,prop:"createName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"text-align":"center"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v("确认添加")])],1)],1)},[],!1,null,"7726587b",null);s.options.__file="MyDetail.vue";t.a=s.exports},tCNy:function(e,t,a){}}]);