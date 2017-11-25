/**
* Created by wolfsheller on 2017/4/24.
* 选择优惠券组件（包括我的订单再次购买，我的收藏直接购买以及商品详情直接购买）
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="couponlist">
      <div v-for="(item, index) in couponlist">
        <select-couponmodule :selectmodule="item" :oindex=index @select-coupon="selectCoupon"></select-couponmodule>
      </div>
    </div>
    <div class="handlebar">
      <div class="exactlyinfo">
        <div class="exactlyprice">
          已选择<span class="exactlyspan">{{ couponobj.couponpiece }}</span>张,
          共计<span class="exactlyspan">{{ couponobj.coupontotal }}</span>元
        </div>
        <div class="exactlycoupon">
          优惠额度为{{ couponobj.totalcoupon }}元
        </div>
      </div>
      <button class="submitorder" @click="submitCoupon">确定</button>
    </div>
    <wrap-tips :tipswrap="tipswrap" v-if="iftips" @change-iftips="changeIftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import selectCouponmodule from 'components/module/select-couponmodule'
  import wrapTips from 'components/common/wrap-tips'
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: {},
    components: {
      myHeader,
      selectCouponmodule,
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
        couponobj: state => state.confirm.couponobj,
        couponlist: state => state.confirm.couponlist
      })
    },
    methods: {
      ...mapMutations([
        'countCoupon'
      ]),
      changeIftips () {
        this.iftips = false
      },
      selectCoupon (msg) {
        let objindex = msg.index
        let activeOpt = this.couponlist[objindex]
        if (activeOpt.ifusecoupon) {
          activeOpt.ifusecoupon = false
          this.$set(this.couponlist, objindex, activeOpt)
          msg.money = -msg.money
        } else {
          activeOpt.ifusecoupon = true
          this.$set(this.couponlist, objindex, activeOpt)
        }
        this.couponobj.coupontotal += msg.money
        if (this.couponobj.coupontotal > this.couponobj.totalcoupon) {
          this.couponobj.coupontotal -= msg.money
          activeOpt.ifusecoupon = false
          this.$set(this.couponlist, objindex, activeOpt)
          this.iftips = true
          return
        }
        if (msg.money > 0) {
          this.couponobj.couponpiece++
        } else {
          this.couponobj.couponpiece--
        }
      },
      submitCoupon () {
        this.countCoupon()
        if (this.couponobj.couponpiece > 0) {
          this.$store.state.confirm.couponobj.ifusecoupon = true
        } else {
          this.$store.state.confirm.couponobj.ifusecoupon = false
        }
        this.$router.go(-1)
      },
      GetDataFromBackend () {
        let that = this
        let ogid = this.$route.query.gid
        // 请求优惠券主体数据
        that.$http({
          method: 'post',
          url: global.Domain.couponUrl + 'usecou',
          body: {
            gid: ogid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          for (let item of res.carditems) {
            item.ifusecoupon = false
            item.condition = item.cname
            item.deadline = item.usetime.split('-')
          }
          that.$store.state.confirm.couponlist = res.carditems
        })
      }
    },
    created () {
      if (!this.couponobj.ifusecoupon) {
        this.GetDataFromBackend()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .couponlist {
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
