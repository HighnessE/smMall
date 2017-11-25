/**
* Created by wolfsheller on 2017/3/23.
* xxx组件
*/
<template>
  <section class="mysearch">
    <div class="glass">
      <img :src=glass alt="">
    </div>
    <input type="text" v-model="mallsearchcon" placeholder="请输入搜索的内容">
    <div class="search">
      <span @click="clickSearch">搜索</span>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        glass: 'static/img/common/glass.png',
        mallsearchcon: ''
      }
    },
    methods: {
      clickSearch () {
        this.$emit('click-search', this.mallsearchcon)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .mysearch {
    position: relative;
    display: flex;
    flex: 1;
    padding-right: 0.8rem;
    border-radius: 0.29rem;
    border: 0.01rem solid #bebebe;
    background: #fff;
    height: 0.56rem;
    overflow: hidden;
    input {
      line-height: 0.58rem;
      font-size: 0.26rem;
      color: #b1b1b1;
      padding-left: 0.76rem;
      padding-right: 0.28rem;
      width: 100%;
    }
    .glass {
      position: absolute;
      left: 0.16rem;
      top: 50%;
      width: 0.3rem;
      height: 0.38rem;
      transform: translateY(-50%);
      border-right: 0.01rem solid #b1b1b1;
      padding-right: 0.16rem;
      img {
        height: 100%;
      }
    }
    .search {
      position: absolute;
      right: 0.26rem;
      top: 50%;
      transform: translateY(-50%);
      height: 0.38rem;
      font-size: 0.28rem;
      line-height: 0.38rem;
      padding-left: 0.16rem;
      color: #365aa4;
      border-left: 0.01rem solid #b1b1b1;
    }
  }
</style>
