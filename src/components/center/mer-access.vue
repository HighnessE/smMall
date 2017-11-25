/**
* Created by wolfsheller on 2017/4/19.
* 同城商家申请组件
*/
<template>
  <section class="">
    <my-header :headeritem="headeritem"></my-header>
    <div v-if="ifnotaccess">
        <ul class="accesscontent">
          <li>
            <cross-bar :crossitems="crossitems[0]">
              <div class="writebox">
                <input type="text"
                       v-model="uploadobj.bname"
                       placeholder="请输入店铺名称">
              </div>
            </cross-bar>
          </li>
          <li>
            <cross-bar :crossitems="crossitems[1]">
              <div class="writebox" @click="fcatePopup">
                <button class="hasnotselect" v-if="!uploadobj.fcateid">{{ uploadobj.fcate }}</button><button class="selectsuc" v-else>{{ uploadobj.fcate }}</button>
                <img :src=rightarrow alt="">
              </div>
            </cross-bar>
          </li>
          <li>
            <cross-bar :crossitems="crossitems[2]">
              <div class="writebox" v-if="ifhascate">
                <p class="hasnotcate">该行业暂无分类</p>
              </div>
              <div class="writebox" @click="scatePopup" v-else>
                <button class="hasnotselect" v-if="!uploadobj.scateid">{{ uploadobj.scate }}</button><button class="selectsuc" v-else>{{ uploadobj.scate }}</button>
                <img :src=rightarrow alt="">
              </div>
            </cross-bar>
          </li>
          <li class="graybar"></li>
          <li>
            <cross-bar :crossitems="crossitems[3]">
              <div class="writebox">
                <vux-address class="myaddress"></vux-address>
                <img :src=rightarrow alt="">
              </div>
            </cross-bar>
          </li>
          <li>
            <cross-bar :crossitems="crossitems[4]">
              <div class="writebox">
                <input type="text"
                       v-model="uploadobj.address"
                       placeholder="请输入详细地址">
              </div>
            </cross-bar>
          </li>
          <li>
            <cross-bar :crossitems="crossitems[5]">
              <div class="writebox">
                <router-link :to="{ path: '/center/meraccess/amapset' }">
                  <input class="innercontent"
                         type="button"
                         value="点击添加地图位置"
                         v-if="!uploadobj.ifhavasetmap">
                  <input class="innercontent" type="button" value="添加地址成功" v-else>
                </router-link>
                <input type="hidden"
                       v-model="uploadobj.map">
                <img :src=rightarrow alt="">
              </div>
            </cross-bar>
          </li>
          <li class="graybar"></li>
          <li>
            <cross-bar :crossitems="crossitems[6]">
              <div class="writebox">
                <input type="text"
                       v-model="uploadobj.username"
                       placeholder="请输入姓名">
              </div>
            </cross-bar>
          </li>
          <li>
            <cross-bar :crossitems="crossitems[7]">
              <div class="writebox">
                <input type="text"
                       v-model="uploadobj.phone"
                       placeholder="请输入联系电话">
              </div>
            </cross-bar>
          </li>
          <!--<li class="graybar"></li>-->
          <!--<li>-->
            <!--<div class="items">-->
              <!--<div class="itemwrap">-->
                <!--<div>-->
                  <!--<img class="itemlogo" :src=crossitems[8].imgsrc alt="">-->
                  <!--<span>{{ crossitems[8].title }}</span>-->
                <!--</div>-->
                <!--<div class="writeboxspec">-->
                  <!--<input class="uploadimg"-->
                         <!--type="file"-->
                         <!--value=""-->
                         <!--@change="uploadimg"-->
                         <!--ref="uploadimg">-->
                  <!--<button class="uploadbtn"-->
                          <!--v-if="ifuploadimg">点击上传营业执照</button>-->
                  <!--<div class="uploadpho" v-else>-->
                    <!--<img :src=uploadpho[0] alt="">-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
        <button class="submitbtn" @click="submitForm">确认提交</button>
    </div>
    <div class="verifystatus"  v-if="ifhasaccess">
      <!--待审核-->      <!--审核成功-->      <!--审核失败-->
      <div class="verifybox" v-if="infoitems.t_status === '0'">
        <cross-bar :crossitems="newcrossitems[0]">
          <p class="rightpart">{{ infoitems.t_bname }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[1]">
          <p class="rightpart">{{ infoitems.t_uptime }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[2]">
          <p class="rightpart">审核中...</p>
        </cross-bar>
      </div>
      <div class="verifybox" v-else-if="infoitems.t_status === '1'">
        <cross-bar :crossitems="newcrossitems[0]">
          <p class="rightpart">{{ infoitems.t_bname }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[1]">
          <p class="rightpart">{{ infoitems.t_uptime }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[2]">
          <p class="rightpart">审核成功</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[3]">
          <p class="rightpart">{{ adminitems.t_username }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[4]">
          <p class="rightpart">{{ adminitems.t_mpwd }}</p>
        </cross-bar>
      </div>
      <div class="verifybox" v-else-if="infoitems.t_status === '2'">
        <cross-bar :crossitems="newcrossitems[0]">
          <p class="rightpart">{{ infoitems.t_bname }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[1]">
          <p class="rightpart">{{ infoitems.t_uptime }}</p>
        </cross-bar>
        <cross-bar :crossitems="newcrossitems[2]">
          <p class="rightpart">审核失败</p>
        </cross-bar>
      </div>
    </div>
    <div class="popupwrap" v-if="ifhasfcate" @click="closefWrap">
      <ul class="popupcontent">
        <li class="popupline" v-for="(item, index) in cateitems" @click="selectFcate(index)" @click.stop>
          <div>
            <img :src=circle2 alt="" v-if="item.ifselect">
            <img :src=circle alt="" v-else>
          </div>
          <p>{{ item.t_title }}</p>
        </li>
      </ul>
    </div>
    <div class="popupwrap" v-if="ifhasscate" @click="closesWrap">
      <ul class="popupcontent">
        <li class="popupline" v-for="(item, index) in scateitems" @click="selectScate(index)" @click.stop>
          <div>
            <img :src=circle2 alt="" v-if="item.ifselect">
            <img :src=circle alt="" v-else>
          </div>
          <p>{{ item.t_title }}</p>
        </li>
      </ul>
    </div>
    <wrap-tips :tipswrap="tipswrap"
               v-if="iftips"
               @change-iftips="changeIftips"></wrap-tips>
    <div class="verifywrap" v-if="ifverify">
      <div class="verifypopup">
        <div class="menupart">
          <p class="tipstitle">{{ verifyinfo }}</p>
        </div>
        <div class="mainpart" @click="closeVerify">好的</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import vuxAddress from './vuxaddress'
  import crossBar from './crossbar'
  import wrapTips from 'components/common/wrap-tips'
  import {mapState} from 'vuex'
  export default {
    components: {
      myHeader,
      vuxAddress,
      crossBar,
      wrapTips
    },
    data () {
      return {
        circle: 'static/img/common/circle.png',
        circle2: 'static/img/common/circle2.png',
        headeritem: '同城商家申请',
        rightarrow: 'static/img/common/rightarrow.png',
        // 是否申请过商家
        ifnotaccess: false,
        ifhasaccess: false,
        // 提交成功弹窗
        iftips: false,
        // 是否上传图片
        ifuploadimg: true,
        // 所属行业弹窗
        ifhasfcate: false,
        // 行业分类弹窗
        ifhasscate: false,
        ifselect: false,
        // 验证弹窗
        ifverify: false,
        // 验证信息
        verifyinfo: '',
        crossitems: [
          {
            imgsrc: 'static/img/center/merchant/logo1.png',
            title: '店铺名称'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '所属行业'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '行业分类'
          },
          {
            imgsrc: 'static/img/center/merchant/logo3.png',
            title: '所在地区'
          },
          {
            imgsrc: 'static/img/center/merchant/logo4.png',
            title: '详细地址'
          },
          {
            imgsrc: 'static/img/center/merchant/logo5.png',
            title: '生成地图'
          },
          {
            imgsrc: 'static/img/center/merchant/logo6.png',
            title: '联系人'
          },
          {
            imgsrc: 'static/img/center/merchant/logo7.png',
            title: '联系电话'
          },
          {
            imgsrc: 'static/img/center/merchant/logo8.png',
            title: '营业执照'
          }
        ],
        tipswrap: {
          tipstitle: '申请提交成功',
          tipsinfo: '审核会在3个工作日内完成'
        },
        // 所属行业
        cateitems: [],
        // 行业分类
        scateitems: [],
        uploadpho: [''],
        activecate: 0,
        infoitems: {},
        newcrossitems: [
          {
            imgsrc: 'static/img/center/merchant/logo1.png',
            title: '店铺名称'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '申请时间'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '审核状态'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '后台登录账号'
          },
          {
            imgsrc: 'static/img/center/merchant/logo2.png',
            title: '后台登录密码'
          }
        ],
        adminitems: {}
      }
    },
    computed: {
      ...mapState({
        uploadobj: state => state.meraccess.uploadobj,
        ifhascate: state => state.meraccess.ifhascate
      })
    },
    methods: {
      // 一级分类弹窗
      fcatePopup () {
        this.ifhasfcate = true
      },
      closefWrap () {
        this.ifhasfcate = false
      },
      // 二级分类弹窗
      scatePopup () {
        this.ifhasscate = true
      },
      closesWrap () {
        this.ifhasscate = false
      },
      // 选择一级分类
      selectFcate (index) {
        this.activecate = index
        for (let item of this.cateitems) {
          item.ifselect = false
        }
        this.cateitems[index].ifselect = true
        this.uploadobj.fcate = this.cateitems[index].t_title
        this.uploadobj.fcateid = this.cateitems[index].id
        this.uploadobj.scate = ''
        this.uploadobj.scateid = 0
        let that = this
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'scate',
          body: {
            cid: this.cateitems[this.activecate].id
          },
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          that.scateitems = res.cateitems
          if (that.scateitems.length === 0) {
            this.$store.state.meraccess.ifhascate = true
          } else {
            this.$store.state.meraccess.ifhascate = false
          }
        })
        this.ifhasfcate = false
      },
      // 选择二级分类
      selectScate (index) {
        for (let item of this.scateitems) {
          item.ifselect = false
        }
        this.scateitems[index].ifselect = true
        this.uploadobj.scate = this.scateitems[index].t_title
        this.uploadobj.scateid = this.scateitems[index].id
        this.ifhasscate = false
      },
      // 上传图片
      uploadimg () {
        let that = this
        let inputDom = this.$refs.uploadimg
        // 图像类型验证
        if (!/image\/\w+/.test(inputDom.files[0].type)) {
          alert('请确保文件为图像类型')
          return false
        }
        // 创建一个文件读取器
        let reader = new FileReader()
        let oFile = inputDom.files[0]
        // html5FileReader的功能函数
        reader.readAsDataURL(oFile)
        // 文件读取完成后，三级回调
        reader.onload = function () {
          that.$set(that.uploadpho, 0, this.result)
          that.ifuploadimg = false
        }
      },
      // 判断类型并获取一级分类数据
      getDataFromBackend () {
        let that = this
        this.$http({
          method: 'get',
          url: global.Domain.cityUrl + 'appstatus'
        }).then(function (response) {
          let res = response.data
          if (!res) {
            this.$http({
              method: 'get',
              url: global.Domain.cityUrl + 'fcate'
            }).then(function (response) {
              that.ifnotaccess = true
              that.ifhasaccess = false
              let res = response.data
              res.cateitems.map(function (item) {
                item.ifselect = false
                return item
              })
              that.cateitems = res.cateitems
            })
          } else {
            that.ifnotaccess = false
            that.ifhasaccess = true
            that.infoitems = res.infoitems
            that.adminitems = res.adminitems
          }
        })
      },
      changeIftips () {
        this.iftips = false
//        this.$router.go(0)
      },
      closeVerify () {
        this.ifverify = false
      },
      submitForm () {
        let that = this
        this.uploadobj.partment = document.querySelector('.vux-popup-picker-value').innerHTML.split(' ').join('')
//        let oFile = this.$refs.uploadimg.files[0]
        let uploadobj = that.uploadobj
        if (!uploadobj.bname) {
          this.ifverify = true
          this.verifyinfo = '请填写店铺名称'
          return
        }
        if (!uploadobj.fcateid) {
          this.ifverify = true
          this.verifyinfo = '请选择所属行业'
          return
        }
        if (!uploadobj.scateid) {
          this.ifverify = true
          this.verifyinfo = '请选择行业分类'
          return
        }
        if (!uploadobj.partment) {
          this.ifverify = true
          this.verifyinfo = '请选择所在地区'
          return
        }
        if (!uploadobj.address) {
          this.ifverify = true
          this.verifyinfo = '请填写详细地址'
          return
        }
        if (!(uploadobj.map)) {
          this.ifverify = true
          this.verifyinfo = '请添加地图位置'
          return
        }
        if (!uploadobj.username) {
          this.ifverify = true
          this.verifyinfo = '请填写联系人'
          return
        }
        if (!uploadobj.phone) {
          this.ifverify = true
          this.verifyinfo = '请填写联系电话'
          return
        }
        if (!/^[0-9-]{7,11}$/.test(uploadobj.phone)) {
          this.ifverify = true
          this.verifyinfo = '请填写正确的联系电话'
          return
        }
        let newuploadobj = {
          bname: uploadobj.bname,
          fcate: uploadobj.fcateid,
          scate: uploadobj.scateid,
          partment: uploadobj.partment,
          address: uploadobj.address,
          map: JSON.stringify(uploadobj.map),
          uname: uploadobj.username,
          phone: uploadobj.phone
//          licence: oFile
        }
        this.$http({
          method: 'post',
          url: global.Domain.cityUrl + 'apply',
          body: newuploadobj,
          emulateJSON: true
        }).then(function (response) {
          if (response.data) {
            this.iftips = true
            this.$router.go(0)
          }
        })
      }
    },
    created () {
      this.getDataFromBackend()
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .items {
    border-bottom: 0.01rem solid #e0e0e0;
    height: 100%;
    .itemwrap {
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        img.itemlogo {
          margin-left: 0.46rem;
          width: 0.32rem;
        }
        span {
          margin-left: 0.34rem;
          line-height: 1.08rem;
          font-size: 0.28rem;
          color: #5e5e5e;
        }
      }
    }
    .writeboxspec {
      position: relative;
      margin-right: 0.48rem;
      overflow: hidden;
      button {
        margin: 0.24rem 0;
        height: 0.6rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
        border: 0.01rem solid #93979a;
        background: #fff;
        border-radius: 0.06rem;
        font-size: 0.24rem;
        color: #adadad;
      }
      .uploadimg {
        position: absolute;
        top: 0.24rem;
        right: 0;
        width: 2.14rem;
        height: 3rem;
        z-index: 3;
        opacity: 0;
      }
      .uploadpho {
        margin: 0.24rem 0;
        display: flex;
        justify-content: flex-end;
        width: 2.14rem;
        height: 3rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .myaddress .vux-popup-picker-value {
    text-align: right !important;
  }

  .accesscontent {
    margin-top: 0.8rem;
    .graybar {
      height: 0.2rem;
    }
    .writebox {
      margin-right: 0.48rem;
      display: flex;
      justify-content: flex-end;
      flex: 1;
      font-size: 0.26rem;
      button {
        font-size: 0.26rem;
        background: #fff;
      }
      .hasnotcate {
        color: #919191;
      }
      .hasnotselect {
        color: #919191;
      }
      .selectsuc {
        color: #333;
      }
      input {
        flex: 1;
        color: #333;
        text-align: right;
      }
      input.button {
        background: #fff;
      }
      input.innercontent {
        margin-right: 0.26rem;
      }
      input.innercontent[type=button] {
        background: #fff;
      }
    }
  }

  .verifystatus {
    margin-top: 0.8rem;
    .verifybox {
      width: 100%;
      .rightpart {
        line-height: 1.08rem;
        font-size: 0.3rem;
        color: #333;
        margin-right: 0.44rem;
      }
    }
  }

  .submitbtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ff8a00;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.54rem auto 0;
  }

  .popupwrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .popupcontent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      background: #fff;
      .popupline {
        height: 0.88rem;
        font-size: 0.28rem;
        color: #555555;
        display: flex;
        align-items: center;
        div {
          width: 0.3rem;
          margin-left: 0.48rem;
          img {
            width: 100%;
          }
        }
        p {
          margin-left: 0.26rem;
          font-size: 0.28rem;
          color: #555555;
        }
        p.active {
          color: #ef4545;
        }
      }
      .popupline:active, .popupline:hover {
        background: #f6f6f6;
      }
    }
  }

  .verifywrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    .verifypopup {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 8.28rem;
      background: #fff;
      transform: translate(-50%, -50%);
      border-radius: 0.12rem;
      text-align: center;
      .menupart {
        border-bottom: 0.01rem solid #e7e7e7;
        box-sizing: border-box;
        .tipstitle {
          line-height: 1.28rem;
          color: #333;
          font-size: 0.34rem;
        }
      }
      .mainpart {
        font-size: 0.32rem;
        color: #365aa4;
        line-height: 0.96rem;
      }
    }
  }
</style>
