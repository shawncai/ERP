
<template>
  <div class="carlocations">
    <div class="leftlocation">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div v-for="(item, index) in carlist" :key="index" class="carlistdata">
            <div>
              {{ item.snCode }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="在线" name="second">在线</el-tab-pane>
        <el-tab-pane label="离线" name="third">离线</el-tab-pane>
      </el-tabs>
    </div>
    <div id="map_canvas" style="height: 850px; width: 100%"/>
  </div>
</template>
<script>
import { vehicleStat } from '@/api/carlocation'

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
      carlist: []

    }
  },
  created() {
    this.getvehicleStat()
  },
  mounted() {
    this.mapBuild() // 初始化实例之后调用
  },
  methods: {
    getvehicleStat() {
      vehicleStat()
        .then(res => {
          if (res.data.ret === 200) {
            const arr = res.data.data.content
            this.carlist = res.data.data.content
            const arrb = []
            arr.map(item => {
              const newobj = {}
              const position = {}
              if (item.longitude !== null && item.longitude !== undefined && item.longitude !== '') {
                position.lng = item.longitude
                position.lat = item.latitude
                newobj.position = position
                newobj.name = item.snCode
                arrb.push(newobj)
              }
            })
            console.log(arrb)
            this.markers = arrb
            this.mapBuild()
          }
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    //  地图实例
    mapBuild() {
      // 创建地图实例，zoom是缩放比例
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 6,
        center: this.center,
        // eslint-disable-next-line no-undef
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })
      // 这里因为需要很多标记，所以遍历了this.markers（后端给的数据）来循环创建标记
      this.markers.map(item => {
        // const marker = new MarkerWithLabel({
        //   position: item.position,
        //   icon: '../../../static/img/qishou.png', // 标记自定义图标
        //   draggable: false, // 不可拖动
        //   map: map, // 地图实例
        //   labelContent: item.name, // label的内容
        //   labelAnchor: new google.maps.Point(22, 0), // label的位置，可以调
        //   labelClass: 'labels', // the CSS class for the label
        //   labelStyle: { background: '#fff', padding: '5px' }
        // })
        // 自定义信息窗口
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          map: map,
          position: item.position
        })

        // eslint-disable-next-line no-undef
        const iw = new google.maps.InfoWindow({
          content: `<div>
                          <p>门店地址： ${item.position}</p>
                          <p>门店名：${item.name}</p>
                        </div>` })
        // 点击信息窗口显示
        // eslint-disable-next-line no-undef
        google.maps.event.addListener(marker, 'click', function(e) { iw.open(map, marker) })
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
</style>
