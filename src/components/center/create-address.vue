/**
* Created by wolfsheller on 2017/3/17.
* xxx组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <form name="addressform" class="addressul" method="post" @submit.prevent="formcheck">
      <ul class="editaddress">
        <li>
          <div class="firstdiv">收货人：</div>
          <div class="seconddiv"><input type="text" v-model="submitaddr.name" placeholder="请输入收货人姓名" name="username">
          </div>
        </li>
        <li>
          <div class="firstdiv">手机号码：</div>
          <div class="seconddiv"><input type="text" v-model="submitaddr.phone" placeholder="请输入收货人手机号码" name="phone">
          </div>
        </li>
        <li>
          <div class="firstdiv">所在地区：</div>
          <div class="seconddiv">
            <vux-address class="myaddress"></vux-address>
            <!--<img class="rightarrow" :src=arrowitem alt="">-->
          </div>
        </li>
        <li>
          <div class="firstdiv">街道地址：</div>
          <div class="seconddiv">
            <input type="text"
                   v-model="submitaddr.address"
                   placeholder="请输入收货人街道地址"
                   name="address">
          </div>
        </li>
        <li>
          <div><input class="checkbox" type="checkbox" v-model=submitaddr.only></div>
          <div class="defaultword" name="checked">默认地址</div>
        </li>
      </ul>
      <input class="saveaddress" type="submit" value="保存">
    </form>
    <wrap-tips :tipswrap="tipswrap"
               v-if="iftips"
               @change-iftips="changeiftips"></wrap-tips>
    <div class="verifywrap" v-if="ifverify">
      <div class="verifypopup">
        <div class="menupart">
          <p class="tipstitle">{{ verifyinfo }}</p>
        </div>
        <div class="mainpart" @click="closeVerify">好的</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import wrapTips from 'components/common/wrap-tips'
  import vuxAddress from './vuxaddress'
  import {mapState, mapMutations} from 'vuex'
  import {ChinaAddressData, Name2valueFilter as name2value} from 'vux'

  export default {
    components: {
      myHeader,
      vuxAddress,
      wrapTips
    },
    data () {
      return {
        iftrue: true,
        headeritem: '新建地址',
        arrowitem: 'static/img/common/rightarrow.png',
        addressData: ChinaAddressData,
        iftips: false,
        tipswrap: {
          tipstitle: '请输入正确的手机号码',
          tipsinfo: '（正确格式为11位纯数字）'
        },
        verifyinfo: '',
        ifverify: false
      }
    },
    computed: {
      ...mapState({
        addressvalue: state => state.address.addressvalue,
        submitaddr: state => state.address.submitaddr
      })
    },
    methods: {
      changeiftips () {
        this.iftips = false
      },
      closeVerify () {
        this.ifverify = false
      },
      formcheck () {
        let that = this
        let submitaddr = this.submitaddr
        if (!submitaddr.name) {
          this.verifyinfo = '请填写收货人'
          this.ifverify = true
          return
        }
        if (!submitaddr.phone) {
          this.verifyinfo = '请填写收货人手机号码'
          this.ifverify = true
          return
        }
        if (!submitaddr.partment) {
          this.verifyinfo = '请选择收货人所在地区'
          this.ifverify = true
          return
        }
        if (!submitaddr.address) {
          this.verifyinfo = '请填写收货人街道地址'
          this.ifverify = true
          return
        }
        if (!/^1\d{10}$/.test(submitaddr.phone)) {
          this.iftips = true
          return
        }
        if (submitaddr.only === true) {
          this.$store.state.address.submitaddr.only = 1
        } else {
          this.$store.state.address.submitaddr.only = 0
        }
        this.$store.state.address.submitaddr.partment = document.querySelector('.vux-popup-picker-value').innerHTML
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'chanads',
          body: this.submitaddr,
          emulateJSON: true
        }).then(function (response) {
          that.$router.go(-1)
        })
      },
      GetDataFromBackend () {
        let that = this
        this.$store.state.address.submitaddr.type = 0
        let nameId = name2value(that.submitaddr.partment.split(' '), this.addressData)
        this.changeAddress(nameId.split(' '))
      },
      ...mapMutations([
        'changeAddress'
      ])
    },
    created () {
      this.GetDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      if (to.path === '/mall/details/confirm') {
        to.meta.keepAlive = false
      }
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #f6f6f6 !important;
  }

  .addressul {
    width: 100%;
    margin-top: 0.8rem;
    .editaddress {
      li {
        background: #fff;
        height: 0.94rem;
        display: flex;
        border: 0.01rem solid #e7e7e7;
        align-items: center;
        padding-left: 0.22rem;
        .firstdiv {
          line-height: 0.94rem;
          font-size: 0.3rem;
          text-align: right;
          color: #535353;
          white-space: nowrap;
        }
        .seconddiv {
          position: relative;
          height: 0.94rem;
          line-height: 0.94rem;
          width: 100%;
          margin-left: 0.2rem;
          margin-right: 0.2rem;
          font-size: 0.28rem;
          .rightarrow {
            position: absolute;
            right: 5%;
            top: 0.3rem;
            height: 0.34rem;
          }
          input {
            display: block;
            width: 100%;
            line-height: 0.94rem;
          }
        }
        .checkbox {
          width: 0.32rem;
          height: 0.32rem;
        }
        .defaultword {
          margin-left: 0.18rem;
          font-size: 0.28rem;
        }
      }
    }

    .saveaddress {
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
      margin: 0.5rem auto;
    }

    .saveaddress:active {
      background: #cc4040;
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
</style>
