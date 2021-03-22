<template>
  <div class="wrapper" :class="phonePanel?'phone_panel':''">
    <div class="contentBox">
      <div class="fullscreen">
        <div class="fullscreen-wp" v-fullscreen="opts" ref="fullscreen">
          <div v-for="item in pageList" :class="`page page-${item.id}`" :style="`backgroundImage:url(${item.bg});`">
              <p v-for="subItem in item.children" :class="`part-${subItem.id}`" v-if="subItem.imgSrc" v-animate="{value: subItem.animate, delay: subItem.delay}" :style="`width:${subItem.width}  ;height:${subItem.height};top:${subItem.top};right:${subItem.right};bottom:${subItem.bottom};left:${subItem.left}`">
                <span v-if="subItem.method" @click="callFn(subItem.method)"> <img v-if="subItem.imgSrc" :src="subItem.imgSrc" ></span>
                <span v-else> <img v-if="subItem.imgSrc" :src="subItem.imgSrc" ></span>
              </p>
              <p v-for="subItem in item.children" :class="`part-${subItem.id}`" v-if="subItem.txt" v-animate="{value: subItem.animate, delay: subItem.delay}" :style="`width:${subItem.width} ;height:${subItem.height};top:${subItem.top};right:${subItem.right};bottom:${subItem.bottom};left:${subItem.left};color:${subItem.color};font-size:${subItem.fontSize}`">
                <span v-if="subItem.method" @click="callFn(subItem.method)">  <span >{{subItem.txt}}</span></span>
                <span v-else> {{subItem.txt}}</span>
               
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {  Loading } from 'vue-ydui/dist/lib.rem/dialog';
import axios from 'axios'
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data() {
    return {
      pageList:[],
      phonePanel:(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i))?false:true,
      resizeEvt :'orientationchange' in window ? 'orientationchange' : 'resize',
      opts: {
        start: 0,
        loop: false,
        direction: "h", 
        duration: 500,
        preventWechat:true,
        beforeChange: (prev, next)=> {
          console.log(prev)
        },
        afterChange:(prev, next)=>{
          console.log("afterChange",next)
        }
      },
      
    };
  },
  components: {},
  created() {
  
    this.flexible();
    this.getPageList()
    console.log(this.$fullscreen)
  },
  computed: {},
  mounted() {
   this.addEventListeners()
  },
  methods: {
    async getPageList() {
      axios.get('../../../statics/js/pageList.json').then(response => {
     Loading.open('加载中...');
     var pageArr  = (JSON.parse(localStorage.getItem('PageList'))) ? JSON.parse(localStorage.getItem('PageList')) : response.data.data;
     
       for (var i = 0, len = pageArr.length; i < len; i++){
        for(var j=0;j< pageArr[i].children.length;j++){
             pageArr[i].children[j].height = (!pageArr[i].children[j].height) ? '':pageArr[i].children[j].height* 2 / 100 +"rem";
             pageArr[i].children[j].width = (!pageArr[i].children[j].width)?'':pageArr[i].children[j].width* 2 / 100 +"rem";
             pageArr[i].children[j].top = (!pageArr[i].children[j].top)?'':pageArr[i].children[j].top* 2 / 100 +"rem";
             pageArr[i].children[j].left = (!pageArr[i].children[j].left)?'':pageArr[i].children[j].left* 2 / 100 +"rem";
             pageArr[i].children[j].fontSize = (!pageArr[i].children[j].fontSize)?'':pageArr[i].children[j].fontSize* 2 / 100 +"rem";
         }
       }
   
         this.pageList =  pageArr
        console.log(this.pageList)
       Loading.close();
      })
       
    },
    callFn(item) {
      console.log(item)
      const reg1 = /^\w+/g ,
            reg2 = /\(([^)]+)\)/;
      let fn =  item.match(reg1)[0],
          args =  item.match(reg2)[1];
      this[fn].apply(this, args.split(','));
    },
    flexible(){
      var docEl = document.documentElement , clientWidth = docEl.clientWidth;
      if(!clientWidth) return;
      if(clientWidth >= 750) { //750这个值，根据设计师的psd宽度来修改
        docEl.style.fontSize = '100px';
        document.getElementsByTagName('body')[0].style.maxWidth = '750px';
      }else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; //750这个值，根据设计师的psd宽度来修改
        document.getElementsByTagName('body')[0].style.maxWidth = '750px';
      }
    },
    addEventListeners: function () { //添加监听事件
      window.addEventListener(this.resizeEvt, this.flexible, false);
      document.addEventListener('DOMContentLoaded', this.flexible, false);
    },
    removeEventListeners: function () {//移除监听事件
      window.removeEventListener(this.resizeEvt, this.flexible, false);
      document.removeEventListener('DOMContentLoaded', this.flexible, false);
    },
    goto(data){
      this.$fullscreen.moveTo(data, true) ;
    }
  },
  beforeDestroyed() {
    this.removeEventListeners()
  },
  destroyed() {
  },
  watch: { }
};
</script>
<style lang="scss" >
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f3f6f9;
  .contentBox {
    position: relative;
    width: 100%;
    height: calc(100% - 0px);
    .page{
      text-align: center;
      font-size: 40px;
      .bg{
        width: 100%;
        height: 100%;
        background-size: 100% auto;
    background-repeat: no-repeat;
      }
      p{
        position: absolute;
      }
      img{
        max-width: 100%;
      }
    }
 
    .page-1,
    .page-2,
    .page-3,
    .page-4,
    .page-5{
      position: relative;
    }
  }
  &.phone_panel{
    // width: 375px;
    // height: 603px;
    // position: relative;
    // top: 50%;
    // margin-top: -300px;
  }
}
</style>
