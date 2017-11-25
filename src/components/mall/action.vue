/**
* Created by wolfsheller on 2017/3/15.
* 会场活动组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="mallaction">
      <my-swiper :banneritems="banneritems"></my-swiper>
      <div class="actioncontent">
        <ul>
          <li v-for="(item, index) in iconitems" @click="changeActive(index)">
            <div><img :src=item.imgsrc alt=""></div>
            <p>{{ item.title }}</p>
          </li>
        </ul>
        <div class="scrollbar" ref="oscroller"></div>
      </div>
      <one-goods :singlegoods="gooditems">
      </one-goods>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import mySwiper from 'components/common/myswiper'
  import oneGoods from 'components/module/one-goods'

  let oTimer = ''
  export default {
    components: {
      myHeader,
      oneGoods,
      mySwiper
    },
    data () {
      return {
        headeritem: '活动会场',
        iconitems: [],
        banneritems: [],
        gooditems: []
      }
    },
    methods: {
      getDataFromBackend () {
        let that = this
        let oaid = this.$route.query.aid
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'action',
          body: {
            aid: oaid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.banneritems = res.banneritems
          for (let item of res.iconitems) {
            for (let item2 of item.gooditems) {
              item2.priceint = parseInt(item2.price)
              item2.pricefloat = '.' + item2.price.split('.')[1]
              if (parseInt(item2.price) > 1000) {
                item2.pricefloat = ''
              }
            }
          }
          that.iconitems = res.iconitems
          that.gooditems = res.iconitems[0].gooditems
        })
      },
      changeActive (index) {
        clearInterval(oTimer)
        let oScroller = this.$refs.oscroller
        let oLimit = index * 25 + '%'
        let that = this
        oTimer = setInterval(function () {
          if (!parseInt(oScroller.style.marginLeft)) {
            oScroller.style.marginLeft = 0
          }
          if (parseInt(oScroller.style.marginLeft) < parseInt(oLimit)) {
            oScroller.style.marginLeft = parseInt(oScroller.style.marginLeft) + 1 + '%'
            if (oScroller.style.marginLeft === oLimit) {
              clearInterval(oTimer)
              that.gooditems = that.iconitems[index].gooditems
              return
            }
          } else if (parseInt(oScroller.style.marginLeft) > parseInt(oLimit)) {
            oScroller.style.marginLeft = parseInt(oScroller.style.marginLeft) - 1 + '%'
            if (oScroller.style.marginLeft === oLimit) {
              clearInterval(oTimer)
              that.gooditems = that.iconitems[index].gooditems
              return
            }
          } else if (parseInt(oScroller.style.marginLeft) === parseInt(oLimit)) {
            clearInterval(oTimer)
            return
          }
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .mallaction {
    margin-top: 0.8rem;
    .actioncontent {
      background: #fff;
      border-bottom: 0.01rem solid #717171;
      padding: 0 0.08rem;
      ul {
        height: 2.06rem;
        display: flex;
        li {
          flex: 1;
          justify-content: center;
          div {
            text-align: center;
            margin-top: 0.36rem;
            img {
              height: 0.86rem;
            }
          }
          p {
            font-size: 0.24rem;
            margin-top: 0.3rem;
            margin-bottom: 0;
            color: #5e5e5e;
            text-align: center;
          }
        }
      }
      .scrollbar {
        margin-left: 0;
        height: 0.06rem;
        width: 25%;
        background: #ff4e08;
      }
    }
  }
</style>
