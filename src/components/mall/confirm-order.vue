/**
* Created by wolfsheller on 2017/3/15.
* 确认订单组件（包括我的订单再次购买，我的收藏直接购买以及商品详情直接购买）
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
        <div class="orderinfo">
          <div class="orderimg"><img :src=gooditems.mainpic alt=""></div>
          <div class="orderright">
            <div class="orderfirst">
              <div class="goodname">{{ gooditems.name }}</div>
              <div>
                <div>￥ {{ gooditems.price }}</div>
                <div class="goodnum">x {{ gooditems.number }}</div>
              </div>
            </div>
            <div class="ordertotal">
              共 {{ gooditems.number }} 件合计 ￥ {{ gooditems.addup }}
            </div>
          </div>
        </div>
        <div class="graybar"></div>
        <router-link :to="{ path: '/mall/details/confirm/selectcoupon', query: { gid: gooditems.gid } }"
                     class="usecoupon">
          <div class="couponmsg" v-if="couponobj.ifusecoupon">
            已选择优惠券{{ couponobj.couponpiece }}张，共计<span class="redword">{{ couponobj.coupontotal }}元</span>
          </div>
          <div class="couponmsg" v-else>
            使用优惠券最高可抵扣 <span class="redword">{{ couponobj.totalcoupon }}元</span>
          </div>
          <div class="circle">
            <img :src=circleactive alt="" v-if="couponobj.ifusecoupon">
            <img :src=circleimg alt="" v-else>
          </div>
        </router-link>
        <div class="usefee">
          <h4>该物品所需运费：{{ gooditems.fee }}元</h4>
        </div>
        <div class="graybar"></div>
        <div class="buyermsg">
          <div>买家留言：</div>
          <div class="inputcontent">
            <input type="text" v-model="confirmobj.remark" placeholder="填写与商家协商一致的内容">
          </div>
        </div>
      </div>
      <div class="handlebar">
        <div class="exactlyinfo">
          <div class="exactlyprice">
            实付款：<span class="exactlyspan">￥{{ calculate }}元</span>
          </div>
          <div class="exactlycoupon">
            原总价{{ totalprice }}元，使用优惠{{ couponobj.coupontotal }}元
          </div>
        </div>
        <button class="submitorder" @click="submitorder">提交订单</button>
      </div>
    </div>
    <wrap-mallpay v-if="ifpayway"
                  @close-paywrap="closepaywrap"></wrap-mallpay>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapMallpay from 'components/mall/wrap-mallpay'
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    components: {
      myHeader,
      wrapMallpay
    },
    data () {
      return {
        ifpayway: false,
        headeritem: '确认订单',
        addressimg: 'static/img/common/position.png',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png'
      }
    },
    computed: {
      ...mapState({
        nowaddress: state => state.confirm.nowaddress,
        couponobj: state => state.confirm.couponobj,
        confirmobj: state => state.confirm.confirmobj,
        gooditems: state => state.confirm.gooditems,
        ifhasaddress: state => state.confirm.ifhasaddress,
        confirmaddressitems: state => state.confirm.confirmaddressitems
      }),
      ...mapGetters([
        'calculate',
        'totalprice'
      ])
    },
    methods: {
      ...mapMutations([
        'confirmpay'
      ]),
      gotocreateaddr () {
        this.$router.push({path: '/center/infomation/createaddress'})
      },
      submitorder () {
        this.confirmpay()
        this.ifpayway = true
      },
      closepaywrap () {
        this.ifpayway = false
      },
      getDataFromBackend () {
        let that = this
        let ogid = this.$route.query.gid
        let onumber = this.$route.query.number
        let ostatus = this.$route.query.status
        let oid = 0
        if (this.$route.query.id) {
          oid = this.$route.query.id
        }
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'ordsure',
          body: {
            gid: ogid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          res.gooditems.gid = ogid
          res.gooditems.number = onumber
          res.gooditems.addup = (onumber * parseFloat(res.gooditems.price)).toFixed(2)
          that.$store.state.confirm.couponobj.totalcoupon = onumber * parseFloat(res.gooditems.coupon)
          if (Object.keys(res.addressitems).length !== 0) {
            that.$store.state.confirm.ifhasaddress = false
            that.$store.state.confirm.nowaddress = res.addressitems
          } else {
            that.$store.state.confirm.ifhasaddress = true
          }
          that.$store.state.confirm.confirmobj.number = onumber
          that.$store.state.confirm.confirmobj.status = ostatus
          if (oid !== 0) {
            that.$store.state.confirm.confirmobj.gid = oid
          } else {
            that.$store.state.confirm.confirmobj.gid = ogid
          }
          that.$store.state.confirm.gooditems = res.gooditems
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
        font-size: 0.26rem;
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
          margin-top: 0.14rem;
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
        /*float: right;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-between;*/
        /*height: 0.92rem;*/
        /*padding: 0.16rem 0;*/
        /*box-sizing: border-box;*/
        /*margin-right: 0.26rem;*/
        /*.exactlyprice {*/
        /*font-size: 0.28rem;*/
        /*color: #555;*/
        /*.exactlyspan {*/
        /*color: #f05555;*/
        /*}*/
        /*}*/
        /*.exactlycoupon {*/
        /*font-size: 0.24rem;*/
        /*color: #8a8a8a;*/
        /*}*/
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
