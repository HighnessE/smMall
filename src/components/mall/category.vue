/**
* Created by wolfsheller on 2017/3/15.
* 商品分类列表组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <div class="category">
      <ul class="navtitle">
        <li :class="{ active: item.isboolean }" v-for="(item, index) in cateitems" @click=optionsclick(index)>
          {{ item.title }}
        </li>
      </ul>
      <ul class="navcontent">
        <li v-for="item in catelist">
          <router-link :to="{ path: '/mall/market', query: { mid: item.url } }">
            <img :src=item.imgsrc alt="">
          </router-link>
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'

  export default {
    components: {
      myHeader
    },
    data () {
      return {
        headeritem: '商品列表',
        cateitems: [],
        catelist: []
      }
    },
    methods: {
      // 获取后端数据
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.mallUrl + 'category'
        }).then(function (response) {
          let res = response.data
          that.cateitems = res.cateitems
          for (let i = 0; i < that.cateitems.length; i++) {
            that.$set(that.cateitems[i], 'isboolean', false)
          }
          that.catelist = that.cateitems[0].list
          that.initialevent()
        })
      },
      // 初始化事件
      initialevent () {
        this.cateitems[0].isboolean = true
      },
      // 选项卡
      optionsclick (index) {
        for (let i = 0; i < this.cateitems.length; i++) {
          this.cateitems[i].isboolean = false
        }
        this.cateitems[index].isboolean = true
        this.catelist = this.cateitems[index].list
      }
    },
    mounted () {
      this.getDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .category {
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    .navtitle {
      height: 100%;
      overflow: auto;
      background: #f6f6f6;
      float: left;
      width: 28%;
      text-align: center;
      li {
        height: 1rem;
        line-height: 1rem;
        width: 2.1rem;
        font-size: 0.28rem;
        background: #f9f9f9;
        color: #555;
      }
      .active {
        background: #fff;
        color: #ef4545;
      }
    }
    .navcontent {
      width: 72%;
      display: flex;
      flex-flow: row wrap;
      li {
        margin: 0.1rem 0;
        width: 33.3%;
        text-align: center;
        font-size: 0.24rem;
        line-height: 0.6rem;
        color: #555555;
        img {
          margin: 0.1rem auto;
          display: block;
          height: 1.4rem;
        }
      }
    }
  }
</style>
