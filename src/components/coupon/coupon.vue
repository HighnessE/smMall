/**
* Created by wolfsheller on 2017/3/23.
* 优惠券组件
*/
<template>
  <section class="coupon">
    <coupon-nav :couponitems="couponitems"></coupon-nav>
    <img class="banneritem" :src=tipitems.imgsrc alt="">
    <router-link :to="{ path: '/center/coupon' }" tag="div">
      <crossbar :crossbaritems="crossbaritems">
        <div class="rightpart">
          <span>{{ tipitems.number }} 张</span>
          <img src="../../assets/packimg/rightarrow.png" alt="">
        </div>
      </crossbar>
    </router-link>
    <div class="mainpart">
      <div v-for="(value, index) in couponlist">
        <coupon-module :couponmodule="value" :oindex="index"></coupon-module>
      </div>
    </div>
    <my-footer></my-footer>
    <!-- 未打开红包 -->
    <div class="openpackwrap" v-show="ifopenpackwrap" @touchmove.stop.prevent>
      <transition name="openpack">
        <div class="openpack" v-show="ifopenpack">
          <div class="packtitle">请选择您的红包</div>
          <ul ref="packlist">
            <li v-for="(item, index) in 9">
              <div class="packbox" @click="clickOpenpack(index)">
                <img class="frontimg" src="../../assets/packimg/openpack.png" alt="">
                <img class="backimg" src="../../assets/packimg/openpack2.png" alt="">
                <div class="packmoney">0.00</div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- 已打开红包 -->
    <div class="packetwrap" v-show="ifpacketwrap" @touchmove.stop.prevent>
      <div class="packetcontent active">
        <p class="headline">恭喜您</p>
        <p class="subhead">获得{{ openpackmoney }}元红包</p>
        <div class="packet">
          <img src="../../assets/packimg/packet.png" alt="">
          <p>
            <span>￥</span>
            <span>{{ openpackmoney }}</span>
          </p>
        </div>
        <p class="describe">（红包金额已自动转入您的钱包，可在个人中心-我的钱包查看）</p>
        <a class="packetbtn" href="javascript:" @click="hidePacket">确定</a>
      </div>
    </div>
    <wrap-couponpay v-if="ifpayway"
                    :exactlypay="couponinfo.money"
                    :orderinfo="orderinfo"
                    @close-paywrap="closePopup"></wrap-couponpay>
  </section>
</template>

