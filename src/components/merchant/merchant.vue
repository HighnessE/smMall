/**
* Created by wolfsheller on 2017/2/22.
*/
<template>
  <section>
    <div class="merchantsails">
      <div class="search" @touchmove.stop.prevent>
        <div class="position">
          <!--<img :src=position alt="">-->
          <!--<merchant-address></merchant-address>-->
          <!--<img :src=downarrow alt="">-->
        </div>
        <merchant-search @click-search="clickSearch"></merchant-search>
      </div>
      <ul class="mainmenu" @touchmove.stop.prevent>
        <li>
          <div>
            <span class="category" @click="changeCategory">推荐</span>
            <!--<img :src=downarrow alt="">-->
          </div>
        </li>
        <li>
          <div class="meraddress">
            <merchant-address></merchant-address>
            <!--<img :src=downarrow alt="">-->
          </div>
        </li>
        <li>
          <div class="meraddress2">
            <merchant-address2></merchant-address2>
            <!--<img :src=downarrow alt="">-->
          </div>
        </li>
        <!--<li>-->
        <!--<div>-->
        <!--<span>距离</span>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
      <div v-if="ifreccommend">
        <div class="banner"><img :src=bgitems alt=""></div>
        <div class="merchant">
          <div class="centercontent">
            <ul>
              <li v-for="(item, index) in optionitems" @click="changeActive(index)">
                <div><img :src=item.t_src alt=""></div>
                <p>{{ item.t_name }}</p>
              </li>
            </ul>
            <div class="scrollbar" ref="oscroller"></div>
          </div>
        </div>
        <one-merchant :merchantitems="onemerchantitems"></one-merchant>
      </div>
      <div v-else>
        <one-merchant :merchantitems="merchantitems" v-if="ifhascontent"></one-merchant>
        <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
      </div>
      <my-footer></my-footer>
      <transition name="mercategory">
        <div class="categorywrap" v-if="ifcategory" @touchmove.stop.prevent @click="closeWrap">
          <div class="categorylist">
            <ul class="leftside" @touchmove.stop @click.stop>
              <li :class="{ isactive: item.ifselect }" v-for="(item, index) in cateitems"
                  @click="selectCategory(index)">
                <span>{{ item.t_title }}</span>
              </li>
            </ul>
            <div class="rightside rightdiv" v-if="collectindex === 0" @click="submitCategory(-1)">商品推荐</div>
            <ul class="rightside" @touchmove.stop @click.stop v-else>
              <li v-for="(item, index) in cateitems[collectindex].list" @click="submitCategory(index)">
                <span>{{ item.t_title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="amapwrap">
      <el-amap vid="amap" :plugin="plugin"></el-amap>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import oneMerchant from 'components/module/one-merchant'
  import merchantSearch from './merchant-search'
  import merchantAddress from './merchant-address'
  import merchantAddress2 from './merchant-address2'
  import myFooter from 'components/common/myfooter'
  import noContent from 'components/common/no-content'
  import {mapState} from 'vuex'
  //  import myLoading from 'components/common/myloading'

  let oTimer = ''
  export default {
    components: {
      oneMerchant,
      merchantAddress,
      merchantAddress2,
      merchantSearch,
      myFooter,
      noContent
//      myLoading
    },
    data () {
      let self = this
      return {
        position: 'static/img/common/position.png',
        downarrow: 'static/img/common/downarrow.png',
        glass: 'static/img/common/glass.png',
        bgitems: '',
        ifhascontent: true,
        ifnocontent: false,
        // 分类列表是否显示
        ifcategory: false,
        // 分类列表内容
        cateitems: [],
        // 五个选项
        optionitems: [],
        nocontent: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '没有搜索到您想要查找的内容',
          describe2: '',
          describe3: ''
        },
        plugin: [
          {
            pName: 'Geolocation',
            events: {
              init (instance) {
                instance.getCurrentPosition(function (status, result) {
                  self.$store.state.merchant.nowmap = result.position.lng + ',' + result.position.lat
//                  console.log(JSON.stringify(result))
                  let selfresult = result.addressComponent
                  self.$store.state.merchant.nowpartment = selfresult.province + selfresult.city + selfresult.district
                })
              }
            }
          }
        ]
      }
    },
    computed: {
      ...mapState({
        nowpartment: state => state.merchant.nowpartment,
        ifreccommend: state => state.merchant.ifreccommend,
        onemerchantitems: state => state.merchant.onemerchantitems,
        merchantitems: state => state.merchant.merchantitems,
        collectindex: state => state.merchant.collectindex,
        newcid: state => state.merchant.newcid,
        nowmap: state => state.merchant.nowmap
      })
    },
    methods: {
      clickSearch (msg) {
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'search',
          body: {
            partment: that.nowpartment,
            content: msg,
            map: this.nowmap
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.$store.state.merchant.ifreccommend = false
          if (!res.have) {
            that.ifhascontent = false
            that.ifnocontent = true
            return
          } else {
            that.ifhascontent = true
            that.ifnocontent = false
            that.$store.state.merchant.merchantitems = res.buinfoitems
            that.ifcategory = false
          }
        })
      },
      // 推荐下的选项切换位置
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
              if (that.$store.state.merchant.merchantitems[index].listitems) {
                that.$store.state.merchant.onemerchantitems = that.merchantitems[index].listitems
              } else {
                that.$store.state.merchant.onemerchantitems = []
              }
              return
            }
          } else if (parseInt(oScroller.style.marginLeft) > parseInt(oLimit)) {
            oScroller.style.marginLeft = parseInt(oScroller.style.marginLeft) - 1 + '%'
            if (oScroller.style.marginLeft === oLimit) {
              clearInterval(oTimer)
              if (that.$store.state.merchant.merchantitems[index].listitems) {
                that.$store.state.merchant.onemerchantitems = that.merchantitems[index].listitems
              } else {
                that.$store.state.merchant.onemerchantitems = []
              }
              return
            }
          } else if (parseInt(oScroller.style.marginLeft) === parseInt(oLimit)) {
            clearInterval(oTimer)
            return
          }
        })
      },
      // 切换分类列表的显示
      changeCategory () {
        this.ifcategory = !this.ifcategory
      },
      // 点击分类列表的二级分类
      submitCategory (index) {
        let that = this
        if (index === -1) {
          this.$store.state.merchant.newcid = 0
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'index',
            body: {
              partment: that.nowpartment,
              cid: this.newcid,
              map: this.nowmap
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            that.bgitems = res.bgitems
            that.optionitems = []
            res.indexitems.map(function (item) {
              let indexobj = {
                t_name: item.t_name,
                t_src: item.t_src,
                cid: item.id
              }
              that.optionitems.push(indexobj)
            })
            that.$store.state.merchant.merchantitems = res.indexitems
            that.$store.state.merchant.onemerchantitems = res.indexitems[0].listitems
            this.$store.state.merchant.ifreccommend = true
            this.ifcategory = false
          })
        } else {
          this.$store.state.merchant.newcid = this.cateitems[this.collectindex].list[index].id
          that.ifhascontent = true
          that.ifnocontent = false
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'index',
            body: {
              partment: that.nowpartment,
              cid: this.newcid,
              map: this.nowmap
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            that.$store.state.merchant.merchantitems = res.indexitems
            that.$store.state.merchant.ifreccommend = false
            that.ifcategory = false
          })
        }
      },
      // 选择一级分类
      selectCategory (index) {
        for (let item of this.cateitems) {
          item.ifselect = false
        }
        this.$store.state.merchant.collectindex = index
        let newcate = this.cateitems[index]
        newcate.ifselect = true
        this.$set(this.cateitems, index, newcate)
      },
      closeWrap () {
        this.ifcategory = false
      },
      // 根据两点经纬度计算两点距离
