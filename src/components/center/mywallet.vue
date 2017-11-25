/**
* Created by wolfsheller on 2017/3/15.
* 我的钱包组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="remain">
      <img :src=remainitems.imgsrc alt="">
      <p><span class="span1">账户余额：￥</span><span class="span2">{{ walletitems.wallet }}</span></p>
    </div>
    <div class="remainbody">
      <ul>
        <li v-for="(item, index) in remainitems.items">
          <router-link :to="{ path: item.url }">
            <cross-bar :crossitems=remainitems.items[index]>
              <img class="itemarrow" :src=remainitems.arrowsrc alt="">
            </cross-bar>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import crossBar from './crossbar'

  export default {
    components: {
      myHeader,
      crossBar
    },
    data () {
      return {
        headeritem: '我的钱包',
        remainitems: {
          'imgsrc': 'static/img/center/wallet/remainbg.png',
          'items': [
            {
              'title': '充值',
              'imgsrc': 'static/img/center/wallet/remain1.png',
              'url': '/center/wallet/recharge'
            },
            {
              'title': '申请提现',
              'imgsrc': 'static/img/center/wallet/remain2.png',
              'url': '/center/wallet/withdraw'
            },
            {
              'title': '提现记录',
              'imgsrc': 'static/img/center/wallet/remain3.png',
              'url': '/center/wallet/withdrawrecord'
            },
            {
              'title': '收支记录',
              'imgsrc': 'static/img/center/wallet/remain4.png',
              'url': '/center/wallet/paymentrecord'
            }
          ],
          'arrowsrc': 'static/img/common/rightarrow.png'
        },
        walletitems: {}
      }
    },
    created () {
      let that = this
      this.$http({
        method: 'get',
        url: global.Domain.centerUrl + 'wallet'
      }).then(function (response) {
        let res = response.data
        that.walletitems = res.walletitems
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .remain {
    position: relative;
    margin-top: 0.8rem;
    img {
      width: 100%;
    }
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      white-space: nowrap;
      .span1 {
        font-size: 0.28rem;
      }
      .span2 {
        font-size: 0.74rem;
      }
    }
  }

  .remainbody {
    width: 100%;
    ul {
      margin-top: 0.28rem;
      .itemarrow {
        margin-right: 0.36rem;
        height: 0.34rem;
      }
    }
  }
</style>
