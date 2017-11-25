/**
* Created by wolfsheller on 2017/4/23.
* 单个同城订单组件
*/
<template>
  <section>
    <div class="graybar"></div>
    <div class="singleorder">
      <router-link class="merchantinfo"
                   :to="{ path: '/merchant/details', query: { bid: merordersitems.bid } }"
                   tag="h4">
        {{ salleritems.t_bname }}
        <img :src=rightarrow alt="">
      </router-link>
      <div class="topblock" v-for="item in merordersitems.list">
        <div class="topimg">
          <img :src=item.t_mainpic alt="">
        </div>
        <div class="topright">
          <div class="topfirstline">
            <div class="ordername">{{ item.t_name }}</div>
            <div>￥ {{ item.t_price }}</div>
          </div>
          <div class="topsecondline">
            <span>x {{ item.t_number }}</span>
          </div>
        </div>
      </div>
      <div class="centerblock">
        <span v-if="merordersitems.t_order_status === '0'">
          待付款
        </span>
        <span v-else-if="merordersitems.t_order_status === '1'">
          待发货
        </span>
        <span v-else-if="merordersitems.t_order_status === '2'">
          待收货
        </span>
        <span v-else-if="merordersitems.t_order_status === '3'">
          待评价
        </span>
        <span v-else-if="merordersitems.t_order_status === '4'">
          交易成功
        </span>
        <span v-else-if="merordersitems.t_order_status === '5'">
          申请退货
        </span>
        <span v-else-if="merordersitems.t_order_status === '6'">
          已退货
        </span>
        <span v-else-if="merordersitems.t_order_status === '7'">
          用户取消订单
        </span>
        <span v-else-if="merordersitems.t_order_status === '8'">
          待收货(申请退货失败)
        </span>
        <span v-else="merordersitems.t_order_status === '9'">
          商家取消订单
        </span>
        <span v-if="merordersitems.t_order_status === '0'">
          共 {{ merordersitems.t_number }} 件 需付 ￥ {{ merordersitems.t_total }}
        </span>
        <span v-else>
          共 {{ merordersitems.t_number }} 件 实付 ￥ {{ merordersitems.t_total }}
        </span>
      </div>
      <div class="bottomblock">
        <!--待付款-->
        <div class="buttonwrap" v-if="merordersitems.t_order_status === '0'">
          <div></div>
          <div></div>
          <div>
            <button @click="mercancelOrderPopup({oid:merordersitems.id, status:1})">取消订单</button>
          </div>
          <div>
            <button class="lightbtn1"
                    @click="merpaymoneynow({oid: merordersitems.id, total:merordersitems.t_total, businessname: merordersitems.bname})">
              立即付款
            </button>
          </div>
        </div>
        <!--待发货-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '1'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="mercancelOrderPopup({oid:merordersitems.id, status:2})">取消订单</button>
          </div>
        </div>
        <!--待收货-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '2'">
          <div></div>
          <div>
            <!--<a href="">-->
            <!--<button class="lightbtn1">查看物流</button>-->
            <!--</a>-->
          </div>
          <div>
            <router-link :to="{ path: '/center/merorders/return', query: { oid: merordersitems.id } }" tag="button">申请退货
            </router-link>
          </div>
          <div>
            <button class="lightbtn2" @click="merconfirmOrderPopup(merordersitems.id)">确认收货</button>
          </div>
        </div>
        <!--待评价-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '3'">
          <div></div>
          <div></div>
          <div>
            <button @click="merdeleteOrderPopup(merordersitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: merordersitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
          <div>
            <router-link class="lightbtn1" :to="{ path: '/center/orders/comment', query: { gid: merordersitems.id } }"
                         tag="button">立即评价
            </router-link>
          </div>
        </div>
        <!--交易完成-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '4'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="merdeleteOrderPopup(merordersitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: merordersitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
          <!--<div>-->
          <!--<router-link class="lightbtn1" :to="{ path: '/center/orders/comment' }" tag="button">追加评价</router-link>-->
          <!--</div>-->
        </div>
        <!--申请退货-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '5'">
          <div class="verifystatus">
            <span>审核状态：</span><span>正在审核</span>
          </div>
        </div>
        <!--退货成功-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '6'">
          <div class="verifystatus">
            <span>审核状态：</span><span>已通过（货款将自动转入您的钱包）</span>
          </div>
        </div>
        <!--取消订单-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '7'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="merdeleteOrderPopup(merordersitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: merordersitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
        </div>
        <!--退货失败-->
        <div class="buttonwrap" v-else-if="merordersitems.t_order_status === '8'">
          <div></div>
          <div></div>
          <div>
            <router-link :to="{ path: '/center/merorders/return', query: { oid: merordersitems.id } }" tag="button">申请退货
            </router-link>
          </div>
          <div>
            <button class="lightbtn2" @click="merconfirmOrderPopup(merordersitems.id)">确认收货</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: merordersitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
        </div>
        <div class="buttonwrap" v-else="merordersitems.t_order_status === '9'">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button @click="merdeleteOrderPopup(merordersitems.id)">删除订单</button>
          </div>
          <!--<router-link :to="{ path: '/mall/details/confirm', query: { oid: merordersitems.id } }" tag="div">-->
          <!--<button class="lightbtn1">再次购买</button>-->
          <!--</router-link>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    props: {
      merordersitems: Object,
      salleritems: Object
    },
    data () {
      return {
        rightarrow: 'static/img/common/rightarrow.png'
      }
    },
    methods: {
      ...mapMutations([
        'merconfirmOrderPopup',
        'mercancelOrderPopup',
        'merdeleteOrderPopup',
        'merpaymoneynow'
      ])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .graybar {
    height: 0.2rem;
  }

  .singleorder {
    background: #fff;
    .merchantinfo {
      height: 0.84rem;
      font-size: 0.3rem;
      color: #333;
      padding-left: 0.26rem;
      border-bottom: 0.01rem solid #838383;
      display: flex;
      align-items: center;
      img {
        height: 0.3rem;
        margin-left: 0.2rem;
      }
    }
    .merchantinfo:active {
      background: #f6f6f6;
    }
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
