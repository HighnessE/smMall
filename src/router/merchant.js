/**
 * Created by wolfsheller on 2017/4/20.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 引入路由组件
import Merchant from 'components/merchant/merchant'
const merchantDetail = resolve => require(['components/merchant/merchant-detail'], resolve)
const merchantGooddetail = resolve => require(['components/merchant/merchant-gooddetail'], resolve)
const marketDetail = resolve => require(['components/merchant/market-detail'], resolve)
// const marketCategory = resolve => require(['components/merchant/market-category'], resolve)
const marketGooddetail = resolve => require(['components/merchant/market-gooddetail'], resolve)
const merchantPaybill = resolve => require(['components/merchant/merchant-paybill'], resolve)
const Amap = resolve => require(['components/merchant/amap'], resolve)
const merchantConfirm = resolve => require(['components/merchant/merchant-confirm'], resolve)
const marketConfirm = resolve => require(['components/merchant/market-confirm'], resolve)
const returnMergoods = resolve => require(['components/merchant/mer-return'], resolve)

export default [
  {
    path: '/merchant',
    meta: '同城商家',
    component: Merchant
  },
  {
    path: '/merchant/details',
    meta: '同城商家详情',
    component: merchantDetail
  },
  {
    path: '/merchant/details/paybill',
    meta: '同城商家买单',
    component: merchantPaybill
  },
  {
    path: '/merchant/details/goods',
    meta: '同城商品详情',
    component: merchantGooddetail
  },
  {
    path: '/merchant/details/goods/confirm',
    meta: {
      title: '同城确认订单',
      keepAlive: true
    },
    component: merchantConfirm
  },
  {
    path: '/center/merorders/return',
    meta: '同城退换商品',
    component: returnMergoods
  },
  {
    path: '/merchant/mardetails',
    meta: '同城超市详情',
    component: marketDetail
  },
  // {
  //   path: '/merchant/mardetails/category',
  //   meta: '同城商品分类',
  //   component: marketCategory
  // },
  {
    path: '/merchant/mardetails/goods',
    meta: '同城超市商品详情',
    component: marketGooddetail
  },
  {
    path: '/merchant/mardetails/goods/confirm',
    meta: {
      title: '超市确认订单'
    },
    component: marketConfirm
  },
  {
    path: '/merchant/details/amap',
    meta: '查看地图',
    component: Amap
  }
]
