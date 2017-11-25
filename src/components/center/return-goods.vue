/**
* Created by wolfsheller on 2017/3/15.
* 退换商品组件
*/
<template>
  <section>
    <server-header :headeritem="headeritem"></server-header>
    <ul class="content">
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[0] }}</span>
          <span>{{ orderitems.receipt_name }}</span>
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[1] }}</span>
          <input class="inputdiv" type="text" v-model="orderitems.wsn" name="return" placeholder="请填写物流单号">
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[2] }}</span>
          <span>{{ orderitems.sn }}</span>
        </div>
      </li>
      <li class="items">
        <div class="itemwrap">
          <span>{{ crossitems[3] }}</span>
          <input class="inputdiv" type="text" v-model="orderitems.content" name="return" placeholder="请填写退换原因">
        </div>
      </li>
      <p>请先点击右上方联系客服，退货成功后货款将自动退回
        您的钱包余额中</p>
    </ul>
    <a class="returnbtn" href="javascript:" @click="returnGood">提交</a>
    <wrap-tips v-if="iftips" :tipswrap="tipswrap" @change-iftips="changeIftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import serverHeader from 'components/common/server-header'
  import wrapTips from 'components/common/wrap-tips'
  export default {
    components: {
      serverHeader,
      wrapTips
    },
    data () {
      return {
        iftips: false,
        headeritem: '退换商品',
        crossitems: ['退货人：', '物流单号：', '订单编号：', '退换原因：'],
        orderitems: {
          oid: 0,
          receipt_name: '',
          wsn: '',
          sn: '',
          content: ''
        },
        tipswrap: {
          tipstitle: '您的退货申请已提交',
          tipsinfo: '退货状态可在我的订单中查看'
        }
      }
    },
    methods: {
      changeIftips () {
        this.iftips = false
        this.$router.go(-1)
      },
      returnGood () {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'refund',
          body: this.orderitems,
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
        let oid = location.href.split('=')[1]
        that.orderitems.oid = oid
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'getrefund',
          body: {
            oid: oid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data.orderitems
          that.orderitems.receipt_name = res.receipt_name
          that.orderitems.sn = res.sn
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
</style>
