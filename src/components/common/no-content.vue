/**
* Created by wolfsheller on 2017/3/30.
* 页面无内容组件
*/
<template>
  <section class="nocontent">
    <img :src=nocontent.imgsrc alt="">
    <p>
      <span>{{ nocontent.describe1 }}</span>
      <router-link class="routerspan" :to="{ path: '/mall/index' }" tag="span">
        {{ nocontent.describe2 }}
      </router-link>
      <span>{{ nocontent.describe3 }}</span>
    </p>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      nocontent: {
        type: Object,
        dafault: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '暂无内容',
          describe2: '',
          describe3: ''
        }
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .nocontent {
    margin-top: 2.8rem;
    text-align: center;
    img {
      width: 1.78rem;
    }
    p {
      margin-top: 0.44rem;
      font-size: 0;
      line-height: 0.44rem;
      padding: 0 0.44rem;
      color: #bcbcbc;
      span {
        font-size: 0.34rem;
      }
      .routerspan {
        color: #365aa4;
      }
    }
  }
</style>
