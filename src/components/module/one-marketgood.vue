/**
* Created by wolfsheller on 2017/3/11.
* 单个超市推荐组件
*/
<template>
  <div>
    <ul>
      <li v-for="(item, index) in merchantitems">
        <router-link class="singlemerchant" :to="{ path: '/merchant/mardetails/goods', query: { bid: item.bid, gid: item.id } }" tag="div">
          <div class="imgpart"><img :src=item.t_mainpic alt=""></div>
          <div class="infopart">
            <div class="titleline"><div class="title">{{ item.t_name }}</div></div>
            <div class="mainline">{{ item.t_destail }}</div>
            <div class="priceline">
              <div class="priceall">
                <div class="price"><span class="pricesmall">￥</span><span>{{ item.priceint }}.</span><span class="pricesmall">{{ item.pricefloat }}</span></div>
                <!--<div class="coupon">优惠券可抵{{ item.coupon }}元</div>-->
              </div>
              <div class="infoall">
                <div class="count">已售{{ item.t_sale }}</div>
              </div>
            </div>
          </div>
        </router-link>
        <button class="addcount" @click="clickAddcount(index)">+</button>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    props: {
      merchantitems: Array
    },
    computed: {
      ...mapState({
        marketitems: state => state.market.marketitems
      })
    },
    methods: {
      clickAddcount (index) {
        let that = this
        let newcount = 0
        if (that.marketitems.length === 0) {
          that.$store.commit('addMarketshopcar', {
            goodsname: that.merchantitems[index].t_name,
            goodsprice: that.merchantitems[index].t_price,
            goodscount: 1,
            gid: that.merchantitems[index].id
          })
        } else {
          for (let item of that.marketitems) {
            if (item.gid === that.merchantitems[index].id) {
              item.goodscount++
            } else {
              newcount++
              if (newcount === that.marketitems.length) {
                that.$store.commit('addMarketshopcar', {
                  goodsname: that.merchantitems[index].t_name,
                  goodsprice: that.merchantitems[index].t_price,
                  goodscount: 1,
                  gid: that.merchantitems[index].id
                })
                return
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul {
    li {
      position: relative;
      .singlemerchant {
        height: 2.24rem;
        margin-bottom: 0.2rem;
        background: #fff;
        padding: 0.28rem 0.22rem;
        display: flex;
        div.imgpart {
          height: 2.24rem;
          width: 2.24rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        div.infopart {
          height: 2.24rem;
          flex: 1;
          margin-left: 0.28rem;
          .titleline {
            display: flex;
            justify-content: space-between;
            .title {
              line-height: 0.46rem;
              font-size: 0.34rem;
              height: 0.46rem;
              color: #333;
              /*white-space: nowrap;*/
              -webkit-line-clamp: 1;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .mainline {
            margin-top: 0.1rem;
            line-height: 0.36rem;
            height: 0.72rem;
            font-size: 0.26rem;
            color: #929292;
            height: 0.72rem;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .priceline {
            margin-top: 0.12rem;
            div.priceall {
              display: flex;
              .price {
                .pricesmall {
                  font-size: 0.3rem;
                }
                line-height: 0.42rem;
                font-size: 0.42rem;
                color: #ef4545;
              }
              .coupon {
                margin-top: 0.06rem;
                margin-left: 0.14rem;
                background: #ff6816;
                font-size: 0.2rem;
                color: #fff;
                height: 0.32rem;
                border-radius: 0.04rem;
                padding: 0 0.08rem;
                line-height: 0.32rem;
              }
            }
            div.infoall {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .count {
                line-height: 0.46rem;
                font-size: 0.26rem;
                color: #929292;
              }
            }
          }
        }
      }
      .addcount {
        position: absolute;
        right: 0.32rem;
        bottom: 0.28rem;
        line-height: 0.48rem;
        height: 0.48rem;
        background: #fb9400;
        color: #fff;
        font-size: 0.4rem;
        border-radius: 0.24rem;
        padding: 0 0.4rem;
      }
      .addcount:active {
        background: #d38009;
      }
    }
  }
</style>
