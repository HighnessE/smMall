/**
* Created by wolfsheller on 2017/3/1.
*/
<template>
  <div class="notfound">
    <my-header :headeritem="headeritem"></my-header>
    <div class="reanotfound">
      <img :src="notfound" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'

  export default {
    components: {
      myHeader
    },
    data () {
      return {
        headeritem: '未找到页面',
        notfound: 'static/img/common/notfound.jpg'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .notfound {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    .reanotfound {
      margin-top: 1.2rem;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
</style>
