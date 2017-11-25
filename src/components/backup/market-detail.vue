/**
* Created by wolfsheller on 2017/3/17.
* 同城商家详情（超市）组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="detailcontent">
      <my-swiper :banneritems="banneritems"></my-swiper>
      <div class="title">
        <p>{{ detailitems.title }}</p>
      </div>
      <div class="handle">
        <div class="mainpart">
          <div class="priceall">
            <p>现场买单享受更多优惠</p>
          </div>
          <p class="sale">已有{{ detailitems.sale }}人买单</p>
        </div>
        <div class="sidepart">
          <button>买单</button>
        </div>
      </div>
      <div class="address">
        <div class="mainpart">
          <p>{{ detailitems.address }}</p>
          <router-link class="distance" :to="{ path: '/merchant/details/amap' }" tag="p">
            <img :src=position alt=""><span>{{ detailitems.distance }}</span>
          </router-link>
        </div>
        <div class="sidepart">
          <a href="tel:123456789"><img :src=phoneimgsrc alt=""></a>
        </div>
      </div>
      <div class="merchantmore">
        <div class="more">
          <p>超市商品分类</p>
        </div>
        <ul class="marcategory">
          <router-link v-for="item in categoryitems" :to="{ path: '/merchant/mardetails/category', query: { gid: item.id } }"  :key="item.id" tag="li">
            <img :src=item.imgsrc alt="">
          </router-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import mySwiper from 'components/common/myswiper'
  export default {
    components: {
      myHeader,
      mySwiper
    },
    data () {
      return {
        headeritem: '超市详情',
        phoneimgsrc: 'static/img/common/phone.png',
        position: 'static/img/common/position.png',
        detailitems: {},
        banneritems: [],
        merchantitems: [],
        categoryitems: []
      }
    },
    created () {
      let that = this
      this.$http({
        method: 'get',
        url: global.Domain.merchantUrl + 'mardetails'
      }).then(function (response) {
        let res = response.data
        that.detailitems = res.detailitems
        that.banneritems = res.banneritems
        that.categoryitems = res.categoryitems
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .detailcontent {
    margin-top: 0.8rem;
    .title {
      height: 0.52rem;
      background: #fff;
      border-bottom: 0.01rem solid #ccc;
      padding: 0.3rem 0.24rem;
      p {
        font-size: 0.34rem;
        color: #252525;
        line-height: 0.52rem;
      }
    }
    .describe, .handle, .address {
      margin-bottom: 0.24rem;
      background: #fff;
      padding: 0.3rem 0.24rem;
    }
    .describe {
      p {
        font-size: 0.3rem;
        color: #252525;
        line-height: 0.45rem;
      }
    }
    .handle {
      display: flex;
      justify-content: space-between;
      .mainpart {
        div.priceall {
          font-size: 0.3rem;
          color: #252525;
        }
        .sale {
          font-size: 0.26rem;
          color: #929292;
          margin-top: 0.22rem;
        }
      }
      .sidepart {
        display: flex;
        align-items: center;
        button {
          font-size: 0.3rem;
          color: #fff;
          background: #ff8a00;
          border: none;
          border-radius: 0.1rem;
          padding: 0.24rem 0.68rem;
        }
      }
    }
    .address {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0 0.2rem 0.24rem;
      .mainpart {
        border-right: 0.01rem solid #d0cec7;
        width: 75%;
        padding-right: 0.6rem;
        .distance {
          display: flex;
          align-content: center;
          img {
            height: 0.34rem;
            margin-right: 0.12rem;
          }
          span {
            line-height: 0.34rem;
          }
        }
      }
      .sidepart {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 0.68rem;
          height: 0.68rem;
        }
      }
      p {
        font-size: 0.26rem;
        color: #929292;
        line-height: 0.6rem;
      }
    }
    .merchantmore {
      .more {
        height: 0.92rem;
        line-height: 0.92rem;
        padding-left: 0.24rem;
        background: #fff;
        border-bottom: 0.01rem solid #ccc;
        color: #252525;
        font-size: 0.3rem;
      }
      .marcategory {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        li {
          width: 25%;
          text-align: center;
          box-sizing: border-box;
          border-right: 0.02rem solid #eaeaea;
          border-bottom: 0.02rem solid #eaeaea;
          img {
            width: 100%;
            display: block;
          }
        }
        li:nth-child(4n) {
          border-right: none;
        }
      }
    }
  }
</style>
