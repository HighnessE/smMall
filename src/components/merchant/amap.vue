/**
* Created by wolfsheller on 2017/3/25.
* xxx组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="amapcomponent">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center">
        <!--<el-amap-marker :position="marker.position" :key="marker.id"></el-amap-marker>-->
        <el-amap-info-window :position="window.position" :content="window.content" :open="window.open"></el-amap-info-window>
      </el-amap>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import myHeader from 'components/common/myheader'
  export default {
    components: {
      myHeader
    },
    data () {
      return {
        headeritem: '查看地图',
//        nowposition: [],
//        marker: {
//          position: [121.5273285, 31.21515044]
//        },
        zoom: 18,
        center: [121.5273285, 31.21515044],
        window: {
          position: [121.5273285, 31.21515044],
          content: '妙心猪肚鸡',
          open: true
        }
      }
    },
    computed: {
      ...mapState({
        merchantmap: state => state.merchant.merchantmap,
        merchantname: state => state.merchant.merchantname
      })
    },
//    methods: {
//      getPosition () {
//        let that = this
//        if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(onSuccess, onError)
//        } else {
//          console.log('Geolocation is not supported by this browser.')
//        }
//        function onSuccess (position) {
//          // 返回用户位置
//          // 经度
//          var longitude = position.coords.longitude
//          // 纬度
//          var latitude = position.coords.latitude
//          alert('经度' + longitude + '，纬度' + latitude)
//          that.nowposition = [parseFloat(longitude), parseFloat(latitude)]
//          that.marker.position = that.window.position = that.center = that.nowposition
//        }
//        function onError (error) {
//          switch (error.code) {
//            case 1:
//              alert('位置服务被拒绝')
//              break
//            case 2:
//              alert('暂时获取不到位置信息')
//              break
//            case 3:
//              alert('获取信息超时')
//              break
//            case 4:
//              alert('未知错误')
//              break
//          }
//        }
//      }
//    },
    created () {
      let viewmap = this.merchantmap.split(',')
      let odd = parseFloat(viewmap[0])
      let even = parseFloat(viewmap[1])
      this.window.position = this.center = [odd, even]
      this.window.content = this.merchantname
//      this.getPosition()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .amapcomponent {
    position: absolute;
    top: 0.8rem;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
