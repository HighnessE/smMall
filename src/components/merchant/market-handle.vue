/**
* Created by wolfsheller on 2017/4/21.
* 超市详情购物车组件
*/
<template>
  <div>
    <section class="markethandlewrap">
      <div class="circle" @click="popupMenu">{{ marketnumber }}</div>
      <div class="shopcarimg">
        <img src="../../assets/packimg/marketshopcar.png" alt="">
      </div>
      <div class="orderinfo">
        <p class="price">总额：{{ marketprice }}元</p>
        <!--<p class="couponinfo">优惠额度{{ 123.11 }}元</p>-->
      </div>
      <button class="orderbtn" @click="oncePaygoods">配送支付</button>
    </section>
    <div class="marketlistwrap" v-if="ifmarketshow" @click.prevent="popupMenu" @touchmove.prevent>
      <transition name="marketshopcar">
        <section class="marketshopcar" @click.stop.prevent>
          <ul>
            <li v-for="(item, index) in marketitems">
              <div class="goodsname">{{ item.goodsname }}</div>
              <div class="goodsprice">￥{{ item.goodsprice }}</div>
              <div class="goodscount">
                <div class="reduce" @click="goodreduce(index)">－</div>
                <div class="couponnumber">{{ item.goodscount }}</div>
                <div class="increase" @click="goodincrease(index)">＋</div>
              </div>
            </li>
          </ul>
        </section>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters} from 'vuex'
  export default {
    components: {},
    data () {
      return {}
    },
    computed: {
      ...mapState({
        ifmarketshow: state => state.market.ifmarketshow,
        marketitems: state => state.market.marketitems
      }),
      ...mapGetters([
        'marketnumber',
        'marketprice'
      ])
    },
    methods: {
      popupMenu () {
        if (this.marketitems.length !== 0) {
          this.$store.state.market.ifmarketshow = !this.ifmarketshow
        }
      },
      goodreduce (index) {
        this.$store.commit('goodreduce', index)
      },
      goodincrease (index) {
        this.$store.commit('goodincrease', index)
      },
      oncePaygoods () {
        let agid = []
        let anumber = []
        for (let item of this.$store.state.market.marketitems) {
          agid.push(item.gid)
          anumber.push(item.goodscount)
        }
        if (agid.length === 0 && anumber.length === 0) {
          return
        }
        this.$router.push({
          path: '/merchant/mardetails/goods/confirm',
          query: {gid: agid, number: anumber}
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .markethandlewrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.92rem;
    background: #404040;
    display: flex;
    z-index: 10;
    .circle {
      position: absolute;
      left: 0.21rem;
      bottom: 0.08rem;
      width: 1.04rem;
      height: 1.04rem;
      background: #fb9500;
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      line-height: 1.04rem;
      border-radius: 50%;
    }
    .shopcarimg {
      margin-left: 1.4rem;
      height: 0.92rem;
      width: 0.62rem;
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 100%;
      }
    }
    .orderinfo {
      height: 0.92rem;
      flex: 1;
      text-align: right;
      margin-right: 0.2rem;
      .price {
        /*margin-top: 0.14rem;*/
        font-size: 0.3rem;
        color: #fff;
        line-height: 0.92rem;
      }
      /*.couponinfo {*/
      /*margin-top: 0.1rem;*/
      /*font-size: 0.24rem;*/
      /*color: #868686;*/
      /*}*/
    }
    .orderbtn {
      width: 1.92rem;
      height: 0.92rem;
      background: #f05554;
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.92rem;
    }
  }

  .marketlistwrap {
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    bottom: 0.92rem;
    background: rgba(0, 0, 0, 0.5);
    .marketshopcar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.18rem;
        background: #f6f6f6;
        padding: 0 0.36rem;
        border-bottom: 0.01rem solid #999;
        box-sizing: border-box;
        .goodsname {
          font-size: 0.26rem;
          color: #494949;
          max-width: 2.34rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .goodsprice {
          font-size: 0.3rem;
          color: #151515;
        }
        .goodscount {
          height: 0.6rem;
          font-size: 0.32rem;
          display: flex;
          align-items: center;
          .reduce, .increase {
            line-height: 0.52rem;
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            border-radius: 50%;
          }
          .reduce {
            color: #aeaeae;
            background: #fff;
            border: 0.01rem solid #aeaeae;
          }
          .couponnumber {
            padding-left: 0.16rem;
            padding-right: 0.16rem;
            border-left: 0.01rem solid #d2d2d2;
            border-right: 0.01rem solid #d2d2d2;
          }
          .increase {
            background: #fed360;
            color: #333733;
          }
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }

  .marketshopcar-enter-active, .marketshopcar-leave-active {
    transition: margin-bottom 0.5s
  }

  .marketshopcar-enter, .marketshopcar-leave-active {
    margin-bottom: -4.78rem;
  }
</style>
