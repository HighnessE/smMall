/**
* Created by wolfsheller on 2017/3/25.
* amap设置位置组件
*/
<template>
  <section class="amapcomponent">
    <my-header :headeritem="headeritem"></my-header>
    <div class="amapwrap">
      <el-amap vid="amap" :zoom="zoom" :plugin="plugin">
      </el-amap>
    </div>
    <div class="verifymapwrap" v-if="ifverify">
      <div class="verifypopup">
        <div class="menupart">
          <p class="tipstitle">{{ verifytitle }}</p>
          <p class="tipsinfo">{{ verifyinfo }}</p>
        </div>
        <div class="mainpart" @click="closeVerify">好</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import {mapState} from 'vuex'
  export default {
    components: {
      myHeader
    },
    data () {
      let self = this
      return {
        ifverify: false,
        headeritem: '查看地图',
        verifytitle: '获取地址成功,您当前定位的地址是',
        verifyinfo: '',
        tipsconfirm: '确定',
        plugin: [
          {
            pName: 'Geolocation',
            events: {
              init (instance) {
                instance.getCurrentPosition(function (status, result) {
                  self.$store.state.meraccess.uploadobj.map = result.position.lng + ',' + result.position.lat
                  self.verifyinfo = result.formattedAddress
                  self.ifverify = true
                })
              }
            }
          }
        ],
        zoom: 18
      }
    },
    computed: {
      ...mapState({
        uploadobj: state => state.meraccess.uploadobj
      })
    },
    methods: {
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
//          that.nowposition = [parseFloat(longitude), parseFloat(latitude)]
//          that.marker.position = that.center = that.nowposition
//        }
//
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
//      },
      closeVerify () {
        this.ifverify = false
        this.uploadobj.ifhavasetmap = true
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .amapcomponent {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    .amapwrap {
      position: absolute;
      top: 0.8rem;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }

  .amap-geo.amap-toolbar-geo {
  margin-bottom: 1rem !important;
  width: 0.7rem !important;
  height: 0.7rem !important;
  background-position: 50% 50% !important;
  background-size: 50% 50% !important;
  }

  .amap-zoomcontrol {
  width: 0.7rem !important;
  }

  .amap-zoomcontrol::after {
  top: 0.7rem !important;
  }

  .amap-zoom-touch-plus, .amap-zoom-touch-minus {
  height: 0.7rem !important;
  div {
  font-size: 0.4rem !important;
  line-height: 0.7rem !important;
  }
  }

  .verifymapwrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .verifypopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      text-align: center;
      .menupart {
        border-bottom: 0.01rem solid #e7e7e7;
        box-sizing: border-box;
        .tipstitle {
          line-height: 0.88rem;
          color: #333;
          font-size: 0.34rem;
        }
        .tipsinfo {
          line-height: 0.48rem;
          font-size: 0.28rem;
          padding: 0 0.44rem;
          margin-bottom: 0.2rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }
</style>
