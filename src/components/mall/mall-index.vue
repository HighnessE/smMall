/**
* Created by wolfsheller on 2017/2/27 0027.
* 主页推荐组件
*/
<template>
  <section class="mallindex">
    <my-swiper :banneritems="banneritems"></my-swiper>
    <ul class="options">
      <li v-for="item in iconitems">
        <router-link :to="{ path: '/mall/action', query: { aid: item.url } }">
          <img :src=item.imgsrc alt="">
        </router-link>
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <section class="banneritems">
      <router-link :to="{ path: '/mall/details', query: { gid: partitems1.url } }">
        <img :src=partitems1.imgsrc alt="">
      </router-link>
    </section>
    <section>
      <div class="acrossitems">
        <router-link :to="{ path: '/mall/market', query: { mid: item.url } }"
                     v-for="item in partitems2.across"
                     :key=item.id>
          <img :src=item.imgsrc alt="">
        </router-link>
      </div>
      <ul class="classesitems">
        <li v-for="item in partitems2.classes">
          <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
            <img :src=item.imgsrc alt="">
          </router-link>
        </li>
      </ul>
      <div class="banneritems">
        <router-link :to="{ path: '/mall/details', query: { gid: partitems2.url } }">
          <img :src=partitems2.imgsrc alt="">
        </router-link>
      </div>
    </section>
    <mall-module :moduletitle=partitems3.title
                 :bannerurl=partitems3.url
                 :bannerimgsrc=partitems3.imgsrc
                 :moduleColor=moduleColor.life>
      <div class="acrossitems">
        <router-link :to="{ path: '/mall/market', query: { mid: item.url } }"
                     v-for="item in partitems3.across"
                     :key=item.id>
          <img :src=item.imgsrc alt="">
        </router-link>
      </div>
      <ul class="classesitems">
        <li v-for="item in partitems3.classes">
          <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
            <img :src=item.imgsrc alt="">
          </router-link>
        </li>
      </ul>
    </mall-module>
    <mall-module :moduletitle=partitems4.title
                 :bannerurl=partitems4.url
                 :bannerimgsrc=partitems4.imgsrc
                 :moduleColor=moduleColor.fashion>
      <ul class="classesitems">
        <li v-for="item in partitems4.picture">
          <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
            <img :src=item.imgsrc alt="">
          </router-link>
        </li>
      </ul>
    </mall-module>
    <mall-module :moduletitle=partitems5.title
                 :bannerurl=partitems5.url
                 :bannerimgsrc=partitems5.imgsrc
                 :moduleColor=moduleColor.boutique>
      <ul class="goodcollectitems">
        <li v-for="item in partitems5.picture">
          <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
            <img :src=item.imgsrc alt="">
          </router-link>
        </li>
      </ul>
    </mall-module>
    <mall-module :moduletitle=partitems6.title
                 :bannerurl=partitems6.url
                 :bannerimgsrc=partitems6.imgsrc
                 :moduleColor=moduleColor.delicious>
      <div class="acrossitems">
        <router-link :to="{ path: '/mall/market', query: { mid: item.url } }"
                     v-for="item in partitems6.picture"
                     :key=item.id>
          <img :src=item.imgsrc alt="">
        </router-link>
      </div>
    </mall-module>
    <my-backtop></my-backtop>
  </section>
</template>

<script type="text/ecmascript-6">
  import myBacktop from 'components/common/mybacktop'
  import mySwiper from 'components/common/myswiper'
  import mallModule from './m-module'

  export default {
    components: {
      mallModule,
      myBacktop,
      mySwiper
    },
    data () {
      return {
        // 前端处理后的数据
        // 轮播图
        banneritems: [],
        // 会场图标
        iconitems: [],
        // 模块1
        partitems1: [],
        // 模块2
        partitems2: {},
        // 模块3
        partitems3: {},
        // 模块4
        partitems4: {},
        // 模块5
        partitems5: {},
        // 模块6
        partitems6: {},
        // 各模块的title颜色
        moduleColor: {
          life: '#06c1fb',
          fashion: '#25e379',
          boutique: '#fb516b',
          delicious: '#fb516b'
        }
      }
    },
    methods: {
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.mallUrl + 'index'
        }).then(function (response) {
          let res = response.data
          that.banneritems = res.banneritems
          that.iconitems = res.iconitems
          that.partitems1 = res.partitems[0]
          that.partitems2 = res.partitems[1]
          that.partitems2.across = res.partitems[1].picture.slice(0, 2)
          that.partitems2.classes = res.partitems[1].picture.slice(2)
          that.partitems3 = res.partitems[2]
          that.partitems3.across = res.partitems[2].picture.slice(0, 2)
          that.partitems3.classes = res.partitems[2].picture.slice(2)
          that.partitems4 = res.partitems[3]
          that.partitems5 = res.partitems[4]
          that.partitems6 = res.partitems[5]
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .mallindex {
    background: #fff;
  }

  .options {
    height: 1.68rem;
    display: flex;
    /*background: #eee;*/
    li {
      flex: 1;
      font-size: 0.24rem;
      text-align: center;
      img {
        display: block;
        width: 0.88rem;
        margin: 0.18rem auto;
      }
    }
  }

  .banneritems {
    width: 100%;
    font-size: 0;
    border-bottom: 0.02rem solid #eaeaea;
    img {
      width: 100%;
    }
  }

  .acrossitems {
    width: 100%;
    font-size: 0;
    border-bottom: 0.02rem solid #eaeaea;
    display: flex;
    flex-flow: row wrap;
    a {
      width: 50%;
      display: block;
      img {
        width: 100%;
        box-sizing: border-box;
      }
    }
    img:nth-child(1) {
      border-right: 0.02rem solid #eaeaea;
    }
    img:nth-child(2) {
      border-left: 0.02rem solid #eaeaea;
    }
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
      img {
        width: 100%;
      }
    }
    li:nth-child(4n) {
      border-right: none;
    }
  }

  .fashionsportitems {
    .titlepart {
      color: #25e379 !important;
    }
  }

  .goodcollectitems {
    .titlepart {
      color: #fb516b !important;
    }
    display: flex;
    flex-flow: row wrap;
    li {
      width: 33.3%;
      text-align: center;
      box-sizing: border-box;
      border-right: 0.02rem solid #eaeaea;
      border-bottom: 0.02rem solid #eaeaea;
      img {
        width: 100%;
      }
    }
    li:nth-child(3n) {
      border-right: none;
    }
  }
</style>
