/**
* Created by wolfsheller on 2017/2/27 0027.
* 二级分类商品组件
*/
<template>
  <section class="mallgoods">
    <my-swiper :banneritems="banneritems"></my-swiper>
    <ul class="classesitems">
      <li v-for="item in listitems">
        <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
          <img :src=item.imgsrc alt="">
          <p>{{ item.title }}</p>
        </router-link>
      </li>
    </ul>
    <div class="titlepart">
      <h1>———— {{ moduletitle }} ————</h1>
    </div>
    <one-goods :singlegoods="gooditems">
    </one-goods>
    <my-backtop></my-backtop>
    <!--<my-infinite></my-infinite>-->
  </section>
</template>

<script type="text/ecmascript-6">
  import myBacktop from 'components/common/mybacktop'
  //  import myInfinite from 'components/common/myinfinite'
  import mySwiper from 'components/common/myswiper'
  import oneGoods from 'components/module/one-goods'

  export default {
    components: {
      oneGoods,
      myBacktop,
//      myInfinite,
      mySwiper
    },
    data () {
      return {
        moduletitle: '便宜好货每天9点上新',
        banneritems: [],
        listitems: [],
        gooditems: [],
        goodmore: []
      }
    },
    methods: {
      // 获取后端数据
      getDataFromBackend () {
        let that = this
        let omid = this.$route.params.id
        that.isloading = false
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'mall',
          body: {
            mid: omid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.banneritems = res.banneritems
          that.listitems = res.listitems
          that.gooditems = res.gooditems
          that.gooditems = res.gooditems.map(function (item) {
            item.priceint = parseInt(item.price)
            item.pricefloat = '.' + item.price.split('.')[1]
            return item
          })
          for (let item of that.gooditems) {
            if (parseInt(item.price) > 1000) {
              item.pricefloat = ''
            }
          }
        })
      }
      // 无限下拉列表
//      infinite () {
//        let that = this
//        if ((document.body.scrollTop + window.screen.height * 3 > document.body.scrollHeight) && that.isloading) {
//          this.loadmore()
//        }
//      },
      // 获取更多后端数据
//      loadmore () {
//        let that = this
//        let locationurl = window.location.href
//        let omid = locationurl.split('=')[1]
//        that.isloading = false
//        this.$http({
//          method: 'post',
//          url: global.Domain.mallUrl + 'mall',
//          body: {
//            mid: omid
//          },
//          emulateJSON: true
//        }).then(function (response) {
//          let res = response.data
//          that.goodmore = res.gooditems
//          that.goodmore = res.gooditems.map(function (item) {
//            item.priceint = parseInt(item.price)
//            item.pricefloat = '.' + item.price.split('.')[1]
//            return item
//          })
//          for (let item of that.goodmore) {
//            if (parseInt(item.price) > 1000) {
//              item.pricefloat = ''
//            }
//          }
//          that.gooditems = that.gooditems.concat(that.goodmore)
//          that.isloading = true
//        })
//      }
    },
    created () {
      this.getDataFromBackend()
    },
    watch: {
      '$route' (to, from) {
        this.getDataFromBackend()
        // 对路由变化作出响应...
      }
    }
//    beforeRouterUpdate (to, from, next) {
//      this.getDataFromBackend()
//      next()
//    }
//    mounted () {
//      if (document.body.scrollHeight < window.screen.height * 3) {
//        this.loadmore()
//      }
//      window.addEventListener('scroll', this.infinite)
//    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .mallgoods {
    background: #fff;
  }

  .titlepart {
    background: #f6f6f6;
    height: 0.86rem;
    line-height: 0.86rem;
    text-align: center;
    color: #d96767;
    font-size: 0.24rem;
  }

  .classesitems {
    display: flex;
    flex-flow: row wrap;
    li {
      width: 25%;
      text-align: center;
      box-sizing: border-box;
      border-right: 0.02rem solid #eaeaea;
      border-bottom: 0.02rem solid #eaeaea;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
      img {
        width: 60%;
        margin: 0 auto;
        display: block;
      }
      p {
        font-size: .22rem;
        color: #333;
        line-height: 0.4rem;
      }
    }
    li:nth-child(4n) {
      border-right: none;
    }
  }
</style>
