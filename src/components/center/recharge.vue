/**
* Created by wolfsheller on 2017/3/15.
* 充值组件
*/
<template>
  <section class="recharge">
    <header>
      <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
      <h2>{{ headeritem }}</h2>
    </header>
    <div class="centerhead">
      <img class="bghead" :src=centerhead.bgimgsrc alt="">
      <div class="msghead">
        <img :src=centerhead.headimg alt="">
        <p class="msgname">{{ centerhead.nickname }}</p>
      </div>
    </div>
    <div class="centerremain">
      <span>您的余额</span>
      <span>{{ walletitems.wallet }} 元</span>
    </div>
    <div class="bottomremain">
      <p>充值</p>
      <ul>
        <li v-for="(item, index) in btnitems">
          <button :class="{ active:btnstatus[index] }" @click="changeActive(index)">{{ item.number }}元</button>
        </li>
      </ul>
    </div>
    <a class="couponbtn" href="javascript:" @click="clickRecharge">立即充值</a>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        headeritem: '充值',
        centerhead: {
          headimg: '',
          nickname: '',
          bgimgsrc: 'static/img/center/recharge/headbg.png'
        },
        leftarrow: 'static/img/common/leftarrow2.png',
        walletitems: '',
        btnitems: [],
        btnstatus: [],
        activemoney: 0
      }
    },
    methods: {
      goback () {
        history.go(-1)
      },
      clickRecharge () {
        // 使用微信支付
        let bodydata = {
          rid: this.activemoney.id,
          money: this.activemoney.number
        }
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'deposit',
          body: bodydata,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res.pass === 1) {
            location.href = res.url
          }
        })
      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'wallet'
        }).then(function (response) {
          let res = response.data
          that.walletitems = res.walletitems
        })
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'recharge'
        }).then(function (response) {
          let res = response.data
          console.log(JSON.stringify(res))
          that.btnitems = res.rechargeitems
          for (let i of that.btnitems.keys()) {
            that.$set(that.btnstatus, i, false)
          }
          this.$http({
            method: 'get',
            url: global.Domain.centerUrl + 'code'
          }).then(function (response) {
            let res = response.data
            that.centerhead.headimg = res.codeitems.headimg
            that.centerhead.nickname = res.codeitems.nickname
          })
        })
      },
      changeActive (index) {
        for (let i = 0; i < this.btnitems.length; i++) {
          this.$set(this.btnstatus, i, false)
        }
        this.$set(this.btnstatus, index, true)
        this.activemoney = this.btnitems[index]
        console.log(JSON.stringify(this.activemoney))
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .recharge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    background: transparent;
    display: flex;
    text-align: center;
    align-items: center;
    z-index: 10;
    .leftarrow {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #fff;
    }
  }

  .centerhead {
    position: relative;
    .bghead {
      width: 100%;
    }
    .msghead {
      margin-top: 0.1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      img {
        border-radius: 50%;
        width: 1.38rem;
        height: 1.38rem;
      }
      .msgname {
        margin-top: 0.24rem;
        font-size: 0.28rem;
        color: #fff;
        text-align: center;
      }
    }
  }

  .centerremain {
    font-size: 0.36rem;
    color: #d54600;
    line-height: 0.92rem;
    height: 0.92rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.42rem;
    background: #fff;
    border-bottom: 0.2rem solid #f6f6f6;
  }

  .bottomremain {
    padding: 0.24rem 0.42rem 0;
    font-size: 0.36rem;
    color: #666;
    ul {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      li {
        width: 33.3%;
        text-align: center;
        button {
          border: 0.01rem solid #ff9a23;
          background: #fff;
          color: #d54600;
          width: 1.78rem;
          height: 0.92rem;
          font-size: 0.38rem;
          margin-top: 0.38rem;
        }
        button.active {
          background: #ff8a00;
          color: #fff;
        }
      }
    }
  }

  .couponbtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ff8a00;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.7rem auto;
  }

  .couponbtn:active {
    background: #ea8b4b;
  }
</style>
