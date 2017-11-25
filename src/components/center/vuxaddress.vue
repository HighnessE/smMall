/**
* Created by wolfsheller on 2017/3/6.
*/
<template>
  <div>
    <x-address :title="addresstitle" v-model="addressvalue" :list="addressData"
               value-text-align="left"></x-address>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {XAddress, ChinaAddressData} from 'vux'

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
      ...mapState({
        addressvalue: state => state.address.addressvalue
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .vux-cell-box {
    width: 100%;
    line-height: 0.94rem;
    height: 0.94rem!important;
    overflow: hidden;
    .weui-cell.vux-tap-active.weui-cell_access {
      padding: 0 0.1rem;
      .vux-popup-picker-value {
        font-size: 0.28rem!important;
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
    height: 0.96rem!important;
    line-height: 0.96rem!important;
  }

  .vux-popup-picker-header-menu {
    line-height: 0.96rem!important;
    text-align: center!important;
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
