(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-db6c"],{"+Khs":function(t,e,i){"use strict";var n=i("Q2AE"),a={inserted:function(t,e,i){var a=e.value,o=n.a.getters&&n.a.getters.roles;if(!a[0])throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var s=a[0];o.some(function(t){return s.includes(t)})||a[1]===n.a.getters.userId||t.parentNode&&t.parentNode.removeChild(t)}},o=function(t){t.directive("permission2",a)};window.Vue&&(window.permission2=a,Vue.use(o)),a.install=o;e.a=a},"41Be":function(t,e,i){"use strict";i.d(e,"a",function(){return a});var n=i("Q2AE");function a(t){if(t&&t instanceof Array&&t.length>0){var e=t;return!!(n.a.getters&&n.a.getters.roles).some(function(t){return e.includes(t)})}return console.error("need roles!"),!1}},CAIS:function(t,e,i){"use strict";var n=i("gV4h");i.n(n).a},Q4Eu:function(t,e,i){"use strict";var n=i("Q2AE"),a={inserted:function(t,e,i){var a=e.value,o=n.a.getters&&n.a.getters.roles;if(!(a&&a instanceof Array&&a.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var s=a;o.some(function(t){return s.includes(t)})||t.parentNode&&t.parentNode.removeChild(t)}},o=function(t){t.directive("permission",a)};window.Vue&&(window.permission=a,Vue.use(o)),a.install=o;e.a=a},gV4h:function(t,e,i){},z4ub:function(t,e,i){"use strict";i.r(e);var n=i("A4/D"),a=i("ZySA"),o=i("Mz3J"),s=i("Q4Eu"),r=i("+Khs"),l=i("41Be"),c=i("LMrS"),u=i("4Uu5"),d=i("/9Q6"),p={name:"StockAlarmList",directives:{waves:a.a,permission:s.a,permission2:r.a},components:{Pagination:o.a,MyRepository:c.a,MyAccept:u.a,MyCreate:d.a},filters:{flagStatFileter:function(t){return{1:"下限预警",2:"上线预警"}[t]}},data:function(){return{depts:[],searchRepositoryId:"",repositorycontrol:!1,date:[],getemplist:{pageNum:1,pageSize:10,countryId:this.$store.getters.countryId,repositoryId:this.$store.getters.repositoryId,regionIds:this.$store.getters.regionIds},moreaction:"",downloadLoading:!1,list:[],list2:[],total:0,tableKey:0,listLoading:!0}},activated:function(){this.getlist(),this.getlist2()},mounted:function(){this.getlist(),this.getlist2()},beforeCreate:function(){this},methods:{getlist2:function(){var t=this;this.getemplist.pageNum=1,this.getemplist.pageSize=9999,Object(n.d)(this.getemplist).then(function(e){200===e.data.ret&&(t.list2=e.data.data.content.list)})},checkPermission:l.a,handlechooseRep:function(){this.repositorycontrol=!0},repositoryname:function(t){console.log(t),this.searchRepositoryId=t.repositoryName,this.getemplist.searchRepositoryId=t.id},getlist:function(){var t=this;this.listLoading=!0,Object(n.d)(this.getemplist).then(function(e){200===e.data.ret&&(t.list=e.data.data.content.list,t.total=e.data.data.content.totalCount,t.listLoading=!1),setTimeout(function(){t.listLoading=!1},50)})},restFilter:function(){this.searchRepositoryId="",this.getemplist.searchRepositoryId=""},handleFilter:function(){var t=this;this.getemplist.pageNum=1,Object(n.d)(this.getemplist).then(function(e){200===e.data.ret?(t.list=e.data.data.content.list,t.total=e.data.data.content.totalCount):t.$notify.error({title:"wrong",message:"wrong",offset:100})})},handleSelectionChange:function(t){this.moreaction=t},handleExport:function(){for(var t=this,e=0;e<this.list2.length;e++)1===this.list2[e].alarmType?this.list2[e].alarmTypeName="下限预警":2===this.list2[e].alarmType&&(this.list2[e].alarmTypeName="上线预警");console.log("this.list2",this.list2),this.downloadLoading=!0,Promise.all([i.e("chunk-ef4a"),i.e("chunk-7c4b")]).then(i.bind(null,"S/jZ")).then(function(e){var i=t.formatJson(["id","code","productName","typeName","stockMeasurement","downStock","upStock","existStock","alarmTypeName"],t.list2);e.export_json_to_excel({header:["编号","物品编码","物品名称","规格型号","单位","库存下限","库存上限","现有库存","报警类型"],data:i,filename:"库存预警列表"}),t.downloadLoading=!1})},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return e[t]})})},handlePrint:function(){console.log(456)}}},m=(i("CAIS"),i("KHd+")),f=Object(m.a)(p,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ERP-container"},[i("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:t.$t("StockAlarm.searchRepositoryId"),clearable:""},on:{clear:t.restFilter,focus:t.handlechooseRep},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.searchRepositoryId,callback:function(e){t.searchRepositoryId=e},expression:"searchRepositoryId"}}),t._v(" "),i("my-repository",{attrs:{repositorycontrol:t.repositorycontrol},on:{"update:repositorycontrol":function(e){t.repositorycontrol=e},repositoryname:t.repositoryname}}),t._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:t.$t("StockAlarm.code"),clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.getemplist.code,callback:function(e){t.$set(t.getemplist,"code",e)},expression:"getemplist.code"}}),t._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:t.$t("StockAlarm.productName"),clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.getemplist.productName,callback:function(e){t.$set(t.getemplist,"productName",e)},expression:"getemplist.productName"}}),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px","margin-top":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(t._s(t.$t("public.search")))])],1),t._v(" "),i("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["131-153-6"],expression:"['131-153-6']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{loading:t.downloadLoading},on:{click:t.handleExport}},[i("svg-icon",{attrs:{"icon-class":"daochu"}}),t._v(t._s(t.$t("public.export")))],1),t._v(" "),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["131-153-7"],expression:"['131-153-7']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-printer"},on:{click:t.handlePrint}},[t._v(t._s(t.$t("public.print")))])],1),t._v(" "),i("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",fixed:"left",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("public.id"),resizable:!1,fixed:"left",align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.code"),resizable:!1,fixed:"left",align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.code))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.productName"),resizable:!1,fixed:"left",align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.productName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.typeName"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.typeName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.stockMeasurement"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.stockMeasurement))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.color"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.color))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.downStock"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.downStock))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.upStock"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.upStock))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.onStock"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.existStock))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("StockAlarm.flag"),resizable:!1,align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("flagStatFileter")(e.row.alarmType)))])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.getemplist.pageNum,limit:t.getemplist.pageSize},on:{"update:page":function(e){t.$set(t.getemplist,"pageNum",e)},"update:limit":function(e){t.$set(t.getemplist,"pageSize",e)},pagination:t.getlist}})],1)],1)},[],!1,null,"a90d3558",null);f.options.__file="StockAlarmList.vue";e.default=f.exports}}]);