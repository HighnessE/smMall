/**
* Created by wolfsheller on 2017/3/31.
* 个人二维码弹窗组件
*/
<template>
  <section class="codewrap" @click="hideQrcode">
    <div class="codecontent">
      <div class="codemainbody">
        <div class="menupart">
          <div class="minor">
            <img :src=codeitems.headimg alt="">
          </div>
          <div class="major">
            <p class="maintype">{{ codeitems.nickname }}</p>
            <p class="subtype">{{ codeitems.content }}</p>
            <p class="subtype2">会员ID：{{ codeitems.hid }}</p>
          </div>
        </div>
        <div class="mainpart">
          <vux-qrcode :qrcode="codeitems.code"></vux-qrcode>
        </div>
        <p class="subpart">扫一扫二维码，关注我，即可成为我的粉丝哦</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import vuxQrcode from 'components/common/vux-qrcode'
  export default {
    components: {
      vuxQrcode
    },
    data () {
      return {
        codeitems: {}
      }
    },
    methods: {
      hideQrcode () {
        this.$emit('hide-qrcode')
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'code'
        }).then(function (response) {
          let res = response.data
          that.codeitems = res.codeitems
          that.codeitems.content = res.mallitems.content
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .codewrap {
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    .codecontent {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      max-width: 8.28rem;
      min-height: 7.68rem;
      background: #fff url('../../assets/packimg/codebg.png');
      background-size: 100% 100%;
      border-radius: 0.14rem;
      .codemainbody {
        width: 100%;
        height: 100%;
        padding: 0.42rem 0.33rem;
        box-sizing: border-box;
        .menupart {
          height: 1.52rem;
          display: flex;
          .minor {
            margin-left: 0.12rem;
            img {
              border-radius: 50%;
              width: 1.32rem;
              height: 1.32rem;
            }
          }
          .major {
            margin-left: 0.24rem;
            margin-top: 0.12rem;
            .maintype {
              color: #2e2e2e;
              font-size: 0.32rem;
            }
            .subtype {
              color: #888888;
              font-size: 0.24rem;
              margin-top: 0.16rem;
            }
            .subtype2 {
              color: #888888;
              font-size: 0.24rem;
              margin-top: 0.12rem;
            }
          }
        }
        .mainpart {
          width: 100%;
          margin: 0 auto;
          padding: 0.36rem;
          box-sizing: border-box;
          background: #fff;
        }
        .subpart {
          margin-top: 0.24rem;
          font-size: 0.24rem;
          color: #888888;
          text-align: center;
          line-height: 0.34rem;
        }
      }
    }
  }
</style>
