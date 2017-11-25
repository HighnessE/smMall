/**
* Created by wolfsheller on 2017/4/5.
* xxx组件
*/
<template>
  <section class="">
    <my-backtop class="mybacktop"></my-backtop>
  </section>
</template>

<script type="text/ecmascript-6">
  import myBacktop from './mybacktop'
  export default {
    components: {
      myBacktop
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
 .mybacktop {
   bottom: 0.4rem !important;
 }
</style>
