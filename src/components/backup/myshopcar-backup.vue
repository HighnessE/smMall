/**
* Created by wolfsheller on 2017/3/15.
* 购物车组件
*/
<template>
  <section>
    <simple-header>
      <h2>{{ headeritem }}</h2>
      <div class="rightpart" slot="rightpart" @click.stop="clickEditShopcar" v-if="ifhascontent">
        <span v-if="shopcar.ifedit">完成</span>
        <span v-else>编辑</span>
      </div>
    </simple-header>
    <div class="content" v-if="ifhascontent">
      <ul>
        <li v-for="(value, index) in shopcaritems">
          <one-shopcar :shopcaritems="value" :index="index"></one-shopcar>
        </li>
      </ul>
    </div>
    <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
    <div class="handlebar" v-if="ifhascontent">
      <div class="minor">
        <div class="checkbox" @click="changeCheckAll">
          <img :src=circleactive alt="" v-if="shopcar.ifcheckall">
          <img :src=circleimg alt="" v-else>
        </div>
        <span>全选</span>
      </div>
      <div class="major" v-if="shopcar.ifaccount">
        <!--<div class="collect" @click="addCollect">移入收藏</div>-->
        <div class="delete" @click="deleteGoods">删除</div>
      </div>
      <div class="major" v-else>
        <div class="total"><span>合计：</span><span>￥{{ shopcar.total }}</span></div>
        <!--<router-link class="count" :to="{ path: '/mall/details/confirm', query: { gid: 1 } }" tag="div">-->
        <!--结算 <span>（{{ shopcar.number }}）</span>-->
        <!--</router-link>-->
        <div class="count" @click="countHandle">
          结算 <span>（{{ shopcar.number }}）</span>
        </div>
      </div>
    </div>
    <wrap-tips v-if="iftips" :tipswrap="tipswrap" @change-iftips="changeIftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import simpleHeader from 'components/common/simpleheader'
  import oneShopcar from 'components/center/one-shopcar'
  import noContent from 'components/common/no-content'
  import wrapTips from 'components/common/wrap-tips'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      simpleHeader,
      oneShopcar,
      noContent,
      wrapTips
    },
    data () {
      return {
        iftips: false,
        headeritem: '购物车',
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png',
        ifnocontent: false,
        ifhascontent: false,
        nocontent: {
          imgsrc: 'static/img/common/noshopcar.png',
          describe1: '暂无商品，赶快去',
          describe2: '挑选',
          describe3: '一些吧'
        },
        tipswrap: {
          tipstitle: '您尚未选择任何商品',
          tipsinfo: '请至少选择一件商品进行结算'
        }
      }
    },
    computed: {
      ...mapState({
        shopcar: state => state.shopcar.shopcar,
        shopcaritems: state => state.shopcar.shopcaritems
      })
    },
    methods: {
      countHandle () {
        let gidArr = []
        for (let item of this.shopcaritems) {
          if (item.ifcheck) {
            gidArr.push(item.id)
          }
        }
        console.log(gidArr)
        this.$router.push({
          path: '/center/shopcar/confirm',
          query: {cid: gidArr}
        })
      },
      changeIftips () {
        this.iftips = false
      },
      ...mapMutations([
        'changeCheckAll',
        'editShopcar',
        'finishShopcar'
      ]),
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'cart'
        }).then(function (response) {
          let res = response.data
          let totalPrice = 0
          let totalCount = 0
          if (res.cartitems.length === 0) {
            that.ifnocontent = true
            that.ifhascontent = false
          } else {
            that.ifnocontent = false
            that.ifhascontent = true
          }
          res.cartitems.map(function (item) {
            if (that.$store.state.shopcar.shopcar.ifcheckall) {
              item.ifcheck = true
              totalPrice += parseFloat(item.price) * parseInt(item.number)
              that.$store.state.shopcar.shopcar.total = totalPrice.toFixed(2) + ''
              totalCount += parseInt(item.number)
              that.$store.state.shopcar.shopcar.number = totalCount
            } else {
              item.ifcheck = false
            }
            item.ifedit = false
            return item
          })
          that.$store.state.shopcar.shopcaritems = res.cartitems
          if (that.$store.state.shopcar.shopcar.ifedit) {
            that.editShopcar()
          }
        })
      },
      clickEditShopcar () {
        let that = this
        let chanArr = []
        if (this.shopcar.ifedit) {
          for (let item of this.shopcaritems) {
            let orderId = {
              id: parseInt(item.id),
              number: parseInt(item.number)
            }
            chanArr.push(orderId)
          }
          if (chanArr.length === 0) {
            return
          }
          this.$http({
            method: 'post',
            url: global.Domain.mallUrl + 'chancart',
            body: {
              num: JSON.stringify(chanArr)
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.finishShopcar()
            }
          })
        } else {
          this.editShopcar()
        }
      },
//      addCollect () {
//      },
      deleteGoods () {
        let that = this
        let delArr = []
        for (let item of this.shopcaritems) {
          if (item.ifcheck) {
            delArr.push(parseInt(item.id))
          }
        }
        if (delArr.length === 0) {
          return
        }
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'delcart',
          body: {
            oid: JSON.stringify(delArr)
          },
          emulateJSON: true
        }).then(function (response) {
          console.log(JSON.stringify(response.data))
          if (response.data === 1) {
            that.GetDataFromBackend()
            that.editShopcar()
          }
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      if (to.path === '/center/shopcar/confirm') {
        to.meta.keepAlive = false
      }
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  h2 {
    width: 70%;
    font-size: 0.3rem;
    color: #1f1f1f;
  }

  .rightpart {
    line-height: 0.38rem;
    font-size: 0.26rem;
  }

  .content {
    margin-top: 0.8rem;
    margin-bottom: 0.9rem;
  }

  .handlebar {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff;
    .minor {
      padding: 0.24rem;
      display: flex;
      line-height: 0.48rem;
      .checkbox {
        width: 0.4rem;
        margin-right: 0.28rem;
        img {
          width: 100%;
        }
      }
      span {
        color: #31313a;
        font-size: 0.3rem;
      }
    }
    .major {
      display: flex;
      .total {
        margin-right: 0.2rem;
        span:first-child {
          font-size: 0.3rem;
          color: #555555;
        }
        span:last-child {
          font-size: 0.3rem;
          color: #f05555;
        }
      }
      .count {
        height: 0.9rem;
        width: 1.72rem;
        background: #f05555;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
        span {
          font-size: 0.24rem;
        }
      }
      .collect {
        height: 0.9rem;
        width: 1.72rem;
        background: #f3981b;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
      }
      .delete {
        height: 0.9rem;
        width: 1.72rem;
        background: #f05555;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
      }
    }
  }
</style>
