/**
* Created by wolfsheller on 2017/3/17.
* 同城超市商品详情组件
*/
<template>
  <section class="mergood-detailcontent">
    <my-header :headeritem="headeritem"></my-header>
    <div class="detailcontent">
      <my-swiper :banneritems="banneritems"></my-swiper>
      <div class="title">
        <p>{{ gooditems.t_name }}</p>
      </div>
      <div class="describe">
        <p>{{ gooditems.t_destail }}</p>
      </div>
      <div class="handle">
        <div class="mainpart">
          <div class="priceall">
            <div class="price">
              <span class="pricesmall">￥</span><span class="pricebig">{{ gooditems.priceint }}.</span><span
              class="pricesmall">{{ gooditems.pricefloat }}</span>
            </div>
            <!--<div class="coupon">优惠券可抵{{ gooditems.coupon }}元</div>-->
          </div>
          <p class="sale">已售 {{ gooditems.t_sale }}</p>
        </div>
        <div class="sidepart">
          <a href="tel:123456789"><img :src=phoneimgsrc alt=""></a>
        </div>
      </div>
      <div class="moredetail">
        <h3 class="detailtitle">图文详情</h3>
        <div class="special" ref="special">
        </div>
      </div>
      <!--<div class="merchantmore">-->
      <!--<div class="more">-->
      <!--<p>同店更多</p>-->
      <!--</div>-->
      <!--<one-merchantgood :merchantitems="merchantitems"></one-merchantgood>-->
      <!--</div>-->
      <div class="goodbuyhandle" v-if="ifgoodbuynow">
        <button class="addshopcar" @click="openHandlepanel(1)">加入购物车</button>
        <button class="goodbuynow" @click="openHandlepanel(2)">配送支付</button>
      </div>
      <section class="handlepanel" @touchmove.stop.prevent @click="closeHandlepanel" v-else>
        <div class="suspendwrap" @click.stop>
          <div class="suspendinfo">
            <div class="suspendimg">
              <div>
                <img :src=gooditems.t_mainpic alt="">
              </div>
            </div>
            <div class="suspendcontent">
              <p>￥ {{ gooditems.t_price }}</p>
            </div>
            <div>
              <img :src=handlePanel.closeimg alt="">
            </div>
          </div>
          <div class="suspendmain">
            <slot></slot>
            <div class="buynumber">
              <p>购买数量：</p>
              <div class="goodscount">
                <div class="reduce" @click="reduce">－</div>
                <div class="couponnumber">{{ countnum }}</div>
                <div class="increase" @click="increase">＋</div>
              </div>
            </div>
          </div>
          <button class="submitorder1" @click="clicktoMardetail" v-if="ifaddshopcar">加入购物车</button>
          <button class="submitorder2" @click="clicktoConfirm" v-else>提交订单</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import mySwiper from 'components/common/myswiper'
  import {mapState} from 'vuex'

  export default {
    components: {
      myHeader,
      mySwiper
    },
    data () {
      return {
        headeritem: '商品详情',
        ifgoodbuynow: true,
        ifaddshopcar: false,
        phoneimgsrc: 'static/img/common/phone.png',
        position: 'static/img/common/position.png',
        gooditems: {},
        banneritems: [],
        merchantitems: [],
        handlePanel: {
          detailimg: '',
          detailprice: '',
          closeimg: ''
        },
        countnum: 1
      }
    },
    computed: {
      ...mapState({
        marketitems: state => state.market.marketitems
      })
    },
    methods: {
      openHandlepanel (msg) {
        this.ifgoodbuynow = false
        if (msg === 1) {
          this.ifaddshopcar = true
        } else if (msg === 2) {
          this.ifaddshopcar = false
        }
      },
      closeHandlepanel () {
        this.ifgoodbuynow = true
      },
      clicktoMardetail () {
        let that = this
        let newcount = 0
        if (that.marketitems.length === 0) {
          that.$store.commit('addMarketshopcar', {
            goodsname: that.gooditems.t_name,
            goodsprice: that.gooditems.t_price,
            goodscount: that.countnum,
            gid: that.gooditems.id
          })
        } else {
          for (let item of that.marketitems) {
            if (item.gid === that.gooditems.id) {
              item.goodscount += that.countnum
            } else {
              newcount++
              if (newcount === that.marketitems.length) {
                that.$store.commit('addMarketshopcar', {
                  goodsname: that.gooditems.t_name,
                  goodsprice: that.gooditems.t_price,
                  goodscount: that.countnum,
                  gid: that.gooditems.id
                })
                return
              }
            }
          }
        }
        this.$router.go(-1)
      },
      clicktoConfirm () {
        let ogid = this.$route.query.gid
        let agid = [ogid]
        let anumber = [this.countnum]
        console.log(agid)
        console.log(anumber)
        this.$router.push({
          path: '/merchant/mardetails/goods/confirm',
          query: {gid: agid, number: anumber}
        })
      },
      increase () {
        this.countnum += 1
      },
      reduce () {
        if (this.countnum <= 1) {
          this.countnum = 1
          return
        }
        this.countnum -= 1
      },
      getDataFromBackend () {
        let that = this
        let ogid = this.$route.query.gid
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'good',
          body: {
            gid: ogid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.gooditems = res.gooditems
          that.gooditems.priceint = that.gooditems.t_price.split('.')[0]
          that.gooditems.pricefloat = that.gooditems.t_price.split('.')[1]
          res.picitems.map(function (item) {
            let imgsrc = {
              imgsrc: item.t_pic
            }
            that.banneritems.push(imgsrc)
          })
          function decodeHtml (str) {
            var d = document.createElement('div')
            d.innerHTML = str
            return d.innerText
          }

          this.$refs.special.innerHTML = '' + decodeHtml(this.gooditems.t_content)
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

<style lang="less" rel="stylesheet/less">
  .mergood-detailcontent {
    .detailcontent {
      margin-top: 0.8rem;
      .title {
        /*height: 0.52rem;*/
        background: #fff;
        border-bottom: 0.01rem solid #ccc;
        padding: 0.3rem 0.24rem;
        p {
          font-size: 0.34rem;
          color: #252525;
          line-height: 0.52rem;
        }
      }
      .describe, .address {
        margin-bottom: 0.24rem;
        background: #fff;
        padding: 0.3rem 0.24rem;
      }
      .describe p {
        font-size: 0.3rem;
        color: #252525;
        line-height: 0.45rem;
      }
      .handle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.24rem;
        background: #fff;
        padding: 0.2rem 0 0.2rem 0.24rem;
        .mainpart {
          font-size: 0;
          width: 75%;
          div.priceall {
            display: flex;
            .price {
              .pricesmall {
                font-size: 0.3rem;
              }
              .pricebig {
                font-size: 0.5rem;
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
          .sale {
            font-size: 0.26rem;
            color: #929292;
            margin-top: 0.22rem;
          }
        }
        .sidepart {
          display: flex;
          width: 25%;
          border-left: 0.01rem solid #d0cec7;
          box-sizing: border-box;
          justify-content: center;
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
      .moredetail {
        padding: 0 0.28rem;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        margin-bottom: 0.94rem;
        .detailtitle {
          color: #333;
          font-size: 0.3rem;
          line-height: 0.76rem;
        }
        .special {
          width: 100%;
          img {
            width: 100%;
            display: block;
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
      .merchantmore .more {
        height: 0.92rem;
        line-height: 0.92rem;
        padding-left: 0.24rem;
        background: #fff;
        border-bottom: 0.01rem solid #ccc;
        color: #252525;
        font-size: 0.3rem;
      }
      .goodbuyhandle {
        position: fixed;
        bottom: 0;
        left: 0;
        line-height: 0.92rem;
        width: 100%;
        display: flex;
        height: 0.92rem;
        .addshopcar {
          font-size: 0.28rem;
          width: 50%;
          color: #fff;
          background: #ff9333;
        }
        .goodbuynow {
          color: #fff;
          font-size: 0.28rem;
          background: #f05555;
          width: 50%;
        }
      }
      .submitorder1 {
        background: #ff9333;
        line-height: 0.92rem;
        color: #fff;
        width: 100%;
        font-size: 0.28rem;
      }
      .submitorder2 {
        background: #f05555;
        line-height: 0.92rem;
        color: #fff;
        width: 100%;
        font-size: 0.28rem;
      }
    }
  }

  .handlepanel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .suspendwrap {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      .suspendinfo {
        height: 2rem;
        margin-bottom: 0.18rem;
        .suspendimg {
          width: 2rem;
          height: 2rem;
          position: absolute;
          left: 0.2rem;
          top: -0.2rem;
          border-radius: 0.12rem;
          border: 0.01rem solid #333;
          background: #fff;
          div {
            margin: 0.06rem;
            width: 1.88rem;
            height: 1.88rem;
            border-radius: 0.12rem;
            overflow: hidden;
            background: #fff;
            border: 0.01rem solid #333;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .suspendcontent {
          margin-left: 2.4rem;
          padding-top: 0.52rem;
          p {
            font-size: 0.36rem;
            color: #ff3600;
          }
        }
      }
      .suspendmain {
        .buynumber {
          padding: 0 0.2rem;
          height: 1.08rem;
          border-bottom: 0.01rem solid #ccc;
          display: flex;
          justify-content: space-between;
          p {
            line-height: 1.08rem;
            font-size: 0.28rem;
          }
          .goodscount {
            margin-top: 0.24rem;
            height: 0.6rem;
            font-size: 0.32rem;
            display: flex;
            border: 0.01rem solid #d2d2d2;
            border-radius: 0.04rem;
            line-height: 0.6rem;
            color: #5e5e5e;
            .reduce {
              padding-left: 0.14rem;
              padding-right: 0.14rem;
            }
            .couponnumber {
              padding-left: 0.3rem;
              padding-right: 0.3rem;
              border-left: 0.01rem solid #d2d2d2;
              border-right: 0.01rem solid #d2d2d2;
            }
            .increase {
              padding-left: 0.14rem;
              padding-right: 0.14rem;
            }
          }
        }
      }
      .addshopcar {
        height: 0.92rem;
        background: #ff9333;
        color: #fff;
        width: 100%;
        font-size: 0.28rem;
      }
      .buynow {
        background: #ff226f;
        line-height: 0.92rem;
        color: #fff;
        width: 100%;
        font-size: 0.28rem;
      }
    }
  }
</style>
