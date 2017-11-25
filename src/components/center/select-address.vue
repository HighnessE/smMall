/**
* Created by wolfsheller on 2017/4/23.
* 确认订单下的选择收货地址组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="addressul">
      <ul v-if="ifhascontent">
        <li v-for="(item,index) in confirmaddressitems">
          <select-addressmodule :addressitems="confirmaddressitems[index]" :oindex="index" @change-active="changeActive"></select-addressmodule>
        </li>
      </ul>
      <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
      <!--<router-link class="newaddress" :to="{ path: '/center/infomation/editaddress' }"-->
                   <!--v-if="ifhascontent || ifnocontent">新建地址-->
      <!--</router-link>-->
      <button class="confirmaddress"
              v-if="ifhascontent || ifnocontent"
              @click="confirmaddress">确定</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import selectAddressmodule from 'components/module/select-addressmodule'
  import noContent from 'components/common/no-content'
  import {mapState, mapMutations} from 'vuex'
  export default {
    components: {
      myHeader,
      selectAddressmodule,
      noContent
    },
    data () {
      return {
        headeritem: '选择收货地址',
        ifhascontent: false,
        ifnocontent: false
      }
    },
    computed: {
      ...mapState({
        confirmaddressitems: state => state.confirm.confirmaddressitems,
        ifselectaddress: state => state.confirm.ifselectaddress
      })
    },
    methods: {
      ...mapMutations([
        'resetAddress'
      ]),
      confirmaddress () {
        this.$store.state.confirm.ifselectaddress = true
        this.$router.go(-1)
      },
      changeActive (msg) {
        this.resetAddress()
        let nowaddress = this.confirmaddressitems[msg]
        nowaddress.ifuseaddress = true
        this.$set(this.$store.state.confirm.confirmaddressitems, msg, nowaddress)
        this.$store.state.confirm.nowaddress = nowaddress
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'address'
        }).then(function (response) {
          let res = response.data
          console.log(JSON.stringify(res))
          if (res.addressitems.length === 0) {
            this.ifnocontent = true
            this.ifhascontent = false
          } else {
            this.ifnocontent = false
            this.ifhascontent = true
          }
          res.addressitems.map(function (item) {
            item.ifuseaddress = false
            return item
          })
          that.$store.state.confirm.confirmaddressitems = res.addressitems
        })
      }
    },
    created () {
      console.log(this.ifselectaddress)
      console.log(JSON.stringify(this.confirmaddressitems))
      if (!this.ifselectaddress) {
        this.GetDataFromBackend()
      } else {
        this.ifnocontent = false
        this.ifhascontent = true
      }
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
    .confirmaddress {
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
</style>
