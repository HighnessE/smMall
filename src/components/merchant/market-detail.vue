/**
* Created by wolfsheller on 2017/5/4.
* 同城超市详情组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="detailcontent">
      <!--<my-swiper :banneritems="banneritems"></my-swiper>-->
      <div class="indexpic">
        <img :src="detailitems.t_indexpic" alt="">
      </div>
      <div class="title">
        <p>{{ detailitems.t_bname }}</p>
      </div>
      <div class="handle">
        <div class="mainpart">
          <div class="priceall">
            <p>现场支付享受更多优惠</p>
          </div>
          <p class="sale">已有{{ detailitems.count }}人现场支付</p>
        </div>
        <div class="sidepart">
          <router-link :to="{ path: '/merchant/details/paybill', query: { bid: detailitems.bid } }" tag="button">现场支付</router-link>
        </div>
      </div>
      <div class="address">
        <div class="mainpart">
          <router-link :to="{ path: '/merchant/details/amap' }" tag="p">
            <p>{{ detailitems.t_address }}</p>
            <div class="distance">
              <img :src=position alt="">
              <span>{{ detailitems.t_distance }}km</span>
            </div>
          </router-link>
        </div>
        <div class="sidepart">
          <a :href="'tel:' + detailitems.t_phone"><img :src=phoneimgsrc alt=""></a>
        </div>
      </div>
      <div class="merchantmore">
        <div class="more">
          <p>超市推荐</p>
        </div>
        <one-marketgood :merchantitems="merchantitems"></one-marketgood>
      </div>
    </div>
    <market-handle></market-handle>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import mySwiper from 'components/common/myswiper'
  import oneMarketgood from 'components/module/one-marketgood'
  import marketHandle from './market-handle'

  export default {
    components: {
      myHeader,
      oneMarketgood,
      mySwiper,
      marketHandle
    },
    data () {
      return {
        headeritem: '超市详情',
        phoneimgsrc: 'static/img/common/phone.png',
        position: 'static/img/common/position.png',
        detailitems: {},
        merchantitems: []
      }
    },
    methods: {
      getDataFromBackend () {
        let obid = this.$route.query.bid
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'business',
          body: {
            bid: obid,
            map: this.$store.state.merchant.nowmap
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data.infoitems
          that.$store.state.merchant.merchantmap = res.t_map
          that.$store.state.merchant.merchantname = res.t_bname
          that.detailitems = {
            t_indexpic: res.t_indexpic,
            t_bname: res.t_bname,
            t_address: res.t_address,
            t_phone: res.t_phone,
            t_distance: res.t_distance,
            count: res.count,
            bid: that.$route.query.bid
          }
          that.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'goodlist',
            body: {
              bid: obid
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data.gooditems
            res.map(function (item) {
              item.priceint = item.t_price.split('.')[0]
              item.pricefloat = item.t_price.split('.')[1]
              item.bid = obid
              return item
            })
            that.merchantitems = res
          })
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('resetPayAll')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .detailcontent {
    margin-top: 0.8rem;
    margin-bottom: 0.92rem;
    .indexpic {
      width: 100%;
      img {
        width: 100%;
      }
    }
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
    }
  }
</style>
