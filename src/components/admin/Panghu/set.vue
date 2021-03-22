<template>
  <div class="set_page" v-show="showSet" >
    <div class="set_bg" v-show="showSet" @click="close"></div>
      <div  :class="showSet?'fadeInRight':''" class="set_con animated">
        <div class="set_con_top">
          <div class="left">
            <div class="item">
              <div class="thumbnail">
                <label> <img :src="setConfig.thumbnail"></label>
                <span>点击上传
                  <input type="file" accept="image/*" @change="uploadThumbnail($event)"></input>
                </span>
              </div>
              <em class="tips">（请上传300*300以上正方形图片）</em>
            </div>
            
          </div>
          <div class="right">
            <div class="kind">
              <label>作品标题：</label>
              <el-input v-model="setConfig.title" placeholder="请输入作品标题" class="input"></el-input>
            </div>
            <div class="kind">
              <label>关键字：</label>
              <el-input v-model="setConfig.keyWords" placeholder="请输入作品关键字"  class="input"></el-input>
            </div>
            <div class="kind">
              <label>作品描述：</label>
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="setConfig.desc"  class="textarea"></el-input>
            </div>
            <div class="kind">
              <label>音乐：</label>
              <el-input v-model="setConfig.music" placeholder="请输入音乐"  class="input"></el-input>
            </div>
            <div class="kind">
              <label>翻页方向：</label>
              <el-select v-model="setConfig.direction" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div> 
            <div class="kind">
              <label>循环播放：</label>
              <el-switch v-model="setConfig.loop"></el-switch>
            </div>
          </div> 
        </div>
        <div class=" set_btn">
          <el-button type="primary" @click="saveConfig" >确定</el-button>
        </div> 
      </div> 
    </div>
</template>
<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      options: [
        {
          value: 'vertical',
          label: '垂直翻页'
        }, 
        {
          value: 'horizontal',
          label: '水平翻页'
        }],
      
    };
  },
  props: ['showSet',"setConfig"],
    created() {
  },
  components: {   },
  computed: {},
  mounted() {},
  methods: {
    close(){
      this.$emit('closeSet'); //通知父组件改变。
    },
    saveConfig(){
      this.$emit('updateConfig',this.setConfig);//saveConfig事件触发后，自动触发updateConfig事件
    },
    uploadThumbnail: function (ev) {//上传图片
      var file = ev.target.files;
      var formData = new FormData();
      var reader = new FileReader();
      var imgDiv = $('.thumbnail img');
          reader.onload = (function (aImg) {
            return function (e) {
              aImg.src = e.target.result;
            };
          })(imgDiv[0]);
          reader.readAsDataURL(file[0]);
          formData.append('file', file[0]);
    }
  }
};
</script>
<style lang="scss" scoped>
.set_page {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 19;
    transition: all .8s;
    .set_bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .set_con {
      position: absolute;
      right: 0;
      width: 700px;
      height: 100%;
      top: 0;
    
      padding: 10px 0;
      background-color: #fff;
      .set_con_top{
        width: 100%;
        display: flex;
        flex-direction: row;
        .left {
          width: 300px;
          padding-top: 90px;
          .item {
            width: 100%;
            box-sizing: border-box;
            margin-top: 20px;
            .thumbnail {
              width: 220px;
              position: relative;
              border: 1px solid #c6cbd4;
              background: #c6cbd4;
              margin: 10px auto 0;
              box-sizing: border-box;
              label{
                display: table-cell;
                width: 218px;
                height: 218px;
                text-align: center;
                vertical-align: middle;
                img {
                display: inline-block;
                max-width: 100%;
              }
              }
              span {
                display: block;
                position: relative;
                width: 100%;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: #409EFF;
                color: #fff;
                transition: all ease 0.2s;
                -webkit-transition: all ease 0.2s;
                cursor: pointer;
                border-top: 1px solid #c6cbd4;
                &:hover {
                  background: #fff;
                  color: #409EFF;
                }
                input {
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  font-size: 0;
                  width: 100%;
                  height: 100%;
                  padding: 0;
                  margin: 0;
                  cursor: pointer;
                  
                }
              }
              
              
            }
            .tips {
              font-size: 12px;
              line-height: 24px;
              color: #76838f;
              display: block;
              width: 80%;
              text-align: center;
              background-color: #fff;
              font-style: normal;
              margin: 0 auto;
            }
          }
        }
        .right {
          flex: 1;
          padding-top: 38px;
          padding-bottom: 70px;
          overflow-y: auto;
          .kind {
            margin-top: 15px;
            label {
              font-size: 14px;
              color: #76838f;
              display: inline-block;
              width: 90px;
              position: relative;
              text-indent: 14px;
              margin-top: 7px;
              text-align: right;
            }
            .input {
              width: 270px;
              display: inline-block;
              vertical-align: middle;
              line-height: 30px;
              font-size: 14px;
              color: #76838f;
            }
            .textarea {
              width: 270px;
              display: inline-block;
              vertical-align: top;
              font-size: 14px;
              color: #76838f;
              resize: none;
              outline: none;
            }
          }
        }
      }
      .set_btn{
        width: 100%;
        text-align: center;
      }
    }

}


</style>
