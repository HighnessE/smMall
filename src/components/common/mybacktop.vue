/**
* Created by wolfsheller on 2017/3/2.
*/
<template>
  <transition name="back">
    <div class="backtop" @click=backtop v-show="ifshow">
      <img src="../../assets/packimg/backtop.png" alt="">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ifshow: false
      }
    },
    methods: {
      backtopshow () {
        if (document.body.scrollTop > window.screen.height) {
          this.ifshow = true
        } else {
          this.ifshow = false
        }
      },
      backtop () {
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = 0
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.backtopshow)
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .backtop {
    position: fixed;
    bottom: 1.4rem;
    right: 0.25rem;
    z-index: 10;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(138, 138, 138, 0.5);
    img {
      display: block;
      height: 0.34rem;
      width: 0.25rem;
    }
  }

  .back-enter, .back-leave-active {
    opacity: 0;
  }

  .back-enter-active, .back-leave-active {
    transition: opacity .5s;
  }
</style>
