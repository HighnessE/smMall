/**
* Created by wolfsheller on 2017/3/24.
* 优惠券模块组件
*/
<template>
  <section class="couponodule" @click="showConfirm(oindex)">
    <img class="couponbg" :src=couponbg alt="">
    <div class="partwrap">
      <div class="leftpart">
        <div>
          <p class="price1">￥</p>
          <p class="price2">{{ couponmodule.money }}</p>
        </div>
        <p class="price3">抵扣券</p>
      </div>
      <div class="rightpart">
        <p class="condition">{{ couponmodule.title }}优惠券</p>
        <p class="describe">在线支付专享</p>
        <p class="deadline">有效期至{{ couponmodule.deadline[0] }}年{{ couponmodule.deadline[1] }}月{{
          couponmodule.deadline[2] }}日</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      couponmodule: Object,
      oindex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        couponbg: 'static/img/center/wallet/couponbg.png'
      }
    },
    methods: {
      showConfirm (oindex) {
        this.$store.commit('showConfirm', oindex)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .couponodule {
    position: relative;
    /*border-color: transparent;*/
    /*border-style: solid;*/
    /*border-width: 0.29rem 0.43rem;*/
    /*border-image: url(../../../static/img/center/wallet/couponborder.png) 29 43;*/
    height: 1.94rem;
    width: 80%;
    min-width: 6rem;
    max-width: 8.28rem;
    margin: 0 auto 0.5rem;
    .couponbg {
      width: 100%;
      height: 100%;
    }
    .partwrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /*background: #f1dbb4;*/
      height: 1.36rem;
      width: 4.8rem;
      display: flex;
      .leftpart {
        width: 40%;
        color: #f65435;
        box-sizing: border-box;
        border-right: 0.01rem solid #d7af68;
        text-align: center;
        div {
          margin-top: 0.2rem;
          height: 0.9rem;
          font-size: 0;
          .price1 {
            display: inline-block;
            font-size: 0.32rem;
            line-height: 0.32rem;
            margin-left: -0.2rem;
            margin-right: 0.05rem;
          }
          .price2 {
            display: inline-block;
            font-size: 0.9rem;
            line-height: 0.9rem;
          }
        }
        .price3 {
          margin-right: 0.18rem;
          text-align: right;
          font-size: 0.22rem;
          color: #9a8261;
        }
      }
      .rightpart {
        width: 60%;
        color: #9a8261;
        margin-left: 0.28rem;
        .condition {
          font-size: 0.32rem;
          line-height: 0.48rem;
        }
        .describe {
          margin-top: 0.24rem;
          font-size: 0.22rem;
        }
        .deadline {
          margin-top: 0.16rem;
          font-size: 0.22rem;
        }
      }
    }
  }
</style>

