<template>
  <div class="content">
    <div class="crumbs" v-if="typeof($route.params.id)=='undefined'">新作品</div>
    <div class="crumbs" v-else>{{setConfig.title}}</div>
    <div class="container">
    	<v-pagelist :pages-data.sync="PageList.length" :current-page.sync="currentPage" @addPage="addPage" @delPage="delPage" @selectPage="selectPage"></v-pagelist>
    	<v-toolbar :toolbar-status.sync="toolbarStatus" @showPicBox="showPicBox" @saveH5="saveH5"  @addText="addText" ></v-toolbar>
      <div class="phone_con">
        <div class="top-nav" @click="showSet = !showSet">
          <span class="tit">{{setConfig.title}}</span>
        </div>
        <v-phone  :page-list.sync="PageList" :current-page.sync="currentPage" @selectIndex="selectIndex" @changePosition="changePosition" @delChildren="delChildren" ></v-phone>
      </div>
      <v-set :show-set.sync="showSet" :set-config.sync="setConfig" @updateConfig="updateConfig" @closeSet="closeSet"></v-set>
      <v-attr :show-attr.sync="showAttr" :checked-type.sync="checkedType":checked-items.sync="checkedItems" @saveAni="saveAni"></v-attr>
    </div>
    <v-pic-box :pic-status.sync="picStatus" :img-list.sync="imgList" :pic-type="picType" @closePicBox="showPicBox" @addPicOrBg="addPicOrBg"></v-pic-box>
  </div>
</template>

<script>
import  vPagelist  from "./pageList.vue";
import  vToolbar  from "./toolbar.vue";
import  vSet  from "./set.vue";
import  vPicBox  from "./picBox.vue";
import  vPhone  from "./phone.vue";
import  vAttr  from "./attrList.vue";

