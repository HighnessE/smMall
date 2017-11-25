/**
* Created by wolfsheller on 2017/2/22.
*/
<template>
  <section>
    <img class="banneritem" :src=banneritem alt="">
    <crossbar :couponitems="couponitems[0]">
      <div class="rightpart" @click="showCategory">
        <span>{{ couponitems[0].category }}</span>
        <img :src=couponitems[0].info alt="">
      </div>
    </crossbar>
    <crossbar :couponitems="couponitems[1]">
      <div class="rightpart" @click="showCoupon">
        <span class="singleprice"><span>￥</span>{{ couponitems[1].category }}<span>.00</span></span>
        <img :src=couponitems[1].info alt="">
      </div>
    </crossbar>
    <crossbar :couponitems="couponitems[2]">
      <div class="rightpart">
        <div class="goodscount">
          <div class="reduce" @click="reduce">－</div>
          <div class="couponnumber">{{ couponnumber }}</div>
          <div class="increase" @click="increase">＋</div>
        </div>
      </div>
    </crossbar>
    <crossbar :couponitems="couponitems[3]">
      <div class="rightpart">
        <span class="totalprice"><span>￥ </span>{{ totalpriceInt }}<span>.{{ totalpriceFloat }}</span></span>
      </div>
    </crossbar>
    <div class="bottominfo">您现有优惠券100张，
      <router-link :to="{ path: 'center/wallet', query: { wid: 1 } }">这里查看</router-link>
    </div>
    <a class="couponbtn" href="javascript:" @click="showPacket">立即购买</a>
    <div class="bgwrap" v-show="ifbgwrap" @touchmove.stop.prevent>
      <div class="categorywrap" v-show="ifcategorywrap" @touchmove.stop>
        <ul>
          <li v-for="(item, index) in categoryitems" @click="hideCategory(index)">
            <div>
              <img :src=item.imgsrc alt="">
              <p>{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="couponwrap" v-show="ifcouponwrap">
        <p>选择面额</p>
        <ul>
          <li v-for="(value, index) in btnitems">
            <button :class="{ active:btnstatus[index] }" @click="changeActive(index)">{{ value }}元</button>
          </li>
        </ul>
        <a class="couponwrapbtn" href="javascript:" @click="hideCoupon">确定</a>
      </div>
    </div>
    <div class="packetwrap" v-show="ifpacketwrap" @touchmove.stop.prevent>
      <div class="packetcontent">
        <p class="headline">恭喜您</p>
        <p class="subhead">获得{{ packet.money }}元红包</p>
        <div class="packet">
          <img :src=packet.imgsrc alt="">
          <p><span>￥</span><span>{{ packet.money }}</span></p>
        </div>
        <p class="describe">{{ packet.describe }}</p>
        <a class="packetbtn" href="javascript:" @click="hidePacket">确定</a>
      </div>
    </div>
    <my-footer></my-footer>
  </section>
</template>

<script type="text/ecmascript-6">
  import Crossbar from 'components/coupon/crossbar'
  import myFooter from 'components/common/myfooter'

  export default {
    components: {
      Crossbar,
      myFooter
    },
    data () {
      return {
        banneritem: 'static/img/coupon/coupon/banner.jpg',
        ifpacketwrap: false,
        packet: {
          money: '10.00',
          describe: '（红包金额已自动转入您的钱包，可在个人中心-我的钱包查看）',
          imgsrc: 'static/img/coupon/coupon/packet.png'
        },
        couponnumber: 1,
        ifbgwrap: false,
        ifcategorywrap: false,
        ifcouponwrap: false,
        btnitems: [],
        btnstatus: [],
        categoryitems: [
          {
            title: '女装',
            imgsrc: 'static/img/coupon/coupon/coupon1.png'
          }
        ],
        couponitems: [
          {
            title: '优惠券种类',
            category: '',
            info: 'static/img/common/downarrow.png'
          },
          {
            'title': '面额',
            'category': 10,
            'info': 'static/img/common/downarrow.png'
          },
          {
            'title': '数量'
          },
          {
            'title': '金额'
          }
        ]
      }
    },
    computed: {
      totalpriceInt: function () {
        let totalprice = this.couponnumber * this.couponitems[1].category
        return parseInt(totalprice)
      },
      totalpriceFloat: function () {
        let totalprice = this.couponnumber * this.couponitems[1].category
        return (totalprice - parseInt(totalprice)) > 0 ? (totalprice.toFixed(2) + '').split('.')[1] : '00'
      }
    },
    methods: {
      initialData () {
        let that = this
        this.couponitems[0].category = this.categoryitems[0].title
        this.couponitems[0].discount = this.categoryitems[0].discount
        this.$http({
          method: 'get',
          url: 'static/data/test.json'
        }).then(function (response) {
          that.btnitems = response.data.btnitems
          for (let i = 0; i < that.btnitems.length; i++) {
            that.$set(that.btnstatus, i, false)
          }
        })
      },
      increase () {
        this.couponnumber += 1
      },
      reduce () {
        if (this.couponnumber <= 1) {
          this.couponnumber = 1
          return
        }
        this.couponnumber -= 1
      },
      showCoupon () {
        this.ifbgwrap = true
        this.ifcouponwrap = true
      },
      hideCoupon () {
        this.ifbgwrap = false
        this.ifcouponwrap = false
      },
      showCategory () {
        this.ifbgwrap = true
        this.ifcategorywrap = true
      },
      hideCategory (index) {
        this.couponitems[0].category = this.categoryitems[index].title
        this.couponitems[0].discount = this.categoryitems[index].discount
        this.ifbgwrap = false
        this.ifcategorywrap = false
      },
      showPacket () {
        this.ifpacketwrap = true
      },
      hidePacket () {
        this.ifpacketwrap = false
      },
      changeActive (index) {
        for (let i = 0; i < this.btnitems.length; i++) {
          this.$set(this.btnstatus, i, false)
        }
        this.$set(this.btnstatus, index, true)
        this.couponitems[1].category = this.btnitems[index]
      }
    },
    created () {
      this.initialData()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  img.banneritem {
    width: 100%;
    display: block;
  }

  div.rightpart {
    margin-right: 0.42rem;
    img {
      margin-left: 0.42rem;
      width: 0.3rem;
      height: 0.18rem;
    }
    span {
      color: #919191;
      font-size: 0.32rem;
    }
    .singleprice {
      font-size: 0.36rem;
      color: #e47b00;
      span {
        color: #e47b00;
        font-size: 0.26rem;
      }
    }
    .totalprice {
      font-size: 0.36rem;
      color: #ff2c2c;
      span {
        color: #ff2c2c;
        font-size: 0.26rem;
      }
    }
  }

  .bottominfo {
    margin-top: 0.36rem;
    margin-left: 0.48rem;
    font-size: 0.28rem;
    color: #535353;
    a {
      color: #365aa4;
    }
  }

  .couponbtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ef4949;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.5rem auto 1.19rem;
  }

  .couponbtn:active {
    background: #cc4040;
  }

  .couponwrapbtn {
    display: block;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    background: #ff8a00;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.76rem auto 0;
  }

  .goodscount {
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

  .bgwrap {
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    .categorywrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.2rem;
      width: 80%;
      max-width: 8.28rem;
      font-size: 0.36rem;
      color: #555;
      background: #fff;
      height: 8.3rem;
      border-radius: 0.12rem;
      overflow: auto;
      ul {
        display: flex;
        flex-flow: row wrap;
        li {
          width: 33.3%;
          div {
            margin-top: 0.2rem;
            text-align: center;
            img {
              width: 1.4rem;
              height: 1.4rem;
              display: block;
              margin: 0 auto;
            }
            p {
              font-size: 0.28rem;
              color: #555555;
              margin-top: 0.18rem;
              margin-bottom: 0.18rem;
              display: block;
            }
          }
        }
      }
    }
    .couponwrap {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.3rem 0.42rem 0.32rem;
      width: 90%;
      max-width: 8.28rem;
      box-sizing: border-box;
      font-size: 0.36rem;
      color: #666;
      background: #fff;
      border-radius: 0.12rem;
      ul {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        li {
          width: 33.3%;
          text-align: center;
          button {
            border: 0.01rem solid #ff9a23;
            background: #fff;
            color: #d54600;
            width: 1.78rem;
            height: 0.92rem;
            font-size: 0.38rem;
            margin-top: 0.38rem;
          }
          .active {
            background: #ff8a00;
            color: #fff;
          }
        }
      }
    }
  }

  .packetwrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: url(../../../static/img/coupon/coupon/packetbg.png) no-repeat;
    background-size: 100% 100%;
    z-index: 20;
    .packetcontent {
      width: 60%;
      max-width: 8.28rem;
      position: absolute;
      top: 50%;
      left: 50%;
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
  }

</style>
