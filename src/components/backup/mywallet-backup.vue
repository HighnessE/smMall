/**
* Created by wolfsheller on 2017/3/15.
* 我的钱包组件
*/
<template>
  <section>
    <simple-header>
      <div class="optionsselect">
        <div class="leftblock" :class="{ active:isactive }" @click="changeToRemain">我的余额</div>
        <div class="rightblock" :class="{ active:!isactive }" @click="changeToCoupon">我的优惠券</div>
      </div>
      <div slot="rightpart">
        <router-link :to="{ path: '/mall' }" slot="rightpart" tag="div">
          <img class="returnimg" :src=returnindex alt="">
        </router-link>
      </div>
    </simple-header>
    <div>
      <wallet-remain v-if="isactive"></wallet-remain>
      <wallet-coupon v-else class="walletcontent"></wallet-coupon>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import simpleHeader from 'components/common/simpleheader'
  import walletRemain from 'components/center/wallet-remain'
  import walletCoupon from 'components/center/wallet-coupon'

  export default {
    components: {
      simpleHeader,
      walletRemain,
      walletCoupon
    },
    data () {
      return {
        isactive: true,
        returnindex: 'static/img/common/returnindex.png'
      }
    },
    methods: {
      initialEvent () {
        let locationurl = window.location.href
        if (locationurl.split('?')[1] === 'wid=2') {
          this.isactive = false
        } else if (locationurl.split('?')[1] === 'wid=1') {
          this.isactive = true
        }
      },
      changeToRemain () {
        this.$router.push('/center/wallet?wid=1')
        this.isactive = true
      },
      changeToCoupon () {
        this.$router.push('/center/wallet?wid=2')
        this.isactive = false
      }
    },
    created () {
      this.initialEvent()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .returnimg {
    height: 0.38rem;
  }

  .optionsselect {
    height: 0.56rem;
    border: 0.02rem solid #fe2901;
    font-size: 0.24rem;
    background: #fff;
    line-height: 0.56rem;
    display: flex;
    width: 50%;
    border-radius: 0.06rem;
    margin: 0.1rem auto;
    div {
      display: block;
      flex: 1;
      color: #fe2901;
    }
    .active {
      background: #fe2901;
      color: #fff;
    }
  }

  .walletcontent {
    position: absolute;
    top: 1.47rem;
    width: 100%;
  }
</style>
