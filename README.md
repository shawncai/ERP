# ERP
##work for nwow 
###ERP project  
####2019/2/12 add topmenu  
#### 2019/2/26 遇到的一些问题以及解决方案
#####tagsview的页面关闭操作  
```const view = { path: '/EmployeeInformation/NewEmployeeInformation', name: 'NewEmployeeInformation', fullPath: '/EmployeeInformation/NewEmployeeInformation', title: 'NewEmployeeInformation' } this.$store.dispatch('delView', view).then(({ visitedViews }) => {})```  
          
#####拼接json 方法
```extend(jsonbject1, jsonbject2) {
         var resultJsonObject = {}
         for (const attr in jsonbject1) {
           resultJsonObject[attr] = jsonbject1[attr]
         }
         for (const attr in jsonbject2) {
           resultJsonObject[attr] = jsonbject2[attr]
         }
         return resultJsonObject
       }```