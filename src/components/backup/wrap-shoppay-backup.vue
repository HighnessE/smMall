/**
* Created by wolfsheller on 2017/4/21.
* 优惠券支付组件
*/
<template>
  <section class="paywaywrap">
    <div class="paywappopup">
      <div class="selectway">
        <h4>选择支付方式</h4>
        <span @click="closepaywrap">&times;</span>
      </div>
      <div class="walletpay">
        <div class="leftpart" v-if="iffullbalance" @click="clickPayway(1)">
          <div class="selectbtn">
            <img :src=circleimg alt="">
          </div>
          <img class="waylogo" :src="payway1" alt="">
        </div>
        <div class="leftpart" v-else>
          <div class="selectbtn">
            <img :src="circleunable" alt="">
          </div>
          <img class="waylogo" :src="payway3" alt="">
        </div>
        <p class="balance" v-if="iffullbalance" @click="clickPayway(1)">（余额{{ walletitems }}元）</p>
        <p class="balance2" v-else>（余额不足）</p>
      </div>
      <div class="wxpay">
        <div class="leftpart" @click="clickPayway(2)">
          <div class="selectbtn">
            <img :src=circleimg alt="">
          </div>
          <img class="waylogo" :src="payway2" alt="">
        </div>
      </div>
    </div>
    <wrap-function :popupitems="popupitems" v-if="ifconfirmpay" @confirm-btn="confirmbtn" @close-popup="closepopup">
      <h4 class="popuptitle">您确认要支付吗</h4>
      <div class="popupinfo">请注意，使用我的钱包为支付方式，点击确定支付后将直接付款</div>
    </wrap-function>
  </section>
</template>

<script type="text/ecmascript-6">
  import wrapFunction from './wrap-function'
  export default {
    props: {
      // 实际需要支付的金额
      exactlypay: {
        type: Number
      },
      // 需要提交的订单信息
      orderinfo: {
        type: Object
      }
    },
    components: {
      wrapFunction
    },
    data () {
      return {
        circleimg: 'static/img/common/circle.png',
        circleunable: 'static/img/common/circle3.png',
        payway1: 'static/img/common/payway1.png',
        payway2: 'static/img/common/payway2.png',
        payway3: 'static/img/common/payway3.png',
        iffullbalance: true,
        ifconfirmpay: false,
        popupitems: {
          affirmbtn: '确定支付',
          cancelbtn: '取消支付'
        },
        walletitems: 0
      }
    },
    methods: {
      clickPayway (msg) {
        if (msg === 1) {
          this.ifconfirmpay = true
        } else if (msg === 2) {
          // 使用微信支付
          this.orderinfo.pay = 1
          this.orderinfo.total = this.exactlypay
          this.$http({
            method: 'post',
            url: global.Domain.mallUrl + 'pay',
            body: this.orderinfo,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            console.log(JSON.stringify(res))
            if (res.pass === 1) {
              location.href = res.url
            }
          })
        }
      },
      // 确认使用钱包余额支付
      confirmbtn () {
        this.orderinfo.pay = 2
        this.orderinfo.total = this.exactlypay
        console.log(this.orderinfo.total)
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'pay',
          body: this.orderinfo,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          console.log(JSON.stringify(res))
          if (res.pass === 1) {
            location.href = res.url
          }
        })
      },
      closepopup () {
        this.ifconfirmpay = false
      },
      closepaywrap () {
        this.$emit('close-paywrap', false)
      },
      // 查询当前钱包余额
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'wallet'
        }).then(function (response) {
          let res = response.data
          that.walletitems = res.walletitems.wallet
          if (that.exactlypay > that.walletitems) {
            that.iffullbalance = false
          }
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .paywaywrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .paywappopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 94%;
      max-width: 8.28rem;
      height: 4.3rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      font-size: 0.28rem;
      overflow: hidden;
      .selectway {
        height: 1.36rem;
        border-bottom: 0.01rem solid #eaeaea;
        background: #f1f5ef;
        padding-left: 0.6rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        h4 {
          color: #333;
          font-size: 0.34rem;
          line-height: 1.35rem;
        }
        span {
          font-size: 0.8rem;
          margin-right: 0.2rem;
          color: #999;
        }
      }
      .walletpay, .wxpay {
        height: 1.44rem;
        display: flex;
        justify-content: space-between;
        .leftpart {
          flex: 1;
          display: flex;
          align-items: center;
          .selectbtn {
            margin-left: 0.4rem;
            width: 0.32rem;
            height: 0.32rem;
            img {
              width: 100%;
              display: block;
            }
          }
          .waylogo {
            margin-left: 0.3rem;
            width: 2.48rem;
          }
        }
        .balance {
          line-height: 1.58rem;
          padding-right: 0.16rem;
          color: #919191;
        }
        .balance2 {
          line-height: 1.58rem;
          padding-right: 0.16rem;
          color: #bebebe;
        }
      }
      .walletpay:active, .wxpay:active {
        background: #f6f6f6;
      }
    }
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  .popupinfo {
    font-size: 0.28rem;
    color: #919191;
    margin-top: 0.24rem;
    margin-bottom: 0.4rem;
    padding: 0 0.6rem;
    line-height: 0.4rem;
  }
</style>
