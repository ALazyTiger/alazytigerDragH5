<template>
	<div class="dialog_con" v-show="picStatus" transition="fade">
		<div class="dialog_bg" @click="close"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>素材库</h2>
				<p>{{picType.msg}}</p>
				<a href="javascript:void(0)" class="dialog_link close" @click="close">&times;</a>
			</div>
			<div class="dialog_main lib_con">
				<div class="lib_main">
					<div class="lib_main_body">
						<ul class="pics_con">
							<li v-for="item in imgList">
								<img :src="'http://goh5.luoyefe.com/img/'+item.file_name" @click="addPicOrBg('http://goh5.luoyefe.com/img/'+item.file_name,picType.type)">
							</li>
						</ul>
					</div>

				</div>
			</div>
			<div class="dialog_bottom">
        <div class="upload_btn" >
						<span>上传图片</span>
						<input type="file" multiple accept="image/*" @change="uploadImg($event)"></input>
					</div>
				<ul class="dialog_btn">
          <el-button type="info" @click="close">取消</el-button>
          <el-button type="primary" @click="ok()">确认</el-button>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data: function () {
        return {};
    },
    created() { },
    props: ['picStatus', "picType", "imgList"],
    components: {},
    computed: {},
    mounted() { },
    methods: {
        addPicOrBg(src,type) {
          this.close();
          var data ={ src:src,type:type}
          this.$emit('addPicOrBg',data);
          
        },
        close(){
          this.$emit('closePicBox'); //通知父组件改变。
        },
    }
};
</script>
<style lang="scss" scoped>
/* 主弹出层 */
.dialog_con {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9998;
    .dialog_bg {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .dialog_main_con {
      position: relative;
      width: 750px;
      height: 540px;
      top: 50%;
      transform: translate(0,-50%);
      border-radius: 6px;
      background: #f7f7f7;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      .dialog_head {
        position: relative;
        border-bottom: 1px solid #aaa;
        padding: 0 20px;
        height: 44px;
        width: 100%;
        h2 {
          color: #526069;
          font-size: 20px;
          font-weight: 300;
          line-height: 44px;
          display: inline-block;
          vertical-align: middle;
        }
        p {
          font-size: 12px;
          color: #526069;
          line-height: 22px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 15px;
          margin-top: 5px;
        }
        .dialog_link {
          position: absolute;
          right: 20px;
          top: 5px;
          font-size: 24px;
          font-weight: bold;
          color: #409eff;
          text-decoration: none;
        }
      }
      .dialog_main {
        flex: 1;
       
        height: 452px;
        .lib_main{
          height: 100%;
          width: 100%;
          overflow: auto;
          .lib_main_body {
            height: 100%;
            width: 100%;
            padding: 10px;
            .pics_con {
              font-size: 0;
              li {
                display: inline-table;
                vertical-align: top;
                width: 23%;
                margin: 10px 1% 0;
                position: relative;
                overflow: hidden;
                padding-bottom: 23%;
                background: #ddd;
                cursor: pointer;
                img {
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 100%;
                  transform: translate(-50%, -50%);
                  -webkit-transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
      }
      .dialog_bottom {
         position: relative;
        width: 100%;
        height: 44px;
        border-top: 1px solid #aaa;
        .dialog_btn {
          font-size: 0;
          box-sizing: border-box;
          position: absolute;
          right: 20px;
          top: 2px;
        }
        .upload_btn {
          position: relative;
          width: 80px;
          display:inline-block;
          left: 15px;
          top: 2px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #fff;
          border-radius: 6px;
          text-align: center;
          background: #01d7b2;
          input{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            left: 0;
            top: 0;
            cursor: pointer;
          }
        }
      }
    }
}
</style>

