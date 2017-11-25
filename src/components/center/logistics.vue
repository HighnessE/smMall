/**
* Created by wolfsheller on 2017/3/20.
* 查看物流组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  export default {
    components: {
      myHeader
    },
    data () {
      return {
        headeritem: '查看物流'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
