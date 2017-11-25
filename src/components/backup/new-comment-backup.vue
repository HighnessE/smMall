/**
* Created by wolfsheller on 2017/3/15.
* 填写评论组件
*/
<template>
  <section>
    <my-header :headeritem="headeritem"></my-header>
    <form action="" method="post" enctype="multipart/form-data">
      <div class="content">
        <div class="topblock">
          <p>评分</p>
          <vux-writerater :disabledstatus=disabledstatus class="writerater"
                          @change-rater="changeRater"></vux-writerater>
          <input type="text" v-model="uploadrater" :style="{ display: ifinput }">
        </div>
        <div class="centerblock">
          <p>评价</p>
          <div class="inputcontent">
            <input type="text" placeholder="点击输入评价内容">
          </div>
          <div class="uploadwrap">
            <input type="file" value="上传图片" @change="uploadEvent" ref="inputer">
            <input type="file" name="multimg" value="多文件上传" multiple="multiple" ref="multinput" accept="image/*" :style="{ display: ifinput}">
            <button>上传图片</button>
            <div class="uploadimgwrap">
              <div class="uploadimg" v-for="(item, index) in uploaditems">
                <img :src=item alt="">
                <div class="times" @click="deleteUpload(index)">
                  <span>&times;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input class="evaluatebtn" type="submit" value="提交评价">
    </form>
  </section>
</template>

<script type="text/ecmascript-6">
  import myHeader from 'components/common/myheader'
  import vuxWriterater from 'components/common/vuxWriterater'

  export default {
    components: {
      myHeader,
      vuxWriterater
    },
    data () {
      return {
        disabledstatus: false,
        headeritem: '填写评价',
        uploadrater: 0,
        uploaditems: [],
        ifinput: 'none',
        multarr: []
      }
    },
    methods: {
      uploadEvent () {
        let that = this
        // 上传图片输入框
        let inputDOM = this.$refs.inputer
        // 上传多图片输入框
        let multinput = this.$refs.multinput
        // 图像类型验证
        if (!/image\/\w+/.test(inputDOM.files[0].type)) {
          alert('请确保文件为图像类型')
          return false
        }
        // 创建一个文件读取器
        let reader = new FileReader()
        let oFile = inputDOM.files[0]
        // html5FileReader的功能函数
        reader.readAsDataURL(oFile)
        // 文件读取完成后，三级回调
        reader.onload = function () {
          if (that.uploaditems[0]) {
            if (that.uploaditems[1]) {
              if (that.uploaditems[2]) {
                alert('上传的图片已达最大值！')
              } else {
                multinput.files[2] = oFile
                for (let item in multinput.files) {
                  console.log(JSON.stringify(item))
                }
                that.$set(that.uploaditems, 2, this.result)
              }
            } else {
              multinput.files[1] = oFile
              for (let item in multinput.files) {
                console.log(JSON.stringify(item))
              }
              that.$set(that.uploaditems, 1, this.result)
            }
          } else {
            multinput.files[0] = oFile
            for (let item in multinput.files) {
              console.log(JSON.stringify(item))
            }
            that.$set(that.uploaditems, 0, this.result)
          }
        }
      },
      changeRater (msg) {
        this.uploadrater = msg
      },
      deleteUpload (index) {
        let multinput = this.$refs.multinput
        delete multinput.files[index]
        this.uploaditems.splice(index, 1)
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
