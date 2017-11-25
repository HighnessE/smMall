/**
 * Created by wolfsheller on 2017/3/23.
 * 同城首页地址处理相关的信息
 */
export default {
  state: {
    addresscity: ['440100'],
    addressarea: ['440113'],
    addressvalue: [],
    message: [],
    nowpartment: '广东省广州市番禺区',
    ifreccommend: true,
    // 传递给子组件的当前显示的商家数据
    onemerchantitems: [],
    // 首页五个选项所有商家的数据
    merchantitems: [],
    collectindex: 0,
    nowmap: '120,23',
    newcid: 0,
    merchantmap: '',
    merchantname: ''
  },
  mutations: {
    updateMessage (state, message) {
      state.addressvalue = message.concat()
      state.addresscity = message.concat()
      state.addressarea = message.concat()
      state.addresscity.splice(0, 1)
      state.addresscity.splice(1, 1)
      state.addressarea.splice(0, 2)
    }
  },
  actions: {}
}
