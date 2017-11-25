/**
* Created by wolfsheller on 2017/3/22.
* 同城的地址选择器组件
*/
<template>
  <section class="meraddress2">
    <x-address :title="addresstitle"
               v-model="addressarea"
               :list="addressData"
               @on-hide="changeWord"></x-address>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {XAddress, ChinaAddressData, Name2valueFilter as name2value} from 'vux'
  export default {
    components: {
      XAddress,
      ChinaAddressData
    },
    data () {
      return {
        addresstitle: '',
        addressData: ChinaAddressData
      }
    },
    computed: {
      addressarea: {
        get () {
          return this.$store.state.merchant.addressarea
        }
      },
      ...mapState({
        nowpartment: state => state.merchant.nowpartment,
        nowmap: state => state.merchant.nowmap,
        newcid: state => state.merchant.newcid
      })
    },
    methods: {
      changeWord () {
        let meraddress2 = document.querySelector('.meraddress2 .vux-popup-picker-value').innerHTML.split(' ')
        console.log(meraddress2)
        if (meraddress2.length !== 3) {
          return
        }
        let valueId = name2value(meraddress2, this.addressData).split(' ')
        this.$store.commit('updateMessage', valueId)
        this.$store.state.merchant.nowpartment = meraddress2.join('')
        let that = this
        if (this.newcid === 0) {
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'index',
            body: {
              partment: that.nowpartment,
              cid: this.newcid,
              map: this.nowmap
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            that.$store.state.merchant.merchantitems = res.indexitems
            that.$store.state.merchant.onemerchantitems = res.indexitems[0].listitems
          })
        } else {
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'index',
            body: {
              partment: that.nowpartment,
              cid: this.newcid,
              map: this.nowmap
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            that.$store.state.merchant.merchantitems = res.indexitems
          })
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .meraddress {
    display: flex;
    .vux-cell-box {
      width: 100%;
      line-height: 0.49rem;
      height: 0.49rem !important;
      overflow: hidden;
      .weui-cell.vux-tap-active.weui-cell_access {
        padding: 0 0.1rem;
        .vux-popup-picker-value {
          font-size: 0.28rem !important;
          padding: 0 !important;
        }
      }
    }
  }

  .scroller-component {
    height: 5.76rem !important;
  }

  .scroller-mask {
    background-size: 100% 2.55rem !important;
  }

  .scroller-content {
    top: -0.12rem !important;
  }

  .scroller-item {
    font-size: 0.3rem !important;
    height: 0.66rem !important;
    line-height: 0.66rem !important;
  }

  .scroller-indicator {
    height: 0.66rem !important;
    top: 2.54rem !important;
  }

  .vux-popup-picker-header {
    height: 0.96rem !important;
    line-height: 0.96rem !important;
  }

  .vux-popup-picker-header-menu {
    line-height: 0.96rem !important;
    text-align: center !important;
    color: #333;
    font-size: 0.34rem;
    background: #f6f6f6;
  }

  .vux-popup-picker-header-menu-right {
    background: #ef4949;
    color: #fff;
    font-size: 0.34rem;
  }
</style>
