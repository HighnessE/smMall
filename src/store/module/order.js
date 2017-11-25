/**
 * Created by wolfsheller on 2017/3/16.
 * 商城订单信息
 */
export default {
  state: {
    // 订单操作状态及提示信息
    orderpopupitems: {
      confirmorder: {
        status: 1,
        title: '您收到货物了吗？',
        alert: '（请收到货物后再确认收货哦）',
        affirmbtn: '确认收货',
        cancelbtn: '还没收到'
      },
      cancelorder: {
        status: 2,
        title: '你确定要取消订单吗？',
        alert: '（取消后钱款将退回您的钱包余额中）',
        affirmbtn: '取消订单',
        cancelbtn: '放弃'
      },
      deleteorder: {
        status: 3,
        title: '您要删除该订单吗？',
        alert: '（删除后无法恢复哦）',
        affirmbtn: '确定删除',
        cancelbtn: '取消'
      }
    },
    // 是否打开弹窗
    iforderpopup: false,
    // 当前操作状态及提示信息
    popupitems: {},
    // 所有订单信息
    orderitems: [],
    nowoid: 0,
    nowstatus: 0,
    ifwaitpayway: false,
    orderinfo: {}
  },
  mutations: {
    // 确认订单弹窗
    confirmOrderPopup (state, oid) {
      state.nowoid = oid
      state.iforderpopup = true
      state.popupitems = state.orderpopupitems.confirmorder
    },
    // 取消订单弹窗
    cancelOrderPopup (state, nowparam) {
      state.nowoid = nowparam.oid
      state.nowstatus = nowparam.status
      state.iforderpopup = true
      state.popupitems = state.orderpopupitems.cancelorder
    },
    // 删除订单弹窗
    deleteOrderPopup (state, oid) {
      state.nowoid = oid
      state.iforderpopup = true
      state.popupitems = state.orderpopupitems.deleteorder
    },
    // 立即付款
    paymoneynow (state, orderinfo) {
      state.orderinfo = {
        oid: orderinfo.oid,
        total: parseFloat(orderinfo.total)
      }
      state.ifwaitpayway = true
    },
    closepaywrap (state) {
      state.ifwaitpayway = false
    },
    resetOrderData (state) {
      state.iforderpopup = false
      state.popupitems = {}
      state.orderitems = []
      state.nowoid = 0
      state.nowstatus = 0
      state.ifwaitpayway = false
      state.orderinfo = {}
    }
  },
  actions: {
    resetOrderAll (context) {
      context.commit('resetOrderData')
      context.commit('resetMerorderData')
    }
  },
  getters: {
    // 待付款个数
    obligation: state => {
      return state.orderitems.filter(item => item.order_status === '0')
    },
    // 待发货个数
    waitdeliver: state => {
      return state.orderitems.filter(item => item.order_status === '1')
    },
    // 待收货个数
    takedelivery: state => {
      return state.orderitems.filter(item => item.order_status === '2' || item.order_status === '8')
    },
    // 待评价个数
    waitcomment: state => {
      return state.orderitems.filter(item => item.order_status === '3' || item.order_status === '4' || item.order_status === '5' || item.order_status === '6' || item.order_status === '7')
    }
  }
}
