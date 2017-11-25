/**
* Created by wolfsheller on 2017/3/15.
*/
<template>
  <footer>
    <ul>
      <li v-for="(item, index) in footeritems" @click="changeActive(index)">
        <router-link :to="item.url">
          <div>
            <img :src="item.imgsrc2" alt="" v-show="ifimgsrc[index].status">
            <img :src="item.imgsrc1" alt="" v-show="!ifimgsrc[index].status">
          </div>
          <h1>{{ item.msg }}</h1>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ifimgsrc: [
          {'status': false},
          {'status': false},
          {'status': false},
          {'status': false},
          {'status': false}
        ],
        footeritems: [
          {
            'url': '/coupon',
            'msg': '优惠券',
            'imgsrc1': 'static/img/footer/coupon1.png',
            'imgsrc2': 'static/img/footer/coupon2.png'
          },
          {
            'url': '/mall',
            'msg': '商城',
            'imgsrc1': 'static/img/footer/mall1.png',
            'imgsrc2': 'static/img/footer/mall2.png'
          },
          {
            'url': '/merchant',
            'msg': '同城商家',
            'imgsrc1': 'static/img/footer/merchant1.png',
            'imgsrc2': 'static/img/footer/merchant2.png'
          },
          {
            'url': '/agent',
            'msg': '代理返现',
            'imgsrc1': 'static/img/footer/agent1.png',
            'imgsrc2': 'static/img/footer/agent2.png'
          },
          {
            'url': '/center',
            'msg': '个人中心',
            'imgsrc1': 'static/img/footer/center1.png',
            'imgsrc2': 'static/img/footer/center2.png'
          }
        ]
      }
    },
    methods: {
      changeActive (index) {
        for (let i = 0; i < this.ifimgsrc.length; i++) {
          this.ifimgsrc[i].status = false
        }
        this.ifimgsrc[index].status = !this.ifimgsrc[index].status
      },
      initialEvent () {
        let locationurl = window.location.href
        let that = this
        for (let i = 0; i < that.footeritems.length; i++) {
          if (locationurl.indexOf(that.footeritems[i].url) > 0) {
            that.changeActive(i)
          }
        }
      }
    },
    mounted () {
      this.initialEvent()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  footer {
    height: 1.18rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 0.01rem solid #ddd;
    ul {
      display: flex;
      li {
        flex: 1;
        color: #545454;
        height: 1.18rem;
        line-height: 0.34rem;
        margin-top: 0.06rem;
        text-align: center;
        img {
          height: 0.38rem;
          margin-top: 0.2rem;
        }
        h1 {
          font-size: 0.24rem;
        }
      }
      .router-link-active {
        h1 {
          color: #ff2772;
        }
      }
    }
  }
</style>
