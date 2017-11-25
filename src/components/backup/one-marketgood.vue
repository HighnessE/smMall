/**
* Created by wolfsheller on 2017/3/2.
* 超市分类中单个商品组件
*/
<template>
  <section class="contentpart">
    <ul>
      <li v-for="item in singlegoods">
        <router-link :to="{ path: '/mall/details', query: { gid: item.url } }">
          <img class="imgsrc" :src=item.mainpic alt="">
          <div class="titlewrap">
            <p class="title">{{ item.name }}{{ item.name }}{{ item.name }}{{ item.name }}</p>
          </div>
          <div class="pricemodule">
            <div class="price">
              <span class="pricefloat">￥</span>
              <span class="priceint">{{ item.priceint }}</span>
              <span class="pricefloat">{{ item.pricefloat }}</span>
            </div>
            <div class="sales">销量{{ item.sale }}</div>
          </div>
          <div class="handlepart">
            <div class="coupon">优惠券可抵{{ item.coupon }}元</div>
          </div>
        </router-link>
        <div class="addbtn" @click="clickAddCount">+</div>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['singlegoods'],
    methods: {
      clickAddCount () {
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .contentpart {
    font-size: 0;
    ul {
      display: flex;
      flex-flow: row wrap;
      li {
        position: relative;
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
        .handlepart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .coupon {
            display: inline-block;
            padding: 0 0.08rem;
            margin: 0.12rem 0 0.12rem 0.12rem;
            height: 0.36rem;
            font-size: 0.2rem;
            line-height: 0.36rem;
            border-radius: 0.06rem;
            color: #fff;
            background: #ff6816;
          }
        }
        .addbtn {
          position: absolute;
          bottom: 0.12rem;
          right: 0.12rem;
          width: 1rem;
          height: 0.36rem;
          font-size: 0.36rem;
          color: #fff;
          line-height: 0.36rem;
          background: #fb9400;
          border-radius: 0.16rem;
          text-align: center;
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
