/**
* Created by wolfsheller on 2017/3/13.
*/
<template>
  <div class="items">
    <div class="itemwrap">
      <div class="leftpart">
        <span>{{ crossbaritems.title }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      crossbaritems: Object
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .items {
    height: 1.08rem;
    border-bottom: 0.01rem solid #e0e0e0;
    .itemwrap {
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .leftpart {
        span {
          line-height: 1.08rem;
          font-size: 0.32rem;
          color: #333;
          margin-left: 0.34rem;
        }
      }
    }
  }
</style>
