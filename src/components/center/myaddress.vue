/**
* Created by wolfsheller on 2017/3/15.
* 商品地址组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="addressul">
      <ul v-if="ifhascontent">
        <li v-for="(item,index) in addressitems">
          <one-address :addressitems="addressitems[index]" @delete-address="deleteAddress"></one-address>
        </li>
      </ul>
      <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
      <router-link class="newaddress" :to="{ path: '/center/infomation/editaddress' }" v-if="ifhascontent || ifnocontent">新建地址</router-link>
    </div>
    <wrap-function v-if="iffunctionwrap" :popupitems="functionitems" @confirm-btn="confirm" @close-popup="closePopup">
      <p class="popuptitle">您确认要删除该地址吗？</p>
    </wrap-function>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneAddress from 'components/module/one-address'
  import wrapFunction from 'components/common/wrap-function'
  import noContent from 'components/common/no-content'
  import {mapState} from 'vuex'

  export default {
    components: {
      myHeader,
      oneAddress,
      wrapFunction,
      noContent
    },
    data () {
      return {
        headeritem: '收货地址',
        functionitems: {
          affirmbtn: '确定',
          cancelbtn: '我再想想'
        },
        iffunctionwrap: false,
        ifnocontent: false,
        ifhascontent: false,
        nocontent: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '暂无收货地址',
          describe2: '',
          describe3: ''
        },
        indexmsg: ''
      }
    },
    computed: {
      ...mapState({
        addressitems: state => state.address.addressitems
      })
    },
    methods: {
      deleteAddress (indexmsg) {
        this.indexmsg = indexmsg
        this.iffunctionwrap = true
      },
      confirm () {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'delads',
          body: {
            adid: this.indexmsg
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res === 1) {
            that.GetDataFromBackend()
            this.iffunctionwrap = false
          }
        })
      },
      closePopup (msg) {
        this.iffunctionwrap = msg
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'address'
        }).then(function (response) {
          let res = response.data
          if (res.addressitems.length === 0) {
            this.ifnocontent = true
            this.ifhascontent = false
          } else {
            this.ifnocontent = false
            this.ifhascontent = true
          }
          that.$store.state.address.addressitems = res.addressitems
        })
      }
    },
    created () {
      this.GetDataFromBackend()
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
    .newaddress {
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
    .newaddress:active {
      background: #cc4040;
    }
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }
</style>
