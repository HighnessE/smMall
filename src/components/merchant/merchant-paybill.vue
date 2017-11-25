/**
* Created by wolfsheller on 2017/4/23 0023.
* 同城买单组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="paybillbox">
      <h1>商家：{{ busname }}</h1>
      <div class="graybar"></div>
      <div class="mainpart">
        <label for="paybillinput">买单金额：￥</label>
        <input type="text"
               id="paybillinput"
               placeholder="请输入买单金额"
               v-model="paybill"
               @keyup="inputChange"
               autocomplete="off">
        <!--<p class="payinfo">请注意: 买单金额最小输入1元</p>-->
      </div>
      <div class="graybar"></div>
      <div class="paybillway">
        <div class="selectway">
          <h4>选择支付方式</h4>
        </div>
        <div class="walletpay">
          <div class="leftpart" v-if="iffullbalance" @click="clickPayway(1)">
            <div class="selectbtn">
              <img :src=circleactive alt="" v-if="ifselectwallet">
              <img :src=circleimg alt="" v-else>
            </div>
            <p class="waylogo">我的钱包</p>
          </div>
          <div class="leftpart" v-else>
            <div class="selectbtn">
              <img :src="circleunable" alt="">
            </div>
            <p class="waylogo2">我的钱包</p>
          </div>
          <p class="balance" v-if="iffullbalance" @click="clickPayway(1)">（余额{{ wallet }}元）</p>
          <p class="balance" v-else>（余额不足）</p>
        </div>
        <div class="wxpay">
          <div class="leftpart" @click="clickPayway(2)">
            <div class="selectbtn">
              <img :src=circleactive alt="" v-if="ifselectwx">
              <img :src=circleimg alt="" v-else>
            </div>
            <p class="waylogo">微信支付</p>
          </div>
        </div>
      </div>
      <div class="handlebar">
        <div class="exactlyinfo">
          <div class="exactlyprice">
            实付款：<span class="exactlyspan">￥{{ exactly }} 元</span>
          </div>
        </div>
        <button class="submitorder" @click="submitorder">立即支付</button>
      </div>
    </div>
    <wrap-function :popupitems="popupitems" v-if="ifconfirmpay" @confirm-btn="confirmbtn" @close-popup="closepopup">
      <h4 class="popuptitle">您确认要支付吗</h4>
      <div class="popupinfo">请注意，使用我的钱包为支付方式，点击确定支付后将直接付款</div>
    </wrap-function>
    <div class="verifywrap" v-if="ifverify">
      <div class="verifypopup">
        <div class="menupart">
          <p class="tipstitle">{{ verifyinfo }}</p>
        </div>
        <div class="mainpart" @click="closeVerify">好的</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapFunction from 'components/common/wrap-function'

  export default {
    components: {
      myHeader,
      wrapFunction
    },
    data () {
      return {
        headeritem: '门店买单',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png',
        circleunable: 'static/img/common/circle3.png',
        iffullbalance: true,
        ifconfirmpay: false,
        ifselectwallet: false,
        ifselectwx: false,
        popupitems: {
          affirmbtn: '确定支付',
          cancelbtn: '取消支付'
        },
        paybill: '',
        wallet: '',
        exactly: 0,
        payway: 0,
        verifyinfo: '',
        ifverify: false,
        busname: ''
      }
    },
    methods: {
      clickPayway (msg) {
        if (msg === 1) {
          this.pay = 1
          this.ifselectwallet = true
          this.ifselectwx = false
        } else if (msg === 2) {
          this.pay = 2
          this.ifselectwallet = false
          this.ifselectwx = true
        }
      },
      closeVerify () {
        this.ifverify = false
      },
      submitorder () {
        if (this.paybill === '') {
          this.verifyinfo = '请输入买单金额'
          this.ifverify = true
          return
        }
        if (this.pay === 0) {
          this.verifyinfo = '请选择支付方式'
          this.ifverify = true
          return
        }
        if (this.pay === 1) {
          this.ifconfirmpay = true
        } else if (this.pay === 2) {
          // 微信支付
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'pay',
            body: {
              type: 1,
              money: this.exactly,
              bid: this.$route.query.bid
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res.pass === 1) {
              location.href = res.url
            }
          })
        }
      },
      confirmbtn () {
        // 钱包支付
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'pay',
          body: {
            type: 2,
            money: this.exactly,
            bid: this.$route.query.bid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res.pass === 1) {
            that.$store.state.confirmdirect = res.url
            that.$store.state.confirmmoney = that.exactly
            that.$store.state.confirmmerchant = that.busname
            that.$router.push({ path: '/complete/pay' })
          }
        })
      },
      closepopup () {
        this.ifconfirmpay = false
      },
      inputChange (event) {
        // 判断只能输入数字，首字符不能为.和0，小数最多为2位
        let ecode = event.keyCode || event.which
        let balancestr = this.paybill
        if (balancestr.indexOf('0') === 0 && balancestr.length >= 2) {
          if (balancestr.indexOf('.') !== 1) {
            this.paybill = balancestr.substr(0, balancestr.length - 1)
          }
        }
        if (ecode === 190) {
          if (balancestr.indexOf('.') === 0) {
            this.paybill = balancestr.substr(0, balancestr.length - 1)
            return
          }
          if ((balancestr.indexOf('.') > 0) && (balancestr.lastIndexOf('.') > 0) && (balancestr.indexOf('.') !== balancestr.lastIndexOf('.'))) {
            this.paybill = balancestr.substr(0, balancestr.length - 1)
            return
          }
        }
        if (ecode !== 37 && ecode !== 39 && ecode !== 8) {
          if (!(ecode === 190 || (ecode >= 48 && ecode <= 57))) {
            this.paybill = balancestr.substr(0, balancestr.length - 1)
            return
          }
        }
        if ((balancestr.indexOf('.') > 0) && (balancestr.split('.')[1].length > 2)) {
          this.paybill = balancestr.substr(0, balancestr.length - 1)
        }
      },
      checkMoney (newvalue, oldvalue) {
        if (/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(newvalue) || newvalue === '') {
          if (newvalue === '') {
            this.exactly = 0
            return
          }
          this.exactly = newvalue
          if (newvalue > parseFloat(this.wallet)) {
            if (this.pay === 1) {
              this.pay = 0
              this.ifselectwallet = false
            }
            this.iffullbalance = false
          } else {
            this.iffullbalance = true
          }
        } else {
          this.paybill = oldvalue
        }
      },
      getDataFromBackend () {
        let that = this
        let obid = this.$route.query.bid
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'buslist',
          body: {
            bid: obid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.busname = res.nameitems
          that.$http({
            method: 'get',
            url: global.Domain.centerUrl + 'wallet'
          }).then(function (response) {
            let res = response.data
            that.wallet = res.walletitems.wallet
          })
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    watch: {
      paybill: 'checkMoney'
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #eaeaea !important;
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  .popupinfo {
    padding: 0 0.44rem;
    line-height: 0.44rem;
    font-size: 0.28rem;
    color: #919191;
    margin-top: 0.24rem;
    margin-bottom: 0.4rem;
  }

  .verifywrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .verifypopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      text-align: center;
      .menupart {
        border-bottom: 0.01rem solid #e7e7e7;
        box-sizing: border-box;
        .tipstitle {
          line-height: 1.28rem;
          color: #333;
          font-size: 0.34rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }

  .graybar {
    height: 0.14rem;
  }

  .paybillbox {
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #eaeaea;
    h1 {
      height: 1.12rem;
      background: #fff;
      font-size: 0.36rem;
      padding-left: 0.44rem;
      line-height: 1.12rem;
    }
    .mainpart {
      height: 1.32rem;
      background: #fff;
      color: #49515c;
      padding: 0 0.44rem;
      font-size: 0.28rem;
      height: 0.86rem;
      display: flex;
      align-items: center;
      label {
        font-size: 0.34rem;
        color: #49515c;
        line-height: 0.54rem;
      }
      input {
        flex: 1;
        width: 100%;
        border-bottom: 0.01rem solid #00a652;
        font-size: 0.34rem;
        color: #919191;
        padding: 0 0.18rem;
        line-height: 0.54rem;
        box-sizing: border-box;
      }
    }
    .paybillway {
      background: #fff;
      .selectway {
        height: 1.1rem;
        padding-left: 0.44rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        h4 {
          color: #333;
          font-size: 0.34rem;
          line-height: 1.1rem;
        }
      }
      .walletpay, .wxpay {
        height: 0.7rem;
        display: flex;
        padding-bottom: 0.14rem;
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
            font-size: 0.3rem;
          }
          .waylogo2 {
            margin-left: 0.3rem;
            font-size: 0.3rem;
            color: #919191;
          }
        }
        .balance {
          line-height: 0.86rem;
          padding-right: 0.44rem;
          color: #919191;
        }
      }
      .walletpay:active, .wxpay:active {
        background: #f6f6f6;
      }
    }
    .handlebar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.92rem;
      background: #fff;
      display: flex;
      .exactlyinfo {
        height: 0.92rem;
        flex: 1;
        text-align: right;
        margin-right: 0.4rem;
        .exactlyprice {
          line-height: 0.92rem;
          /*margin-top: 0.14rem;*/
          font-size: 0.3rem;
          color: #555;
          .exactlyspan {
            color: #f05555;
          }
        }
        .exactlycoupon {
          margin-top: 0.1rem;
          font-size: 0.24rem;
          color: #8a8a8a;
        }
        /*float: right;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-between;*/
        /*height: 0.92rem;*/
        /*padding: 0.16rem 0;*/
        /*box-sizing: border-box;*/
        /*margin-right: 0.26rem;*/
        /*.exactlyprice {*/
        /*font-size: 0.28rem;*/
        /*color: #555;*/
        /*.exactlyspan {*/
        /*color: #f05555;*/
        /*}*/
        /*}*/
        /*.exactlycoupon {*/
        /*font-size: 0.24rem;*/
        /*color: #8a8a8a;*/
        /*}*/
      }
      .submitorder {
        width: 1.92rem;
        height: 0.92rem;
        background: #f05555;
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }
</style>
