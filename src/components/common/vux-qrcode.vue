/**
* Created by wolfsheller on 2017/3/7.
*/
<template>
  <div class="myqrcode">
    <qrcode :value=qrcode type="img" :fg-color=REfgColor></qrcode>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Qrcode } from 'vux'

  export default {
    props: {
      qrcode: {
        type: String,
        default: 'http://www.baidu.com'
      }
    },
    components: {
      Qrcode
    },
    data () {
      return {
        fgColor: ['#77d2b7', '#77d293', '#77d2d1', '#df87a8', '#dfbb87', '#f28f8f']
      }
    },
    computed: {
      REfgColor: function () {
        return this.fgColor[Math.floor(Math.random() * 6)]
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .myqrcode {
    img {
      width: 100% !important;
    }
  }
</style>
