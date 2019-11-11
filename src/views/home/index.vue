<template>
  <div >
    <div id="map_canvas" style="height: 850px; width: 100%"/>
  </div>
</template>
<script>

import { searchRepository2 } from '@/api/Repository'

export default {
  name: 'GGMap',
  data() {
    return {
      show: false,
      center: { lng: 122.3843288, lat: 11.4574355 },
      markers: [],
      icon: '../qishou.png',
      position: {},
      websock: null

    }
  },
  created() {
    this.getmapdata()
  },
  mounted() {
    this.mapBuild() // 初始化实例之后调用
  },
  methods: {
    getmapdata() {
      const params = {}
      params.loginRepositoryId = this.$store.getters.repositoryId
      params.regionIds = this.$store.getters.regionId
      params.pagenum = 1
      params.pagesize = 9999

      searchRepository2(params).then(res => {
        const arr = res.data.data.content.list
        const arrb = []
        arr.map(item => {
          const newobj = {}
          const position = {}
          if (item.longitude !== null && item.longitude !== undefined && item.longitude !== '') {
            position.lng = item.longitude
            position.lat = item.latitude
            newobj.position = position
            newobj.name = item.repositoryName
            newobj.address = item.address
            newobj.phone = item.phone
            arrb.push(newobj)
          }
        })
        this.markers = arrb
        this.mapBuild()
      })
    },
    //  地图实例
    mapBuild() {
      // 创建地图实例，zoom是缩放比例
      const map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 6,
        center: this.center,
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
        const marker = new google.maps.Marker({
          map: map,
          position: item.position
        })

        const iw = new google.maps.InfoWindow({
          content: `<div>
                          <p>门店地址： ${item.address}</p>
                          <p>门店名：${item.name}</p>
                        </div>` })
        // 点击信息窗口显示
        google.maps.event.addListener(marker, 'click', function(e) { iw.open(map, marker) })
      })
    }
  }
}
</script>
