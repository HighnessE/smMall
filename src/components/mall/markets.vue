/**
* Created by wolfsheller on 2017/3/15.
* 三级分类搜索版组件
*/
<template>
  <section>
    <simple-header>
      <div class="mysearch">
        <div class="glass">
          <img :src=glass alt="">
        </div>
        <input type="text" :placeholder=placeholder v-model="searchVaule">
        <div class="search" @click="clickSearch">
          <span>搜索</span>
        </div>
      </div>
      <router-link :to="{ path: '/mall' }" tag="div" slot="rightpart">
        <img :src=returnimgsrc alt="">
      </router-link>
    </simple-header>
    <div class="singlegoods">
      <one-goods :singlegoods="gooditems" v-if="ifhascontent">
      </one-goods>
      <my-backtop></my-backtop>
      <!--<my-infinite></my-infinite>-->
      <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  //  import myHeader from 'components/common/myheader'
  import simpleHeader from 'components/common/simple-header'
  import myBacktop from 'components/common/mybacktop'
//  import myInfinite from 'components/common/myinfinite'
  import oneGoods from 'components/module/one-goods'
  import noContent from 'components/common/no-content'

  export default {
    components: {
      simpleHeader,
      oneGoods,
      myBacktop,
      noContent
//      myInfinite
    },
    data () {
      return {
        headeritem: '三级分类',
        isloading: false,
        // 第一次获取数据
        gooditems: [],
        // 获取更多数据
        goodmore: [],
        pagelogo: 'static/img/pagelogo.png',
        category: 'static/img/common/category.png',
        glass: 'static/img/common/glass.png',
        placeholder: '请输入搜索的内容',
        returnimgsrc: 'static/img/common/returnindex.png',
        searchVaule: '',
        ifhascontent: false,
        ifnocontent: false,
        nocontent: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '没有搜索到您想要查找的内容',
          describe2: '',
          describe3: ''
        }
      }
    },
    methods: {
      clickSearch () {
        let query = this.searchVaule
        this.$router.push(
          {
            path: '/mall/markets',
            query: {content: query}
          }
        )
        this.getDataFromBackend()
      },
      getDataFromBackend () {
        let that = this
        let query = this.$route.query.content
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'search',
          body: {
            content: query
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res.have === 1) {
            that.ifhascontent = true
            that.ifnocontent = false
            res.gooditems.map(function (item) {
              item.priceint = parseInt(item.price)
              item.pricefloat = '.' + item.price.split('.')[1]
              return item
            })
            that.gooditems = res.gooditems
          } else if (res.have === 0) {
            that.ifhascontent = false
            that.ifnocontent = true
            that.gooditems = []
          }
        })
      }
//      initialUrl () {
//        let locationurl = window.location.href
//        let searchcontent = locationurl.split('?')[1]
//        this.searchVaule = this.getCharFromUtf8(searchcontent)
//      },
      // 将URL中的UTF-8字符串转成中文字符串
//      getCharFromUtf8 (str) {
//        let cstr = ''
//        let nOffset = ''
//        if (str === '') {
//          return ''
//        }
//        str = str.toLowerCase()
//        nOffset = str.indexOf('%e')
//        if (nOffset === -1) {
//          return str
//        }
//        while (nOffset !== -1) {
//          cstr += str.substr(0, nOffset)
//          str = str.substr(nOffset, str.length - nOffset)
//          if (str === '' || str.length < 9) {
//            return cstr
//          }
//          cstr += this.utf8ToChar(str.substr(0, 9))
//          str = str.substr(9, str.length - 9)
//          nOffset = str.indexOf('%e')
//        }
//        return cstr + str
//      },
      // 将编码转换成字符
//      utf8ToChar (str) {
//        var iCode, iCode1, iCode2
//        iCode = parseInt('0x' + str.substr(1, 2))
//        iCode1 = parseInt('0x' + str.substr(4, 2))
//        iCode2 = parseInt('0x' + str.substr(7, 2))
//        return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F))
//      },
//      infinite () {
//        let that = this
//        if ((document.body.scrollTop + window.screen.height * 3 > document.body.scrollHeight) && that.isloading) {
//          this.loadmore()
//        }
//      },
//      loadmore () {
//        let that = this
//        that.isloading = false
//        this.$http({
//          method: 'get',
//          url: global.Domain.mallUrl + 'market',
//          data: ''
//        }).then(function (response) {
//          let res = response.data
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
//          that.isloading = true
//        })
//      }
    },
    created () {
//      this.initialUrl()
      this.getDataFromBackend()
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
  .titlepart {
    position: fixed;
    top: 0.8rem;
    left: 0;
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
      }
      li:last-child {
        border: none;
      }
    }
  }

  .singlegoods {
    margin-top: 1.6rem;
    width: 100%;
  }

  .mysearch {
    position: relative;
    display: flex;
    flex: 1;
    height: 0.56rem;
    padding-right: 0.8rem;
    border-radius: 0.29rem;
    border: 0.01rem solid #bebebe;
    background: #fff;
    overflow: hidden;
    input {
      line-height: 0.58rem;
      font-size: 0.26rem;
      color: #b1b1b1;
      width: 100%;
      padding-left: 0.76rem;
      padding-right: 0.28rem;
    }
    .glass {
      position: absolute;
      left: 0.16rem;
      top: 50%;
      width: 0.3rem;
      height: 0.38rem;
      transform: translateY(-50%);
      border-right: 0.01rem solid #b1b1b1;
      padding-right: 0.16rem;
      img {
        height: 100%;
      }
    }
    .search {
      position: absolute;
      right: 0.26rem;
      top: 50%;
      transform: translateY(-50%);
      height: 0.38rem;
      font-size: 0.28rem;
      line-height: 0.38rem;
      padding-left: 0.16rem;
      color: #365aa4;
      border-left: 0.01rem solid #b1b1b1;
    }
  }

  .returnindex {
    height: 0.38rem;
    width: 15%;
    img {
      height: 0.43rem;
    }
  }
</style>
