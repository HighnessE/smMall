/**
* Created by wolfsheller on 2017/3/24.
* 优惠券导航组件
*/
<template>
  <nav>
    <div v-if="!ifcollapse">
      <div class="itemwrap">
        <ul class="navitemswrap">
          <li class="navitems navcontent" v-for="(item,index) in totalitems" @click="changeHandle(index)">
            <div :class="{'isactive':item.boolean}">
              <a href="javascript:">{{ item.title }}</a>
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
        <ul class="totalitems">
          <li v-for="(item,index) in totalitems" @click="changePos(index)">{{ item.title }}</li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      totalitems: {
        type: Array
      },
      ifcollapse: {
        type: Boolean
      }
    },
    data () {
      return {
        downarrow: 'static/img/common/downarrow.png',
        uparrow: 'static/img/common/uparrow.png'
      }
    },
    methods: {
      arrowClick () {
        this.$emit('arrow-click')
      },
      changeHandle (index) {
        this.$emit('change-handle', index)
      },
      changePos (index) {
        this.$emit('change-pos', index)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  nav {
    font-size: 0;
    height: 0.78rem;
    .itemwrap {
      position: relative;
      width: 100%;
      z-index: 10;
      background: #fff;
      display: flex;
      .navitems {
        display: inline-block;
        color: #5e5e5e;
        margin: 0.12rem 0.13rem 0.18rem;
        height: 0.48rem;
        text-align: center;
        div {
          display: inline-block;
          font-size: 0.28rem;
          line-height: 0.48rem;
          padding-left: 0.05rem;
          padding-right: 0.05rem;
          a {
            color: #5e5e5e;
          }
        }
        .isactive {
          border-bottom: 0.03rem solid #e63259;
          a {
            color: #e53259;
          }
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
        height: 0.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.3rem;
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
      .totalitems {
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
