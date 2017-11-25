/**
* Created by wolfsheller on 2017/4/27.
* 同城订单详情组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="orderdetail">
      <div class="menupart">
        <div class="useraddress">
          <div class="minor">
            <img :src=addressimg alt="">
          </div>
          <div class="major">
            <p class="userinfo">
              <span>{{ merordersitems.t_receipt_name }}</span>
              <span>{{ merordersitems.t_receipt_phone }}</span>
            </p>
            <p class="useraddr">{{ merordersitems.t_receipt_address }}</p>
          </div>
        </div>
        <div class="usermsg" v-if="ifusermsg">
          <p>买家留言：{{ merordersitems.t_remark }}</p>
        </div>
      </div>
      <one-merdetail :merordersitems="merordersitems"
                     :salleritems="salleritems"></one-merdetail>
      <div class="graybar"></div>
      <div class="serverpart" @click="contactServer">
        <img :src=serviceimg alt="">
        <span>联系商家客服</span>
      </div>
      <div class="subpart">
        <p>订单编号：{{ merordersitems.t_sn }}</p>
        <p>下单时间：{{ merordersitems.t_time }}</p>
      </div>
    </div>
    <wrap-servercode v-if="ifservercode" @close-servercode="closeServercode"></wrap-servercode>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneMerdetail from 'components/module/one-merdetail'
  import wrapServercode from 'components/common/wrap-servercode'

  export default {
    components: {
      myHeader,
      oneMerdetail,
      wrapServercode
    },
    data () {
      return {
        ifservercode: false,
        headeritem: '订单详情',
        ifusermsg: true,
        addressimg: 'static/img/common/position.png',
        serviceimg: 'static/img/common/service.png',
        merordersitems: {},
        salleritems: {}
      }
    },
    methods: {
      contactServer () {
        this.ifservercode = true
      },
      closeServercode () {
        this.ifservercode = false
      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'ordtail',
          body: {
            oid: this.$route.query.oid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.merordersitems = res.orderitems
          that.salleritems = res.salleritems
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #f5efe9 !important;
  }

  .orderdetail {
    background: #fff;
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 100%;
    bottom: 0;
    .menupart {
      border-bottom: 0.2rem solid #f6f6f6;
      .useraddress {
        display: flex;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ccc;
        .minor {
          width: 0.54rem;
          display: flex;
          align-items: center;
          img {
            width: 0.38rem;
            height: 0.44rem;
          }
        }
        .major {
          flex: 1;
          margin-left: 0.18rem;
          color: #49515c;
          font-size: 0.28rem;
          .userinfo {
            display: flex;
            justify-content: space-between;
            line-height: 0.38rem;
          }
          .useraddr {
            margin-top: 0.18rem;
            line-height: 0.38rem;
          }
        }
      }
      .usermsg {
        font-size: 0.28rem;
        color: #49515c;
        padding: 0.2rem;
        p {
          margin-left: 0.72rem;
          line-height: 0.38rem;
        }
      }
    }
    .graybar {
      height: 0.2rem;
      background: #f6f6f6;
    }
    .couponlist {
      padding: 0.2rem 0.26rem 0.04rem;
      background: #fff;
      li {
        font-size: 0.22rem;
        color: #919191;
        display: flex;
        justify-content: space-between;
        div {
          margin-bottom: 0.16rem;
        }
        .leftpartspan {
          margin-left: 0.22rem;
        }
      }
    }
    .serverpart {
      height: 0.84rem;
      border-bottom: 0.2rem solid #f6f6f6;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 0.26rem;
        color: #3f4853;
        margin-left: 0.1rem;
      }
    }
    .subpart {
      padding: 0.2rem;
      font-size: 0.24rem;
      color: #919191;
      line-height: 0.38rem;
    }
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  .popupinfo {
    font-size: 0.28rem;
    color: #919191;
    margin-top: 0.24rem;
    margin-bottom: 0.4rem;
    padding: 0 0.6rem;
    line-height: 0.4rem;
  }
</style>
