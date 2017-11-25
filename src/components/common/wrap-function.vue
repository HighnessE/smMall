/**
* Created by wolfsheller on 2017/3/29.
* 功能型弹窗组件
*/
<template>
  <section class="functionpopupwrap" @touchmove.stop.prevent>
    <div class="functionpopup">
      <div class="mainpart">
        <slot></slot>
      </div>
      <div class="handlepart">
        <button @click="confirm">{{ popupitems.affirmbtn }}</button>
        <button @click="closePopup">{{ popupitems.cancelbtn }}</button>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      popupitems: {
        type: Object
      }
    },
    data () {
      return {}
    },
    methods: {
      confirm () {
        this.$emit('confirm-btn', false)
      },
      closePopup () {
        this.$emit('close-popup', false)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .functionpopupwrap {
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    .functionpopup {
      width: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 0.12rem;
      overflow: hidden;
      max-width: 8.28rem;
      .mainpart {
        border-bottom: 0.01rem solid #adadad;
        text-align: center;
        padding-top: 0.56rem;
        /*.popuptitle {*/
          /*font-size: 0.36rem;*/
          /*color: #333;*/
          /*margin-bottom: 0.4rem;*/
        /*}*/
        /*.popupinfo {*/
          /*font-size: 0.28rem;*/
          /*color: #919191;*/
          /*margin-top: 0.24rem;*/
          /*margin-bottom: 0.4rem;*/
        /*}*/
      }
      .handlepart {
        font-size: 0;
        button {
          font-size: 0.32rem;
          color: #365aa4;
          width: 50%;
          border-right: 0.01rem solid #adadad;
          height: 1.16rem;
          background: #fff;
          box-sizing: border-box;
        }
        button:last-child {
          border-right: none;
          color: #333;
        }
      }
    }
  }
</style>
