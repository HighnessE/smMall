/**
* Created by wolfsheller on 2017/3/4.
* 单个地址组件
*/
<template>
  <div class="address">
    <div class="firstline">
      <div class="selectbtn" @click="selectAddress(oindex)">
        <img :src=circleactive alt="" v-if="addressitems.ifuseaddress">
        <img :src=circleimg alt="" v-else>
      </div>
      <div class="firstname">{{ addressitems.name }}</div>
      <div class="firstphonenum">
        <span>{{ addressitems.phone }}</span>
        <span class="active" v-if="addressitems.only">默认</span>
      </div>
      <!--<div class="rightpart">-->
      <!--<router-link :to="{ path: '/center/infomation/editaddress', query: { adid: addressitems.adid } }">-->
      <!--<img :src=address.handle1 alt="">-->
      <!--</router-link>-->
      <!--</div>-->
    </div>
    <div class="secondline">{{ addressitems.partment }}{{ addressitems.address }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      addressitems: Object,
      oindex: Number
    },
    data () {
      return {
        address: {
//          handle1: 'static/img/common/edit.png',
        },
        circleimg: 'static/img/common/circle.png',
        circleactive: 'static/img/common/circle2.png'
      }
    },
    methods: {
      selectAddress (oindex) {
        this.$emit('change-active', oindex)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .address {
    padding: 0.42rem 0.38rem 0.16rem 0.22rem;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #e7e7e7;
    background: #fff;
    .firstline {
      color: #111;
      display: flex;
      align-items: center;
      .selectbtn {
        width: 0.4rem;
        height: 0.4rem;
        img {
          width: 100%;
        }
      }
      .firstname {
        font-size: 0.3rem;
        margin-left: 0.38rem;
      }
      .firstphonenum {
        margin-left: 0.5rem;
        font-size: 0.3rem;
        display: inline-flex;
        align-items: flex-end;
        .active {
          margin-left: 0.16rem;
          border: 0.01rem solid #ff3d3d;
          border-radius: 0.15rem;
          font-size: 0.2rem;
          padding: 0.04rem 0.2rem;
          color: #ff3d3d;
        }
      }
    }
    .secondline {
      display: inline-block;
      color: #9d9d9d;
      font-size: 0.28rem;
      margin: 0.3rem 0;
      line-height: 0.4rem;
    }
  }
</style>
