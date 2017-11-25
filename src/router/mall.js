/**
 * Created by wolfsheller on 2017/3/15.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 引入路由组件
import Mall from 'components/mall/mall'
import mallIndex from 'components/mall/mall-index'
const mallGoods = resolve => require(['components/mall/mall-goods'], resolve)
const Action = resolve => require(['components/mall/action'], resolve)
const Market = resolve => require(['components/mall/market'], resolve)
const Markets = resolve => require(['components/mall/markets'], resolve)
const goodsDetail = resolve => require(['components/mall/goods-detail'], resolve)
const Category = resolve => require(['components/mall/category'], resolve)
const Comment = resolve => require(['components/mall/comment'], resolve)
const confirmOrder = resolve => require(['components/mall/confirm-order'], resolve)
const selectCoupon = resolve => require(['components/mall/select-coupon'], resolve)
const selectAddress = resolve => require(['components/center/select-address'], resolve)

export default [
  {
    path: '/',
    redirect: '/mall'
  },
  {
    path: '/mall/action',
    meta: '活动会场',
    component: Action
  },
  {
    path: '/mall/category',
    meta: '商品列表',
    component: Category
  },
  {
    path: '/mall/market',
    meta: '三级分类',
    component: Market
  },
  {
    path: '/mall/markets',
    meta: '三级分类',
    component: Markets
  },
  {
    name: 'goodsdetail',
    path: '/mall/details',
    meta: {
      title: '商品详情'
    },
    component: goodsDetail
  },
  // 确认订单，包括我的订单再次购买，我的收藏直接购买以及商品详情直接购买
  {
    name: 'confirmorder',
    path: '/mall/details/confirm',
    meta: {
      title: '确认订单'
    },
    component: confirmOrder
  },
  {
    path: '/mall/details/confirm/address',
    meta: {
      title: '选择地址'
    },
    component: selectAddress
  },
  {
    name: 'selectcoupon',
    path: '/mall/details/confirm/selectcoupon',
    meta: {
      title: '选择优惠券'
    },
    component: selectCoupon
  },
  {
    path: '/mall/comment',
    meta: '查看评论',
    component: Comment
  },
  {
    path: '/mall',
    component: Mall,
    children: [
      {
        path: '/',
        redirect: 'index'
      },
      {
        path: 'index',
        meta: '商城',
        component: mallIndex
      },
      {
        path: 'goods/:id',
        meta: '商城',
        component: mallGoods
      }
    ]
  }
]
