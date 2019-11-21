
<template>
  <div class="carlocations">
    <div class="leftlocation">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane :label="$t('updates.qb')" name="first">
          <div v-for="(item, index) in carlist" :key="index" class="carlistdata">
            <div :class="activename ===item.snCode? 'caritem active' : 'caritem'" @click="choosecar(item)">
              {{ item.snCode }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('updates.zxi')" name="second">
          <div v-for="(item, index) in carlist2" :key="index" class="carlistdata">
            <div :class="activename ===item.snCode? 'caritem active' : 'caritem'" @click="choosecar(item)">
              {{ item.snCode }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('updates.lxi')" name="third">
          <div v-for="(item, index) in carlist3" :key="index" class="carlistdata">
            <div :class="activename ===item.snCode? 'caritem active' : 'caritem'" @click="choosecar(item)">
              {{ item.snCode }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="map_canvas" style="height:800px; width: 100%"/>
  </div>
</template>
<script>
import { vehicleStat, customerInfo, rideCount, userLockCar, userUnLockCar } from '@/api/carlocation'

var _that
export default {
  name: 'GGMap',
  data() {
    return {
      show: false,
      center: { lng: 122.3843288, lat: 11.4574355 },
      markers: [],
      icon: '../qishou.png',
      position: {},
      websock: null,
      activeName2: 'first',
      carlist: [],
      carlist2: [],
      carlist3: [],
      activename: '',
      dialogVisible: false,
      personinfo: ''
    }
  },
  created() {
    this.getvehicleStat()
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.mapBuild() // 初始化实例之后调用
  },
  methods: {

    choosecar(val) {
      this.activename = val.snCode
      console.log(val)
      if (val.longitude && val.latitude) {
        this.center = { lng: val.longitude, lat: val.latitude }
        this.mapBuild(val)
      } else {
        this.$message({
          message: '该车定位有问题',
          type: 'warning'
        })
      }
      if (val.customerId === null || val.customerId === '' || val.customerId === undefined) {
        this.$message({
          message: '该车未绑定',
          type: 'warning'
        })
      }
    },
    getvehicleStat() {
      vehicleStat()
        .then(res => {
          if (res.data.ret === 200) {
            const arr = res.data.data.content
            this.carlist = res.data.data.content
            this.carlist2 = res.data.data.content.filter(item => {
              return item.line === 1
            })
            this.carlist3 = res.data.data.content.filter(item => {
              return item.line === 2
            })
            const arrb = []
            console.log(arr)
            arr.map(item => {
              const newobj = {}
              const position = {}
              if (item.longitude !== null && item.longitude !== undefined && item.longitude !== '') {
                position.lng = item.longitude
                position.lat = item.latitude
                newobj.position = position
                newobj.snCode = item.snCode
                newobj.customerId = item.customerId
                newobj.lockStat = item.lockStat
                arrb.push(newobj)
              }
            })
            console.log(arrb)
            this.markers = arrb
            this.center = arrb[1].position
            this.mapBuild()
          }
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    //  地图实例
    mapBuild(val) {
      // 创建地图实例，zoom是缩放比例
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 15,
        center: this.center,
        // eslint-disable-next-line no-undef
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })
      // 这里因为需要很多标记，所以遍历了this.markers（后端给的数据）来循环创建标记
      this.setmakerinfo(map, val)
    },
    setmakerinfo(map, val) {
      this.markers.map(item => {
        // 自定义信息窗口
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          map: map,
          position: item.position,
          icon: '../../../static/img/qishou2.png'
        })
        rideCount(item.customerId, item.snCode)
          .then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              customerInfo(item.customerId)
                .then(result => {
                  console.log(result)
                  // eslint-disable-next-line no-undef
                  const iw = new google.maps.InfoWindow({
                    content: `<div>
                    <div style="border-bottom: 1px solid #f1f1f1;padding:10px">${item.snCode}</div>
                          <p>里程： ${res.data.data.content[0].Miles}</p>
                           <p>联系人： ${result.data.data.content.customerName}</p>
                             <p>联系电话： ${result.data.data.content.phoneNumber}</p>
                             <div style="border-top: 1px solid #f1f1f1; padding:10px" id="xyz" class="${item.snCode}">
                                 锁车
                             </div>
                             <div style="border-top: 1px solid #f1f1f1; padding:10px" id="xyz2" class="${item.snCode}">
                                 开锁
                             </div>
                        </div>` })

                  // 点击信息窗口显
                  if (val) {
                    if (val.snCode === item.snCode) {
                      // eslint-disable-next-line no-undef
                      const marker2 = new google.maps.Marker({
                        map: map,
                        position: item.position,
                        icon: '../../../static/img/qishou2.png'
                      })
                      iw.open(map, marker2)
                    }
                  }
                  // eslint-disable-next-line no-undef
                  google.maps.event.addListener(marker, 'click', function(e) {
                    console.log(marker)
                    console.log(e)
                    console.log(iw)

                    iw.open(map, marker)
                  })
                  const that = this
                  // eslint-disable-next-line no-undef
                  google.maps.event.addListener(iw, 'domready', function() {
                    var dss = document.getElementById('xyz')
                    var dss2 = document.getElementById('xyz2')
                    var snCode = document.getElementById('xyz').className
                    console.log(item)
                    if (item.lockStat === 1) {
                      dss2.style.display = 'none'
                      dss.style.display = 'block'
                      dss.onclick = function() {
                        console.log(snCode)
                        userLockCar(snCode).then(res => {
                          if (res.data.ret === 200) {
                            that.$message({
                              message: '锁车命令发送成功',
                              type: 'success'
                            })
                            setTimeout(function() {
                              that.getvehicleStat()
                            }, 4000)
                          }
                        })
                      }
                    } else if (item.lockStat === 2) {
                      dss.style.display = 'none'
                      dss2.style.display = 'block'
                      dss2.onclick = function() {
                        console.log(snCode)
                        userUnLockCar(snCode).then(res => {
                          if (res.data.ret === 200) {
                            that.$message({
                              message: '开锁命令发送成功',
                              type: 'success'
                            })
                            setTimeout(function() {
                              that.getvehicleStat()
                            }, 4000)
                          }
                        })
                      }
                    }
                  })
                })
            }
          })
      })
    }
  }
}
</script>
<style rel="stylesheet/css" scoped>
 .carlocations {
   width: 100%;
   display: flex;
   justify-content: space-between;
   background: #ffffff;
 }
 .carlocations >>> .el-tabs--border-card {
   border: none;
   box-shadow: none
 }
 .leftlocation{
   width: 20%
 }
 .caritem {
   padding: 10px;
   color: #9e9e9e;
   cursor:pointer
 }
 .active {
   color: #000
 }
</style>
