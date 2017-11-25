/**
 * Created by wolfsheller on 2017/4/23.
 * 商城的确认订单包括商城商品详情提交信息和商城购物车提交的信息
 */
export default {
  state: {
    // 单件商品提交的信息
    ifselectaddress: false,
    ifhasaddress: true,
    confirmaddressitems: [],
    nowaddress: '',
    confirmcoupon: [],
    couponlist: [],
    couponobj: {
      // 使用优惠券的张数
      couponpiece: 0,
      // 是否使用优惠券
      ifusecoupon: false,
      // 使用优惠券共多少面额
      coupontotal: 0,
      // 优惠券使用额度
      totalcoupon: 0,
      // 使用的优惠券id
      coupon: []
    },
    // 商城商品支付确认订单
    confirmobj: {
      // 订单从哪里提交
      status: 0,
      // 订单支付方式
      pay: 0,
      // 从商城商品详情提交则为商品gid和从购物车提交则为购物车id
      gid: 0,
      number: 0,
      coupon: [],
      address: '',
      name: '',
      phone: 0,
      remark: ''
    },
    // 商品详情
    gooditems: {},
    // 同城商品支付确认订单
    merchantpay: {}
  },
  mutations: {
    resetAddress (state) {
      for (let item of state.confirmaddressitems) {
        item.ifuseaddress = false
      }
    },
    countCoupon (state) {
      state.couponobj.coupon = []
      for (let item of state.couponlist) {
        if (item.ifusecoupon) {
          state.couponobj.coupon.push(item.id)
        }
      }
    },
    confirmpay (state) {
      state.confirmobj.coupon = state.couponobj.coupon
      state.confirmobj.address = state.nowaddress.partment + state.nowaddress.address
      state.confirmobj.name = state.nowaddress.name
      state.confirmobj.phone = state.nowaddress.phone
    },
    resetConfirmState (state) {
      state.ifselectaddress = false
      state.ifhasaddress = true
      state.confirmaddressitems = []
      state.nowaddress = ''
      state.confirmcoupon = []
      state.couponlist = []
      state.couponobj = {
        couponpiece: 0,
        ifusecoupon: false,
        coupontotal: 0,
        totalcoupon: 0,
        coupon: []
      }
      state.confirmobj = {
        status: 0,
        pay: 0,
        gid: 0,
        number: 0,
        coupon: [],
        address: '',
        name: '',
        phone: 0,
        remark: ''
      }
      state.gooditems = {}
    }
  },
  getters: {
    calculate: function (state) {
      return (parseFloat(state.gooditems.price) * state.gooditems.number + parseFloat(state.gooditems.fee) - state.couponobj.coupontotal).toFixed(2)
    },
    totalprice: function (state) {
      return (parseFloat(state.gooditems.price) * state.gooditems.number + parseFloat(state.gooditems.fee)).toFixed(2)
    }
  }
}
