/**
* Created by wolfsheller on 2017/3/10.
* 商品操作组件
*/
<template>
  <section class="bottomblock">
    <ul class="leftpart">
      <li @click="contactServer">
        <div><img :src=functionitems[0].imgsrc alt=""></div>
        <p>{{ functionitems[0].title }}</p>
      </li>
      <li @click="clickCollectPopup">
        <div>
          <img :src=functionitems[1].imgsrc alt="" v-if="!ifcollect">
          <img :src=functionitems[1].imgsrc2 alt="" v-else>
        </div>
        <p>{{ functionitems[1].title }}</p>
      </li>
      <router-link :to="{ path: '/center/shopcar' }" tag="li">
        <div>
          <img :src=functionitems[2].imgsrc alt="">
        </div>
        <p>{{ functionitems[2].title }}</p>
      </router-link>
    </ul>
    <div class="centerpart" @click="openHandlepanel(1)">加入购物车</div>
    <div class="rightpart" @click="openHandlepanel(2)">立即购买</div>
  </section>
</template>

<script type="text/ecmascript-6">
  import wrapServercode from 'components/common/wrap-servercode'
  import {mapState, mapActions, mapMutations} from 'vuex'
  export default {
    components: {
      wrapServercode
    },
    data () {
      return {
        ifservercode: false,
        functionitems: [
          {
            imgsrc: 'static/img/common/service.png',
            title: '客服'
          },
          {
            imgsrc: 'static/img/common/star.png',
            imgsrc2: 'static/img/common/star2.png',
            title: '收藏'
          },
          {
            imgsrc: 'static/img/common/shopcar.png',
            title: '购物车'
          }
        ]
      }
    },
    computed: {
      ...mapState({
        ifcollect: state => state.handle.ifcollect
      })
    },
    methods: {
      contactServer () {
        this.$emit('contact-server', true)
      },
      ...mapMutations([
        'openHandlepanel'
      ]),
      ...mapActions([
        'collectPopup'
      ]),
      clickCollectPopup () {
        let ogid = this.$route.query.gid
        let that = this
        let iscol = 0
        if (this.ifcollect) {
          iscol = 0
        } else {
          iscol = 1
        }
        let bodydata = {
          gid: ogid,
          iscol: iscol
        }
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'iscol',
          body: bodydata,
          emulateJSON: true
        }).then(function (response) {
          if (response.data) {
            that.collectPopup()
          }
        })
      }
//      confirmOrder () {
//        let oid = parseInt(locationurl.split('=')[1])
//        let that = this
//        this.$http({
//          method: 'post',
//          url: global.Domain.mallUrl + 'confirmorder',
//          body: {
//            oid: oid
//          },
//          emulateJSON: true
//        }).then(function (response) {
//          let res = response.data
//          that.$router.push('/mall/confirmorder')
//        })
//      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .bottomblock {
    border-top: 0.01rem solid #e7e7e7;
    z-index: 10;
    height: 0.92rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0.3rem;
    color: #fff;
    display: flex;
    background: #fff;
    text-align: center;
    .leftpart {
      flex: 1;
      display: flex;
      li {
        flex: 1;
        div {
          margin-top: 0.12rem;
          img {
            margin: 0 auto;
            display: block;
            height: 0.45rem;
          }
        }
        p {
          margin-top: 0.06rem;
          font-size: 0.22rem;
          color: #8a8a8a;
        }
      }
    }
    .centerpart {
      background: #f57c33;
      width: 1.88rem;
      line-height: 0.92rem;
    }
    .rightpart {
      width: 1.76rem;
      background: #ff226f;
      line-height: 0.92rem;
    }
  }
</style>
