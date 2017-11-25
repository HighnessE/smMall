/**
* Created by wolfsheller on 2017/3/15.
* 三级分类组件
*/
<template>
  <section>
    <header>
      <div class="leftarrow" @click="goback"><img :src="leftarrow" alt=""></div>
      <h2>{{ headeritem }}</h2>
      <div class="returnindex">
        <router-link :to="{ path: '/mall' }"><img :src=returnindex.imgsrc alt=""></router-link>
      </div>
    </header>
    <div class="titlepart">
      <ul>
        <li class="sortitems" :class="{ isactive: defaultsort }" @click="clickSort(-1)">
          <div class="titlename">{{ defaulttitle }}</div>
        </li>
        <li class="sortitems" :class="{ isactive: sortitems[index].isactive }" @click="clickSort(index)"
            v-for="(item, index) in sortitems">
          <div class="titlename">{{ sortitems[index].title }}</div>
          <div class="titlearrow">
            <img :src=totalarrow1 alt="" v-if="sortitems[index].iftotalarrow === 1">
            <img :src=totalarrow2 alt="" v-else-if="sortitems[index].iftotalarrow === 2">
            <img :src=totalarrow3 alt="" v-else>
          </div>
        </li>
      </ul>
    </div>
    <div class="singlegoods">
      <one-goods :singlegoods="gooditems">
      </one-goods>
      <my-backtop2></my-backtop2>
      <!--<my-infinite :ifloadmore="ifloadmore"></my-infinite>-->
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myBacktop2 from 'components/common/mybacktop2'
//  import myInfinite from 'components/common/myinfinite'
  import oneGoods from 'components/module/one-goods'

  export default {
    components: {
      oneGoods,
      myBacktop2
//      myInfinite
    },
    data () {
      return {
        leftarrow: 'static/img/common/leftarrow.png',
        returnindex: {
          'imgsrc': 'static/img/common/returnindex.png'
        },
        headeritem: '三级分类',
        isloading: false,
        defaultsort: true,
        defaulttitle: '默认',
        totalarrow1: 'static/img/common/totalarrow1.png',
        totalarrow2: 'static/img/common/totalarrow2.png',
        totalarrow3: 'static/img/common/totalarrow3.png',
        sortitems: [
          {
            title: '价格',
            isactive: false,
            iftotalarrow: 1
          },
          {
            title: '销量',
            isactive: false,
            iftotalarrow: 1
          }

        ],
        // 第一次获取数据
        gooditems: [],
        // 获取更多数据
        goodmore: [],
        pagelogo: 'static/img/pagelogo.png',
        category: 'static/img/common/category.png',
        glass: 'static/img/common/glass.png',
        returnimgsrc: '../static/img/common/returnindex.png',
        ifloadmore: false,
        paramid: 0
      }
    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      clickSort (index) {
        // ifsalearrow为1时是为选中，为2时是从大到小，为3时是从小到大
        let paramid = this.paramid
        let paratype1, paratype2
        if (index === -1) {
          paratype1 = paratype2 = 0
        } else if (index === 0) {
          paratype1 = 1
          paratype2 = 2
        } else if (index === 1) {
          paratype1 = 3
          paratype2 = 4
        }
        if (index === -1) {
          this.getDataFromBackend({mid: paramid, type: paratype1})
          this.defaultsort = true
          for (let item of this.sortitems) {
            item.isactive = false
            item.iftotalarrow = 1
          }
        } else {
          this.defaultsort = false
          if (this.sortitems[index].iftotalarrow === 1) {
            this.getDataFromBackend({mid: paramid, type: paratype1})
            for (let item of this.sortitems) {
              item.isactive = false
              item.iftotalarrow = 1
            }
            this.sortitems[index].isactive = true
            this.sortitems[index].iftotalarrow = 2
          } else if (this.sortitems[index].iftotalarrow === 2) {
            this.getDataFromBackend({mid: paramid, type: paratype2})
            this.sortitems[index].iftotalarrow = 3
          } else {
            this.getDataFromBackend({mid: paramid, type: paratype1})
            this.sortitems[index].iftotalarrow = 2
          }
        }
      },
      // 获取后端数据，需要两个参数，mid为商品类别，type为排序类别
      getDataFromBackend (parameters) {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'market',
          body: parameters,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.headeritem = res.titleitems
          document.title = that.headeritem
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
          that.isloading = true
        })
      }
      // 无限下拉
//      infinite () {
//        let that = this
//        if ((document.body.scrollTop + window.screen.height * 3 > document.body.scrollHeight) && that.isloading) {
//          this.loadmore()
//        }
//      },
      // 获取更多数据，需要参数三个，mid为商品类别，type为排序类别，ifloadmore是否第一次加载还是后续获取更多数据的请求
//      loadmore (parameters) {
//        let that = this
//        this.$http({
//          method: 'post',
//          url: global.Domain.mallUrl + 'market',
//          body: parameters,
//          emulateJSON: true
//        }).then(function (response) {
//          let res = response.data
//          if (that.ifloadmore !== res.ifloadmore) {
//            that.ifloadmore = false
//        this.ifloadmore = false
//          }
//          that.goodmore = res.gooditems
//          that.goodmore = res.gooditems.map(function (item) {
//            item.priceint = parseInt(item.price)
//            return item
//          })
//          that.goodmore = res.gooditems.map(function (item) {
//            item.pricefloat = item.price.split('.')[1]
//            return item
//          })
//          that.gooditems = that.gooditems.concat(that.goodmore)
//        })
//      }
    },
    created () {
      this.paramid = this.$route.query.mid
      let paramid = this.paramid
      this.getDataFromBackend({
        mid: paramid,
        type: 0
      })
    }
//    mounted () {
//      if (document.body.scrollHeight < window.screen.height * 3) {
//        this.loadmore()
//      }
//      window.addEventListener('scroll', this.infinite)
//    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    display: flex;
    text-align: center;
    align-items: center;
    border-bottom: 0.01rem solid #e5e5e5;
    z-index: 10;
    .leftarrow {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    .returnindex {
      height: 0.38rem;
      width: 15%;
      img {
        height: 100%;
      }
    }
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }
  .titlepart {
    z-index: 9;
    background: #fff;
    width: 100%;
    height: 0.83rem;
    border-bottom: 0.01rem solid #e5e5e5;
    ul {
      display: flex;
      .sortitems {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        border-right: 0.02rem solid #e7e7e7;
        height: 0.4rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        margin-top: 0.22rem;
        color: #4f4d4e;
        display: flex;
        justify-content: center;
        align-items: center;
        .titlearrow {
          display: flex;
          margin-left: 0.1rem;
          img {
            display: block;
            width: 0.17rem;
            height: 0.26rem;
          }
        }
      }
      .isactive {
        color: #ee3e3e;
        .titlename {
          color: #ee3e3e;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }

  .singlegoods {
    width: 100%;
  }
</style>
