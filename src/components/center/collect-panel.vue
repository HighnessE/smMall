/**
* Created by wolfsheller on 2017/3/29.
* 我的收藏弹出层组件
*/
<template>
  <section class="handlepanel" @touchmove.stop.prevent @click="closePanel">
    <div class="suspendwrap" @click.stop>
      <div class="suspendinfo">
        <div class="suspendimg">
          <div>
            <img :src=detailimg alt="">
          </div>
        </div>
        <div class="suspendcontent">
          <p>￥ {{ detailprice }}</p>
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
            <div class="buynumber">{{ buynumber }}</div>
            <div class="increase" @click="increase">＋</div>
          </div>
        </div>
      </div>
      <div class="collectbtn">
        <button class="addshopcar" @click="addshopcar">加入购物车</button>
        <button class="buybtn" @click="clickRouter">立即购买</button>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'collect-panel',
    props: ['detailimg', 'detailprice'],
    data () {
      return {
        buynumber: 1,
        suspend: {
          closeimg: ''
        }
      }
    },
    methods: {
      clickRouter () {
        let onumber = this.buynumber
        this.$emit('click-router', onumber)
      },
      increase () {
        this.buynumber += 1
      },
      reduce () {
        if (this.buynumber <= 1) {
          this.buynumber = 1
          return
        }
        this.buynumber -= 1
      },
      closePanel () {
        this.$emit('close-panel', false)
      },
      addshopcar () {
        let onumber = this.buynumber
        this.$emit('add-shopcar', onumber)
      }
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
            .buynumber {
              height: 0.6rem;
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
      .collectbtn {
        font-size: 0;
        .addshopcar, .buybtn {
          height: 0.92rem;
          color: #fff;
          font-size: 0.28rem;
          width: 50%;
          display: inline-block;
        }
        .addshopcar {
          background: #ff9333;
        }
        .buybtn {
          background: #f05455;
        }
      }
    }
  }

</style>
