/**
* Created by wolfsheller on 2017/3/4.
* 水平布局组件（一般用于横条）
*/
<template>
  <div class="items">
    <div class="itemwrap">
      <div>
        <img class="itemlogo" :src=crossitems.imgsrc alt="">
        <span>{{ crossitems.title }}</span>
      </div>
      <slot class="itemarrow"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      crossitems: Object
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .items {
    border-bottom: 0.01rem solid #e0e0e0;
    height: 100%;
    .itemwrap {
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        img.itemlogo {
          margin-left: 0.46rem;
          width: 0.32rem;
        }
        span {
          margin-left: 0.34rem;
          line-height: 1.08rem;
          font-size: 0.28rem;
          color: #5e5e5e;
        }
      }
    }
    a:active {
      background: #f6f6f6;
    }
  }
</style>
