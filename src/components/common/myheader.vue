/**
* Created by wolfsheller on 2017/2/22.
*/
<template>
  <header>
    <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
    <h2>{{ headeritem }}</h2>
    <div class="returnindex">
      <router-link :to="{ path: '/mall' }"><img :src=returnindex.imgsrc alt=""></router-link>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      headeritem: String
    },
    data () {
      return {
        leftarrow: 'static/img/common/leftarrow.png',
        returnindex: {
          'imgsrc': 'static/img/common/returnindex.png'
        }
      }
    },
    methods: {
      goback () {
        this.$router.go(-1)
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
      img {
        height: 100%;
      }
    }
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }
</style>
