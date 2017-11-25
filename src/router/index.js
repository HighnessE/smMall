import Vue from 'vue'
import Router from 'vue-router'
// 引入路由模块
import mallRouter from './mall'
import centerRouter from './center'
import merchantRouter from './merchant'
// 引入路由组件
import Coupon from 'components/coupon/coupon'
import Agent from 'components/agent/agent'
const myJunior = resolve => require(['components/agent/myjunior'], resolve)
const paySuccess = resolve => require(['components/common/pay-success'], resolve)
const notFound = resolve => require(['components/common/not-found'], resolve)

Vue.use(Router)

let indexRouter = [
  {
    path: '/coupon',
    meta: '优惠券',
    component: Coupon
  },
  {
    path: '/agent',
    meta: '代理返现',
    component: Agent
  },
  {
    path: '/agent/junior',
    meta: '我的下级',
    component: myJunior
  },
  {
    path: '/complete/pay',
    meta: '支付成功',
    component: paySuccess
  },
  {
    path: '*',
    meta: '未找到页面',
    component: notFound
  }
]

let allrouters = mallRouter.concat(merchantRouter, centerRouter, indexRouter)

export default new Router({
  // mode: 'history',
  routes: allrouters
})
