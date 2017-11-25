/**
* Created by wolfsheller on 2017/3/7.
* 单个订单组件
*/
<template>
  <div>
    <div class="graybar"></div>
    <div class="singleorder">
      <router-link class="topblock" tag="div" :to="{ path: '/center/orders/detail', query: { oid: orderitems.id } }">
        <div class="topimg"><img :src=orderitems.mainpic alt=""></div>
        <div class="topright">
          <div class="topfirstline">
            <div class="ordername">{{ orderitems.name }}</div>
            <div class="orderprice">￥ {{ orderitems.price }}</div>
          </div>
          <div class="topsecondline">
            <!--<span>颜色：{{ orderitems.color }} 尺码: {{ orderitems.size }}</span>-->
            <span>x {{ orderitems.number }}</span>
          </div>
        </div>
      </router-link>
      <div class="centerblock">
        <span v-if="orderitems.order_status === '0'">
          待付款
        </span>
        <span v-else-if="orderitems.order_status === '1'">
          待发货
        </span>
        <span v-else-if="orderitems.order_status === '2'">
          待收货
        </span>
        <span v-else-if="orderitems.order_status === '3'">
          待评价
        </span>
        <span v-else-if="orderitems.order_status === '4'">
          交易成功
        </span>
        <span v-else-if="orderitems.order_status === '5'">
          申请退货
        </span>
        <span v-else-if="orderitems.order_status === '6'">
          已退货
        </span>
        <span v-else-if="orderitems.order_status === '7'">
          用户取消订单
        </span>
        <span v-else="orderitems.order_status === '8'">
          待收货(申请退货失败)
        </span>
        <span v-if="orderitems.order_status === '0'">
          共 {{ orderitems.number }} 件 需付 ￥ {{ orderitems.total }}
        </span>
        <span v-else>
          共 {{ orderitems.number }} 件 实付 ￥ {{ orderitems.total }}
        </span>
      </div>
      <div class="bottomblock">
        <!--待付款-->
        <div class="buttonwrap" v-if="orderitems.order_status === '0'">
          <div></div>
          <div></div>
          <div>
            <button @click="cancelOrderPopup({oid:orderitems.id, status:1})">取消订单</button>
          </div>
          <div>
            <button class="lightbtn1" @click="paymoneynow({oid: orderitems.id, total:orderitems.total})">立即付款</button>
          </div>
        </div>
        <!--待发货-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '1'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="cancelOrderPopup({oid:orderitems.id, status:2})">取消订单</button>
          </div>
        </div>
        <!--待收货-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '2'">
          <div></div>
          <div>
            <!--<a href="">-->
            <!--<button class="lightbtn1">查看物流</button>-->
            <!--</a>-->
          </div>
          <div>
            <router-link :to="{ path: '/center/orders/return', query: { oid: orderitems.id } }" tag="button">申请退货
            </router-link>
          </div>
          <div>
            <button class="lightbtn2" @click="confirmOrderPopup(orderitems.id)">确认收货</button>
          </div>
        </div>
        <!--待评价-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '3'">
          <div></div>
          <div></div>
          <div>
            <button @click="deleteOrderPopup(orderitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: orderitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
          <div>
            <router-link class="lightbtn1" :to="{ path: '/center/orders/comment', query: { oid: orderitems.id } }"
                         tag="button">立即评价
            </router-link>
          </div>
        </div>
        <!--交易完成-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '4'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="deleteOrderPopup(orderitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: orderitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
          <!--<div>-->
          <!--<router-link class="lightbtn1" :to="{ path: '/center/orders/comment' }" tag="button">追加评价</router-link>-->
          <!--</div>-->
        </div>
        <!--申请退货-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '5'">
          <div class="verifystatus">
            <span>审核状态：</span><span>正在审核</span>
          </div>
        </div>
        <!--退货成功-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '6'">
          <div class="verifystatus">
            <span>审核状态：</span><span>已通过（货款将自动转入您的钱包）</span>
          </div>
        </div>
        <!--取消订单-->
        <div class="buttonwrap" v-else-if="orderitems.order_status === '7'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="deleteOrderPopup(orderitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: orderitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
        </div>
        <!--退货失败-->
        <div class="buttonwrap" v-else="orderitems.order_status === '8'">
          <div></div>
          <div>
            <button @click="viewCallback()">查看反馈</button>
          </div>
          <div>
            <router-link :to="{ path: '/center/orders/return', query: { oid: orderitems.id } }" tag="button">申请退货
            </router-link>
          </div>
          <div>
            <button class="lightbtn2" @click="confirmOrderPopup(orderitems.id)">确认收货</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: orderitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
        </div>
      </div>
    </div>
    <wrap-returnmsg v-if="ifverify" :verifyinfo="verifyinfo" @close-verify="closeVerify"></wrap-returnmsg>
  </div>
</template>

<script type="text/ecmascript-6">
  import wrapReturnmsg from 'components/common/wrap-returnmsg'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      orderitems: Object
    },
    components: {
      wrapReturnmsg
    },
    data () {
      return {
        ifverify: false,
        verifyinfo: ''
      }
    },
    methods: {
      ...mapMutations([
        'confirmOrderPopup',
        'cancelOrderPopup',
        'deleteOrderPopup',
        'paymoneynow'
      ]),
      viewCallback () {
        this.ifverify = true
        this.verifyinfo = this.orderitems.refund
      },
      closeVerify () {
        this.ifverify = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .graybar {
    height: 0.2rem;
  }

  .singleorder {
    background: #fff;
    .topblock {
      height: 1.58rem;
      font-size: 0;
      padding: 0.2rem;
      border-bottom: 0.01rem solid #ccc;
      display: flex;
      .topimg {
        width: 1.58rem;
        height: 1.58rem;
        img {
          height: 1.58rem;
          width: 1.58rem;
        }
      }
      .topright {
        width: 100%;
        margin-left: 0.22rem;
        height: 1.58rem;
        .topfirstline {
          margin-left: 0.1rem;
          display: flex;
          justify-content: space-between;
          color: #2a2a2a;
          font-size: 0.26rem;
          line-height: 0.32rem;
          .ordername {
            flex: 1;
          }
        }
        .topsecondline {
          margin-top: 0.12rem;
          color: #919191;
          font-size: 0.22rem;
          text-align: right;
          span {
            font-size: 0.26rem;
          }
        }
      }
    }
    .centerblock {
      height: 0.86rem;
      font-size: 0.26rem;
      color: #494949;
      line-height: 0.86rem;
      display: flex;
      justify-content: space-between;
      padding: 0 0.2rem;
      border-bottom: 0.01rem solid #ccc;
    }
    .bottomblock {
      height: 0.9rem;
      .buttonwrap {
        display: flex;
        div {
          flex: 1;
          button {
            display: block;
            background: #fff;
            border: 0.01rem solid #ccc;
            font-size: 0.26rem;
            color: #3f4853;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            box-sizing: border-box;
            height: 0.6rem;
            margin: 0.14rem auto 0;
            border-radius: 0.06rem;
          }
          .lightbtn1 {
            border: 0.01rem solid #e60018;
            color: #e60018;
          }
          .lightbtn2 {
            border: 0.01rem solid #e60018;
            background: #e60018;
            color: #fff;
          }
        }
        .verifystatus {
          line-height: 0.9rem;
          font-size: 0.26rem;
          text-align: right;
          padding-right: 0.24rem;
        }
      }
    }
  }
</style>
