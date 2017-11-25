/**
* Created by wolfsheller on 2017/4/22.
* 客服二维码弹窗组件
*/
<template>
  <section class="codewrap">
    <div class="codecontent">
      <div class="codemainbody">
        <p class="maintype">{{ serverinfo1 }}</p>
        <p class="subtype">{{ serverinfo2 }}</p>
        <div class="mainpart">
          <img :src=servercode alt="">
        </div>
        <a class="servercodebtn" href="javascript:" @click="closeServercode">好的</a>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      serverinfo1: {
        type: String,
        default: '您的申请已提交'
      },
      serverinfo2: {
        type: String,
        default: '长按下方客服二维码联系客服提现'
      }
    },
    data () {
      return {
        servercode: ''
      }
    },
    methods: {
      closeServercode () {
        this.$emit('close-servercode', false)
      }
    },
    created () {
      let that = this
      this.$http({
        method: 'get',
        url: global.Domain.centerUrl + 'customer'
      }).then(function (response) {
        let res = response.data
        that.servercode = res.codeitems
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
      background: #fff url('../../assets/packimg/codebg.png');
      background-size: 100% 100%;
      border-radius: 0.14rem;
      .codemainbody {
        width: 100%;
        height: 100%;
        padding: 0.42rem 0.33rem;
        box-sizing: border-box;
        .maintype {
          color: #2e2e2e;
          font-size: 0.28rem;
          line-height: 0.4rem;
          margin-bottom: 0.1rem;
        }
        .subtype {
          color: #2e2e2e;
          font-size: 0.28rem;
          line-height: 0.4rem;
          margin-bottom: 0.12rem;
        }
        .mainpart {
          width: 100%;
          img {
            width: 100%;
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
    margin: 0.44rem auto 0;
  }

  .couponbtn:active {
    background: #ea8b4b;
  }
</style>
