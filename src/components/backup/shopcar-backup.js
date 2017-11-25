/**
 * Created by wolfsheller on 2017/3/20.
 */
export default {
  state: {
    // 购物车数据集合，ajax初始化,ifcheck判断是否选中，ifedit判断是否处于编辑状态
    shopcaritems: [],
    // 购物车全局操作的数据状态
    // number结算数量，total总价，ifcheckall是否全选，ifaccount切换操作面板状态
    shopcar: {
      number: 0,
      total: '0.00',
      ifcheckall: false,
      ifedit: false,
      ifaccount: false
    },
    // 购物车购买需要提交的信息
    // 当前所有订单涉及到的分类下的所有优惠券集合
    couponlist2: [],
    // 当前商品对应的优惠券信息
    couponcoupon: [],
    // 当前所有商品的数据
    orderinfolist: [],
    // 当前订单所有商品对应的优惠券信息,是couponobj2的一个集合
    goodcouponinfo: [],
    // 当前商品对应的优惠券信息
    couponobj2: {
      // 使用优惠券的张数
      couponpiece: 0,
      // 是否使用优惠券
      ifusecoupon: false,
      // 使用优惠券共多少面额
      coupontotal: 0,
      // 优惠券使用额度
      totalcoupon: 0,
      // 使用的优惠券id
      coupon: [],
      // 对应的商品ID
      gid: 0,
      oindex: 0
    },
    cartitems: {
      status: 3,
      pay: 0,
      cart: [],
      carcoupon: [
        {
          1: []
        }
      ],
      address: '',
      name: '',
      phone: '',
      remark: ''
    }
  },
  mutations: {
    // 选中购物车的单条数据
    changeCheck (state, index) {
      let totalCount = 0
      let totalPrice = parseFloat(state.shopcar.total)
      let onePrice = parseFloat(state.shopcaritems[index].price)
      let oneNumber = parseInt(state.shopcaritems[index].number)
      let checkStr = 0
      if (state.shopcaritems[index].ifcheck) {
        totalPrice -= onePrice * oneNumber
        state.shopcar.total = totalPrice.toFixed(2) + ''
        state.shopcaritems[index].ifcheck = false
      } else {
        totalPrice += onePrice * oneNumber
        state.shopcar.total = totalPrice.toFixed(2) + ''
        state.shopcaritems[index].ifcheck = true
      }
      for (let item of state.shopcaritems) {
        if (!item.ifcheck) {
          break
        } else {
          checkStr++
        }
      }
      if (checkStr === state.shopcaritems.length) {
        state.shopcar.ifcheckall = true
      } else {
        state.shopcar.ifcheckall = false
      }
      for (let item of state.shopcaritems) {
        if (item.ifcheck) {
          totalCount += parseInt(item.number)
        }
      }
      state.shopcar.number = totalCount
    },
    // 购物车的全选功能
    changeCheckAll (state) {
      // 购物车合计数量
      let totalCount = 0
      // 购物车合计价格
      let totalPrice = 0
      // 点击时判断当前状态，true则取消全选，false则全选
      if (state.shopcar.ifcheckall) {
        for (let item of state.shopcaritems) {
          item.ifcheck = false
        }
        state.shopcar.total = '0.00'
        state.shopcar.ifcheckall = false
      } else {
        for (let item of state.shopcaritems) {
          item.ifcheck = true
          totalPrice += parseFloat(item.price) * parseInt(item.number)
        }
        state.shopcar.total = totalPrice.toFixed(2) + ''
        state.shopcar.ifcheckall = true
      }
      for (let item of state.shopcaritems) {
        if (item.ifcheck) {
          totalCount += parseInt(item.number)
        }
      }
      state.shopcar.number = totalCount
    },
    // 编辑购物车的功能
    editShopcar (state) {
      for (let item of state.shopcaritems) {
        item.ifedit = true
      }
      state.shopcar.ifaccount = true
      state.shopcar.ifedit = true
    },
    // 完成购物车的功能
    finishShopcar (state) {
      let totalCount = 0
      let total = 0
      for (let item of state.shopcaritems) {
        item.ifedit = false
      }
      state.shopcar.ifaccount = false
      state.shopcar.ifedit = false
      for (let item of state.shopcaritems) {
        if (item.ifcheck) {
          totalCount += parseInt(item.number)
          total += parseInt(item.number) * parseFloat(item.price)
        }
      }
      state.shopcar.number = totalCount
      state.shopcar.total = total.toFixed(2)
    },
    // 点击增加按钮增加单条数据的数量
    increase (state, index) {
      state.shopcaritems[index].number++
    },
    // 点击减少按钮减少单条数据的数量
    reduce (state, index) {
      if (state.shopcaritems[index].number <= 1) {
        state.shopcaritems[index].number = 1
        return
      }
      state.shopcaritems[index].number--
    },
    ordercountcoupon (state) {
      for (let item of state.couponcoupon) {
        if (item.ifusecoupon && item.gid === state.couponobj2.gid) {
          state.couponobj2.coupon.push(item.id)
        }
      }
      console.log(JSON.stringify(state.couponobj2.coupon))
    }
  }
}
