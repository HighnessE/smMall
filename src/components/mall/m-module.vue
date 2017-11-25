/**
* Created by wolfsheller on 2017/2/27.
* 主页推荐页面单模块组件
*/
<template>
  <section class="module">
    <div class="titlepart">
      <h1 :style="{ color: moduleColor }">———— {{ moduletitle }} ————</h1>
    </div>
    <div class="contentpart">
      <slot></slot>
    </div>
    <div class="banneritems">
      <router-link :to="{ path: '/mall/details', query: { gid: bannerurl } }">
        <img :src=bannerimgsrc alt="">
      </router-link>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      moduletitle: String,
      bannerimgsrc: String,
      bannerurl: String,
      moduleColor: String
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .module {
    .titlepart {
      background: #ecede5;
      height: 0.86rem;
      line-height: 0.86rem;
      text-align: center;
      color: #06c1fb;
      font-size: 0.3rem;
    }
  }

  .banneritems {
    width: 100%;
    font-size: 0;
    border-bottom: 0.02rem solid #eaeaea;
    img {
      width: 100%;
    }
  }
</style>
