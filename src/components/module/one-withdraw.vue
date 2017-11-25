/**
* Created by wolfsheller on 2017/3/16.
* xxx组件
*/
<template>
  <section class="singlewithdraw">
    <div class="littlelogo"><img :src=withdrawimgsrc alt=""></div>
    <div class="main">
      <div class="mainpart">
        <p class="timestamp">{{ recorditems.applytime }}</p>
        <!--<p class="sn">-->
          <!--订单号：{{ recorditems.sn }}-->
        <!--</p>-->
        <p class="arrivetime" v-if="recorditems.iscash === '1'">通过时间：{{ recorditems.passtime }}</p>
      </div>
      <div class="sidepart">
        <p class="record">￥ {{ recorditems.money }}</p>
        <p class="waitverify" v-if="recorditems.iscash === '0'">待审核</p>
        <p class="passverify" v-if="recorditems.iscash === '1'">审核已通过</p>
        <p class="notpass" v-else-if="recorditems.iscash === '2'">审核未通过，详情请咨询客服</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      recorditems: Object,
      index: Number
    },
    data () {
      return {
        withdrawimgsrc: 'static/img/center/wallet/withdraw.png'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .singlewithdraw {
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
        .timestamp {
          font-size: 0.28rem;
          line-height: 0.44rem;
          color: #49515c;
        }
        .sn {
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
        .arrivetime {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
      }
      .sidepart {
        text-align: right;
        .record {
          margin-top: 0.02rem;
          font-size: 0.36rem;
          color: #49515c;
          margin-right: 0.24rem;
        }
        .waitverify {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
        .passverify {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #919191;
        }
        .notpass {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #ff3600;
        }
      }
    }
  }
</style>
