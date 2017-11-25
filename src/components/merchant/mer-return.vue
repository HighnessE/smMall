/**
* Created by wolfsheller on 2017/3/15.
* 退换商品组件
*/
<template>
  <section>
    <header>
      <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
      <h2>{{ headeritem }}</h2>
      <div class="returnindex" @click="contactServer">
        <div><img :src=service alt=""></div>
        <p>联系商家</p>
      </div>
    </header>
    <ul class="content">
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[0] }}</span>
          <span>{{ orderitems.bname }}</span>
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[1] }}</span>
          <span>{{ orderitems.t_receipt_name }}</span>
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[2] }}</span>
          <input class="inputdiv" type="text" v-model="submitobj.wsn" name="return" placeholder="请填写物流单号">
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[3] }}</span>
          <span>{{ orderitems.t_sn }}</span>
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[4] }}</span>
          <input class="inputdiv" type="text" v-model="submitobj.content" name="return" placeholder="请填写退货原因">
        </div>
      </li>
      <p>请先点击右上方联系客服，退货成功后货款将自动退回
        您的钱包余额中</p>
    </ul>
    <a class="returnbtn" href="javascript:" @click="returnGood">提交</a>
    <wrap-tips v-if="iftips" :tipswrap="tipswrap" @change-iftips="changeIftips"></wrap-tips>
    <section class="codewrap" v-if="ifservercode">
      <div class="codecontent">
        <img class="codebg" :src=codebg2 alt="">
        <div class="codemainbody">
          <p class="maintype">{{ serverinfo }}</p>
          <div class="mainpart">
            <img :src=orderitems.code alt="">
          </div>
          <a class="servercodebtn" href="javascript:" @click="closeServercode">好的</a>
        </div>
      </div>
    </section>
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
  import wrapTips from 'components/common/wrap-tips'
  export default {
    components: {
      wrapTips
    },
    data () {
      return {
        iftips: false,
        headeritem: '退换商品',
        crossitems: ['货品所属商家：', '退货人：', '物流单号：', '订单编号：', '退换原因：'],
        orderitems: {
          bname: '',
          t_receipt_name: '',
          t_sn: '',
          code: ''
        },
        tipswrap: {
          tipstitle: '您的退货申请已提交',
          tipsinfo: '退货状态可在我的订单中查看'
        },
        ifservercode: false,
        service: 'static/img/common/service.png',
        leftarrow: 'static/img/common/leftarrow.png',
        codebg2: 'static/img/common/codebg2.png',
        serverinfo: '长按下方客服二维码联系客服',
        submitobj: {
          oid: 0,
          wsn: '',
          content: ''
        },
        ifverify: false
      }
    },
    methods: {
      closeVerify () {
        this.ifverify = false
      },
      closeServercode () {
        this.ifservercode = false
      },
      contactServer () {
        this.ifservercode = true
      },
      goback () {
        this.$router.go(-1)
      },
      changeIftips () {
        this.iftips = false
        this.$router.go(-1)
      },
      returnGood () {
        let that = this
        if (!this.submitobj.wsn) {
          this.verifyinfo = '请填写物流单号'
          this.ifverify = true
          return
        }
        if (!this.submitobj.content) {
          this.verifyinfo = '请填写退货原因'
          this.ifverify = true
          return
        }
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'refund',
          body: this.submitobj,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res === 1) {
            that.iftips = true
          }
        })
      },
      getDataFromBackend () {
        let that = this
        let oid = this.$route.query.oid
        that.orderitems.oid = oid
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'getrefund',
          body: {
            oid: oid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data.orderitems
          that.orderitems = res
          that.submitobj.oid = oid
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
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

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    background: #eaeaea;
    display: flex;
    text-align: center;
    align-items: center;
    border-bottom: 0.01rem solid #e5e5e5;
    z-index: 10;
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
    .leftarrow {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    .returnindex {
      width: 15%;
      font-size: 0.22rem;
      color: #4c5660;
      img {
        height: 0.34rem;
      }
    }
  }

  .content {
    margin-top: 0.8rem;
    .items {
      border-bottom: 0.01rem solid #e0e0e0;
      height: 100%;
      .itemwrap {
        height: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        span {
          margin-left: 0.34rem;
          line-height: 1.08rem;
          font-size: 0.3rem;
          color: #5e5e5e;
        }
        span:first-child {
          color: #535353;
        }
        span:last-child {
          flex: 1;
          margin-left: 0.24rem;
          margin-right: 0.24rem;
          font-size: 0.3rem;
          color: #262626;
        }
        .inputdiv {
          flex: 1;
          margin: 0.1rem 0.24rem 0.1rem 0.34rem;
          font-size: 0.32rem;
          line-height: 0.42rem;
          color: #262626;
          min-height: 0.32rem;
          padding: 0.04rem;
          outline: 0;
          word-wrap: break-word;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
    p {
      margin: 0.1rem 0.34rem;
      font-size: 0.28rem;
      color: #535353;
      line-height: 0.48rem;
    }
  }

  .returnbtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ef4949;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.5rem auto;
  }

  .returnbtn:active {
    background: #cc4040;
  }

  .codewrap {
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    .codecontent {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      max-width: 8.28rem;
      min-height: 7.68rem;
      background: #fff;
      border-radius: 0.14rem;
      .codebg {
        width: 100%;
        height: 100%;
      }
      .codemainbody {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0.42rem 0.33rem;
        box-sizing: border-box;
        .maintype {
          color: #2e2e2e;
          font-size: 0.32rem;
          line-height: 0.5rem;
          margin-bottom: 0.3rem;
        }
        .mainpart {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .subpart {
          margin-top: 0.24rem;
          font-size: 0.24rem;
          color: #888888;
          text-align: center;
          line-height: 0.34rem;
        }
      }
    }
  }

  .servercodebtn {
    display: block;
    width: 90%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ff8a00;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.54rem auto 0;
  }

  .couponbtn:active {
    background: #ea8b4b;
  }
</style>
