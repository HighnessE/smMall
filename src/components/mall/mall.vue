/**
* Created by wolfsheller on 2017/2/22.
* 主页组件
*/
<template>
  <section>
    <div class="mallwrap">
      <mall-search @click-search="clickSearch"></mall-search>
      <nav>
        <div v-if="!ifcollapse">
          <div class="itemwrap">
            <ul class="navitemswrap">
              <li class="navitems navcontent" v-for="(item,index) in collapseitems" @click="changeActive(index)">
                <div :class="{'isactive':item.boolean}">
                  <router-link :to="'/mall/index'" v-if="item.id === '0'">{{ item.title }}</router-link>
                  <router-link :to="{ path: '/mall/goods/' + item.id }" v-else>{{ item.title }}
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="downarrow" @click="arrowClick">
              <img :src=downarrow alt="">
            </div>
          </div>
        </div>
        <div v-else>
          <div class="itemwrap itemwraper">
            <ul>
              <li class="navitems">
                <div>选择分类</div>
              </li>
            </ul>
            <div class="uparrow" @click="arrowClick">
              <img :src=uparrow alt="">
            </div>
          </div>
        </div>
        <transition name="navlist">
          <div class="collapsewrap" v-show="ifcollapse">
            <ul class="collapseitems">
              <li v-for="(item,index) in collapseitems" @click="changePos(index)">{{ item.title }}</li>
            </ul>
            <router-link class="morebtn" :to="{ path: '/mall/category' }">更多分类</router-link>
          </div>
        </transition>
      </nav>
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
  </section>
</template>

<script type="text/ecmascript-6">
  // 引入组件
  //  import myLoading from 'components/common/myloading'
  import myFooter from 'components/common/myfooter'
  import mallSearch from './mall-search'

  export default {
    components: {
      mallSearch,
//      myLoading,
      myFooter
    },
    data () {
      return {
        // 是否显示折叠面板
        ifcollapse: false,
        // 向下箭头
        downarrow: 'static/img/common/downarrow2.png',
        // 向上箭头
        uparrow: 'static/img/common/uparrow2.png',
        // 前端处理后的数据
        mallindex: {'id': '0', 'title': '推荐', 'boolean': true},
        collapseitems: []
      }
    },
    methods: {
      initialData () {
        let params = this.$route.params.id
        if (params) {
          for (let item of this.collapseitems) {
            item.boolean = false
          }
          for (let [i, item] of this.collapseitems.entries()) {
            if (params === item.id + '') {
              item.boolean = true
              this.$set(this.collapseitems, i, this.collapseitems[i])
              let deleteArr = this.collapseitems.splice(i, 1)[0]
              this.collapseitems.splice(1, 0, deleteArr)
              return
            }
          }
        }
      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.mallUrl + 'nav'
        }).then(function (response) {
          let res = response.data
          res.map(function (item) {
            item.boolean = false
            return item
          })
          res.unshift(that.mallindex)
          that.collapseitems = res
          this.initialData()
        })
      },
      changeActive (index) {
        for (let item of this.collapseitems) {
          item.boolean = false
        }
        this.collapseitems[index].boolean = true
        this.$set(this.collapseitems, index, this.collapseitems[index])
      },
      changePos (index) {
        if (this.collapseitems[index].id === 0) {
          this.$router.push({path: '/mall/index'})
        } else {
          this.$router.push({path: '/mall/goods/' + this.collapseitems[index].id})
        }
        this.changeActive(index)
        if (index !== 0) {
          let deleteArr = this.collapseitems.splice(index, 1)[0]
          this.collapseitems.splice(1, 0, deleteArr)
        }
        this.ifcollapse = false
      },
      arrowClick () {
        this.ifcollapse = !this.ifcollapse
      },
      clickSearch (msg) {
        this.$router.push({path: '/mall/markets', query: {content: msg}})
      }
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
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/mixin.less';

  .mallwrap {
    margin-bottom: 1.18rem;
  }

  nav {
    font-size: 0;
    position: relative;
    height: 0.66rem;
    .itemwrap {
      position: relative;
      width: 100%;
      z-index: 10;
      background: @maintheme;
      display: flex;
      .navitems {
        display: inline-block;
        color: #fff;
        margin: 0.06rem 0.13rem 0.12rem;
        height: 0.48rem;
        text-align: center;
        div {
          display: inline-block;
          font-size: 0.28rem;
          line-height: 0.48rem;
          padding-left: 0.05rem;
          padding-right: 0.05rem;
          a {
            color: #fff;
          }
        }
        div.isactive {
          border-bottom: 0.03rem solid #fff;
        }
      }
      .navitemswrap {
        white-space: nowrap;
        width: 90%;
        overflow: auto;
      }
      .downarrow, .uparrow {
        float: right;
        z-index: 10;
        width: 10%;
        height: 0.66rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.3rem;
          margin-right: 0.1rem;
        }
      }
    }
    .itemwraper {
      ul {
        width: 90%;
      }
    }
    .collapsewrap {
      width: 100%;
      position: absolute;
      z-index: 9;
      background: #f4f3f3;
      border: 0.01rem solid #c2c2c2;
      box-sizing: border-box;
      top: 0.66rem;
      left: 0;
      .collapseitems {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        text-align: center;
        li {
          color: #475160;
          width: 25%;
          font-size: 0.28rem;
          height: 0.92rem;
          line-height: 0.92rem;
          border-bottom: 0.02rem solid #e6e5e5;
          border-right: 0.02rem solid #e6e5e5;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
        li:nth-child(4n) {
          border-right: none;
        }
      }
      .morebtn {
        color: #475160;
        display: block;
        width: 3.24rem;
        text-align: center;
        margin: 0.16rem auto;
        font-size: 0.24rem;
        line-height: 0.72rem;
        height: 0.72rem;
        border: 0.02rem solid #e9e9e9;
        background: #fff;
        border-radius: 0.12rem;
      }
    }
  }

  .navlist-enter-active, .navlist-leave-active {
    transition: margin-top 0.5s
  }

  .navlist-enter, .navlist-leave-active {
    margin-top: -4.78rem;
  }
</style>
