/**
 * Created by wolfsheller on 2017/3/16.
 * 商品详情操作模块相关信息
 */
export default {
  state: {
    ifhandlepanel: false,
    ifcollectpopup: false,
    collectmsg: '',
    ifcollectwrap: false,
    ifcollect: 0,
    gooditems: {},
    ifaddorpay: false
  },
  mutations: {
    // 打开商品详情操作面板
    openHandlepanel (state, msg) {
      if (msg === 1) {
        // 加入购物车
        state.ifaddorpay = true
        state.ifhandlepanel = true
      } else if (msg === 2) {
        // 立即购买
        state.ifaddorpay = false
        state.ifhandlepanel = true
      }
    },
    // 关闭商品详情操作面板
    closeHandlepanel (state) {
      state.ifhandlepanel = false
    },
    correctIfcollect (state) {
      state.ifcollectwrap = true
    },
    modifyIfcollect (state) {
      state.ifcollectwrap = false
    },
    collectSuccess (state) {
      state.ifcollect = 1
      state.collectmsg = '收藏成功'
    },
    collectCancel (state) {
      state.ifcollect = 0
      state.collectmsg = '取消收藏'
    },
    addShopcarSuccess (state) {
      state.collectmsg = '加入购物车成功'
    }
  },
  actions: {
    collectPopup ({commit, state}) {
      if (state.ifcollectwrap) {
        return
      }
      let oTimer = ''
      clearTimeout(oTimer)
      if (!state.ifcollect) {
        commit('collectSuccess')
        commit('correctIfcollect')
        oTimer = setTimeout(function () {
          commit('modifyIfcollect')
        }, 2000)
      } else {
        commit('collectCancel')
        commit('correctIfcollect')
        oTimer = setTimeout(function () {
          commit('modifyIfcollect')
        }, 2000)
      }
    },
    addShopcarPopup ({commit, state}) {
      if (state.ifcollectwrap) {
        return
      }
      let oTimer = ''
      clearTimeout(oTimer)
      commit('addShopcarSuccess')
      commit('correctIfcollect')
      oTimer = setTimeout(function () {
        commit('modifyIfcollect')
      }, 2000)
    }
  },
  getters: {
    handlePanel: state => {
      return {
        detailimg: state.gooditems.mainpic,
        detailprice: state.gooditems.price
      }
    }
  }
}
