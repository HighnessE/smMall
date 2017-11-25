/**
 * Created by wolfsheller on 2017/5/5.
 */
export default {
  state: {
    orderinfo: {
      pay: 0,
      status: 0,
      number: 0,
      gid: 0,
      address: '',
      name: '',
      phone: 0,
      remark: '',
      total: ''
    },
    marketorderinfo: {
      pay: 0,
      status: 0,
      number: 0,
      gid: 0,
      address: '',
      name: '',
      phone: 0,
      remark: '',
      total: ''
    },
    salleritems: {},
    gooditems: {},
    marketgooditems: []
  },
  mutations: {
    resetMerchantpayState (state) {
      state.orderinfo = {
        pay: 0,
        status: 0,
        number: 0,
        gid: 0,
        address: '',
        name: '',
        phone: 0,
        remark: '',
        total: ''
      }
      state.marketorderinfo = {
        pay: 0,
        status: 0,
        number: 0,
        gid: 0,
        address: '',
        name: '',
        phone: 0,
        remark: '',
        total: ''
      }
      state.gooditems = {}
      state.salleritems = {}
      state.marketgooditems = []
    }
  },
  actions: {
    resetPayAll (context) {
      context.commit('resetConfirmState')
      context.commit('resetMerchantpayState')
    }
  },
  getters: {
    mercalculate: function (state) {
      return (parseFloat(state.gooditems.t_price) * state.gooditems.number).toFixed(2)
    },
    marketcalculate: function (state) {
      let calculate = 0
      for (let item of state.marketgooditems) {
        calculate += parseFloat((parseFloat(item.t_price) * parseInt(item.number)).toFixed(2))
      }
      return calculate.toFixed(2)
    },
    marketcalculatenum: function (state) {
      let calculate = 0
      for (let item of state.marketgooditems) {
        calculate += parseInt(item.number)
      }
      return calculate
    }
  }
}
