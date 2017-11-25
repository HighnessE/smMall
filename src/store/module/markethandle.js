/**
 * Created by wolfsheller on 2017/5/4.
 * 超市购物车操作相关模块信息
 */
export default {
  state: {
    ifmarketshow: false,
    marketitems: []
  },
  mutations: {
    addMarketshopcar (state, payload) {
      state.marketitems.push(payload)
    },
    goodreduce (state, index) {
      state.marketitems[index].goodscount--
      if (state.marketitems[index].goodscount === 0) {
        state.marketitems.splice(index, 1)
        if (state.marketitems.length === 0) {
          state.ifmarketshow = false
        }
      }
    },
    goodincrease (state, index) {
      state.marketitems[index].goodscount++
    },
    resetMarkethandleData (state) {
      state.ifmarketshow = false
      state.marketitems = []
    }
  },
  getters: {
    marketnumber: state => {
      return state.marketitems.length
    },
    marketprice: state => {
      let totalprice = 0
      for (let item of state.marketitems) {
        totalprice += parseFloat(item.goodsprice) * parseFloat(item.goodscount)
      }
      return totalprice.toFixed(2)
    }
  }
}
