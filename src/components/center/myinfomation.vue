/**
* Created by wolfsheller on 2017/3/15.
* 我的资料组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <ul>
      <li class="headimgli">
        <cross-bar :crossitems=crossitems[0]>
          <img class="headimg" :src=useritems.headimg alt="">
        </cross-bar>
      </li>
      <li class="usernameli">
        <cross-bar :crossitems=crossitems[1]>
          <div class="username">{{ useritems.nickname }}</div>
        </cross-bar>
      </li>
      <li class="phoneli">
        <cross-bar :crossitems=crossitems[2]>
          <input class="phone" @focus="showEditbtn" v-model="useritems.phone" name="phone" ref="phone" placeholder="请输入您的手机号">
        </cross-bar>
      </li>
      <li class="addressli">
        <div class="graybar"></div>
        <router-link :to="{ path: '/center/infomation/address' }">
          <cross-bar :crossitems=crossitems[3]>
            <img class="address" :src=crossitems[3].arrow>
          </cross-bar>
        </router-link>
      </li>
      <li class="codeli">
        <div class="graybar"></div>
        <cross-bar :crossitems=crossitems[4] @click.native="showQrcode">
          <img class="code" :src=crossitems[4].code>
        </cross-bar>
      </li>
    </ul>
    <wrap-code v-if="ifcodewrap" @hide-qrcode="hideQrcode"></wrap-code>
    <button class="couponbtn" v-if="ifeditphone" @click="hideEditbtn">确定修改</button>
    <wrap-tips :tipswrap="tipswrap" v-if="iftips" @change-iftips="changeiftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import crossBar from 'components/center/crossbar'
  import wrapTips from 'components/common/wrap-tips'
  import wrapCode from 'components/common/wrap-code'

  export default {
    components: {
      myHeader,
      wrapCode,
      crossBar,
      wrapTips
    },
    data () {
      return {
        ifcodewrap: false,
        headeritem: '我的资料',
        ifeditphone: false,
        crossitems: [
          {
            'title': '头像',
            'imgsrc': 'static/img/center/info/header.png'
          },
          {
            'title': '用户名',
            'imgsrc': 'static/img/center/info/user.png'
          },
          {
            'title': '手机号码',
            'imgsrc': 'static/img/center/info/phone.png'
          },
          {
            'title': '收货地址',
            'imgsrc': 'static/img/center/info/address.png',
            'arrow': 'static/img/common/rightarrow.png'
          },
          {
            'title': '推荐二维码',
            'imgsrc': 'static/img/center/info/code1.png',
            'code': 'static/img/center/info/code2.png'
          }
        ],
        useritems: [],
        iftips: false,
        codeitems: {},
        tipswrap: {
          tipstitle: '请输入正确的手机号码',
          tipsinfo: '（正确格式为11位纯数字）'
        }
      }
    },
    methods: {
      changeiftips () {
        this.iftips = false
      },
      showEditbtn () {
        this.ifeditphone = true
      },
      hideEditbtn () {
        let oInput = this.$refs.phone.value
        if (!/^1\d{10}$/.test(this.useritems.phone)) {
          this.iftips = true
        } else {
          this.$http({
            method: 'post',
            url: global.Domain.centerUrl + 'phone',
            body: {
              phone: oInput
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              this.ifeditphone = false
            }
          })
        }
      },
      closetipswrap () {
        this.iftips = false
      },
      showQrcode () {
        this.ifcodewrap = true
      },
      hideQrcode () {
        this.ifcodewrap = false
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'infomation'
        }).then(function (response) {
          let res = response.data
          that.useritems = res.useritems[0]
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul {
    margin-top: 0.8rem;
    width: 100%;
    .headimgli {
      height: 1.44rem;
      border-bottom: 0.01rem solid #e5e5e5;
      .headimg {
        height: 1.02rem;
        margin-right: 0.38rem;
        border-radius: 50%;
        display: block;
      }
    }
    .usernameli, phoneli {
      height: 1.02rem;
      border-bottom: 0.01rem solid #e5e5e5;
    }
    .username, .address, .code {
      display: block;
      margin-right: 0.38rem;
      height: 0.28rem;
      font-size: 0.28rem;
      color: #252525;
    }
    .phone {
      display: block;
      height: 100%;
      text-align: right;
      margin-right: 0.38rem;
      font-size: 0.28rem;
    }
    .addressli {
      .graybar {
        height: 0.2rem;
      }
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
    margin: 1.2rem auto 0.5rem;
  }
</style>
