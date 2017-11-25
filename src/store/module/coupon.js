/**
 * Created by wolfsheller on 2017/3/24.
 * 优惠券模块的所有信息
 */
export default {
  state: {
    // 当前页面显示的优惠券
    couponlist: [],
    // 优惠券所有选项及数据
    couponitems: [],
    // 获得的红包
    openpackmoney: 0,
    // 是否折叠选项面板
    ifcollapse: false,
    // 未打开红包黑色遮罩弹窗判断
    ifopenpackwrap: false,
    // 未打开红包弹窗判断
    ifopenpack: false,
    // 已打开红包弹窗判断
    ifpacketwrap: false,
    // 确认购买优惠券弹窗判断
    ifpayway: false,
    // 水平横条数据
    tipitems: {
      imgsrc: '',
      number: 0
    },
    // 点击优惠券以后获取当前优惠券信息
    couponinfo: {
      id: 0,
      money: 0
    }
  },
  mutations: {
    // 显示折叠选项面板
    arrowClick (state) {
      state.ifcollapse = !state.ifcollapse
    },
    // 切换优惠券种类
    changeHandle (state, index) {
      state.couponlist = state.couponitems[index].coupon
      state.couponlist.map(function (item) {
        item.title = state.couponitems[index].title
        item.deadline = item.usetime.split('-')
      })
      for (let item of state.couponitems) {
        item.boolean = false
      }
      state.couponitems[index].boolean = true
      state.couponitems.splice(index, 1, state.couponitems[index])
    },
    // 切换选中优惠券种类导航所处的位置
    changePos (state, index) {
      if (index !== 0) {
        let selectArr = state.couponitems.splice(index, 1)[0]
        state.couponitems.splice(1, 0, selectArr)
      }
      state.ifcollapse = false
    },
    // 关闭购买优惠券弹窗
    closePopup (state) {
      state.ifpayway = false
    },
    // 显示支付方式
    showConfirm (state, index) {
      state.couponinfo.id = parseFloat(state.couponlist[index].id)
      state.couponinfo.money = parseFloat(state.couponlist[index].money)
      state.ifpayway = true
    },
    // 隐藏红包弹窗
    hidePacket (state) {
      state.ifpacketwrap = false
    },
    // 用户是否有未打开的红包，有则弹出红包弹窗
    ifOpenpack (state) {
      state.ifopenpackwrap = true
      setTimeout(function () {
        state.ifopenpack = true
      })
    }
  },
  actions: {
    // 使用vuex actions调用了两个mutations的方法，主要是显示折叠选项面板以后更换选中项及内容
    changePos ({commit}, {index}) {
      commit('changeHandle', index)
      commit('changePos', index)
    }
  },
  getters: {
    orderinfo: state => {
      return {
        cid: state.couponinfo.id,
        money: state.couponinfo.money
      }
    }
  }
}
