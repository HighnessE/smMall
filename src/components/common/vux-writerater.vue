/**
* Created by wolfsheller on 2017/3/10.
*/
<template>
  <div>
    <rater v-model="rateritem" slot="value" :disabled=disabledstatus></rater>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Rater } from 'vux'

  export default {
    props: {
      disabledstatus: Boolean
    },
    components: {
      Rater
    },
    data () {
      return {
        rateritem: 0
      }
    },
    watch: {
      rateritem: function (newValue, oldValue) {
        this.$emit('change-rater', newValue)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .vux-rater-box.is-active {
    .vux-rater-inner {
      color: #ff4545 !important;
    }
  }

  .vux-rater-box {
    font-size: 0.64rem !important;
    height: 0.64rem !important;
    line-height: 0.64rem !important;
    width: 0.64rem !important;
    margin-right: 0.2rem !important;
  }
</style>
