/**
* Created by wolfsheller on 2017/3/4.
* 单个地址组件
*/
<template>
  <div class="address">
    <div class="firstline">
      <div class="leftpart">
        <div class="firstname">{{ addressitems.name }}</div>
        <div class="firstphonenum">
          <span>{{ addressitems.phone }}</span>
          <span class="active" v-if="addressitems.only">默认</span>
        </div>
      </div>
      <div class="rightpart">
        <div class="firstimgsrc1">
          <router-link :to="{ path: '/center/infomation/editaddress', query: { adid: addressitems.adid } }">
            <img :src=address.handle1 alt="">
          </router-link>
        </div>
        <div class="firstimgsrc2" @click="deleteAddress(addressitems.adid)">
          <img :src=address.handle2 alt="">
        </div>
      </div>
    </div>
    <div class="secondline">{{ addressitems.partment }}{{ addressitems.address }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      addressitems: Object
    },
    data () {
      return {
        address: {
          handle1: 'static/img/common/edit.png',
          handle2: 'static/img/common/delete.png'
        }
      }
    },
    methods: {
      deleteAddress (indexmsg) {
        this.$emit('delete-address', indexmsg)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .address {
    padding: 0.36rem 0.22rem 0.16rem 0.22rem;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #e7e7e7;
    background: #fff;
    .firstline {
      color: #111;
      display: flex;
      justify-content: space-between;
      .leftpart {
        display: flex;
        align-items: center;
        div {
          display: inline-block;
          font-size: 0.32rem;
        }
        div.firstname {
          max-width: 1.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .firstphonenum {
          margin-left: 0.16rem;
          display: inline-flex;
          justify-content: flex-end;
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
      .rightpart {
        div {
          display: inline-block;
        }
        .firstimgsrc1 {
          margin-right: 0.3rem;
        }
        .firstimgsrc1, .firstimgsrc2 {
          img {
            height: 0.37rem;
          }
        }
      }
    }
    .secondline {
      display: inline-block;
      color: #9d9d9d;
      font-size: 0.28rem;
      margin: 0.26rem 0;
      line-height: 0.4rem;
    }
  }
</style>
