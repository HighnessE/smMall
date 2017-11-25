/**
* Created by wolfsheller on 2017/3/15.
* 同城商品确认订单组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="confirmorder">
      <div class="orderinfobox">
        <div class="ifhasaddress" v-if="ifhasaddress">
          <button class="newaddressbtn" @click="gotocreateaddr">新建地址</button>
        </div>
        <router-link class="useraddress" :to="{ path: '/mall/details/confirm/address' }" tag="div" v-else>
          <div class="minor">
            <img :src=addressimg alt="">
          </div>
          <div class="major">
            <p class="userinfo"><span>{{ nowaddress.name }}</span><span>{{ nowaddress.phone }}</span></p>
            <p class="useraddr">{{ nowaddress.partment }}{{ nowaddress.address }}</p>
          </div>
        </router-link>
        <div class="graybar"></div>
        <router-link class="merchantinfo"
                     :to="{ path: '/merchant/details', query: { bid: gooditems.bid } }"
                     tag="h4">
          {{ gooditems.bname }}
          <img :src=rightarrow alt="">
        </router-link>
        <div class="orderinfo">
          <div class="orderimg"><img :src=gooditems.t_mainpic alt=""></div>
          <div class="orderright">
            <div class="orderfirst">
              <div class="goodname">{{ gooditems.t_name }}</div>
              <div>
                <div>￥ {{ gooditems.t_price }}</div>
                <div class="goodnum">x {{ gooditems.number }}</div>
              </div>
            </div>
            <!--<div class="ordersecondline">-->
            <!--<span>颜色：{{ needorders.color }} 尺码: {{ needorders.size }}</span>-->
            <!--</div>-->
            <div class="ordertotal">
            共 {{ gooditems.number }} 件合计 ￥ {{ mercalculate }}
            </div>
          </div>
        </div>
        <div class="graybar"></div>
        <div class="buyermsg">
          <div>买家留言：</div>
          <div class="inputcontent">
            <input type="text" v-model="orderinfo.remark" placeholder="填写与商家协商一致的内容">
          </div>
        </div>
      </div>
      <div class="handlebar">
        <div class="exactlyinfo">
          <div class="exactlyprice">
            实付款：<span class="exactlyspan">￥{{ mercalculate }}元</span>
          </div>
        </div>
        <button class="submitorder" @click="submitorder">提交订单</button>
      </div>
    </div>
    <wrap-merchantpay v-if="ifpayway"
                      @close-paywrap="closepaywrap"></wrap-merchantpay>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapMerchantpay from './wrap-merchantpay'
  import {mapState, mapGetters} from 'vuex'

  export default {
    components: {
      myHeader,
      wrapMerchantpay
    },
    data () {
      return {
        ifpayway: false,
        headeritem: '确认订单',
        addressimg: 'static/img/common/position.png',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png',
        rightarrow: 'static/img/common/rightarrow.png'
      }
    },
    computed: {
      ...mapState({
        ifhasaddress: state => state.confirm.ifhasaddress,
        nowaddress: state => state.confirm.nowaddress,
        orderinfo: state => state.merchantpay.orderinfo,
        gooditems: state => state.merchantpay.gooditems,
        confirmaddressitems: state => state.confirm.confirmaddressitems
      }),
      ...mapGetters([
        'mercalculate'
      ])
    },
    methods: {
      gotocreateaddr () {
        this.$router.push({path: '/center/infomation/createaddress'})
      },
      submitorder () {
        let nowaddress = this.nowaddress
        this.$store.state.merchantpay.orderinfo.address = nowaddress.partment + nowaddress.address
        this.$store.state.merchantpay.orderinfo.name = nowaddress.name
        this.$store.state.merchantpay.orderinfo.phone = nowaddress.phone
        this.ifpayway = true
      },
      closepaywrap () {
        this.ifpayway = false
      },
      getDataFromBackend () {
        let that = this
        let gid = this.$route.query.gid
        let number = this.$route.query.number
        this.$store.state.merchantpay.orderinfo.gid = gid
        this.$store.state.merchantpay.orderinfo.number = number
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'ordsure',
          body: {
            gid: gid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          res.gooditems.gid = gid
          res.gooditems.number = number
          if (Object.keys(res.addressitems).length !== 0) {
            that.$store.state.confirm.ifhasaddress = false
            that.$store.state.confirm.nowaddress = res.addressitems
          } else {
            that.$store.state.confirm.ifhasaddress = true
          }
          that.$store.state.merchantpay.gooditems = res.gooditems
        })
      },
      checkValue () {
        if (!this.confirmaddressitems) {
          return false
        }
        for (let item of this.confirmaddressitems) {
          if (item.ifuseaddress) {
            return true
          }
        }
        return false
      }
    },
    created () {
      if (!this.checkValue()) {
        this.getDataFromBackend()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #eaeaea !important;
  }

  .graybar {
    height: 0.2rem;
  }

  .confirmorder {
    position: absolute;
    top: 0.8rem;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: #eaeaea;
    .orderinfobox {
      .useraddress {
        background: #fff;
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
      .useraddress:active {
        background: #f6f6f6;
      }
      .merchantinfo {
        background: #fff;
        height: 0.84rem;
        font-size: 0.3rem;
        color: #333;
        padding-left: 0.26rem;
        border-bottom: 0.01rem solid #838383;
        display: flex;
        align-items: center;
        img {
          height: 0.3rem;
          margin-left: 0.2rem;
        }
      }
      .merchantinfo:active {
        background: #f6f6f6;
      }
      .orderinfo {
        background: #fff;
        height: 1.58rem;
        font-size: 0;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ccc;
        display: flex;
        .orderimg {
          width: 1.58rem;
          height: 1.58rem;
          img {
            height: 1.58rem;
            width: 1.58rem;
          }
        }
        /*.orderright {*/
          /*position: relative;*/
          /*width: 100%;*/
          /*margin-left: 0.22rem;*/
          /*height: 1.58rem;*/
          /*.orderfirst {*/
            /*margin-left: 0.1rem;*/
            /*display: flex;*/
            /*justify-content: space-between;*/
            /*color: #2a2a2a;*/
            /*font-size: 0.26rem;*/
            /*line-height: 0.32rem;*/
            /*.goodname {*/
              /*flex: 1;*/
            /*}*/
            /*.goodnum {*/
              /*margin-top: 0.12rem;*/
              /*text-align: right;*/
            /*}*/
          /*}*/
          /*.ordertotal {*/
            /*position: absolute;*/
            /*right: 0;*/
            /*bottom: 0;*/
            /*font-size: 0.26rem;*/
          /*}*/
        /*}*/
        .orderright {
          position: relative;
          width: 100%;
          margin-left: 0.22rem;
          height: 1.58rem;
          .orderfirst {
            margin-left: 0.1rem;
            display: flex;
            justify-content: space-between;
            color: #2a2a2a;
            font-size: 0.26rem;
            line-height: 0.32rem;
            .goodname {
              flex: 1;
            }
            .goodnum {
              margin-top: 0.12rem;
              text-align: right;
            }
          }
          .ordertotal {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 0.26rem;
          }
        }
      }
      .usecoupon {
        height: 0.88rem;
        background: #fff;
        border-bottom: 0.01rem solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        .couponmsg {
          font-size: 0.26rem;
          line-height: 0.88rem;
          color: #494949;
          .redword {
            color: #e33636;
            font-size: 0.28rem;
          }
        }
        .circle {
          width: 0.44rem;
          img {
            width: 100%;
          }
        }
      }
      .usefee {
        height: 0.88rem;
        background: #fff;
        border-bottom: 0.01rem solid #e0e0e0;
        padding: 0 0.3rem;
        line-height: 0.88rem;
        font-size: 0.26rem;
        color: #494949;
      }
      .buyermsg {
        background: #fff;
        height: 0.88rem;
        display: flex;
        align-items: center;
        padding: 0 0.3rem;
        .inputcontent {
          flex: 1;
          input {
            width: 100%;
          }
        }
      }
    }
    .handlebar {
      width: 100%;
      height: 0.92rem;
      background: #fff;
      display: flex;
      .exactlyinfo {
        height: 0.92rem;
        flex: 1;
        text-align: right;
        margin-right: 0.4rem;
        .exactlyprice {
          line-height: 0.92rem;
          /*margin-top: 0.14rem;*/
          font-size: 0.3rem;
          color: #555;
          .exactlyspan {
            color: #f05555;
          }
        }
        .exactlycoupon {
          margin-top: 0.1rem;
          font-size: 0.24rem;
          color: #8a8a8a;
        }
      }
      .submitorder {
        width: 1.92rem;
        height: 0.92rem;
        background: #f05555;
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }

  .verifywrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .verifypopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      text-align: center;
      .menupart {
        border-bottom: 0.01rem solid #e7e7e7;
        box-sizing: border-box;
        .tipstitle {
          line-height: 1.28rem;
          color: #333;
          font-size: 0.34rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }

  .ifhasaddress {
    padding: 0.5rem 0;
    background: #fff;
    .newaddressbtn {
      display: block;
      width: 70%;
      text-align: center;
      padding-left: 0.21rem;
      padding-right: 0.21rem;
      border-radius: 0.1rem;
      background: #fff;
      color: #3f3853;
      border: 0.01rem solid #b4babe;
      font-size: 0.3rem;
      height: 0.82rem;
      line-height: 0.82rem;
      margin: 0 auto;
    }
    .newaddressbtn:active {
      background: #f6f6f6;
    }
  }
</style>
