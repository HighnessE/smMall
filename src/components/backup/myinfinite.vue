/**
* Created by wolfsheller on 2017/3/2.
*/
<template>
  <div>
    <span v-if="ifloadmore">加载中...</span>
    <span v-else>已经到底啦</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      ifloadmore: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  div {
    text-align: center;
    height: 0.6rem;
    background: #f6f6f6;
    span {
      line-height: 0.6rem;
      color: #5e5e5e;
    }
  }
</style>
