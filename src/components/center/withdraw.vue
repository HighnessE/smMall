/**
* Created by wolfsheller on 2017/3/15.
* 申请提现组件
*/
<template>
  <section>
    <server-header :headeritem="headeritem"></server-header>
    <div class="maincontent">
      <div class="withdraw">
        <div class="mainpart">
          <p>账户余额：<span class="balance">￥{{ wallet }}</span></p>
        </div>
        <div class="mainpart">
          <label for="withdraw">提现金额：￥</label>
          <input type="text" id="withdraw" placeholder="请输入提现金额" v-model="withdraw" @keyup="inputChange"
                 autocomplete="off">
        </div>
        <p class="subpart">提现须知</p>
        <p class="subpartline">
          <img :src="circle" alt="">
          每天限提现{{ listitems.num }}次，每次最高提现金额{{ listitems.money }}元
        </p>
        <p class="subpartline">
          <img :src="circle" alt="">
          点击立即提现按钮弹出客服二维码，添加客服好友。提现操作会在{{ listitems.day }}天内完成审核，后台审核通过后，将由客服发红包给您哦
        </p>
      </div>
      <div class="notwithdrawbox" v-if="ifcheckmoney">
        <a class="withdrawbtn" href="javascript:" @click="submutWithdraw">立即提现</a>
        <p class="withdrawinfo">您今天的提现次数还剩{{ listitems.cash }}次</p>
      </div>
      <div class="notwithdrawbox" v-else>
        <a class="notwithdraw" href="javascript:">立即提现</a>
        <p class="withdrawinfo">您今天的提现次数已用完</p>
      </div>
    </div>
    <wrap-tips :tipswrap="tipswrap" v-if="iftips" @change-iftips="changeiftips"></wrap-tips>
    <withdraw-servercode v-if="ifservercode" @close-servercode="closeServercode"></withdraw-servercode>
    <wrap-verify v-if="ifverify"
                 :verifyinfo="verifyinfo"
                 @close-verify="closeVerify"></wrap-verify>
  </section>
</template>

<script type="text/ecmascript-6">
  import serverHeader from 'components/common/server-header'
  import wrapTips from 'components/common/wrap-tips'
  import withdrawServercode from './withdraw-servercode'

  export default {
    components: {
      serverHeader,
      wrapTips,
      withdrawServercode
    },
    data () {
      return {
        ifservercode: false,
        ifcheckmoney: true,
        ifverify: false,
        verifyinfo: '提现失败',
        headeritem: '申请提现',
        iftips: false,
        circle: 'static/img/common/circle.png',
        tipswrap: {
          tipstitle: '请输入正确的提现金额',
          tipsinfo: '（正确格式为纯数字）'
        },
        wallet: 0.00,
        withdraw: '',
        listitems: {}
      }
    },
    methods: {
      closeVerify () {
        this.ifverify = false
      },
      submutWithdraw () {
        let that = this
        let getcash = this.withdraw
        if (!/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(getcash)) {
          that.tipswrap = {
            tipstitle: '请输入正确的提现金额',
            tipsinfo: '（正确格式为纯数字）'
          }
          that.iftips = true
        } else {
          if (getcash <= this.listitems.money) {
            that.$http({
              method: 'post',
              url: global.Domain.centerUrl + 'getcash',
              body: {
                money: getcash
              },
              emulateJSON: true
            }).then(function (response) {
              let res = response.data
              if (res === 1) {
                this.ifservercode = true
              } else {
                this.ifverify = true
              }
            })
          } else {
            that.tipswrap = {
              tipstitle: '请输入正确的提现金额',
              tipsinfo: '（提现金额应小于最高提现金额）'
            }
            that.iftips = true
          }
        }
      },
      changeiftips (msg) {
        this.iftips = msg
      },
      closeServercode () {
        this.ifservercode = false
        this.$router.push({ path: '/center/wallet/withdrawrecord' })
      },
      inputChange (event) {
        // 判断只能输入数字，首字符不能为.，小数最多为2位
        let ecode = event.keyCode || event.which
        let balancestr = this.withdraw
        if (balancestr.indexOf('0') === 0 && balancestr.length >= 2) {
          if (balancestr.indexOf('.') !== 1) {
            this.withdraw = balancestr.substr(0, balancestr.length - 1)
          }
        }
        if (ecode === 190) {
          if (balancestr.indexOf('.') === 0) {
            this.withdraw = balancestr.substr(0, balancestr.length - 1)
            return
          }
          if ((balancestr.indexOf('.') > 0) && (balancestr.lastIndexOf('.') > 0) && (balancestr.indexOf('.') !== balancestr.lastIndexOf('.'))) {
            this.withdraw = balancestr.substr(0, balancestr.length - 1)
            return
          }
        }
        if (ecode !== 37 && ecode !== 39 && ecode !== 8) {
          if (!(ecode === 190 || (ecode >= 48 && ecode <= 57))) {
            this.withdraw = balancestr.substr(0, balancestr.length - 1)
            return
          }
        }
        if ((balancestr.indexOf('.') > 0) && (balancestr.split('.')[1].length > 2)) {
          this.withdraw = balancestr.substr(0, balancestr.length - 1)
        }
      },
      checkMoney (newvalue) {
        if (newvalue > parseFloat(this.wallet)) {
          this.withdraw = this.wallet
        }
      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'wallet'
        }).then(function (response) {
          let res = response.data
          that.wallet = res.walletitems.wallet
          that.$http({
            method: 'get',
            url: global.Domain.centerUrl + 'cash'
          }).then(function (response) {
            that.listitems = response.data.listitems
            console.log(JSON.stringify(that.listitems))
            if (that.listitems.cash === 0) {
              that.ifcheckmoney = false
            }
          })
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    watch: {
      withdraw: 'checkMoney'
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #eaeaea !important;
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }

  .maincontent {
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    .withdraw {
      padding: 0.64rem 0.4rem 0;
      .mainpart {
        display: flex;
        color: #49515c;
        font-size: 0.34rem;
        p {
          margin-bottom: 0.3rem;
          .balance {
            color: #f65435;
          }
        }
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
      .subpart {
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #919191;
        margin-top: 0.28rem;
      }
      .subpartline {
        line-height: 0.4rem;
        img {
          width: 0.18rem;
          height: 0.18rem;
          border-radius: 50%;
          margin-right: 0.04rem;
        }
        font-size: 0.24rem;
        color: #919191;
        margin-top: 0.14rem;
      }
    }
  }

  .notwithdrawbox {
    width: 70%;
    margin: 0.7rem auto 0;
    .notwithdraw {
      display: block;
      width: 100%;
      text-align: center;
      padding-left: 0.21rem;
      padding-right: 0.21rem;
      border-radius: 0.1rem;
      background: #999;
      color: #fff;
      font-size: 0.3rem;
      height: 0.82rem;
      line-height: 0.82rem;
    }
    .withdrawbtn {
      display: block;
      width: 100%;
      text-align: center;
      padding-left: 0.21rem;
      padding-right: 0.21rem;
      border-radius: 0.1rem;
      background: #ff8a00;
      color: #fff;
      font-size: 0.3rem;
      height: 0.82rem;
      line-height: 0.82rem;
      margin: 0.68rem auto 0;
    }
    .withdrawinfo {
      text-align: center;
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #919191;
    }
  }

  .couponbtn:active {
    background: #ea8b4b;
  }
</style>
