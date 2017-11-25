/**
* Created by wolfsheller on 2017/3/4.
*/
<template>
  <swiper :options="swiperOption" ref="mySwiperA">
    <!-- 幻灯内容 -->
    <swiper-slide v-for="(item, index) in banneritems" :key=item.id>
      <router-link :to="{ path: '/mall/details', query: { gid: banneritems[index].url } }">
        <img :src=banneritems[index].imgsrc alt="">
      </router-link>
    </swiper-slide>
    <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script type="text/ecmascript-6">
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {
      banneritems: Array
    },
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          // 所有配置均为可选（同Swiper配置）
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true）
          notNextTick: true,
//          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
//          debugger: true
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .swiper-wrapper {
    img {
      width: 100%;
      display: block;
    }
  }

  .swiper-pagination {
    font-size: 0;
    bottom: 0.2rem !important;
    .swiper-pagination-bullet {
      width: 0.2rem !important;
      height: 0.2rem !important;
    }
  }
</style>
