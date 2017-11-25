/**
* Created by wolfsheller on 2017/3/2.
* 单个商品组件
*/
<template>
  <section class="contentpart">
    <ul>
      <router-link :to="{ path: '/mall/details', query: { gid: item.id } }"
                   tag="li"
                   v-for="item in singlegoods"
                   :key="item.id">
        <img class="imgsrc" :src=item.mainpic alt="">
        <div class="titlewrap">
          <p class="title">{{ item.name }}</p>
        </div>
        <div class="pricemodule">
          <div class="price">
            <span class="pricefloat">￥</span>
            <span class="priceint">{{ item.priceint }}</span>
            <span class="pricefloat">{{ item.pricefloat }}</span>
          </div>
          <div class="sales">销量{{ item.sale }}</div>
        </div>
        <div class="coupon">优惠券可抵{{ item.coupon }}元</div>
      </router-link>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['singlegoods', 'moduletitle']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .contentpart {
    font-size: 0;
    ul {
      display: flex;
      flex-flow: row wrap;
      li {
        width: 50%;
        border-bottom: 0.08rem solid #f6f6f6;
        box-sizing: border-box;
        background: #fff;
        .imgsrc {
          width: 100%;
        }
        .titlewrap {
          .title {
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0.2rem 0;
            padding: 0 0.22rem;
            font-size: 0.26rem;
            line-height: 0.34rem;
            color: #5e5e5e;
          }
        }
        .pricemodule {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price {
            margin: 0 0.15rem -0.02rem;
            color: #ff2c2c;
            .priceint {
              font-size: 0.36rem;
            }
            .pricefloat {
              font-size: 0.24rem;
            }
          }
          .sales {
            margin: 0 0.15rem 0 0;
            font-size: 0.26rem;
            color: #5e5e5e;
          }
        }
        .coupon {
          display: inline-block;
          padding: 0 0.08rem;
          margin: 0.12rem 0 0.12rem 0.12rem;
          font-size: 0.2rem;
          height: 0.36rem;
          line-height: 0.36rem;
          border-radius: 0.06rem;
          color: #fff;
          background: #ff6816;
        }
      }
      li:nth-child(2n-1) {
        border-right: 0.04rem solid #f6f6f6;
      }
      li:nth-child(2n) {
        border-left: 0.04rem solid #f6f6f6;
      }
    }
  }
</style>
