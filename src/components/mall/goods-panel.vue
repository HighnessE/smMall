/**
* Created by wolfsheller on 2017/3/18.
* 商品详情操作弹出层组件
*/
<template>
  <section class="handlepanel" @touchmove.stop.prevent @click="closeHandlepanel">
    <div class="suspendwrap" @click.stop>
      <div class="suspendinfo">
        <div class="suspendimg">
          <div>
            <img :src=handlePanel.detailimg alt="">
          </div>
        </div>
        <div class="suspendcontent">
          <p>￥ {{ handlePanel.detailprice }}</p>
        </div>
        <div>
          <img :src=suspend.closeimg alt="">
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
      <button class="addshopcar" @click="clickHandle" v-if="ifaddorpay">加入购物车</button>
      <button class="buynow" @click="clickRouter" v-else>立即购买</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        countnum: 1,
        suspend: {
          closeimg: ''
        }
      }
    },
    computed: {
      ...mapState({
        ifaddorpay: state => state.handle.ifaddorpay
      }),
      ...mapGetters([
        'handlePanel'
      ])
    },
    methods: {
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
      clickHandle () {
        let that = this
        let ogid = this.$route.query.gid
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'addcart',
          body: {
            gid: ogid,
            number: this.countnum
          },
          emulateJSON: true
        }).then(function (response) {
          if (response.data === 1) {
            that.addShopcarPopup()
          }
        })
        this.closeHandlepanel()
      },
      clickRouter () {
        let ogid = this.$route.query.gid
        this.$router.push({
          path: '/mall/details/confirm',
          query: {
            gid: ogid,
            number: this.countnum,
            status: 1
          }
        })
      },
      ...mapMutations([
        'closeHandlepanel'
      ]),
      ...mapActions([
        'addShopcarPopup'
      ])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
        .suspendclose {

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
