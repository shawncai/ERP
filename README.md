# ERP  
[![CSDN](https://img.shields.io/badge/vue-element-brightgreen.svg)](/)
[![CSDN](https://img.shields.io/badge/NWOW-PC-red.svg)](/)
[![CSDN](https://img.shields.io/badge/Shawnzhang-JS-blue.svg)](/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
## work for nwow  
###  重大操作  
```
安装插件步骤出错后操作
- npm install -g cnpm --registry=https://registry.npm.taobao.org     安装cnmp
- cnpm install node-sass    安装node-sass
- npm run dev    启动
- 启动报错  
- 删除 node_modules 文件夹
- npm install  重新安装node_modules
- npm run dev 重新启动
- 报错
- npm install -g cnpm --registry=https://registry.npm.taobao.org     安装cnmp
- cnpm install node-sass    安装node-sass
- npm run dev 直接启动
- 成功安装
```
### ERP project  
#### 2019/2/12 add topmenu  
#### 2019/2/25 遇到的一些问题以及解决方案
##### tagsview的页面关闭操作  
```js  
const view = { 
path: '/EmployeeInformation/NewEmployeeInformation',
 name: 'NewEmployeeInformation',
  fullPath: '/EmployeeInformation/NewEmployeeInformation',
   title: 'NewEmployeeInformation' 
   }  
   
this.$store.dispatch('delView', view).then(({ visitedViews }) => {})
```  
          
##### 拼接json 方法
```js
extend(jsonbject1, jsonbject2){
         var resultJsonObject = {}
         for (const attr in jsonbject1) {
           resultJsonObject[attr] = jsonbject1[attr]
         }
         for (const attr in jsonbject2) {
           resultJsonObject[attr] = jsonbject2[attr]
         }
         return resultJsonObject} 
```  

         
#### 2019/2/26 遇到的一些问题以及解决方案         
#####  axios 向后端发送请求数据时如果为空或者underfined时判断一下  
```js
export function getemplist(query) {
     var params = new URLSearchParams()
     // 判断是否为空值
     if (query.jobnumber !== '') {
       params.append('jobnumber', query.jobnumber) // 你要传给后台的参数值 key/value
     }
     return request({
       url: 'xxxx',
       method: 'post',
       data: params
     })
   }
```    
#### 2019/2/26   
##### 用map取用数组中的莫一项并且把这一项变成字符串组  
```js
 ids =  [{id: 2, name: xxx},{id: 3, name: xxx}, {id: 4, name: xxx}, {id: 5, name: xxx}]
 const ids = this.moreaction.map(item => item.id).join()
 ids = 2, 3, 4, 5, 6
```
##### 导出功能中名字拼接还有点问题待解决！！！！！  

#### 2019/2/28
##### select 回显问题  
```
      this.employeeName = String( row.empName)
      this.contractNumber =String(row.contractNumber) 
     // 需要把Number类型的数据转化成String类型，这样回显才没问题
```  

#### 2019/03/01  
##### 客户和仓库问题 批量导入  
```js
this.tableHeader = ['门店名称', '地址', '经度', '纬度', '管理员id', '开业时间', '状态', '描述', '所属区域', '种类id', '小区经理id', '属性id', '国家id']
      this.uploadHead = results.map(function(item) {
        return {
          repositoryName: item.门店名称,
          address: item.地址,
          longitude: item.经度,
          latitude: item.纬度,
          managerPeopleId: item.管理员id,
          createTime: item.开业时间,
          stat: item.状态,
          description: item.描述,
          regionId: item.所属区域,
          type: item.种类id,
          regionManagerId: item.小区经理id,
          attributes: item.属性id,
          countryId: item.国家id
        }
      })
      需要更改一下头部文件显示和表格内部数据
```  


#### 2019/3/5  
##### vue组件的封装  
```angular2html
@close="$emit('update:control', false)" 控制父组件的更新
:control.sync="editVisible" :editdata.sync="customerForm" @rest="refreshlist"
.sync的控制符，通过props传递
通过 this.$emit('rest', true) 子组件向父组件传值

```    
#### 2019/3/6  
##### 去除对象内的空键值对  
```js
      const Data = this.RepositoryForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
```

###### 通过scope中调用函数
```js
<el-table-column  prop="width" label="Size">
<template slot-scope='scope'>
<p>{{getSize(scope.row.width, scope.row.height)}}</p>
</template>
</el-table-column>
```  
######  通过循环去掉json数组中的null, 空字符串, underfined
```js
const EnterDetail = [{basicQuantity: 0,
                      color: "red",
                      enterQuantity: 0,
                      locationId: null,
                      price: 1234565,
                      productCode: "1234565",
                      productName: "1234565",
                      remarks: null,
                      totalMoney: null,
                      typeId: null,
                      unit: null}]
 EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        return elem
      })
```  
######  循环中使用异步操作可以换个形式  
```js
async handleConfirm() {
      const applydata = this.choosedata.stockApplyDetailVos
      const applyDetail = applydata.map(function(item) {
        return {
          productCode: item.productCode,
          price: ''
        }
      })
      
      // 通过Promise.all把所有循环中的异步接口数据加载过来，再通过async/await把数据加载完成
      const list = await Promise.all(applydata.map(function(item) {
        return productlist(item.productCode)
      }))
      
      // 在外部把数据加到数组里面去
      for (let i = 0; i < applyDetail.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (applyDetail[i].productCode === list[j].data.data.content.list[0].code) {
            applyDetail[i].price = list[j].data.data.content.list[0].purchasePrice
          }
        }
      }
      console.log(applydata[0].price)
      this.$emit('apply', applyDetail)
    }
```  
######  正则判断位数  
```js
// 判断两位数字和字母组合
const reg = /^[A-Z0-9]{2}$/
      if (this.addCategoryForm.type === '2') {
        if (reg.test(this.addCategoryForm.code) === true) {
          console.log(1234)
        }
      }
// 8-20位，含数字、字母大小写三种组合方式的密码
(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$
```  
######  递归函数  
```js
 // 递归函数
    recursion(val){
      if (val.level === 1) {
        return val.data
      } else {
        return this.recursion(val.parent)
      }
    }
```  
######  树形数据转化成普通数组  
```js
// 树结构数据转数组
    treeToList(tree) {
      let queen = []
      const out = []
      queen = queen.concat(tree)
      while (queen.length) {
        const first = queen.shift()
        if (first.children) {
          queen = queen.concat(first.children)
          delete first['children']
        }
        out.push(first)
      }
      return out
    }
```  

######  日期格式当前时间和七天  
```js
 const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      this.getemplist.time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
```  
######  当前日期  
```js
 const date = new Date()
      date.setTime(date.getTime())
      this.personalForm.enterDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
```
######  对json数组中两项或多项相同元素进行分类操作(通过js对象key唯一性进行处理)
```
const j1 = [{
        "menuDate": 1,
        "dinnerTime": "0",
        "num": 5
    },
    {
        "menuDate": 1,
        "dinnerTime": "0",
        "num": 1
    },
    {
        "menuDate": 1,
        "dinnerTime": "1",
        "num": 3
    },
    {
        "menuDate": 2,
        "dinnerTime": "0",
        "num": 3
    },
    {
        "menuDate": 2,
        "dinnerTime": "0",
        "num": 6
    }]
var jmap = {};
var result = [];

j1.forEach(function(al){
    var key = al.menuDate + '_' + al.dinnerTime;
    if(typeof jmap[key] === 'undefined'){
        jmap[key] = [];
    }
    jmap[key].push(al);
})

var keys = Object.keys(jmap);
for(var i = 0; i < keys.length; i++){
    var rs = keys[i].split('_');
    result.push({menuDate:rs[0],dinnerTime:rs[1],value:jmap[keys[i]]});
}
```