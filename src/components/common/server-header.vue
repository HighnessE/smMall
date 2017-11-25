/**
* Created by wolfsheller on 2017/4/22.
* xxx组件
*/
<template>
  <section>
    <header>
      <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
      <h2>{{ headeritem }}</h2>
      <div class="returnindex" @click="contactServer">
        <div><img :src=service alt=""></div>
        <p>联系客服</p>
      </div>
    </header>
    <wrap-servercode v-if="ifservercode" @close-servercode="closeServercode"></wrap-servercode>
  </section>
</template>

<script type="text/ecmascript-6">
  import wrapServercode from 'components/common/wrap-servercode'

  export default {
    props: {
      headeritem: String
    },
    components: {
      wrapServercode
    },
    data () {
      return {
        ifservercode: false,
        service: 'static/img/common/service.png',
        leftarrow: 'static/img/common/leftarrow.png'
      }
    },
    methods: {
      closeServercode () {
        this.ifservercode = false
      },
      contactServer () {
        this.ifservercode = true
      },
      goback () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    background: #eaeaea;
    display: flex;
    text-align: center;
    align-items: center;
    border-bottom: 0.01rem solid #e5e5e5;
    z-index: 10;
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
    .leftarrow {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    .returnindex {
      width: 15%;
      font-size: 0.22rem;
      color: #4c5660;
      img {
        height: 0.34rem;
      }
    }
  }
</style>
