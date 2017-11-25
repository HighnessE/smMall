/**
* Created by wolfsheller on 2017/3/15.
* 同城商品确认订单组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="confirmorder">
      <div class="orderinfobox">
        <div class="ifhasaddress" v-if="ifhasaddress">
          <button class="newaddressbtn" @click="gotocreateaddr">新建地址</button>
        </div>
        <router-link class="useraddress" :to="{ path: '/mall/details/confirm/address' }" tag="div" v-else>
          <div class="minor">
            <img :src=addressimg alt="">
          </div>
          <div class="major">
            <p class="userinfo"><span>{{ nowaddress.name }}</span><span>{{ nowaddress.phone }}</span></p>
            <p class="useraddr">{{ nowaddress.partment }}{{ nowaddress.address }}</p>
          </div>
        </router-link>
        <div class="graybar"></div>
        <router-link class="merchantinfo"
                     :to="{ path: '/merchant/details', query: { bid: salleritems.id } }"
                     tag="h4">
          {{ salleritems.t_bname }}
          <img :src=rightarrow alt="">
        </router-link>
        <ul>
          <li class="orderinfo" v-for="item in marketgooditems">
            <div class="orderimg"><img :src=item.t_mainpic alt=""></div>
            <div class="orderright">
              <div class="orderfirst">
                <div class="goodname">{{ item.t_name }}</div>
                <div>
                  <div>￥ {{ item.t_price }}</div>
                  <div class="goodnum">x {{ item.number }}</div>
                </div>
              </div>
              <!--<div class="ordersecondline">-->
              <!--<span>颜色：{{ needorders.color }} 尺码: {{ needorders.size }}</span>-->
              <!--</div>-->
              <!--<div class="ordertotal">-->
              <!--共 {{ item.number }} 件合计 ￥ {{ calculate }}-->
              <!--</div>-->
            </div>
          </li>
        </ul>
        <div class="ordertotal">共 {{ marketcalculatenum }} 件合计 ￥ {{ marketcalculate }}</div>
        <div class="graybar"></div>
        <div class="buyermsg">
          <div>买家留言：</div>
          <div class="inputcontent">
            <input type="text" v-model="marketorderinfo.remark" placeholder="填写与商家协商一致的内容">
          </div>
        </div>
      </div>
      <div class="handlebar">
        <div class="exactlyinfo">
          <div class="exactlyprice">
            实付款：<span class="exactlyspan">￥{{ marketcalculate }}元</span>
          </div>
        </div>
        <button class="submitorder" @click="submitorder">提交订单</button>
      </div>
    </div>
    <wrap-marketpay v-if="ifpayway"
                    @close-paywrap="closepaywrap"></wrap-marketpay>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapMarketpay from './wrap-marketpay'
  import {mapState, mapGetters} from 'vuex'

  export default {
    components: {
      myHeader,
      wrapMarketpay
    },
    data () {
      return {
        ifpayway: false,
        headeritem: '确认订单',
        addressimg: 'static/img/common/position.png',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png',
        rightarrow: 'static/img/common/rightarrow.png'
      }
    },
    computed: {
      ...mapState({
        nowaddress: state => state.confirm.nowaddress,
        ifhasaddress: state => state.confirm.ifhasaddress,
        marketgooditems: state => state.merchantpay.marketgooditems,
        marketorderinfo: state => state.merchantpay.marketorderinfo,
        salleritems: state => state.merchantpay.salleritems,
        confirmaddressitems: state => state.confirm.confirmaddressitems
      }),
      ...mapGetters([
        'marketcalculate',
        'marketcalculatenum'
      ])
    },
    methods: {
      gotocreateaddr () {
        this.$router.push({path: '/center/infomation/createaddress'})
      },
      submitorder () {
        let nowaddress = this.nowaddress
        this.$store.state.merchantpay.marketorderinfo.address = nowaddress.partment + nowaddress.address
        this.$store.state.merchantpay.marketorderinfo.name = nowaddress.name
        this.$store.state.merchantpay.marketorderinfo.phone = nowaddress.phone
        this.ifpayway = true
      },
      closepaywrap () {
        this.ifpayway = false
      },
      getDataFromBackend () {
        let that = this
        let agid = this.$route.query.gid
        let anumber = this.$route.query.number
        if (typeof agid === 'string') {
          agid = [agid]
          anumber = [anumber]
        }
        this.$store.state.merchantpay.marketorderinfo.gid = agid
        this.$store.state.merchantpay.marketorderinfo.number = anumber
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'cordsure',
          body: {
            gid: JSON.stringify(agid)
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (Object.keys(res.addressitems).length !== 0) {
            that.$store.state.confirm.ifhasaddress = false
            that.$store.state.confirm.nowaddress = res.addressitems
          } else {
            that.$store.state.confirm.ifhasaddress = true
          }
          res.gooditems.map(function (item, index) {
            item.number = anumber[index]
          })
          that.$store.state.merchantpay.marketgooditems = res.gooditems
          that.$store.state.merchantpay.salleritems = res.salleritems
        })
      },
      checkValue () {
        if (!this.confirmaddressitems) {
          return false
        }
        for (let item of this.confirmaddressitems) {
          if (item.ifuseaddress) {
            return true
          }
        }
        return false
      }
    },
    created () {
      if (!this.checkValue()) {
        this.getDataFromBackend()
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('resetMarkethandleData')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #eaeaea !important;
  }

  .graybar {
    height: 0.2rem;
  }

  .confirmorder {
    position: absolute;
    top: 0.8rem;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #eaeaea;
    .orderinfobox {
      .useraddress {
        background: #fff;
        display: flex;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ccc;
        .minor {
          width: 0.54rem;
          display: flex;
          align-items: center;
          img {
            width: 0.38rem;
            height: 0.44rem;
          }
        }
        .major {
          flex: 1;
          margin-left: 0.18rem;
          color: #49515c;
          font-size: 0.28rem;
          .userinfo {
            display: flex;
            justify-content: space-between;
            line-height: 0.38rem;
          }
          .useraddr {
            margin-top: 0.18rem;
            line-height: 0.38rem;
          }
        }
      }
      .useraddress:active {
        background: #f6f6f6;
      }
      .merchantinfo {
        background: #fff;
        height: 0.84rem;
        font-size: 0.3rem;
        color: #333;
        padding-left: 0.26rem;
        border-bottom: 0.01rem solid #838383;
        display: flex;
        align-items: center;
        img {
          height: 0.3rem;
          margin-left: 0.2rem;
        }
      }
      .merchantinfo:active {
        background: #f6f6f6;
      }
      .orderinfo {
        background: #fff;
        height: 1.58rem;
        font-size: 0;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ccc;
        display: flex;
        .orderimg {
          width: 1.58rem;
          height: 1.58rem;
          img {
            height: 1.58rem;
            width: 1.58rem;
          }
        }
        .orderright {
          position: relative;
          width: 100%;
          margin-left: 0.22rem;
          height: 1.58rem;
          .orderfirst {
            margin-left: 0.1rem;
            display: flex;
            justify-content: space-between;
            color: #2a2a2a;
            font-size: 0.26rem;
            line-height: 0.32rem;
            .goodname {
              flex: 1;
            }
            .goodnum {
              margin-top: 0.12rem;
              text-align: right;
            }
          }
        }
      }
      .ordertotal {
        background: #fff;
        height: 0.88rem;
        padding: 0 0.3rem;
        text-align: right;
        font-size: 0.28rem;
        line-height: 0.88rem;
      }
      .usecoupon {
        height: 0.88rem;
        background: #fff;
        border-bottom: 0.01rem solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        .couponmsg {
          font-size: 0.26rem;
          line-height: 0.88rem;
          color: #494949;
          .redword {
            color: #e33636;
            font-size: 0.28rem;
          }
        }
        .circle {
          width: 0.44rem;
          img {
            width: 100%;
          }
        }
      }
      .usefee {
        height: 0.88rem;
        background: #fff;
        border-bottom: 0.01rem solid #e0e0e0;
        padding: 0 0.3rem;
        line-height: 0.88rem;
        font-size: 0.26rem;
        color: #494949;
      }
      .buyermsg {
        font-size: 0.26rem;
        background: #fff;
        height: 0.88rem;
        display: flex;
        align-items: center;
        padding: 0 0.3rem;
        margin-bottom: 1.92rem;
        .inputcontent {
          flex: 1;
          input {
            width: 100%;
          }
        }
      }
    }
    .handlebar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.92rem;
      background: #fff;
      display: flex;
      .exactlyinfo {
        height: 0.92rem;
        flex: 1;
        text-align: right;
        margin-right: 0.4rem;
        .exactlyprice {
          line-height: 0.92rem;
          /*margin-top: 0.14rem;*/
          font-size: 0.3rem;
          color: #555;
          .exactlyspan {
            color: #f05555;
          }
        }
        .exactlycoupon {
          margin-top: 0.1rem;
          font-size: 0.24rem;
          color: #8a8a8a;
        }
      }
      .submitorder {
        width: 1.92rem;
        height: 0.92rem;
        background: #f05555;
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }

  .verifywrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .verifypopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      text-align: center;
      .menupart {
        border-bottom: 0.01rem solid #e7e7e7;
        box-sizing: border-box;
        .tipstitle {
          line-height: 1.28rem;
          color: #333;
          font-size: 0.34rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }

  .ifhasaddress {
    padding: 0.5rem 0;
    background: #fff;
    .newaddressbtn {
      display: block;
      width: 70%;
      text-align: center;
      padding-left: 0.21rem;
      padding-right: 0.21rem;
      border-radius: 0.1rem;
      background: #fff;
      color: #3f3853;
      border: 0.01rem solid #b4babe;
      font-size: 0.3rem;
      height: 0.82rem;
      line-height: 0.82rem;
      margin: 0 auto;
    }
    .newaddressbtn:active {
      background: #f6f6f6;
    }
  }
</style>
