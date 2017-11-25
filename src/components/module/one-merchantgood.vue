/**
* Created by wolfsheller on 2017/3/11.
* 单个商家推荐组件
*/
<template>
  <div>
    <ul>
        <router-link class="singlemerchant" :to="{ path: '/merchant/details/goods', query: { bid: item.bid, gid: item.id } }" v-for="item in merchantitems" tag="li" :key="item.id">
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
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      merchantitems: Array
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul {
    li.singlemerchant {
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
            .count {
              line-height: 0.46rem;
              font-size: 0.26rem;
              color: #929292;
            }
          }
        }
      }
    }
  }
</style>
