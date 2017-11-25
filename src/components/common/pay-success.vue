/**
* Created by wolfsheller on 2017/5/4.
* xxx组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="paysuccess">
      <div class="paystatus">
        <img src="../../assets/packimg/paysuc.png" alt="">
        <span>支付成功！</span>
      </div>
      <div class="payinfo">
        <h3>￥{{ payinfo.money }}</h3>
        <h4><span class="gettitle">收款方：</span><span class="getmer">{{ payinfo.merchant }}</span></h4>
      </div>
    </div>
    <button class="completebtn" @click="clickRouter">完成</button>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from './myheader'
  export default {
    components: {
      myHeader
    },
    data () {
      return {
        headeritem: '支付成功',
        payinfo: {
          money: 0,
          merchant: ''
        }
      }
    },
    methods: {
      clickRouter () {
        let gotoRouter = this.$store.state.confirmdirect
        this.$store.state.coupon.ifpayway = false
        location.href = gotoRouter
      }
    },
    created () {
      this.payinfo.money = parseFloat(this.$store.state.confirmmoney).toFixed(2)
      this.payinfo.merchant = this.$store.state.confirmmerchant
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .paysuccess {
    margin-top: 0.8rem;
    padding-top: 1.4rem;
    text-align: center;
    .paystatus {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 0.64rem;
        width: 0.64rem;
        display: block;
        margin-right: 0.3rem;
      }
      span {
        color: #fb8800;
        font-size: 0.42rem;
        line-height: 0.64rem;
      }
    }
    .payinfo {
      margin-top: 0.88rem;
      color: #40484e;
      h3 {
        font-size: 0.72rem;
      }
      h4 {
        margin-top: 0.36rem;
        font-size: 0.3rem;
        .gettitle {
          color: #919191;
        }
        .getmer {
          color: #40474e;
        }
      }
    }
  }
  .completebtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #26dac3;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 1.4rem auto 0;
  }

  .completebtn:active {
    background: #28cab5;
  }
</style>
