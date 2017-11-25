/**
* Created by wolfsheller on 2017/4/28.
* xxx组件
*/
<template>
  <section class="">
    <div class="verifywrap">
      <div class="verifypopup">
        <div class="menupart">
          <p class="tipstitle">退货失败原因：</p>
          <p class="tipstitle2">{{ verifyinfo }}</p>
        </div>
        <div class="mainpart" @click="closeVerify">知道了</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      verifyinfo: {
        type: String,
        default: '支付失败'
      }
    },
    components: {},
    data () {
      return {}
    },
    methods: {
      closeVerify () {
        this.$emit('close-verify', false)
      }
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
        padding: 0.24rem 0.28rem;
        .tipstitle {
          line-height: 0.68rem;
          text-align: left;
          color: #333;
          font-size: 0.34rem;
          margin-bottom: 0.2rem;
        }
        .tipstitle2 {
          text-indent: 2em;
          text-align: left;
          line-height: 0.48rem;
          color: #333;
          font-size: 0.3rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }
</style>
