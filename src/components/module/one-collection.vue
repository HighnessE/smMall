/**
* Created by wolfsheller on 2017/3/8.
* 单个收藏组件
*/
<template>
  <section class="singlecollect">
    <router-link class="imgpart" :to="{ path: '/mall/details', query: {gid: collectitems.id} }" tag="div">
      <img :src=collectitems.mainpic alt="">
    </router-link>
    <div class="infopart">
      <router-link class="topline" :to="{ path: '/mall/details', query: {gid: collectitems.id} }" tag="div">
        {{ collectitems.name }}
      </router-link>
      <div class="bottomline">
        <div class="priceline">
          <span class="smallprice">￥</span>
          <span class="bigprice">{{ collectitems.price }}</span>
          <span class="coupon">优惠券可抵用{{ collectitems.coupon }}元</span>
        </div>
        <div class="handleline">
          <button class="addshopcar" @click="showPanel"><img :src=shopcar alt=""></button>
          <button class="deletebtn" @click="deleteCollect">删除</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      collectitems: Object
    },
    data () {
      return {
        shopcar: 'static/img/common/shopcar2.png'
      }
    },
    methods: {
      showPanel () {
        let gid = this.collectitems.id
        this.$emit('show-panel', gid)
      },
      deleteCollect () {
        let gid = this.collectitems.id
        this.$emit('delete-collect', gid)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .singlecollect {
    display: flex;
    /*padding-top: 0.24rem;*/
    padding-bottom: 0.24rem;
    padding-right: 0.3rem;
    background: #fff;
    .imgpart {
      width: 2.5rem;
      height: 2.5rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .infopart {
      width: 100%;
      margin-left: 0.18rem;
      padding-top: 0.24rem;
      flex-wrap: wrap;
      display: flex;
      align-content: space-between;
      .topline {
        width: 100%;
        font-size: 0.28rem;
        height: 1.22rem;
        color: #525252;
      }
      .bottomline {
        width: 100%;
        .priceline {
          display: flex;
          align-items: flex-end;
          .smallprice {
            font-size: 0.3rem;
            color: #ff3434;
          }
          .bigprice {
            font-size: 0.4rem;
            color: #ff3434;
          }
          .coupon {
            border-radius: 0.04rem;
            margin-left: 0.12rem;
            padding: 0 0.04rem;
            font-size: 0.2rem;
            color: #fff;
            background: #ff6816;
            display: block;
            height: 0.3rem;
            line-height: 0.3rem;
          }
        }
        .handleline {
          font-size: 0;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.28rem;
          button {
            background: #fff;
            height: 0.6rem;
            width: 1.18rem;
            border-radius: 0.06rem;
            text-align: center;
            img {
              height: 0.4rem;
            }
          }
          .addshopcar {
            border: 0.01rem solid #f59090;
          }
          .addshopcar:active {
            background: #ecc1c1;
          }
          .deletebtn {
            border: 0.01rem solid #959494;
            color: #474646;
            font-size: 0.24rem;
            margin-left: 0.22rem;
          }
          .deletebtn:active {
            background: #dedede;
          }
        }
      }
    }
  }
</style>