//      getFlatternDistance (lat1, lng1, lat2, lng2) {
//        function Rad (d) {
//          return d * Math.PI / 180.0// 经纬度转换成三角函数中度分表形式。
//        }
//
//        var radLat1 = Rad(lat1)
//        var radLat2 = Rad(lat2)
//        var a = radLat1 - radLat2
//        var b = Rad(lng1) - Rad(lng2)
//        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
//            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
//        s = s * 6378.137 // EARTH_RADIUS
//        s = Math.round(s * 10000) / 10000 // 输出为公里
//        s = s.toFixed(1)
//        return s
//      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.cityUrl + 'category'
        }).then(function (response) {
          let res = response.data
          res.cateitems.unshift({
            't_title': '推荐',
            'id': '0',
            'list': []
          })
          res.cateitems.map(function (item, index) {
            if (index === 0) {
              item.ifselect = true
            } else {
              item.ifselect = false
            }
          })
          that.cateitems = res.cateitems
          that.getDataofCategory()
        })
      },
      getDataofCategory () {
        let that = this
        that.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'index',
          body: {
            partment: that.nowpartment,
            cid: this.newcid,
            map: this.nowmap
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.bgitems = res.bgitems
          that.optionitems = []
          res.indexitems.map(function (item) {
            let indexobj = {
              t_name: item.t_name,
              t_src: item.t_src,
              cid: item.id
            }
            that.optionitems.push(indexobj)
          })
          that.$store.state.merchant.merchantitems = res.indexitems
          that.$store.state.merchant.onemerchantitems = res.indexitems[0].listitems
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.state.merchant.ifreccommend = true
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .merchantsails {
    margin-bottom: 1.19rem;
  }

  .search {
    position: relative;
    height: 0.86rem;
    display: flex;
    align-items: center;
    z-index: 11;
    padding: 0 0.2rem;
    background: #f5efe9;
    @media only screen and (max-width: 720px) {
      .position {
        max-width: 2.91rem;
      }
    }
    .position {
      display: flex;
      height: 0.4rem;
      align-items: center;
      text-align: center;
      img:first-child {
        width: 0.3rem;
      }
      span {
        margin-left: 0.22rem;
        font-size: 0.3rem;
        color: #1f1f1f;
      }
      img:last-child {
        width: 0.3rem;
        margin-right: 0.15rem;
      }
    }
  }

  .mainmenu {
    position: relative;
    height: 0.9rem;
    background: #f5efe9;
    display: flex;
    z-index: 11;
    li {
      height: 0.9rem;
      flex: 1;
      align-items: center;
      div {
        margin-top: 0.22rem;
        text-align: center;
        color: #2c2a2a;
        font-size: 0;
        border-right: 0.01rem solid #a8a8a8;
        box-sizing: border-box;
        height: 0.46rem;
        line-height: 0.46rem;
        span {
          font-size: 0.28rem;
        }
        img {
          margin-left: 0.15rem;
          width: 0.3rem;
          height: 0.18rem;
        }
      }
      .meraddress {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.3rem;
          height: 0.18rem;
        }
      }
      .meraddress2 {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.3rem;
          height: 0.18rem;
        }
      }
    }
    li:last-child > div {
      border-right: none;
    }
  }

  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }

  .merchant {
    .centercontent {
      background: #fff;
      border-bottom: 0.01rem solid #717171;
      padding: 0 0.08rem;
      ul {
        height: 1.84rem;
        display: flex;
        li {
          flex: 1;
          justify-content: center;
          div {
            text-align: center;
            margin-top: 0.26rem;
            img {
              height: 0.84rem;
            }
          }
          p {
            font-size: 0.24rem;
            margin-top: 0.2rem;
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
      .scroll {
        margin-left: 50%;
      }
    }
  }

  .categorywrap {
    position: fixed;
    width: 100%;
    top: 1.76rem;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    .categorylist {
      width: 100%;
      height: 6.16rem;
      display: flex;
      .leftside, .rightside {
        height: 6.16rem;
        overflow: auto;
        li {
          height: 0.88rem;
          color: #555555;
          line-height: 0.88rem;
          text-align: center;
          span {
            font-size: 0.3rem;
          }
        }
        .isactive {
          background: #fff;
          border-left: 0.06rem;
          color: #ef4545;
          box-sizing: border-box;
          color: #ef4545;
        }
      }
      .leftside {
        width: 35%;
        background: #e0e0e0;
      }
      .rightside {
        width: 65%;
        background: #fff;
        li:active {
          background: #e0e0e0;
        }
      }
      .rightdiv {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.3rem;
        color: #555555;
      }
      .rightdiv:active {
        background: #e0e0e0;
      }
    }
  }

  .mercategory-enter-active {
    transition: all .3s;
  }

  .mercategory-enter, .mercategory-leave-active {
    margin-top: -6.16rem;
    opacity: 0;
  }

  .amapwrap {
    display: none;
  }
</style>
