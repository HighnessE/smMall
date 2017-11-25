/**
* Created by wolfsheller on 2017/3/15.
* 我的收藏组件
*/
<template>
  <section class="mycollection">
    <my-header :headeritem="headeritem"></my-header>
    <no-content :nocontent="nocontent"
                v-if="ifnocontent"></no-content>
    <ul class="contentul"
        v-if="ifhascontent">
      <li v-for="(item, index) in collectitems">
        <one-collection :collectitems="collectitems[index]"
                        @show-panel="showPanel"
                        @delete-collect="deleteCollect"></one-collection>
      </li>
    </ul>
    <collect-panel @add-shopcar="addShopcar"
                   @close-panel="closePanel"
                   @click-router="clickRouter"
                   v-if="ifcollectpanel"
                   :detailimg="collectitems[0].mainpic"
                   :detailprice="collectitems[0].price"></collect-panel>
    <transition name="collect">
      <div class="collectpopupwrap"
           v-if="ifonecollectwrap">
        <div class="collectpopup">
          <p>{{ collectmsg }}</p>
        </div>
      </div>
    </transition>
    <wrap-function v-if="iffunctionwrap"
                   :popupitems="functionitems"
                   @confirm-btn="confirm"
                   @close-popup="closePopup">
      <p class="popuptitle">您确认要删除该收藏吗？</p>
    </wrap-function>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneCollection from 'components/module/one-collection'
  import collectPanel from 'components/center/collect-panel'
  import wrapFunction from 'components/common/wrap-function'
  import noContent from 'components/common/no-content'

  export default {
    components: {
      myHeader,
      oneCollection,
      collectPanel,
      wrapFunction,
      noContent
    },
    data () {
      return {
        headeritem: '我的收藏',
        collectitems: [],
        ifcollectpanel: false,
        ifonecollectwrap: false,
        collectmsg: '加入购物车成功',
        functionitems: {
          affirmbtn: '确定',
          cancelbtn: '我再想想'
        },
        iffunctionwrap: false,
        ifnocontent: false,
        ifhascontent: false,
        nocontent: {
          imgsrc: 'static/img/common/nocollect.png',
          describe1: '暂无收藏，赶快去',
          describe2: '收藏',
          describe3: '一些吧'
        },
        nowid: 0
      }
    },
    methods: {
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.centerUrl + 'collect'
        }).then(function (response) {
          let res = response.data
          if (res.collectitems.length === 0) {
            that.ifnocontent = true
            that.ifhascontent = false
          } else {
            that.ifnocontent = false
            that.ifhascontent = true
          }
          that.collectitems = res.collectitems
        })
      },
      clickRouter (msg) {
        this.$router.push({
          path: '/mall/details/confirm',
          query: {
            gid: this.nowid,
            number: msg,
            states: 1
          }
        })
      },
      showPanel (msg) {
        this.nowid = msg
        this.ifcollectpanel = true
      },
      closePanel (msg) {
        this.ifcollectpanel = msg
      },
      deleteCollect (msg) {
        this.nowid = msg
        this.iffunctionwrap = true
      },
      confirm (msg) {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'iscol',
          body: {
            gid: this.nowid,
            iscol: 0
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res === 0) {
            that.GetDataFromBackend()
          }
        })
        this.iffunctionwrap = msg
      },
      closePopup (msg) {
        this.iffunctionwrap = msg
      },
      addShopcar (msg) {
        if (this.ifonecollectwrap) {
          return
        }
        let that = this
        let ocollectTimer = ''
        clearTimeout(ocollectTimer)
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'addcart',
          body: {
            gid: this.nowid,
            number: msg
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res === 1) {
            that.ifcollectpanel = false
            that.ifonecollectwrap = msg
            ocollectTimer = setTimeout(function () {
              that.ifonecollectwrap = false
            }, 2000)
          }
        })
      }
    },
    created () {
      this.GetDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'confirmorder') {
        to.meta.keepAlive = false
      }
      this.$store.commit('resetConfirmState')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .contentul {
    margin-top: 0.8rem;
    background: #fff;
  }

  .collectpopupwrap {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 0.8rem;
    transform: translate(-50%, -50%);
    z-index: 20;
    .collectpopup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      padding: 0 0.2rem;
      height: 0.8rem;
      border-radius: 0.12rem;
      p {
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.8rem;
        color: #fff;
      }
    }
  }

  .collect-enter-active, .collect-leave-active {
    transition: opacity 0.5s;
  }

  .collect-enter, .collect-leave-active {
    opacity: 0;
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }
</style>
