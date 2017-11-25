/**
* Created by wolfsheller on 2017/3/29.
* 提示型弹窗组件
*/
<template>
    <section class="tipswrap">
      <div class="tipspopup">
        <div class="menupart">
          <p class="tipstitle">{{ tipswrap.tipstitle }}</p>
          <p class="tipsinfo">{{ tipswrap.tipsinfo }}</p>
        </div>
        <div class="mainpart" @click="closetipswrap">{{ tipsconfirm }}</div>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tipswrap: {
        type: Object
      },
      tipsconfirm: {
        type: String,
        default: '知道了'
      }
    },
    methods: {
      closetipswrap () {
        this.$emit('change-iftips', false)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .tipswrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .tipspopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      height: 3rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      font-size: 0.28rem;
      text-align: center;
      .menupart {
        height: 1.84rem;
        border-bottom: 0.01rem solid #e7e7e7;
        padding-top: 0.44rem;
        box-sizing: border-box;
        .tipstitle {
          line-height: 0.58rem;
          color: #333;
          font-size: 0.34rem;
        }
        .tipsinfo {
          font-size: 0.28rem;
          margin-top: 0.12rem;
          line-height: 0.4rem;
          color: #919191;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 1.16rem;
      }
    }
  }
</style>
