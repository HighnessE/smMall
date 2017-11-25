/**
 * Created by wolfsheller on 2017/3/15.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 引入路由组件
import Center from 'components/center/center'
const myOrders = resolve => require(['components/center/myorders'], resolve)
const myWallet = resolve => require(['components/center/mywallet'], resolve)
const myCoupon = resolve => require(['components/center/mycoupon'], resolve)
const myInfomation = resolve => require(['components/center/myinfomation'], resolve)
const myShopcar = resolve => require(['components/center/myshopcar'], resolve)
const myCollection = resolve => require(['components/center/mycollection'], resolve)
const myRecharge = resolve => require(['components/center/recharge'], resolve)
const myWithdraw = resolve => require(['components/center/withdraw'], resolve)
const paymentRecord = resolve => require(['components/center/payment-record'], resolve)
const withdrawRecord = resolve => require(['components/center/withdraw-record'], resolve)
const myAddress = resolve => require(['components/center/myaddress'], resolve)
const editAddress = resolve => require(['components/center/edit-address'], resolve)
const createAddress = resolve => require(['components/center/create-address'], resolve)
// const createAddress2 = resolve => require(['components/center/create-address2'], resolve)
const newComment = resolve => require(['components/center/new-comment'], resolve)
const orderDetail = resolve => require(['components/center/order-detail'], resolve)
const returnGoods = resolve => require(['components/center/return-goods'], resolve)
// const Logistics = resolve => require(['components/center/logistics'], resolve)
const merAccess = resolve => require(['components/center/mer-access'], resolve)
const merOrders = resolve => require(['components/center/mer-orders'], resolve)
const merOrdersdetail = resolve => require(['components/center/mer-ordersdetail'], resolve)
const amapSetpos = resolve => require(['components/merchant/amap-setpos'], resolve)

export default [
  {
    path: '/center',
    meta: '个人中心',
    component: Center
  },
  {
    path: '/center/orders',
    meta: '商城订单',
    component: myOrders
  },
  {
    path: '/center/orders/detail',
    meta: '订单详情',
    component: orderDetail
  },
  {
    path: '/center/wallet',
    meta: '我的钱包',
    component: myWallet
  },
  {
    path: '/center/coupon',
    meta: '我的优惠券',
    component: myCoupon
  },
  {
    path: '/center/infomation',
    meta: '我的资料',
    component: myInfomation
  },
  {
    name: 'shopcar',
    path: '/center/shopcar',
    meta: '商城购物车',
    component: myShopcar
  },
  {
    path: '/center/collection',
    meta: '我的收藏',
    component: myCollection
  },
  {
    path: '/center/merorders',
    meta: '同城订单',
    component: merOrders
  },
  {
    path: '/center/merorders/detail',
    meta: '同城订单详情',
    component: merOrdersdetail
  },
  {
    path: '/center/meraccess',
    meta: '同城商家申请',
    component: merAccess
  },
  {
    path: '/center/meraccess/amapset',
    meta: '查看地图',
    component: amapSetpos
  },
  {
    path: '/center/orders/comment',
    meta: '填写评价',
    component: newComment
  },
  {
    path: '/center/orders/return',
    meta: '退换商品',
    component: returnGoods
  },
  {
    path: '/center/wallet/recharge',
    meta: '充值',
    component: myRecharge
  },
  {
    path: '/center/wallet/withdraw',
    meta: '申请提现',
    component: myWithdraw
  },
  {
    path: '/center/wallet/paymentrecord',
    meta: '提现记录',
    component: paymentRecord
  },
  {
    path: '/center/wallet/withdrawrecord',
    meta: '收支记录',
    component: withdrawRecord
  },
  {
    path: '/center/infomation/address',
    meta: '收货地址',
    component: myAddress
  },
  {
    path: '/center/infomation/editaddress',
    meta: '编辑地址',
    component: editAddress
  },
  {
    path: '/center/infomation/createaddress',
    meta: '新建地址',
    component: createAddress
  }
  // {
  //   path: '/center/infomation/createaddress2',
  //   meta: '新建地址',
  //   component: createAddress2
  // }
  // {
  //   path: '/center/orders/detail/logistics',
  //   meta: '查看物流',
  //   component: Logistics
  // }
]
