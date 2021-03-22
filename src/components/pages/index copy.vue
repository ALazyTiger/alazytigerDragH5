<template>
  <div class="wrapper">
    <div class="contentBox">
      <div class="fullscreen">
        <div class="fullscreen-wp" v-fullscreen="opts" ref="fullscreen">
          <div  class="page page-1" >
            <p class="part-1"  v-animate="{value: 'bounceInLeft', delay: 0}">part-1</p>
          </div>
          <div class="page-2 page">
            <p class="part-2" v-animate="{value: 'bounceInRight'}">2</p>
          </div>
          <div class="page-3 page">
            <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">part-3-1</p>
            <p class="part-3" v-animate="{value: 'bounceInRight', delay: 600}" @click="goto">part-3-2</p>
            <p class="part-3" v-animate="{value: 'zoomInDown', delay: 1200}">part-3-3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data() {
    return {
      fullscreenList:[
        { "id":'1',
          "children": [
          {
            "id":"1-1",
            "animate": "bounceInLeft",
            "delay": "0",
            "click": ""
          }
          ]},
        {
          "id":'2',
          "children": [
          {
            "id":"2-1",
            "animate": "bounceInRight",
            "delay": "0",
            "click": ""
          }
          ]
        },
        {
          "id":'3',
          "children": [
          {
            "id":"3-1",
            "animate": "bounceInLeft",
            "delay": "0",
            "click": ""
          },
          {
            "id":"3-2",
            "animate": "bounceInRight",
            "delay": "600",
            "click": "goto"
          },
          {
            "id":"3-3",
            "animate": "zoomInDown",
            "delay": "1200",
            "click": ""
          }
          ]
        }
        
      ],
      opts: {
        start: 0,
        loop: true,
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
    console.log(this.$fullscreen)
  },
  computed: {},
  mounted() {

  },
  methods: {
    goto(){
      this.$fullscreen.moveTo(1, true) ;
    }
  },
  destroyed() {
  },
  watch: { }
};
</script>
<style lang="scss" >
@import "../../../statics/css/base.css";
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f3f6f9;
  .contentBox {
    position: relative;
    width: 100%;
    height: calc(100% - 220px);
    .page{
      text-align: center;
      font-size: 40px;
    }
 
    .page-1 {
      position: relative;
      background: #fbb9a1;
    }
    .page-2 {
      position: relative;
      background: #74c78a;
    
    }
    .page-3{
      position: relative;
      background:#76e8e3

    }
    .page-4{
      position: relative;
      background:#c776e8

    }
    .page-5{
      position: relative;
      background:#f15d4e
    }
  }
}
</style>
