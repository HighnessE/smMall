/**
* Created by wolfsheller on 2017/3/15.
* 商品评论列表组件
*/
<template>
  <section class="goodscomment">
    <my-header :headeritem="headeritem"></my-header>
    <div class="content">
      <div class="topblock">
        <span>共{{ countitems.count }}人参与评分</span>
      </div>
      <div class="mainblock">
        <ul>
          <li v-for="(item, index) in commentitems">
            <div class="menupart">
              <div class="usertitle">
                <img :src=flower alt="">
                <span>{{ item.name }}</span>
              </div>
              <div>
                <vux-rater :rateritem=parseInt(commentitems[index].star) :disabledstatus="disabledstatus"></vux-rater>
              </div>
            </div>
            <div class="mainpart"><p>{{ item.content }}</p></div>
            <div class="subpart">
              <span>{{ item.time }}</span>
              <!--<span>颜色 {{ item.color }}</span>-->
              <!--<span>尺码 {{ item.size }}</span>-->
            </div>
          </li>
        </ul>
      </div>
      <goods-handle></goods-handle>
    </div>
    <handle-panel v-if="ifhandlepanel" :detailimg="gooditems.mainpic" :detailprice="gooditems.price"></handle-panel>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import vuxRater from 'components/common/vux-rater'
  import goodsHandle from './goods-handle'
  import handlePanel from './goods-panel'
  import {mapState} from 'vuex'

  export default {
    components: {
      myHeader,
      vuxRater,
      goodsHandle,
      handlePanel
    },
    data () {
      return {
        disabledstatus: true,
        headeritem: '查看评价',
        flower: 'static/img/common/flower.png',
        commentitems: [],
        countitems: {},
        gooditems: {}
      }
    },
    computed: {
      ...mapState({
        ifhandlepanel: state => state.handle.ifhandlepanel
      })
    },
    methods: {
      getDataFromBackend () {
        let that = this
        let newgid = this.$route.query.gid
        this.$http({
          method: 'post',
          url: global.Domain.mallUrl + 'comment',
          body: {
            gid: newgid
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.commentitems = res.commentitems
          that.countitems = res.countitems
          that.gooditems = res.gooditems
        })
      }
    },
    created () {
      this.getDataFromBackend()
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'confirmorder') {
        to.meta.keepAlive = false
      }
      this.$store.commit('resetConfirmState')
      this.$store.commit('closeHandlepanel')
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    h2 {
      width: 70%;
      font-size: 0.3rem;
      color: #1f1f1f;
    }
  }

  .goodscomment {
    margin-bottom: 0.92rem;
    .content {
      margin-top: 1rem;
      background: #fff;
      .topblock {
        padding: 0 0.22rem;
        height: 0.84rem;
        border-bottom: 0.01rem solid #ccc;
        span {
          font-size: 0.28rem;
          color: #333;
          line-height: 0.84rem;
        }
      }
      .mainblock {
        li {
          padding: 0 0.22rem;
          border-bottom: 0.01rem solid #ccc;
          .menupart {
            display: flex;
            margin-top: 0.22rem;
            justify-content: space-between;
            .usertitle {
              font-size: 0;
              img {
                vertical-align: bottom;
              }
              span {
                font-size: 0.24rem;
                color: #000;
                margin-left: 0.28rem;
              }
            }
          }
          .mainpart {
            p {
              margin-top: 0.24rem;
              font-size: 0.28rem;
              line-height: 0.48rem;
            }
          }
          .subpart {
            margin-top: 0.12rem;
            margin-bottom: 0.24rem;
            color: #bebebe;
            span {
              margin-right: 0.15rem;
            }
          }
        }
      }
    }
  }
</style>
