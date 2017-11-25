/**
* Created by wolfsheller on 2017/3/15.
* 提现记录组件
*/
<template>
  <section class="withdrawrecord">
    <my-header :headeritem="headeritem"></my-header>
    <ul>
      <li v-for="(item, index) in recorditems">
        <one-withdraw :recorditems="recorditems[index]"></one-withdraw>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneWithdraw from 'components/module/one-withdraw'

  export default {
    components: {
      myHeader,
      oneWithdraw
    },
    data () {
      return {
        headeritem: '提现记录',
        recorditems: []
      }
    },
    created () {
      let that = this
      this.$http({
        method: 'get',
        url: global.Domain.centerUrl + 'record'
      }).then(function (response) {
        let res = response.data
        that.recorditems = res.recorditems
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #eaeaea !important;
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }

  .withdrawrecord {
    margin-top: 0.8rem;
  }
</style>
