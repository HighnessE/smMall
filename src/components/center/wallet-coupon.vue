/**
* Created by wolfsheller on 2017/3/3.
* 我的钱包中的我的优惠券组件
*/
<template>
  <div>
    <wallet-coupon-nav :totalitems="totalitems" @arrow-click="arrowClick" @change-handle="changeHandle"
                       @change-pos="changePos" :ifcollapse="ifcollapse"></wallet-coupon-nav>
    <div class="statistics">———— {{ activeitems.title }}优惠券，共{{ activeitems.count }}张 ————</div>
    <div v-for="(value, index) in couponlist">
      <center-module :couponmodule="value"></center-module>
    </div>
    <router-link class="couponbtn" :to="{ path: '/coupon', query: { cid: 1 } }">购买更多优惠券</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import centerModule from 'components/center/c-module'
  import walletCouponNav from './wallet-coupon-nav'

  export default {
    components: {
      centerModule,
      walletCouponNav
    },
    data () {
      return {
        // ‘全部’选项的数据
        totaloption: {'id': '0', 'title': '全部', 'boolean': true},
        // 导航数据
        totalitems: [],
        // 所有优惠券数据
        couponitems: [],
        // 显示的优惠券数据
        couponlist: [],
        // 显示的标识信息
        activeitems: {
          title: '',
          count: ''
        },
        ifcollapse: false,
        downarrow: 'static/img/common/downarrow.png',
        uparrow: 'static/img/common/uparrow.png'
      }
    },
    methods: {
      changeHandle (msg) {
        this.couponlist = []
        for (let item of this.couponitems) {
          if (msg === 0) {
            this.couponlist = this.couponitems
            break
          }
          if (item.cid === this.totalitems[msg].id) {
            this.couponlist.push(item)
          }
        }
        for (let item of this.totalitems) {
          item.boolean = false
        }
        this.totalitems[msg].boolean = true
        this.$set(this.totalitems, msg, this.totalitems[msg])
        this.activeitems.title = this.totalitems[msg].title
        this.activeitems.count = this.couponlist.length
      },
      changePos (msg) {
        this.changeHandle(msg)
        if (msg !== 0) {
          let selectArr = this.totalitems.splice(msg, 1)[0]
          this.totalitems.splice(1, 0, selectArr)
        }
        this.ifcollapse = false
      },
      arrowClick () {
        this.ifcollapse = !this.ifcollapse
      },
      GetDataFromBackend () {
        let that = this
        // 请求nav数据
        this.$http({
          method: 'get',
          url: global.Domain.mallUrl + 'nav'
        }).then(function (response) {
          let res = response.data
          that.totalitems = res
          that.totalitems.map(function (item) {
            item.boolean = false
            return item
          })
          that.totalitems.unshift(that.totaloption)
          // 请求优惠券主体数据
          that.$http({
            method: 'get',
            url: global.Domain.centerUrl + 'mycoupon'
          }).then(function (response) {
            let res = response.data
            that.couponitems = res.couponitems
            for (let totalitem of that.totalitems) {
              that.couponitems.map(function (item) {
                if (totalitem.id === item.cid) {
                  item.condition = totalitem.title
                }
              })
            }
            for (let couponitem of that.couponitems) {
              couponitem.deadline = couponitem.usetime.split('-')
            }
            that.couponlist = that.couponitems
            that.activeitems.title = that.totalitems[0].title
            that.activeitems.count = that.couponlist.length
          })
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  nav {
    font-size: 0;
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    height: 0.66rem;
    z-index: 9;
    .itemwrap {
      position: relative;
      width: 100%;
      background: #fff;
      display: flex;
      .navitems {
        display: inline-block;
        color: #5e5e5e;
        margin: 0.06rem 0.13rem 0.12rem;
        height: 0.48rem;
        text-align: center;
        div {
          display: inline-block;
          font-size: 0.28rem;
          line-height: 0.48rem;
          padding-left: 0.05rem;
          padding-right: 0.05rem;
          a {
            color: #5e5e5e;
          }
        }
        .isactive {
          border-bottom: 0.03rem solid #5e5e5e;
        }
      }
      .navrecommend {
        width: 12%;
      }
      ul.navitemswrap {
        white-space: nowrap;
        width: 78%;
        overflow: auto;
        .navcontent {

        }
      }
      .downarrow, .uparrow {
        float: right;
        z-index: 10;
        width: 10%;
        height: 0.66rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .itemwraper {
      ul {
        width: 90%;
      }
    }
    .collapsewrap {
      width: 100%;
      position: absolute;
      z-index: 9;
      background: #f4f3f3;
      border: 0.01rem solid #c2c2c2;
      box-sizing: border-box;
      top: 0.66rem;
      left: 0;
      .collapseitems {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        text-align: center;
        li {
          color: #475160;
          width: 25%;
          font-size: 0.28rem;
          height: 0.92rem;
          line-height: 0.92rem;
          border-bottom: 0.02rem solid #e6e5e5;
          border-right: 0.02rem solid #e6e5e5;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
        li:nth-child(4n) {
          border-right: none;
        }
      }
      .morebtn {
        color: #475160;
        display: block;
        width: 3.24rem;
        text-align: center;
        margin: 0.16rem auto;
        font-size: 0.24rem;
        line-height: 0.72rem;
        height: 0.72rem;
        border: 0.02rem solid #e9e9e9;
        background: #fff;
        border-radius: 0.12rem;
      }
    }
  }

  .statistics {
    color: #999;
    font-size: 0.28rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    text-align: center;
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
    margin: 0 auto 0.5rem;
  }

  .couponbtn:active {
    background: #cc4040;
  }

  .navlist-enter-active, .navlist-leave-active {
    transition: margin-top 0.5s
  }

  .navlist-enter, .navlist-leave-active {
    margin-top: -4.78rem;
  }
</style>
