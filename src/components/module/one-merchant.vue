/**
* Created by wolfsheller on 2017/3/11.
* 单个商家组件
*/
<template>
  <div>
    <ul>
      <li v-for="item in merchantitems">
        <router-link class="singlemerchant"
                     :to="{ path: '/merchant/mardetails', query: { bid: item.id } }"
                     tag="div"
                     v-if="item.tip === '1'">
          <div class="imgpart"><img :src=item.t_mainpic alt=""></div>
          <div class="infopart">
            <div class="titleline"><span class="title">{{ item.t_bname }}</span></div>
            <div class="mainline">{{ item.t_address }}</div>
            <div class="infoline">
              <div class="distance">{{ item.t_distance }}km</div>
            </div>
          </div>
        </router-link>
        <router-link class="singlemerchant"
                     :to="{ path: '/merchant/details', query: { bid: item.id } }"
                     tag="div"
                     v-if="item.tip === '0'">
          <div class="imgpart"><img :src=item.t_mainpic alt=""></div>
          <div class="infopart">
            <div class="titleline"><span class="title">{{ item.t_bname }}</span></div>
            <div class="mainline">{{ item.t_address }}</div>
            <div class="infoline">
              <div class="distance">{{ item.t_distance }}km</div>
            </div>
          </div>
        </router-link>
        <!--<router-link class="singlemerchant" :to="{ path: '/merchant/details' }" tag="li" v-else>-->
          <!--<div class="imgpart"><img :src=item.imgsrc alt=""></div>-->
          <!--<div class="infopart">-->
            <!--<div class="titleline"><span class="title">{{ item.title }}</span></div>-->
            <!--<div class="mainline">{{ item.address }}</div>-->
            <!--<div class="infoline">-->
              <!--<div class="distance">{{ item.distance }}km</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</router-link>-->
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      merchantitems: Array
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul {
    .singlemerchant {
      height: 2rem;
      margin-bottom: 0.2rem;
      background: #fff;
      padding: 0.3rem 0.22rem;
      display: flex;
      div.imgpart {
        height: 2rem;
        width: 2.25rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div.infopart {
        height: 2rem;
        flex: 1;
        margin-left: 0.3rem;
        .titleline {
          display: flex;
          justify-content: space-between;
          span.title {
            line-height: 0.62rem;
            font-size: 0.34rem;
            color: #333;
          }
        }
        .mainline {
          margin-top: 0.1rem;
          line-height: 0.36rem;
          font-size: 0.26rem;
          color: #929292;
          height: 0.72rem;
          overflow: hidden;
        }
        .infoline {
          margin-top: 0.12rem;
          display: flex;
          justify-content: space-between;
          .distance {
            line-height: 0.46rem;
            color: #929292;
            font-size: 0.26rem;
          }
        }
      }
    }
  }
</style>
