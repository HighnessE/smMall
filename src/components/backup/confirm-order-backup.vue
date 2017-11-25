/**
* Created by wolfsheller on 2017/3/15.
* 确认订单组件(购物车购买专属)
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="confirmorder">
      <router-link class="useraddress"
                   :to="{ path: '/mall/details/confirm/address' }"
                   tag="div">
        <div class="minor">
          <img :src=addressimg alt="">
        </div>
        <div class="major">
          <p class="userinfo">
            <span>{{ nowaddress.name }}</span>
            <span>{{ nowaddress.phone }}</span>
          </p>
          <p class="useraddr">{{ nowaddress.partment }}{{ nowaddress.address }}</p>
        </div>
      </router-link>
      <div class="graybar"></div>
      <div v-for="(item, index) in orderinfolist">
        <div class="orderinfo">
          <div class="orderimg"><img :src=item.mainpic alt=""></div>
          <div class="orderright">
            <div class="orderfirstline">
              <span>{{ item.name }}</span>
              <span>￥ {{ item.price }}</span>
            </div>
            <div class="ordersecondline">
              <!--<span>颜色：{{ needorders.color }} 尺码: {{ needorders.size }}</span>-->
              <span>x {{ item.number }}</span>
            </div>
            <div class="ordertotal">
              共 {{ item.number }} 件合计 ￥ {{ item.addup }}
            </div>
          </div>
        </div>
        <router-link class="usecoupon"
                     :to="{ path: '/center/shopcar/confirm/selectcoupon', query: { gid: item.gid, cid: item.category, oindex: index  } }">
          <div class="couponmsg" v-if="item.goodcouponinfo.ifusecoupon">
            已选择优惠券{{ item.goodcouponinfo.couponpiece }}张，共计<span class="redword">{{ item.goodcouponinfo.coupontotal }}元</span>
          </div>
          <div class="couponmsg" v-else>
            使用优惠券最高可抵扣 <span class="redword">{{ item.goodcouponinfo.totalcoupon }}元</span>
          </div>
          <div class="circle">
            <img :src=circleactive alt="" v-if="item.goodcouponinfo.ifusecoupon">
            <img :src=circleimg alt="" v-else>
          </div>
        </router-link>
        <div class="usefee">
          <h4>该物品所需运费：{{ item.fee }}元</h4>
        </div>
        <div class="graybar"></div>
      </div>
      <div class="buyermsg">
        <div>买家留言：</div>
        <div class="inputcontent">
          <input type="text" v-model="remark" placeholder="填写与商家协商一致的内容">
        </div>
      </div>
      <div class="handlebar">
        <div class="exactlyinfo">
          <div class="exactlyprice">
            实付款：<span class="exactlyspan">￥{{ calculate }}元</span>
          </div>
          <div class="exactlycoupon">
            原总价{{ totallyprice }}元，使用优惠{{ coupontotal }}元
          </div>
        </div>
        <button class="submitorder" @click="submitorder">提交订单</button>
      </div>
    </div>
    <wrap-shoppay v-if="ifpayway" @close-paywrap="closepaywrap"></wrap-shoppay>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapShoppay from 'components/common/wrap-shoppay'
  import {mapState} from 'vuex'

  export default {
    components: {
      myHeader,
      wrapShoppay
    },
    data () {
      return {
        ifpayway: false,
        headeritem: '确认订单',
        addressimg: 'static/img/common/position.png',
        couponactive: 0,
        couponobj: {
          coupon: 10,
          ifusecoupon: false
        },
        remark: '',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png',
        ifusecoupon: false,
        coupontotal: 0
      }
    },
    computed: {
      calculate: function () {
//        return this.orderinfolist.price * this.orderinfolist.number + this.orderinfolist.fee - this.coupontotal
      },
      totallyprice: function () {
//        return this.orderinfolist.price * this.orderinfolist.number + this.orderinfolist.fee
      },
      ...mapState({
        orderinfolist: state => state.shopcar.orderinfolist,
        nowaddress: state => state.confirm.nowaddress,
        couponlist2: state => state.shopcar.couponlist2,
        goodcouponinfo: state => state.shopcar.goodcouponinfo
      })
    },
    methods: {
      submitorder () {
        this.ifpayway = true
      },
      closepaywrap () {
        this.ifpayway = false
      },
      getDataFromBackend () {
        let that = this
        let cid = this.$route.query.cid
        let bodydata = {
          status: 1,
          cid: cid.join(',')
        }
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'ordsure',
          body: bodydata,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          console.log(JSON.stringify(res))
          res.gooditems.map(function (item, newindex) {
            let cobj2 = {
              // 使用优惠券的张数
              couponpiece: 0,
              // 是否使用优惠券
              ifusecoupon: false,
              // 使用优惠券共多少面额
              coupontotal: 0,
              // 优惠券使用额度
              totalcoupon: parseFloat(item.coupon) * parseInt(item.number),
              // 使用的优惠券id
              coupon: [],
              // 对应的商品ID
              gid: 0,
              oindex: newindex
            }
            that.$store.state.shopcar.goodcouponinfo.push(cobj2)
            console.log('f' + JSON.stringify(that.goodcouponinfo))
            item.addup = parseFloat(parseInt(item.number) * parseFloat(item.price).toFixed(2))
            item.couponup = parseFloat(parseInt(item.number) * parseFloat(item.coupon).toFixed(2))
          })
          that.$http({
            method: 'get',
            url: global.Domain.centerUrl + 'mycoupon'
          }).then(function (response) {
            let respon = response.data
            let cateArr = []
            let cateArr2 = []
            let cateJson = {}
            for (let item of res.gooditems) {
              if (!cateJson[item.category]) {
                cateArr.push({
                  category: item.category,
                  cname: item.cname
                })
                cateJson[item.category] = 1
              }
            }
            for (let item1 of cateArr) {
              for (let item2 of respon.couponitems) {
                if (item1.category === item2.cid) {
                  item2.ifusecoupon = false
                  item2.ifbyotheruse = false
                  item2.cname = item1.cname
                  item2.deadline = item2.usetime.split('-')
                  cateArr2.push(item2)
                }
              }
              that.$store.state.shopcar.couponlist2.push({
                category: item1.category,
                cname: item1.cname,
                coupon: cateArr2
              })
            }
//            console.log(JSON.stringify(that.couponlist2))
          })
          that.$store.state.confirm.nowaddress = res.addressitems
          that.$store.state.shopcar.orderinfolist = res.gooditems
          console.log(JSON.stringify(that.goodcouponinfo))
          for (let item of that.goodcouponinfo) {
            let neworderinfolist = that.$store.state.shopcar.orderinfolist[item.oindex]
            console.log(JSON.stringify(neworderinfolist))
            console.log(JSON.stringify(item))
            neworderinfolist.goodcouponinfo = item
            that.$set(that.$store.state.shopcar.orderinfolist, item.oindex, neworderinfolist)
          }
          console.log(JSON.stringify(that.orderinfolist))
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      from.meta.keepAlive = true
      next()
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
    width: 100%;
    bottom: 0;
    background: #eaeaea;
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
        width: 100%;
        margin-left: 0.22rem;
        height: 1.58rem;
        .orderfirstline {
          margin-left: 0.1rem;
          display: flex;
          justify-content: space-between;
          color: #2a2a2a;
          font-size: 0.26rem;
          line-height: 0.32rem;
        }
        .ordersecondline {
          margin-top: 0.12rem;
          color: #919191;
          font-size: 0.22rem;
          text-align: right;
          span {
            font-size: 0.26rem;
          }
        }
        .ordertotal {
          margin-top: 0.62rem;
          text-align: right;
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
    .handlebar {
      position: fixed;
      bottom: 0;
      left: 0;
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
</style>
