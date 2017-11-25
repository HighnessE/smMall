/**
 * Created by wolfsheller on 2017/3/17.
 * 个人资料中的地址管理
 */
export default {
  state: {
    addressitems: [],
    addressvalue: ['440000', '440100', '440113'],
    submitaddr: {
      type: 0,
      adid: '',
      name: '',
      phone: '',
      partment: '广东省 广州市 番禺区',
      address: '',
      only: 0
    }
  },
  mutations: {
    changeAddress (state, address) {
      state.addressvalue = address
    },
    clearSubmitaddr (state) {
      state.submitaddr.name = ''
      state.submitaddr.phone = ''
      state.submitaddr.adid = ''
      state.submitaddr.address = ''
      state.submitaddr.only = 0
    }
  },
  action: {},
  getters: {}
}
