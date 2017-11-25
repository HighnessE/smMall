/**
* Created by wolfsheller on 2017/3/15.
* 收支记录组件
*/
<template>
  <section class="paymentrecord">
    <my-header :headeritem="headeritem"></my-header>
    <ul>
      <li v-for="(item, index) in recorditems">
        <one-payment :recorditems="recorditems[index]"></one-payment>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import onePayment from 'components/module/one-payment'

  export default {
    components: {
      myHeader,
      onePayment
    },
    data () {
      return {
        headeritem: '收支记录',
        recorditems: []
      }
    },
    methods: {
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'revence'
        }).then(function (response) {
          let res = response.data
          that.recorditems = res.recorditems
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
    background: #eaeaea !important;
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }

  .paymentrecord {
    margin-top: 0.8rem;
  }
</style>
