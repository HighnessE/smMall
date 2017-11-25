/**
* Created by wolfsheller on 2017/2/22.
* 主页搜索组件
*/
<template>
  <section class="mallsearch">
    <div class="pagelogo"><img :src=pagelogo></div>
    <div class="searchinput">
      <div class="mysearch">
        <div class="glass">
          <img :src=glass alt="">
        </div>
        <input type="text" v-model="mallsearchcon" :placeholder=placeholder>
        <div class="search">
          <span @click="clickSearch">搜索</span>
        </div>
      </div>
    </div>
    <div class="category">
      <router-link :to="{ path: '/mall/category' }"><img src="../../assets/packimg/category.png" alt=""></router-link>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import mySearch from 'components/common/mysearch'
  export default {
    components: {
      mySearch
    },
    data () {
      return {
        pagelogo: 'static/img/pagelogo.png',
        glass: 'static/img/common/glass.png',
        placeholder: '请输入搜索的内容',
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
  @import '../../assets/mixin.less';

  .mallsearch {
    position: relative;
    display: flex;
    z-index: 10;
    height: 0.86rem;
    background: @maintheme;
    .pagelogo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.2rem;
      margin: 0 0.08rem;
      img {
        height: 0.7rem;
      }
    }
    .category {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.8rem;
      margin: 0 0.06rem;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        img {
          width: 0.37rem;
          height: 0.3rem;
        }
      }
    }
    .searchinput {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      margin: 0 0.06rem;
      .mysearch {
        position: relative;
        display: flex;
        flex: 1;
        height: 0.56rem;
        padding-right: 0.8rem;
        border-radius: 0.29rem;
        border: 0.01rem solid #bebebe;
        background: #fff;
        overflow: hidden;
        input {
          line-height: 0.58rem;
          font-size: 0.26rem;
          color: #b1b1b1;
          width: 100%;
          padding-left: 0.76rem;
          padding-right: 0.28rem;
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
    }
  }
</style>
