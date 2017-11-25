/**
 * Created by wolfsheller on 2017/3/20.
 * 购物车信息
 */
export default {
  state: {
    // 购物车数据集合，ajax初始化,ifcheck判断是否选中，ifedit判断是否处于编辑状态
    shopcaritems: [],
    // 购物车全局操作的数据状态
    // number结算数量，total总价，ifcheckall是否全选，ifaccount切换操作面板状态
    shopcar: {
      checkStr: 0,
      number: 0,
      total: '0.00',
      ifcheckall: false,
      ifedit: false,
      ifaccount: false
    }
  },
  mutations: {
    // 选中购物车的单条数据(编辑状态，可以全选）
    changeCheck (state, index) {
      state.shopcar.checkStr = 0
      let oshopcar = state.shopcaritems[index]
      if (oshopcar.ifcheck === true) {
        oshopcar.ifcheck = false
      } else {
        oshopcar.ifcheck = true
      }
      state.shopcaritems.splice(index, 1, oshopcar)
      for (let item of state.shopcaritems) {
        if (item.ifcheck) {
          state.shopcar.checkStr++
        } else {
          state.shopcar.checkStr--
        }
      }
      if (state.shopcar.checkStr === state.shopcaritems.length) {
        state.shopcar.ifcheckall = true
      } else {
        state.shopcar.ifcheckall = false
      }
    },
    // 选中购物车的单条数据（购买状态，不能全选）
    changeCheck2 (state, index) {
      let oshopcar = state.shopcaritems[index]
      if (oshopcar.ifcheck === true) {
        oshopcar.ifcheck = false
        state.shopcar.total = '0.00'
      } else {
        for (let item of state.shopcaritems) {
          item.ifcheck = false
        }
        oshopcar.ifcheck = true
        state.shopcar.total = (parseFloat(oshopcar.price) * parseInt(oshopcar.number)).toFixed(2) + ''
      }
      state.shopcaritems.splice(index, 1, oshopcar)
    },
    // 购物车的全选功能
    changeCheckAll (state) {
      if (state.shopcar.ifcheckall === true) {
        for (let item of state.shopcaritems) {
          item.ifcheck = false
        }
        state.shopcar.checkStr = 0
        state.shopcar.ifcheckall = false
      } else {
        for (let item of state.shopcaritems) {
          item.ifcheck = true
        }
        state.shopcar.checkStr = state.shopcaritems.length
        state.shopcar.ifcheckall = true
      }
    },
    // 编辑购物车的功能
    editShopcar (state) {
      for (let item of state.shopcaritems) {
        item.ifedit = true
      }
      state.shopcar.ifedit = true
      state.shopcar.checkStr = 0
      if (state.shopcaritems.length === 1 && state.shopcaritems[0].ifcheck === true) {
        state.shopcar.ifcheckall = true
      }
    },
    // 完成购物车的功能
    finishShopcar (state) {
      for (let item of state.shopcaritems) {
        item.ifedit = false
      }
      for (let item of state.shopcaritems) {
        item.ifcheck = false
      }
      state.shopcar.ifedit = false
      state.shopcar.total = '0.00'
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
    }
  }
}
