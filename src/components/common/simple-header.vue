/**
* Created by wolfsheller on 2017/3/3.
*/
<template>
  <header>
    <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
    <slot></slot>
    <div class="returnindex">
      <slot name="rightpart"></slot>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        leftarrow: 'static/img/common/leftarrow.png'
      }
    },
    methods: {
      goback () {
        history.go(-1)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    background: #fff;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.01rem solid #e5e5e5;
    z-index: 10;
    .leftarrow {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    .returnindex {
      height: 0.38rem;
      width: 15%;
    }
  }
</style>
