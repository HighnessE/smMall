/**
* Created by wolfsheller on 2017/3/16.
* 单个收支记录组件
*/
<template>
  <section class="singlepayment">
    <div class="littlelogo">
      <img :src=littlelogo.imgsrc1 alt="" v-if="recorditems.type === '1'">
      <img :src=littlelogo.imgsrc2 alt="" v-else-if="recorditems.type === '2'">
      <img :src=littlelogo.imgsrc3 alt="" v-else-if="recorditems.type === '3'">
      <img :src=littlelogo.imgsrc4 alt="" v-else-if="recorditems.type === '4'">
      <img :src=littlelogo.imgsrc5 alt="" v-else-if="recorditems.type === '5'">
      <img :src=littlelogo.imgsrc6 alt="" v-else="recorditems.type === '6'">
    </div>
    <div class="main">
      <div class="mainpart">
        <p class="title">{{ recorditems.destail }}</p>
        <p class="timestamp">{{ recorditems.time }}</p>
        <p class="ordernumber" v-if="recorditems.iforderinfo">
          订单号：{{ recorditems.ordernumber }}
        </p>
      </div>
      <div class="sidepart">
        <p class="record">{{ recorditems.value }}{{ recorditems.money }}</p>
        <p class="arrivetime" v-if="recorditems.ifarrivetime">到账时间：{{ recorditems.arrivetime }}</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      recorditems: Object
    },
    data () {
      return {
        littlelogo: {
          imgsrc1: 'static/img/center/wallet/payment1.png',
          imgsrc2: 'static/img/center/wallet/payment2.png',
          imgsrc3: 'static/img/center/wallet/payment3.png',
          imgsrc4: 'static/img/center/wallet/payment4.png',
          imgsrc5: 'static/img/center/wallet/payment5.png',
          imgsrc6: 'static/img/center/wallet/payment6.png'
        }
      }
    },
    created () {
      if (!this.recorditems.ordernumber) {
        this.recorditems.iforderinfo = false
      }
      if (!this.recorditems.arrivetime) {
        this.recorditems.ifarrivetime = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .singlepayment {
    padding: 0.2rem 0.24rem;
    border-bottom: 0.01rem solid #e0e0e0;
    background: #fff;
    display: flex;
    align-items: center;
    .littlelogo {
      margin-right: 0.28rem;
      img {
        display: block;
        width: 0.42rem;
      }
    }
    .main {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .mainpart {
        .title {
          font-size: 0.28rem;
          line-height: 0.44rem;
          color: #49515c;
        }
        .timestamp {
          font-size: 0.28rem;
          line-height: 0.44rem;
          color: #49515c;
        }
        .ordernumber {
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
      }
      .sidepart {
        text-align: right;
        .record {
          font-size: 0.36rem;
          line-height: 0.56rem;
          color: #49515c;
          margin-right: 0.24rem;
        }
        .arrivetime {
          margin-top: 0.32rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
      }
    }
  }
</style>
