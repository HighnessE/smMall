// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入页面入口文件
import App from './App'
// 引入路由配置文件
import Router from './router'
// 引入mockjs拦截请求，模拟返回服务器数据
// import Mock from './mock/index.js'
// 引入config-domain
import Domain from 'assets/domain.js'
// 引入EXIF
// import EXIF from 'assets/exif.exec.js'
// 引入fastclick
import FastClick from 'fastclick'
// 引入vue-resource
import VueResource from 'vue-resource'
// 引入vuex
import Store from './store/index.js'
// 引入vue-amap
import AMap from 'vue-amap'
Vue.use(AMap)
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'cff70e3d1e0ff9e38fb1d82801838419',
  // 插件集合
  plugin: ['Scale', 'Geolocation']
})
// 定义全局变量
global.Domain = Domain
// global.EXIF = EXIF
// 使用vue-resource
Vue.use(VueResource)
// 路由钩子
Router.beforeEach((to, from, next) => {
  let rediurl = to.path
  Vue.http({
    method: 'post',
    url: global.Domain.mallUrl + 'index',
    body: {
      rediurl: rediurl
    },
    emulateJSON: true
  }).then(function (response) {
    let res = response.data
    if (res.app === 0) {
      location.href = res.url
      return
    } else {
      Store.state.ifloading = false
    }
  })
  next()
})
Router.afterEach((to, from, next) => {
  if (to.meta) {
    if (to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = to.meta
    }
    // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   this.iframe = '/favicon.ico' + Math.random()
    // }
    let ua = navigator.userAgent
    if (/ip(hone|od|ad)/i.test(ua)) {
      var i = document.createElement('iframe')
      i.src = '/pages/static/img/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        })
      }
      document.body.appendChild(i)
    }
  }
  // function directRightUrl () {
  //   let { href, protocol, host, search, hash } = window.location
  //   const pathname = '' // 解决支付路径问题添加的前缀，替换成你的
  //   search = search || '?'
  //   hash = hash || '#/'
  //   let newHref = `${protocol}//${host}/${pathname}${search}${hash}`
  //   if (newHref !== href) {
  //     window.location.replace(newHref)
  //   }
  // }
  // directRightUrl()
})
// 移动端修复点透和延时
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  // Mock,
  template: '<App/>',
  components: {App}
})
