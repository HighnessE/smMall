<template>
  <div id="app">
    <my-loading v-if="ifloading"></my-loading>
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive">-->
        <!--&lt;!&ndash; 这里是会被缓存的视图组件，比如 Home！ &ndash;&gt;-->
      <!--</router-view>-->
    <!--</keep-alive>-->

    <!--<router-view v-if="!$route.meta.keepAlive">-->
      <!--&lt;!&ndash; 这里是不被缓存的视图组件，比如 Edit！ &ndash;&gt;-->
    <!--</router-view>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import myLoading from 'components/common/myloading'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    components: {
      myLoading
    },
    computed: {
      ...mapState({
        ifloading: state => state.ifloading
      })
    }
  }
</script>

<style>
</style>
