/**
* Created by wolfsheller on 2017/3/17.
* xxx组件
*/
<template>
  <section class="">
    <simple-header>
      <junior-search @click-search="clickSearch" @clear-input="clearInput"></junior-search>
      <router-link :to="{ path: '/mall' }" slot="rightpart" tag="div">
        <img class="returnimg" :src=returnindex alt="">
      </router-link>
    </simple-header>
    <div v-if="ifhascontent">
      <div class="juniorinfo">
        <div class="junior" v-if="ifsearch">
          <p>以下为搜索结果</p>
        </div>
        <div class="junior" v-else>
          <p v-if="isactive">一级用户共{{ userstatus.count }}人，共为您带来{{ userstatus.money }}元佣金</p>
          <p v-else>二级用户共{{ userstatus.count2 }}人，共为您带来{{ userstatus.money2 }}元佣金</p>
        </div>
      </div>
      <div class="juniorcontent" v-if="ifsearch">
        <div class="junioritems">
          <div class="headerpart"><img :src=searchitem.headimg alt=""></div>
          <div class="mainpart">
            <div class="titlewrap">
              <p class="title">{{ searchitem.nickname }}</p>
              <p class="content">已为您赚取{{ searchitem.broker }}元佣金</p>
            </div>
            <div class="userid">
              <p>ID: {{ searchitem.hid }}</p>
              <div class="symbol">
                <img src="../../assets/packimg/levelone2.png" alt="" v-if="searchitem.type === '1'">
                <img src="../../assets/packimg/leveltwo2.png" alt="" v-else>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="options">
          <div class="leftblock" :class="{ active:isactive }" @click="changeToLevel1">
            <img src="../../assets/packimg/levelone.png" alt="" v-if="isactive">
            <img src="../../assets/packimg/levelone.png" alt="" v-else>
            <span>一级用户</span>
          </div>
          <div class="rightblock" :class="{ active:!isactive }" @click="changeToLevel2">
            <img src="../../assets/packimg/leveltwo.png" alt="" v-if="isactive">
            <img src="../../assets/packimg/leveltwo2.png" alt="" v-else>
            <span>二级用户</span>
          </div>
        </div>
        <div class="juniorcontent">
          <ul v-if="isactive">
            <li class="junioritems" v-for="item in firstitems.use">
              <div class="headerpart"><img :src=item.headimg alt=""></div>
              <div class="mainpart">
                <div class="titlewrap">
                  <p class="title">{{ item.nickname }}</p>
                  <p class="content">已为您赚取{{ item.brokerage }}元佣金</p>
                </div>
                <div class="userid">
                  <p>ID: {{ item.hid }}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li class="junioritems" v-for="item in seconditems.use">
              <div class="headerpart"><img :src=item.headimg alt=""></div>
              <div class="mainpart">
                <div class="titlewrap">
                  <p class="title">{{ item.nickname }}</p>
                  <p class="content">已为您赚取{{ item.brokerage }}元佣金</p>
                </div>
                <div class="userid">
                  <p>ID: {{ item.hid }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <wrap-tips :tipswrap="tipswrap" v-if="iftips" @change-iftips="changeiftips"></wrap-tips>
    <no-content :nocontent="nocontent" v-if="ifnocontent"></no-content>
  </section>
</template>

<script type="text/ecmascript-6">
  import simpleHeader from 'components/common/simple-header'
  import juniorSearch from './junior-search'
  import wrapTips from 'components/common/wrap-tips'
  import noContent from 'components/common/no-content'
  export default {
    components: {
      simpleHeader,
      juniorSearch,
      wrapTips,
      noContent
    },
    data () {
      return {
        isactive: true,
        ifsearch: false,
        iftips: false,
        leveluser: 'static/img/agent/junior/user1.png',
        tipswrap: {
          tipstitle: '请输入正确的用户ID',
          tipsinfo: '（正确格式为5位以上纯数字）'
        },
        firstitems: [],
        seconditems: [],
        userstatus: {},
        searchitem: {},
        returnindex: 'static/img/common/returnindex.png',
        ifhascontent: true,
        ifnocontent: false,
        nocontent: {
          imgsrc: 'static/img/common/noorder.png',
          describe1: '未搜索到对应用户，',
          describe2: '',
          describe3: '该用户可能不是您的下级'
        }
      }
    },
    methods: {
      changeiftips () {
        this.iftips = false
      },
      changeToLevel1 () {
        this.isactive = true
      },
      changeToLevel2 () {
        this.isactive = false
      },
      clearInput (msg) {
        this.ifsearch = msg
        this.ifnocontent = false
        this.ifhascontent = true
      },
      GetDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.agentUrl + 'myagent'
        }).then(function (response) {
          let res = response.data
          that.firstitems = res.firstitems
          that.seconditems = res.seconditems
          that.userstatus.count = res.firstitems.count
          that.userstatus.money = res.firstitems.money
          that.userstatus.count2 = res.seconditems.count
          that.userstatus.money2 = res.seconditems.money
        })
      },
      clickSearch (msg) {
        let that = this
        if (/^\d{5,}$/.test(msg)) {
          this.ifsearch = true
          this.$http({
            method: 'post',
            url: global.Domain.agentUrl + 'seagent',
            body: {
              hid: msg
            },
            emulateJSON: true
          }).then(function (response) {
            let res = response.data
            console.log(JSON.stringify(res))
            if (res.level === 0) {
              that.ifhascontent = false
              that.ifnocontent = true
            } else if (res.level === 1) {
              that.searchitem = res.useritems
              that.searchitem.hid = msg
              that.searchitem.type = '1'
            } else if (res.level === 2) {
              that.searchitem = res.useritems
              that.searchitem.hid = msg
              that.searchitem.type = '2'
            }
          })
        } else {
          this.iftips = true
        }
      }
    },
    created () {
      this.GetDataFromBackend()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  header {
    background: #f6f6f6 !important;
  }

  .returnimg {
    height: 0.38rem;
  }

  .juniorinfo {
    p {
      margin-top: 0.8rem;
      height: 0.84rem;
      font-size: 0.26rem;
      color: #929292;
      background: #f6f6f6;
      text-align: center;
      line-height: 0.78rem;
    }
  }

  .options {
    height: 0.76rem;
    font-size: 0.24rem;
    background: #f6f6f6;
    line-height: 0.56rem;
    display: flex;
    border-radius: 0.06rem;
    div {
      flex: 1;
      color: #919191;
      background: #f6f6f6;
      height: 0.76rem;
      box-sizing: border-box;
      line-height: 0.76rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 0.12rem;
        height: 0.42rem;
      }
    }
    .active {
      border-top: 0.04rem solid #ff8a00;
      background: #fff;
      color: #ff8a00;
    }
  }

  .juniorcontent {
    .junioritems {
      padding: 0.18rem 0.46rem;
      background: #fff;
      border-bottom: 0.01rem solid #ccc;
      display: flex;
      .headerpart {
        width: 1.02rem;
        height: 1.02rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .mainpart {
        margin-left: 0.28rem;
        display: flex;
        flex: 1;
        justify-content: space-between;
        .titlewrap {
          .title {
            font-size: 0.32rem;
            color: #382e2e;
            margin-top: 0.12rem;
          }
          .content {
            font-size: 0.26rem;
            color: #929292;
            margin-top: 0.22rem;
          }
        }
        .userid {
          margin-top: 0.1rem;
          font-size: 0.26rem;
          color: #919191;
          .symbol {
            margin-top: 0.16rem;
            text-align: center;
            height: 0.41rem;
            img {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .tipswrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .tipspopup {
      width: 90%;
      height: 3rem;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      font-size: 0.28rem;
      text-align: center;
      .menupart {
        height: 1.84rem;
        border-bottom: 0.01rem solid #e7e7e7;
        padding-top: 0.44rem;
        box-sizing: border-box;
        .tipstitle {
          line-height: 0.58rem;
          color: #333;
          font-size: 0.34rem;
        }
        .tipsinfo {
          font-size: 0.28rem;
          margin-top: 0.12rem;
          line-height: 0.4rem;
          color: #919191;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 1.16rem;
      }
    }
  }
</style>
