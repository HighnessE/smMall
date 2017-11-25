/**
* Created by wolfsheller on 2017/3/10.
*/
<template>
  <div>
    <rater v-model="rateritem" slot="value" :disabled=disabledstatus></rater>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Rater} from 'vux'

  export default {
    props: {
      rateritem: Number,
      disabledstatus: Boolean
    },
    components: {
      Rater
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
    font-size: 0.25rem !important;
    height: 0.25rem !important;
    line-height: 0.25rem !important;
    width: 0.25rem !important;
  }
</style>