//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      toolbarStatus:true,
      showSet:false,
      pagesData:1,
      currentPage:1,
      setConfig: [],
      counter:1,//用来统计插入图片的次数，生成children的id
      picStatus:false,
      imgList:[
        {
        "_id": "60489505ac226e50533d4bc5",
        "user_name": "luobiao",
        "file_name": "rtZTpf3Hhw0c2RPDjmuT2XCm.png",
        "upload_time": 1615369477666,
        "__v": 0
        },
        {
            "_id": "604593eaac226e50533d4bbc",
            "user_name": "luobiao",
            "file_name": "yV5ZgHh0KEuI5mCicAxZiPUW.jpg",
            "upload_time": 1615172586872,
            "__v": 0
        },
        {
            "_id": "603f59dcac226e50533d4bb7",
            "user_name": "luobiao",
            "file_name": "1zzzMl4mDLW9xDxa4smBeMyO.png",
            "upload_time": 1614764508725,
            "__v": 0
        },
        {
            "_id": "603f59cdac226e50533d4bb6",
            "user_name": "luobiao",
            "file_name": "g3NQQOuGHkTtIp7MLzAWJ1JB.gif",
            "upload_time": 1614764493719,
            "__v": 0
        },
        
      ],
      picType:{
        "msg":"修改背景",
         "type": 'bg' // pic:图片 bg:背景 
      },
      PageList:[],
      showAttr:false,
      checkedType:"",
      checkedItems:{}
    };
  },
  
  created() {
    console.log(this.$route.params.id)
    if (typeof this.$route.params.id != "undefined") {
      this.getDetails();
    }
  },
  components: {  vPagelist,vToolbar,vSet,vPicBox,vPhone,vAttr},
  computed: {},
  mounted() {},
  methods: {
    getDetails(){
      var pageArr  = [
        { "id":1,
          "bg":"http://7p.chw.cn/statics/images/m-page1-bg.cd5f36f.jpg",
          "children": [
          {
            "id":"1-1",
            "top":"24",
            "left": "10",
            "width": "93",
            "height": "75",
            "imgSrc":"http://goh5.luoyefe.com/img/HiiZl0A3wl9diuBzqI5evNpv.png",
            "animate": "bounceIndevil",
            "delay": "1500",
            "method": ""
          },
          {
            "id":"1-2",
            "top":"43",
             "left":"302",
            "width": "73",
            "height": "58",
            "imgSrc":"http://goh5.luoyefe.com/img/5O2Yxg6FHsuAyEhS6fji9PUI.png",
            "animate": "bounceInshooter",
            "delay": "1500",
            "method": ""
          },
          
          {
            "id":"1-3",
            "top":"10",
            "left":"0",
            "width": "219",
            "height": "163",
            "imgSrc":"http://goh5.luoyefe.com/img/sGixvTahxcvFktmnpmj2kIvv.png",
            "animate": "stamp",
            "delay": "300",
            "method": ""
          } ,
          {
            "id":"1-4",
            "top":"100",
            "left":"0",
            "width": "163",
            "height": "204",
            "imgSrc":"http://7p.chw.cn/statics/images/m-knight-left.e95353e.png",
            "animate": "bounceInLeftBig",
            "delay": "300",
            "method": ""
          },
         
          {
            "id":"1-5",
            "top":"100",
            "right": "0",
            "width": "163",
            "height": "204",
            "imgSrc":"http://7p.chw.cn/statics/images/m-knight-right.d3f4230.png",
            "animate": "bounceInRightBig",
            "delay": "300",
            "method": ""
          }
          ]},
        {
          "id":2,
          "bg":"http://goh5.luoyefe.com/img/1zzzMl4mDLW9xDxa4smBeMyO.png",
          "children": [
          {
            "id":"2-1",
            "animate": "bounceInRight",
            "delay": "0",
            "method": "getCode"
          }
          ]
        }
      ]
      this.PageList = (JSON.parse(localStorage.getItem('PageList'))) ? JSON.parse(localStorage.getItem('PageList')) : pageArr
      this.setConfig ={
        "thumbnail": "../../../../statics/images/logo.gif",
        "title": "一心只想请客.....",
        "keyWords": "1212",
        "desc": "2121212",
        "music":"",
        "loop": "false",
        "direction": "vertical",
      }
    },
    addPage(){
      var idNum = '';
        if(this.PageList.length == 0){
           idNum = Number(this.PageList.length+1);
        }else{
          idNum = Number(this.PageList[this.PageList.length-1].id+1);;
        }
        var newList ={"id":idNum,"bg":"","children": []}
        this.PageList.push(newList)
    },
    delPage(data){
      if(this.currentPage == data) this.currentPage = data-1;
      this.PageList.splice(data-1,1); 
    },
    selectPage(data){
      console.log(data)
      this.currentPage = data;
    },
    closeSet(){
      this.showSet = !this.showSet;
    },
    updateConfig(data){
      this.setConfig = data;
      this.closeSet();
    },
    showPicBox(data){
      console.log(data)
      if(data =="pic"){// pic:图片 bg:背景 
       this.picType.msg="插入图片"
       this.picType.type=data;
      }else{
        this.picType.msg="修改背景"
        this.picType.type=data;
      }
      this.picStatus = !this.picStatus;
      console.log(this.picStatus)
    },
    selectIndex(data){
      this.checkedItems = this.PageList[this.currentPage-1].children[data.index];
      this.showAttr = true;
      this.checkedType =data.type;
    },
    saveAni(data){
      var NewData = data
      console.log(NewData)
      this.showAttr = !this.showAttr;
    },
    changePosition(data){
      this.checkedItems.left = data.left
      this.checkedItems.top = data.top
    },
    addPicOrBg(data){
      console.log(data)
      if(data.type =="bg"){// pic:图片 bg:背景 
        this.PageList[this.currentPage-1].bg = data.src;
      }else{
    
        // console.log(this.PageList[this.currentPage-1].children.length)
        var ChildrenId = '';
        if(this.PageList[this.currentPage-1].children.length == 0){
           ChildrenId = this.currentPage+"-"+this.counter;
           this.counter++;
        }else{
          ChildrenId = this.currentPage+"-"+ Number(this.PageList[this.currentPage-1].children.length+1);
        }
        var newChildren ={"id":ChildrenId,"top":"","left": "","width": "","height": "","imgSrc":data.src,"animate": "bounceInRight","delay": "0"}
        this.PageList[this.currentPage-1].children.push(newChildren);
            
      }
    },
    delChildren(ChildrenIndex){
      this.PageList[this.currentPage-1].children.splice(ChildrenIndex,1); 
    },
    addText(){
      var ChildrenId = '';
        if(this.PageList[this.currentPage-1].children.length == 0){
           ChildrenId = this.currentPage+"-"+this.counter;
           this.counter++;
        }else{
          ChildrenId = this.currentPage+"-"+ Number(this.PageList[this.currentPage-1].children.length+1);
        }
        var newChildren ={"id":ChildrenId,"top":"300","left": "80","width": "","height": "","txt":"文本文本","color":"#000000","fontSize":20,"animate": "bounceInRight","delay": "0"}
        this.PageList[this.currentPage-1].children.push(newChildren);
    },
    saveH5(){
      console.log(this.PageList)
      console.log(this.setConfig)
      localStorage.setItem('PageList', JSON.stringify(this.PageList))
      localStorage.setItem('setConfig', JSON.stringify(this.setConfig))
      
    }
    
  }
};
</script>

<style lang="scss" scoped>
.content {
  .crumbs {
    margin: 0 0 10px 0; 
    font-size: 20px;
    color: #333;
    text-align: center;
  }
  .container {
    width: 100%;
    .phone_con{
      width: auto;
      max-width: 375px;
      position: relative;
      .top-nav {
        position: absolute;
        top: 0;
        height: 64px;
        width: 100%;
        background: #fff url("../../../../statics/images/phoneTop.png");
        background-size: 100%;
        z-index: 9;
        transition: all .3s;
        &:hover {
          transform: scale(.95);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px #afafaf;
        }
        * { pointer-events: none;}
        img{
          max-width: 100%;
        }
        .tit {
          position: absolute;
          left: 50%;
          bottom: 10px;
          font-size: 16px;
          transform: translateX(-50%);
        }
      }
      .view-content {
        width: 375px;
        height: 667px;
        background: #f5f5f5;
        overflow: hidden;
        padding-top: 64px;
        box-shadow: 0 2px 6px #ccc;
      }
    }
    
  }
}
</style>