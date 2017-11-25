/**
* Created by wolfsheller on 2017/3/15.
* 订单详情组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="orderdetail">
      <div class="menupart">
        <!--<router-link class="logistics" :to="{ path: '/center/orders/detail/logistics', query: { lid: 1 } }">-->
        <!--<div class="minor">-->
        <!--<img :src=logisticsimg alt="">-->
        <!--</div>-->
        <!--<div class="major">-->
        <!--<p class="address">在广东广州海珠区大学城格式进行签收扫描，快件已被签收</p>-->
        <!--<p class="time">2016-11-29 21:09:30</p>-->
        <!--</div>-->
        <!--<div class="junior">-->
        <!--<img :src=rightarrow alt="">-->
        <!--</div>-->
        <!--</router-link>-->
        <div class="useraddress">
          <div class="minor">
            <img :src=addressimg alt="">
          </div>
          <div class="major">
            <p class="userinfo">
              <span>{{ orderitems.receipt_name }}</span>
              <span>{{ orderitems.receipt_phone }}</span>
            </p>
            <p class="useraddr">{{ orderitems.receipt_address }}</p>
          </div>
        </div>
        <div class="usermsg" v-if="ifusermsg">
          <p>买家留言：{{ orderitems.remark }}</p>
        </div>
      </div>
      <one-order :orderitems="orderitems"></one-order>
      <div class="graybar" v-if="ifnocoupon"></div>
      <ul class="couponlist" v-if="ifnocoupon">
        <li v-for="item in orderitems.coupon">
          <div>
            <span>{{ item.category }}抵扣券</span>
            <span>{{ item.money }}元</span>
          </div>
          <div>
            <span class="leftpartspan">数量x{{ 1 }}</span>
          </div>
          <div>
            共{{ item.money }}元
          </div>
        </li>
      </ul>
      <div class="graybar"></div>
      <div class="serverpart" @click="contactServer">
        <img :src=serviceimg alt="">
        <span>联系客服</span>
      </div>
      <div class="subpart">
        <p>订单编号：{{ orderitems.sn }}</p>
        <p>下单时间：{{ orderitems.time }}</p>
      </div>
    </div>
    <wrap-servercode v-if="ifservercode" @close-servercode="closeServercode"></wrap-servercode>
    <wrap-function :popupitems="popupitems"
                   v-if="iforderpopup"
                   @confirm-btn="confirmbtn"
                   @close-popup="closepopup">
      <h4 class="popuptitle">{{ popupitems.title }}</h4>
      <div class="popupinfo">{{ popupitems.alert }}</div>
    </wrap-function>
    <wrap-payway :exactlypay="payinfo.total"
                 :orderinfo="orderinfo"
                 v-if="ifwaitpayway"
                 @close-paywrap="closepaywrap"></wrap-payway>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneOrder from 'components/module/one-order'
  import wrapServercode from 'components/common/wrap-servercode'
  import wrapFunction from 'components/common/wrap-function'
  import wrapPayway from 'components/mall/wrap-payway'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      myHeader,
      oneOrder,
      wrapServercode,
      wrapPayway,
      wrapFunction
    },
    data () {
      return {
        ifservercode: false,
        headeritem: '订单详情',
        ifusermsg: true,
        logisticsimg: 'static/img/common/logistics.png',
        rightarrow: 'static/img/common/rightarrow.png',
        addressimg: 'static/img/common/position.png',
        serviceimg: 'static/img/common/service.png',
        orderitems: {},
        ifnocoupon: true
      }
    },
    computed: {
      ...mapState({
        iforderpopup: state => state.order.iforderpopup,
        popupitems: state => state.order.popupitems,
        nowoid: state => state.order.nowoid,
        nowstatus: state => state.order.nowstatus,
        ifwaitpayway: state => state.order.ifwaitpayway,
        orderinfo: state => state.order.orderinfo
      })
    },
    methods: {
      ...mapMutations([
        'closepaywrap'
      ]),
      confirmbtn () {
        let that = this
        let oStatus = this.popupitems.status
        let bodydata = {
          oid: this.nowoid
        }
        let bodydata2 = {
          oid: this.nowoid,
          status: this.nowstatus
        }
        if (oStatus === 1) {
          // 确认收货
          this.$http({
            method: 'post',
            url: global.Domain.centerUrl + 'confirm',
            body: bodydata,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.order.iforderpopup = false
              this.$router.push('/center/orders')
            }
          })
        } else if (oStatus === 2) {
          // 取消订单
          this.$http({
            method: 'post',
            url: global.Domain.centerUrl + 'escorder',
            body: bodydata2,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.order.iforderpopup = false
              this.$router.push('/center/orders')
            }
          })
        } else if (oStatus === 3) {
          // 删除订单
          this.$http({
            method: 'post',
            url: global.Domain.centerUrl + 'delorder',
            body: bodydata,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.order.iforderpopup = false
              this.$router.push('/center/orders')
            }
          })
        }
      },
      closepopup () {
        this.$store.state.order.iforderpopup = false
      },
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
          url: global.Domain.centerUrl + 'ordtail',
          body: {
            oid: this.$route.query.oid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.orderitems = res.orderitems
          if (!that.orderitems.coupon) {
            that.ifnocoupon = false
          }
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
      /*.logistics {*/
      /*display: flex;*/
      /*padding: 0.2rem;*/
      /*align-items: center;*/
      /*border-bottom: 0.01rem solid #ccc;*/
      /*.minor {*/
      /*width: 0.54rem;*/
      /*display: flex;*/
      /*align-items: center;*/
      /*img {*/
      /*width: 0.54rem;*/
      /*height: 0.4rem;*/
      /*display: block;*/
      /*}*/
      /*}*/
      /*.major {*/
      /*flex: 1;*/
      /*margin-left: 0.18rem;*/
      /*.address {*/
      /*font-size: 0.28rem;*/
      /*color: #00773b;*/
      /*line-height: 0.4rem;*/
      /*}*/
      /*.time {*/
      /*color: #9a9a9a;*/
      /*font-size: 0.22rem;*/
      /*margin-top: 0.14rem;*/
      /*}*/
      /*}*/
      /*.junior {*/
      /*margin-left: 0.6rem;*/
      /*}*/
      /*}*/
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
