/**
* Created by wolfsheller on 2017/2/22.
*/
<template>
  <section>
    <img class="banneritem" :src=banneritem alt="">
    <a href="javascript:" @click="showAgentrule">
      <cross-bar :crossitems=agentitems[0]>
        <img class="imgitem" :src=agentitems[0].info>
      </cross-bar>
    </a>
    <router-link :to="{ path: '/agent/junior' }">
      <cross-bar :crossitems=agentitems[1]>
        <img class="imgitem" :src=agentitems[1].info>
      </cross-bar>
    </router-link>
    <a href="javascript:" @click="showQrcode">
      <div class="graybar"></div>
      <cross-bar :crossitems=qrcode>
        <img class="imgitem" :src=qrcode.info>
      </cross-bar>
    </a>
    <div class="rulewrap" v-show="ifagentrule" @click="hideAgentrule">
      <div class="agentrule">
        <img :src=ruleitems.imgsrc alt="">
        <div class="text" ref="text"></div>
      </div>
    </div>
    <wrap-code v-if="ifcodewrap" @hide-qrcode="hideQrcode"></wrap-code>
    <my-footer></my-footer>
  </section>
</template>

<script type="text/ecmascript-6">
  import crossBar from 'components/center/crossbar'
  import myFooter from 'components/common/myfooter'
  import wrapCode from 'components/common/wrap-code'

  export default {
    components: {
      crossBar,
      wrapCode,
      myFooter
    },
    data () {
      return {
        ifcodewrap: false,
        ifagentrule: false,
        ruleitems: {},
        banneritem: 'static/img/agent/agent/banner.jpg',
        codeitems: {},
        agentitems: [
          {
            'title': '代理返现规则',
            'imgsrc': 'static/img/common/pin.png',
            'info': 'static/img/common/rightarrow.png'
          },
          {
            'title': '我的下级',
            'imgsrc': 'static/img/common/level.png',
            'info': 'static/img/common/rightarrow.png'
          }
        ],
        qrcode: {
          'title': '推荐二维码',
          'imgsrc': 'static/img/center/info/code1.png',
          'info': 'static/img/center/info/code2.png'
        }
      }
    },
    methods: {
      showQrcode () {
        this.ifcodewrap = true
      },
      hideQrcode () {
        this.ifcodewrap = false
      },
      showAgentrule () {
        this.ifagentrule = true
      },
      hideAgentrule () {
        this.ifagentrule = false
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.agentUrl + 'rule'
        }).then(function (response) {
          let res = response.data
          that.ruleitems = res.ruleitems
          this.$refs.text.innerHTML = this.ruleitems.text
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .banneritem {
    width: 100%;
    display: block;
  }

  .imgitem {
    margin-right: 0.38rem;
    height: 0.32rem;
  }

  .graybar {
    height: 0.2rem;
  }

  a:active {
    background: #f6f6f6;
  }

  .rulewrap {
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    .agentrule {
      width: 90%;
      max-width: 8.28rem;
      height: 8.75rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #e4e263;
      box-sizing: border-box;
      border-radius: 0.14rem;
      overflow: auto;
      img {
        width: 100%;
      }
      div.text {
        display: inline-block;
        padding: 0.24rem 0.33rem;
        font-size: 0.24rem;
        line-height: 0.48rem;
        color: #1f1f1f;
      }
    }
  }
</style>
