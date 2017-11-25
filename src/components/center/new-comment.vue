/**
* Created by wolfsheller on 2017/3/15.
* 填写评论组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
      <div class="content">
        <div class="topblock">
          <p>评分</p>
          <vux-writerater :disabledstatus=disabledstatus class="writerater"
                          @change-rater="changeRater"></vux-writerater>
          <input type="text" v-model="upload.star" style="display: none">
        </div>
        <div class="centerblock">
          <p>评价</p>
          <div class="inputcontent">
            <input type="text" v-model="upload.content" placeholder="点击输入评价内容">
          </div>
          <!--<div class="uploadwrap">-->
            <!--<div class="album">-->
              <!--<label for="img-upload">上传照片</label>-->
              <!--<img-upload @show-image="showImage"></img-upload>-->
            <!--</div>-->
            <!--<button>上传图片</button>-->
            <!--<div class="uploadimgwrap">-->
              <!--<div class="uploadimg" v-for="(item, index) in uploaditems">-->
                <!--<img :src=item.src alt="">-->
                <!--<div class="times">-->
                  <!--<span>&times;</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <input class="evaluatebtn" type="button" value="提交评价" @click="submitCom">
    <wrap-tips v-if="iftips" :tipswrap="tipswrap" :tipsconfirm="tipsconfirm" @change-iftips="changeIftips"></wrap-tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import vuxWriterater from 'components/common/vux-writerater'
  import wrapTips from 'components/common/wrap-tips'
//  import imgUpload from 'components/common/upload'

  export default {
    components: {
      myHeader,
      vuxWriterater,
      wrapTips
//      imgUpload
    },
    data () {
      return {
        iftips: false,
        disabledstatus: false,
        headeritem: '填写评价',
        upload: {
          gid: 0,
          star: 0,
          content: ''
        },
        tipswrap: {
          tipstitle: '评论成功',
          tipsinfo: '感谢您为提高我们的服务质量做出的努力 : )'
        },
        tipsconfirm: '好的'
      }
    },
    methods: {
      changeIftips () {
        this.iftips = false
        this.$router.go(-1)
      },
      changeRater (msg) {
        this.upload.star = msg
      },
      // 提交评价
      submitCom () {
        let that = this
        let oid = this.$route.query.oid
        this.upload.oid = oid
        this.$http({
          method: 'post',
          url: global.Domain.centerUrl + 'getcomm',
          body: this.upload,
          emulateJSON: true
        }).then(function (response) {
          let res = response.data
          if (res === 1) {
            that.iftips = true
          }
        })
      }
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

  .content {
    margin-top: 1rem;
    background: #fff;
    p {
      font-size: 0.28rem;
      color: #252525;
    }
    .topblock {
      padding: 0.28rem;
      border-bottom: 0.01rem solid #e7e7e7;
      .writerater {
        margin-top: 0.42rem;
        margin-left: 0.42rem;
      }
    }
    .centerblock {
      padding: 0.28rem;
      .inputcontent {
        padding: 0.08rem;
        margin-top: 0.42rem;
        input {
          display: block;
          width: 100%;
          border-bottom: 0.01rem solid #7995b5;
          font-size: 0.3rem;
          color: #bebebe;
          line-height: 0.74rem;
          padding: 0 0.18rem;
          box-sizing: border-box;
        }
      }
      .uploadwrap {
        position: relative;
        padding: 0.42rem 0.08rem 0;
        box-sizing: border-box;
        button {
          margin-top: 0.48rem;
          position: absolute;
          left: 0.08rem;
          height: 0.58rem;
          width: 1.58rem;
          border: 0.01rem solid #93979a;
          background: #fff;
          border-radius: 0.06rem;
          font-size: 0.26rem;
          color: #3f4853;
        }
        input {
          margin-top: 0.48rem;
          position: absolute;
          left: 0.08rem;
          z-index: 2;
          width: 1.58rem;
          height: 0.6rem;
          opacity: 0;
        }
        .uploadimgwrap {
          margin-left: 1.72rem;
          display: flex;
          align-items: center;
          flex-flow: row wrap;
          min-height: 1.68rem;
          .uploadimg {
            position: relative;
            img {
              display: block;
              margin: 0.06rem;
              height: 1.56rem;
              width: 1.56rem;
            }
            .times {
              position: absolute;
              right: -0.1rem;
              top: -0.1rem;
              z-index: 2;
              width: 0.44rem;
              height: 0.44rem;
              background: rgba(0, 0, 0, 0.3);
              align-items: center;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              span {
                font-size: 0.42rem;
                color: #fdff41;
              }
            }
          }
        }
      }
    }
  }

  .evaluatebtn {
    display: block;
    width: 70%;
    text-align: center;
    padding-left: 0.21rem;
    padding-right: 0.21rem;
    border-radius: 0.1rem;
    background: #ef4949;
    color: #fff;
    font-size: 0.3rem;
    height: 0.82rem;
    line-height: 0.82rem;
    margin: 0.5rem auto;
  }

  .evaluatebtn:active {
    background: #cc4040;
  }
</style>
