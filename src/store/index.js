/**
 * Created by wolfsheller on 2017/3/16.
 */
// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入应用状态管理
import goodshandleStore from './module/goodshandle'
import orderStore from './module/order'
import addressStore from './module/address'
import shopcarStore from './module/shopcar'
import merchantStore from './module/merchant'
import couponStore from './module/coupon'
import confirmStore from './module/confirm'
import meraccessStore from './module/meraccess'
import merorderStore from './module/merorder'
import markethandleStore from './module/markethandle'
import merchantpayStore from './module/merchantpay'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifloading: true,
    confirmdirect: '/',
    confirmmoney: 0,
    confirmmerchant: '乖乖商城'
  },
  modules: {
    handle: goodshandleStore,
    order: orderStore,
    address: addressStore,
    shopcar: shopcarStore,
    merchant: merchantStore,
    coupon: couponStore,
    confirm: confirmStore,
    meraccess: meraccessStore,
    merorder: merorderStore,
    market: markethandleStore,
    merchantpay: merchantpayStore
  }
})