<script type="text/ecmascript-6">
  //  import openpackActive from 'assets/packimg/openpack2.png'
  import myFooter from 'components/common/myfooter'
  import Crossbar from 'components/coupon/crossbar'
  import couponNav from 'components/coupon/coupon-nav'
  import wrapCouponpay from 'components/coupon/wrap-couponpay'
  import couponModule from 'components/module/coupon-module'
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    components: {
      Crossbar,
      myFooter,
      couponNav,
      couponModule,
      wrapCouponpay
    },
    data () {
      return {
        functionitems: {
          affirmbtn: '确定',
          cancelbtn: '我再想想'
        },
        crossbaritems: {
          title: '您当前拥有的优惠券'
        }
      }
    },
    computed: {
      ...mapState({
        'ifopenpackwrap': state => state.coupon.ifopenpackwrap,
        'ifopenpack': state => state.coupon.ifopenpack,
        'ifpacketwrap': state => state.coupon.ifpacketwrap,
        'ifpayway': state => state.coupon.ifpayway,
        'couponitems': state => state.coupon.couponitems,
        'couponlist': state => state.coupon.couponlist,
        'couponinfo': state => state.coupon.couponinfo,
        'openpackmoney': state => state.coupon.openpackmoney,
        'tipitems': state => state.coupon.tipitems
      }),
      ...mapGetters([
        'orderinfo'
      ])
    },
    methods: {
      // 未打开红包的按钮，打开红包事件
      clickOpenpack (index) {
        let that = this
        let aLi = this.$refs.packlist.querySelectorAll('li')
        let oEv = aLi[index]
        that.$http({
          method: 'get',
          url: global.Domain.couponUrl + 'openpack'
        }).then(function (response) {
          let res = response.data
          if (res.pass === 1) {
            that.$store.state.coupon.openpackmoney = res.packet
            for (let i = 0; i < aLi.length; i++) {
              aLi[i].querySelector('.packbox').className = 'packbox rotate'
              aLi[i].querySelector('.packbox .packmoney').innerHTML = res.random[i]
            }
            oEv.querySelector('.packbox .packmoney').innerHTML = res.packet
            aLi[0].querySelector('.packbox').addEventListener('webkitAnimationEnd', function () {
              setTimeout(function () {
                that.$store.state.coupon.ifopenpack = false
                that.$store.state.coupon.ifopenpackwrap = false
                setTimeout(function () {
                  that.$store.state.coupon.ifpacketwrap = true
                })
              }, 1500)
            }, false)
          }
        })
      },
      // 初始化获取页面数据
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.couponUrl + 'sale'
        }).then(function (response) {
          let res = response.data
          // 优惠券导航部分数据
          that.$store.state.coupon.couponitems = res.couponitems
          // 导航种类下“推荐”选项对应的数据
          that.$store.state.coupon.couponlist = that.couponitems[0].coupon
          that.$store.state.coupon.couponlist.map(function (item) {
            item.title = that.couponitems[0].title
            item.deadline = item.usetime.split('-')
          })
          // 设置推荐选项默认选中
          for (let item of that.$store.state.coupon.couponitems) {
            item.boolean = false
          }
          that.$store.state.coupon.couponitems[0].boolean = true
          // 水平横条数据
          that.$store.state.coupon.tipitems = res.tipitems
          // 判断用户是否有红包未打开,ispackitems为1时代表有未打开红包
          if (res.ispackitems) {
            that.ifOpenpack()
          }
        })
      },
      ...mapMutations([
        'hideConfirm',
        'showPacket',
        'hidePacket',
        'closePopup',
        'ifOpenpack'
      ])
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .coupon {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    overflow: auto;
  }

  .banneritem {
    width: 100%;
    display: block;
  }

  .rightpart {
    margin-right: 0.42rem;
    display: flex;
    align-items: center;
    img {
      margin-left: 0.24rem;
      width: 0.18rem;
    }
    span {
      color: #919191;
      font-size: 0.32rem;
    }
  }

  .mainpart {
    background: #fff;
    padding-top: 0.4rem;
    border-top: 0.2rem solid #eaeaea;
    padding-bottom: 1.19rem;
  }

  .openpackwrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: rgba(0, 0, 0, 0.5);
    .openpack {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 8.28rem;
      border-radius: 0.08rem;
      overflow: hidden;
      .packtitle {
        background: url("../../assets/packimg/packtitle.png");
        background-size: 100% 100%;
        height: 1.1rem;
        text-align: center;
        line-height: 1.1rem;
        font-size: 0.4rem;
        color: #fcff02;
      }
      ul {
        padding: 0.24rem 0 0.06rem 0.38rem;
        display: flex;
        flex-wrap: wrap;
        background: #fff6ce;
        li {
          width: 33.3%;
          padding-right: 0.38rem;
          margin-bottom: 0.18rem;
          box-sizing: border-box;
          /*perspective: 1000;*/
          .packbox {
            width: 100%;
            position: relative;
            padding-bottom: 126%;
            transform-style: preserve-3d;
            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              backface-visibility: hidden;
            }
            img.frontimg {
              z-index: 2;
            }
            img.backimg {
              transform: rotateY(180deg);
              transform-style: preserve-3d;
            }
            img.active {
              animation: packshake 0.8s;
              animation-fill-mode: forwards;
            }
            .packmoney {
              position: absolute;
              top: 65%;
              left: 50%;
              transform: translate(-50%, -50%) rotateY(180deg);
              transform-style: preserve-3d;
              font-size: 0.5rem;
              color: #feff03;
            }
          }
          .rotate {
            animation: packrotate 0.8s;
            animation-fill-mode: forwards;
          }
        }
      }
    }
  }

  @keyframes packshake {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 85%;
    }
    20% {
      transform: rotate(-9deg);
      transform-origin: 50% 85%;
    }
    40% {
      transform: rotate(9deg);
      transform-origin: 50% 85%;
    }
    60% {
      transform: rotate(-9deg);
      transform-origin: 50% 85%;
    }
    80% {
      transform: rotate(9deg);
      transform-origin: 50% 85%;
    }
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 85%;
    }
  }

  @keyframes packrotate {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(180deg);
    }
  }

  .packetwrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 20;
    background: url("../../assets/packimg/packetbg.png");
    background-size: 100% 100%;
    .packetcontent {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 60%;
      max-width: 8.28rem;
      transform: translate(-50%, -50%);
      text-align: center;
      .headline {
        font-size: 0.62rem;
        color: #ffee00;
      }
      .subhead {
        font-size: 0.4rem;
        color: #ffee00;
        margin-top: 0.18rem;
      }
      .packet {
        position: relative;
        img {
          width: 80%;
          display: block;
          margin: 0.5rem auto 0;
        }
        p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, 100%);
          color: #ffee00;
          span:first-child {
            font-size: 0.28rem;
          }
          span:last-child {
            font-size: 0.56rem;
          }
        }
      }
      .describe {
        line-height: 0.42rem;
        font-size: 0.24rem;
        color: #fff;
        margin-top: 0.18rem;
      }
      .packetbtn {
        display: block;
        width: 80%;
        text-align: center;
        padding-left: 0.21rem;
        padding-right: 0.21rem;
        border-radius: 0.1rem;
        background: #ffee00;
        color: #ff2626;
        font-size: 0.36rem;
        height: 0.82rem;
        line-height: 0.82rem;
        margin: 0.5rem auto 0;
      }
    }
    .packetcontent.active {
      animation: packscale 0.4s;
    }
  }

  @keyframes packscale {
    0% {
      transform: translate(-50%, -50%) scale(0.86, 0.86);
    }
    50% {
      transform: translate(-50%, -50%) scale(1, 1);
    }
    75% {
      transform: translate(-50%, -50%) scale(0.94, 0.94);
    }
    100% {
      transform: translate(-50%, -50%) scale(1, 1);
    }
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  .popupinfo {
    font-size: 0.28rem;
    color: #919191;
    margin-top: 0.24rem;
    margin-bottom: 0.4rem;
  }

  .openpack-enter-active {
    transition: all 0.8s;
  }

  .openpack-enter {
    opacity: 0;
  }
</style>
