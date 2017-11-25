/**
* Created by wolfsheller on 2017/3/3.
* 个人中心组件
*/
<template>
  <section class="center">
    <div class="centerhead">
      <img class="bghead" :src=centerbg alt="">
      <div class="msghead">
        <img :src=centerhead.headimg alt="">
        <p class="msgname">{{ centerhead.nickname }}</p>
      </div>
    </div>
    <div class="centercontent">
      <ul>
        <li v-for="item in centeritems">
          <router-link class="routerbox" :to="{ path: item.url }" tag="div">
            <div class="routerwrap">
              <img class="routerlogo" :src=item.imgsrc alt="">
              <p class="routerinfo">{{ item.msg }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <my-footer></my-footer>
  </section>
</template>

<script type="text/ecmascript-6">
  import myFooter from 'components/common/myfooter'
  import crossBar from 'components/center/crossbar'

  export default {
    components: {
      myFooter,
      crossBar
    },
    data () {
      return {
        centerbg: 'static/img/center/center/headbg.png',
        centerhead: {
          'headimg': 'static/img/center/center/header1.png',
          'nickname': '舒瓦茨的信物丶'
        },
        centeritems: [
          {
            msg: '我的资料',
            imgsrc: 'static/img/center/center/myinfo.png',
            url: '/center/infomation'
          },
          {
            msg: '我的钱包',
            imgsrc: 'static/img/center/center/wallet.png',
            url: '/center/wallet'
          },
          {
            msg: '我的优惠券',
            imgsrc: 'static/img/center/center/coupon.png',
            url: '/center/coupon'
          },
          {
            msg: '商城订单',
            imgsrc: 'static/img/center/center/order.png',
            url: '/center/orders'
          },
          {
            msg: '商城购物车',
            imgsrc: 'static/img/center/center/shopcar.png',
            url: '/center/shopcar'
          },
          {
            msg: '我的收藏',
            imgsrc: 'static/img/center/center/collect.png',
            url: '/center/collection'
          },
          {
            msg: '同城订单',
            imgsrc: 'static/img/center/center/merchant.png',
            url: '/center/merorders'
          },
          {
            imgsrc: 'static/img/center/center/meraccess.png',
            msg: '我要开店',
            url: '/center/meraccess'
          }
        ]
      }
    },
    methods: {
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'code'
        }).then(function (response) {
          let res = response.data
          that.centerhead.headimg = res.codeitems.headimg
          that.centerhead.nickname = res.codeitems.nickname
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .center {
    margin-bottom: 1.19rem;
    .centerhead {
      position: relative;
      .bghead {
        display: block;
        width: 100%;
      }
      .msghead {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        text-align: center;
        img {
          width: 1.58rem;
          height: 1.58rem;
          border-radius: 50%;
        }
        .msgname {
          margin-top: 0.24rem;
          font-size: 0.28rem;
          color: #fff;
          text-align: center;
        }
      }
    }
    .centercontent {
      padding: 0.08rem;
      ul {
        display: flex;
        flex-flow: row wrap;
        li {
          box-sizing: border-box;
          border: 0.04rem solid #f6f6f6;
          width: 33.33%;
          background: #fff;
          height: 2.24rem;
          .routerbox {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .routerwrap {
              text-align: center;
              .routerlogo {
                height: 0.48rem;
              }
              .routerinfo {
                margin-top: 0.26rem;
                font-size: 0.28rem;
                color: #5e5e5e;
              }
            }
          }
          .routerbox:active {
            background: #f6f6f6;
          }
        }
      }
    }
  }
</style>
