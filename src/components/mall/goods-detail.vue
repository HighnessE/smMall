/**
* Created by wolfsheller on 2017/3/15.
* 商品详情组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="blockdiv"></div>
    <my-swiper :banneritems="banneritems"></my-swiper>
    <div class="goodsdetail">
      <div class="gooditems">
        <h3 class="title">{{ gooditems.name }}</h3>
        <div class="currentprice">
          <div class="price">￥{{ gooditems.price }}</div>
          <div class="coupon">优惠券可抵{{ gooditems.coupon }}元</div>
        </div>
        <div class="littleword">
          <div>原价：
            <del>{{ gooditems.price }}</del>
          </div>
          <div>邮费：{{ gooditems.fee }}</div>
          <div>已售：{{ gooditems.sale }}</div>
        </div>
      </div>
    </div>
    <div class="comment">
      <router-link :to="{ path: '/mall/comment', query: { gid: gooditems.comurl } }">
        <h3 class="title">评价（ {{ gooditems.comment }}）</h3>
      </router-link>
    </div>
    <div class="moredetail">
      <h3 class="detailtitle">图文详情</h3>
      <div class="special" ref="inilize">
      </div>
    </div>
    <goods-handle @contact-server="contactServer"></goods-handle>
    <handle-panel v-if="ifhandlepanel"></handle-panel>
    <transition name="collect">
      <div class="collectpopupwrap" v-if="ifcollectwrap">
        <div class="collectpopup">
          <p>{{ collectmsg }}</p>
        </div>
      </div>
    </transition>
    <wrap-servercode v-if="ifservercode" @close-servercode="closeServercode"></wrap-servercode>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import mySwiper from 'components/common/myswiper'
  import goodsHandle from './goods-handle'
  import handlePanel from './goods-panel'
  import wrapServercode from 'components/common/wrap-servercode'
  import {mapState} from 'vuex'

  export default {
    components: {
      myHeader,
      mySwiper,
      goodsHandle,
      handlePanel,
      wrapServercode
    },
    data () {
      return {
        ifservercode: false,
        'headeritem': '商品详情',
        banneritems: [],
        inilizecon: [],
        detailitems: {
          imgsrc: ''
        }
      }
    },
    computed: {
      ...mapState({
        ifhandlepanel: state => state.handle.ifhandlepanel,
        ifcollectwrap: state => state.handle.ifcollectwrap,
        collectmsg: state => state.handle.collectmsg,
        gooditems: state => state.handle.gooditems
      })
    },
    methods: {
      closeServercode () {
        this.ifservercode = false
      },
      contactServer () {
        this.ifservercode = true
      },
      getDataFromBackend () {
        let that = this
        let ogid = this.$route.query.gid
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'goods',
          body: {
            gid: ogid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.banneritems = res.banneritems
          function decodeHtml (str) {
            var d = document.createElement('div')
            d.innerHTML = str
            return d.innerText
          }
          this.$refs.inilize.innerHTML = '' + decodeHtml(res.gooditems.content)
          that.$store.state.handle.ifcollect = res.iscolitems
          that.$store.state.handle.gooditems = res.gooditems
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('resetConfirmState')
      this.$store.commit('closeHandlepanel')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .blockdiv {
    height: 0.8rem;
    width: 100%;
  }
  .swiper {
    width: 100%;
    .vux-indicator {
      bottom: 0.2rem !important;
      a {
        margin-left: 0.1rem !important;
        i {
          width: 0.2rem !important;
          height: 0.2rem !important;
          border-radius: 50% !important;
        }
      }
    }
    .banneritems {
      img {
        display: block;
        width: 100%
      }
    }
  }

  .gooditems {
    padding: 0.28rem 0.28rem 0.26rem 0.28rem;
    border-bottom: 0.16rem solid #eee;
    .title {
      color: #333;
      font-size: 0.28rem;
      line-height: 0.5rem;
    }
    .currentprice {
      display: flex;
      .price {
        font-size: 0.42rem;
        line-height: 0.82rem;
        height: 0.82rem;
        color: #ff226f;
      }
      .coupon {
        font-size: 0.18rem;
        color: #fff;
        background: #f57c33;
        height: 0.28rem;
        padding: 0 0.08rem;
        line-height: 0.28rem;
        border-radius: 0.08rem;
        margin-top: 0.3rem;
        margin-left: 0.14rem;
      }
    }
    .littleword {
      display: flex;
      color: #666;
      font-size: 0.26rem;
      text-align: center;
      justify-content: space-between;
    }
  }

  .comment {
    height: 0.76rem;
    border-bottom: 0.16rem solid #eee;
    padding: 0 0.28rem;
    .title {
      font-size: 0.3rem;
      color: #555;
      line-height: 0.76rem;
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

  .collectpopupwrap {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 0.8rem;
    transform: translate(-50%, -50%);
    z-index: 20;
    .collectpopup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      padding: 0 0.2rem;
      height: 0.8rem;
      border-radius: 0.12rem;
      p {
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.8rem;
        color: #fff;
      }
    }
  }

  .collect-enter-active, .collect-leave-active {
    transition: opacity 0.5s;
  }

  .collect-enter, .collect-leave-active {
    opacity: 0;
  }
</style>
