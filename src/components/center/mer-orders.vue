/**
* Created by wolfsheller on 2017/4/19.
* 同城订单组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div class="content">
      <ul class="titleul">
        <li v-for="(item, index) in optionitems" @click=changeOrderList(index)>
          <div class="itemlogo">
            <img :src="item.imgurl1" alt="" v-if="!optionitems[index].ifoptactive">
            <img :src="item.imgurl2" alt="" v-else>
          </div>
          <div class="itemword" :class="{ active: optionitems[index].ifoptactive }">
            <span>{{ item.option }}</span>
          </div>
          <div class="itemcount" :class="{ active: optionitems[index].ifshow }">
            <span>{{ item.count }}</span>
          </div>
        </li>
      </ul>
      <div class="merchantorder">
        <ul class="contentul" v-if="ifhascontent">
          <li v-for="(item, index) in needorders">
            <one-merorder :merordersitems="needorders[index]"></one-merorder>
          </li>
        </ul>
        <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
      </div>
    </div>
    <wrap-function :popupitems="popupitems"
                   v-if="iforderpopup"
                   @confirm-btn="confirmbtn"
                   @close-popup="closepopup">
      <h4 class="popuptitle">{{ popupitems.title }}</h4>
      <div class="popupinfo">{{ popupitems.alert }}</div>
    </wrap-function>
    <wrap-merpay :exactlypay="orderinfo.total"
                 :orderinfo="orderinfo"
                 v-if="ifwaitpayway"
                 @close-paywrap="merclosepaywrap"
                 :businessname="orderinfo.businessname"></wrap-merpay>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import oneMerorder from 'components/module/one-merorder'
  import wrapFunction from 'components/common/wrap-function'
  import noContent from 'components/common/no-content'
  import wrapMerpay from 'components/merchant/wrap-merpay'
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    components: {
      myHeader,
      oneMerorder,
      wrapFunction,
      noContent,
      wrapMerpay
    },
    data () {
      return {
        headeritem: '同城订单',
        ifnocontent: false,
        ifhascontent: true,
        nocontent: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '暂无内容，赶快去',
          describe2: '采购',
          describe3: '一些吧'
        },
        optionitems: [
          {
            imgurl1: 'static/img/order/all1.png',
            imgurl2: 'static/img/order/all2.png',
            option: '全部',
            count: '',
            ifshow: true,
            ifoptactive: true
          },
          {
            imgurl1: 'static/img/order/payment1.png',
            imgurl2: 'static/img/order/payment2.png',
            option: '待付款',
            count: '',
            ifshow: true,
            ifoptactive: false
          },
          {
            imgurl1: 'static/img/order/deliver1.png',
            imgurl2: 'static/img/order/deliver2.png',
            option: '待发货',
            count: '',
            ifshow: true,
            ifoptactive: false
          },
          {
            imgurl1: 'static/img/order/delivery1.png',
            imgurl2: 'static/img/order/delivery2.png',
            option: '待收货',
            count: '',
            ifshow: true,
            ifoptactive: false
          },
          {
            imgurl1: 'static/img/order/comment1.png',
            imgurl2: 'static/img/order/comment2.png',
            option: '其他',
            count: '',
            ifshow: true,
            ifoptactive: false
          }
        ],
        needorders: []
      }
    },
    computed: {
      ...mapState({
        iforderpopup: state => state.merorder.iforderpopup,
        popupitems: state => state.merorder.popupitems,
        merorderitems: state => state.merorder.merorderitems,
        nowoid: state => state.merorder.nowoid,
        nowstatus: state => state.merorder.nowstatus,
        ifwaitpayway: state => state.merorder.ifwaitpayway,
        orderinfo: state => state.merorder.orderinfo
      }),
      ...mapGetters([
        'merobligation',
        'merwaitdeliver',
        'mertakedelivery',
        'merwaitcomment'
      ])
    },
    methods: {
      ...mapMutations([
        'merclosepaywrap'
      ]),
      confirmbtn () {
        let that = this
        let oStatus = this.popupitems.status
        let bodydata = {
          oid: this.nowoid
        }
        let bodydata2 = {
          oid: this.nowoid,
          status: this.nowstatus
        }
        if (oStatus === 1) {
          // 确认收货
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'confirm',
            body: bodydata,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.merorder.iforderpopup = false
              this.getDataFromBackend()
            }
          })
        } else if (oStatus === 2) {
          // 取消订单
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'escorder',
            body: bodydata2,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.merorder.iforderpopup = false
              this.getDataFromBackend()
            }
          })
        } else if (oStatus === 3) {
          // 删除订单
          this.$http({
            method: 'post',
            url: global.Domain.cityUrl + 'delorder',
            body: bodydata,
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            if (res === 1) {
              that.$store.state.merorder.iforderpopup = false
              this.getDataFromBackend()
            }
          })
        }
      },
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.cityUrl + 'order'
        }).then(function (response) {
          let res = response.data
          that.$store.state.merorder.merorderitems = res.orderitems
          this.changeOrderList(this.checkIfoptactive())
          this.initialData()
        })
      },
      checkIfoptactive () {
        for (let [index, item] of this.optionitems.entries()) {
          if (item.ifoptactive) {
            return index
          }
        }
      },
      closepopup () {
        this.$store.state.merorder.iforderpopup = false
      },
      changeOrderList (index) {
        for (let i = 0; i < this.optionitems.length; i++) {
          this.optionitems[i].ifoptactive = false
        }
        this.optionitems[index].ifoptactive = true
        this.optionitems.splice(index, 1, this.optionitems[index])
        switch (index) {
          case 0:
            this.needorders = this.merorderitems
            break
          case 1:
            this.needorders = this.merobligation
            break
          case 2:
            this.needorders = this.merwaitdeliver
            break
          case 3:
            this.needorders = this.mertakedelivery
            break
          case 4:
            this.needorders = this.merwaitcomment
            break
        }
        if (this.needorders.length === 0) {
          this.ifnocontent = true
          this.ifhascontent = false
        } else {
          this.ifnocontent = false
          this.ifhascontent = true
        }
      },
      initialData () {
        if (this.merobligation.length > 0) {
          this.optionitems[1].count = this.merobligation.length
          this.optionitems[1].ifshow = false
        } else {
          this.optionitems[1].ifshow = true
        }
        if (this.merwaitdeliver.length > 0) {
          this.optionitems[2].count = this.merwaitdeliver.length
          this.optionitems[2].ifshow = false
        } else {
          this.optionitems[2].ifshow = true
        }
        if (this.mertakedelivery.length > 0) {
          this.optionitems[3].count = this.mertakedelivery.length
          this.optionitems[3].ifshow = false
        } else {
          this.optionitems[3].ifshow = true
        }
        if (this.merwaitcomment.length > 0) {
          this.optionitems[4].count = this.merwaitcomment.length
          this.optionitems[4].ifshow = false
        } else {
          this.optionitems[4].ifshow = true
        }
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('resetOrderAll')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .content {
    margin-top: 0.8rem;
    .titleul {
      display: flex;
      align-content: space-between;
      background: #fff;
      padding: 0.22rem 0.2rem 0.22rem 0.1rem;
      border: 0.01rem solid #d5d5d5;
      li {
        flex: 1;
        text-align: center;
        position: relative;
        .itemlogo {
          img {
            height: 0.4rem;
          }
        }
        .itemword {
          margin-top: 0.14rem;
          span {
            font-size: 0.28rem;
          }
        }
        .active {
          span {
            color: #e40015;
          }
        }
        .itemcount {
          position: absolute;
          right: 0.08rem;
          top: -0.08rem;
          width: 0.38rem;
          height: 0.38rem;
          background: #f63345;
          color: #fff;
          border-radius: 50%;
          line-height: 0.38rem;
        }
        .itemcount.active {
          display: none;
        }
      }
      li:first-child {
        border-right: 0.01rem solid #d5d5d5;
      }
    }
  }

  .popuptitle {
    font-size: 0.36rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  .popupinfo {
    font-size: 0.28rem;
    color: #919191;
    margin-top: 0.24rem;
    margin-bottom: 0.4rem;
    padding: 0 0.6rem;
    line-height: 0.4rem;
  }
</style>
