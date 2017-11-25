/**
* Created by wolfsheller on 2017/3/6.
* 单个购物车组件
*/
<template>
  <div class="singlegoods">
    <div class="checkboxwrap">
      <div class="checkbox" @click="changeCheck(index)" v-if="ifcheckall">
        <img :src=circleactive alt="" v-if="shopcaritems.ifcheck">
        <img :src=circleimg alt="" v-else>
      </div>
      <div class="checkbox" @click="changeCheck2(index)" v-else>
        <img :src=circleactive alt="" v-if="shopcaritems.ifcheck">
        <img :src=circleimg alt="" v-else>
      </div>
    </div>
    <router-link class="goodsimg" :to="{ path: '/mall/details', query: { gid: shopcaritems.gid } }" tag="div">
      <img :src=shopcaritems.mainpic alt="">
    </router-link>
    <div class="goodsinfo">
      <router-link class="minor" :to="{ path: '/mall/details', query: { gid: shopcaritems.gid } }" tag="div">
        <p>{{ shopcaritems.name }}</p>
      </router-link>
      <div class="major">
        <div class="goodsprice">
          <span class="span1">￥</span>
          <span class="span2">{{ shopcaritems.price }}</span>
          <span class="span1"></span>
        </div>
        <div class="goodscount" v-if="shopcaritems.ifedit">
          <div @click="reduce(index)">－</div>
          <div>{{ shopcaritems.number }}</div>
          <div @click="increase(index)">＋</div>
        </div>
        <div class="ifcount" v-else>x {{ shopcaritems.number }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  export default {
    props: {
      shopcaritems: Object,
      index: Number,
      ifcheckall: Boolean
    },
    data () {
      return {
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png'
      }
    },
    methods: {
      ...mapMutations([
        'changeCheck',
        'changeCheck2',
        'increase',
        'reduce'
      ])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .singlegoods {
    height: 1.88rem;
    display: flex;
    padding: 0.22rem 0.24rem;
    background: #fff;
    border-bottom: 0.01rem solid #c8c8c8;
    .checkboxwrap {
      width: 0.7rem;
      display: flex;
      align-items: center;
      .checkbox {
        width: 0.4rem;
        margin-right: 0.28rem;
        img {
          width: 100%;
        }
      }
    }
    .goodsimg {
      height: 1.88rem;
      width: 1.88rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goodsimg:active {
      background: #ccc;
    }
    .goodsinfo {
      flex: 1;
      margin-left: 0.18rem;
      height: 1.88rem;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 100%;
      .minor {
        width: 100%;
        height: 1.38rem;
        p {
          width: 100%;
          font-size: 0.3rem;
          line-height: 0.36rem;
          color: #1f1f28;
        }
        .goodscolor, .goodssize {
          display: inline-block;
          color: #b4b4b4;
          margin-top: 0.2rem;
          font-size: 0.24rem;
        }
        .goodssize {
          display: inline-block;
          margin-left: 0.14rem;
        }
      }
      .major {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #2b2b2b;
        .goodsprice {
          color: #ff3b3b;
          .span1 {
            font-size: 0.22rem;
          }
          .span2 {
            font-size: 0.32rem;
          }
        }
        .goodscount {
          font-size: 0.32rem;
          display: flex;
          border: 0.01rem solid #d2d2d2;
          border-radius: 0.04rem;
          line-height: 0.5rem;
          div:nth-child(1) {
            padding-left: 0.14rem;
            padding-right: 0.14rem;
          }
          div:nth-child(2) {
            padding-left: 0.3rem;
            padding-right: 0.3rem;
            border-left: 0.01rem solid #d2d2d2;
            border-right: 0.01rem solid #d2d2d2;
          }
          div:nth-child(3) {
            padding-left: 0.14rem;
            padding-right: 0.14rem;
          }
        }
        .ifcount {
          font-size: 0.32rem;
          line-height: 0.5rem;
          color: #2b2b2b;
          padding-right: 0.14rem;
        }
      }
    }
  }
</style>
