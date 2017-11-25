/**
* Created by wolfsheller on 2017/4/24.
* 选择优惠券组件（包括我的订单再次购买，我的收藏直接购买以及商品详情直接购买）
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="couponcoupon">
      <div v-for="(item, index) in couponcoupon">
        <select-couponmodule2 :selectmodule=item :oindex=index @select-coupon="selectCoupon"></select-couponmodule2>
      </div>
    </div>
    <div class="handlebar">
      <div class="exactlyinfo">
        <div class="exactlyprice">
          已选择<span class="exactlyspan">{{ couponobj2.couponpiece }}</span>张,
          共计<span class="exactlyspan">{{ couponobj2.coupontotal }}</span>元
        </div>
        <div class="exactlycoupon">
          优惠额度为{{ couponobj2.totalcoupon }}元
        </div>
      </div>
      <button class="submitorder" @click="submitCoupon">确定</button>
    </div>
    <wrap-tips :tipswrap="tipswrap" v-if="iftips" @change-iftips="changeIftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import selectCouponmodule2 from './select-couponmodule-backup'
  import wrapTips from 'components/common/wrap-tips'
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: {},
    components: {
      myHeader,
      selectCouponmodule2,
      wrapTips
    },
    data () {
      return {
        iftips: false,
        headeritem: '选择优惠券',
        tipswrap: {
          tipstitle: '选择失败',
          tipsinfo: '选择优惠券金额不能大于优惠额度'
        }
      }
    },
    computed: {
      ...mapState({
        couponobj2: state => state.shopcar.couponobj2,
        couponlist2: state => state.shopcar.couponlist2,
        couponcoupon: state => state.shopcar.couponcoupon,
        goodcouponinfo: state => state.shopcar.goodcouponinfo,
        orderinfolist: state => state.shopcar.orderinfolist
      })
    },
    methods: {
      ...mapMutations([
        'ordercountcoupon'
      ]),
      changeIftips () {
        this.iftips = false
      },
      selectCoupon (msg) {
        let objindex = msg.index
        let activeOpt = this.couponcoupon[objindex]
        if (activeOpt.ifusecoupon) {
          activeOpt.ifusecoupon = false
          activeOpt.gid = ''
          this.$set(this.$store.state.shopcar.couponcoupon, objindex, activeOpt)
          msg.money = -msg.money
        } else {
          activeOpt.ifusecoupon = true
          activeOpt.gid = this.couponobj2.gid
          this.$set(this.$store.state.shopcar.couponcoupon, objindex, activeOpt)
        }
        this.$store.state.shopcar.couponobj2.coupontotal += msg.money
        if (this.couponobj2.coupontotal > this.couponobj2.totalcoupon) {
          this.$store.state.shopcar.couponobj2.coupontotal -= msg.money
          activeOpt.ifusecoupon = false
          activeOpt.gid = ''
          this.$set(this.$store.state.shopcar.couponcoupon, objindex, activeOpt)
          this.iftips = true
          return
        }
        if (msg.money > 0) {
          this.$store.state.shopcar.couponobj2.couponpiece++
        } else {
          this.$store.state.shopcar.couponobj2.couponpiece--
        }
      },
      submitCoupon () {
        this.ordercountcoupon()
        if (this.couponobj2.couponpiece > 0) {
          this.$store.state.shopcar.couponobj2.ifusecoupon = true
        } else {
          this.$store.state.shopcar.couponobj2.ifusecoupon = false
        }
        console.log(JSON.stringify(this.goodcouponinfo))
        console.log(this.couponobj2.oindex)
        this.$set(this.$store.state.shopcar.goodcouponinfo, parseInt(this.couponobj2.oindex), this.couponobj2)
        console.log(JSON.stringify(this.goodcouponinfo))
        console.log(JSON.stringify(this.orderinfolist))
        let selectcouponarr = this.orderinfolist[parseInt(this.couponobj2.oindex)]
        selectcouponarr.goodcouponinfo = this.goodcouponinfo
        this.$set(this.$store.state.shopcar.orderinfolist, parseInt(this.couponobj2.oindex), selectcouponarr)
        this.$router.go(-1)
      },
      initialize () {
        let query = this.$route.query
        let gid = query.gid
        let cid = query.cid
        let oindex = parseInt(query.oindex)
        console.log(JSON.stringify(this.couponlist2))
        for (let item of this.couponlist2) {
          if (item.category === cid) {
            this.$store.state.shopcar.couponcoupon = item.coupon
          }
        }
        this.$store.state.shopcar.couponobj2.totalcoupon = this.goodcouponinfo[oindex].totalcoupon
        this.$store.state.shopcar.couponobj2.gid = gid
        for (let item of this.$store.state.shopcar.couponcoupon) {
          if (item.gid && item.gid !== gid) {
            item.ifbyotheruse = true
          }
        }
//        console.log(JSON.stringify(this.couponlist2[oindex]))
//        console.log(cid)
        console.log(JSON.stringify(this.couponcoupon))
      }
    },
    created () {
      this.initialize()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .couponcoupon {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }

  .handlebar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.92rem;
    background: #fff;
    display: flex;
    z-index: 10;
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
</style>
