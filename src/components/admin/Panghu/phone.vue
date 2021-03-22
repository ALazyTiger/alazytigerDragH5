<template>
    <div class="view-content">
      <div v-if="PageList[currentPage-1]" class="phone_screen j_screen" :style="`backgroundImage:url(${PageList[currentPage-1].bg});`" >
        <div v-for="(item,$index) in PageList[currentPage-1].children" :track-by="$index" :index="$index" v-drag="greet" v-if="item.imgSrc"   @mousedown="selectItemOp($index, $event);" :style="`width:${item.width}px ;height:${item.height}px;top:${item.top}px;left:${item.left}px`" @contextmenu.prevent="openMenu($event,item)" >
          <div class="phone_content" >
            <img  :src="item.imgSrc" >
          </div>
          <div class="edit_mode_cont" v-show="$index===childrenInde">
            <div class="edit_mode_layer">
              <div class="edit_mode edit_mode_radius_t_l"></div>
              <div class="edit_mode edit_mode_radius_t_r"></div>
              <div class="edit_mode edit_mode_radius_b_r"></div>
              <div class="edit_mode edit_mode_radius_b_l"></div>
            </div>
          </div>
        </div>
        <div v-for="(item,$index) in PageList[currentPage-1].children" :track-by="$index" :index="$index" v-drag="greet" v-if="item.txt" @mousedown="selectItemOp($index, $event);" :style="`width:${item.width}px ;height:${item.height}px;top:${item.top}px;left:${item.left}px;color:${item.color};font-size:${item.fontSize}px`" @contextmenu.prevent="openMenu($event,item)">
          <div class="phone_content">
            <div class="txt">{{item.txt}}</div>
          </div>
          <div class="edit_mode_cont" v-show="$index===childrenInde">
            <div class="edit_mode_layer">
              <div class="edit_mode edit_mode_radius_t_l"></div>
              <div class="edit_mode edit_mode_radius_t_r"></div>
              <div class="edit_mode edit_mode_radius_b_r"></div>
              <div class="edit_mode edit_mode_radius_b_l"></div>
            </div>
          </div>
        </div>
      </div>
      <ul id="item_context_menu" class="context_menu" v-show="visible" :style="{left:left+'px',top:top+'px'}" >
        <li @click="delItem()">删除</li>
      </ul>
    </div>
</template>



<script>
export default {
    data: function () {
        return {
          childrenInde:'',
          visible: false,
          top: 0,
          left: 0
        };
    },
    created() { },
    props: ['setConfig', "PageList", "currentPage"],
    components: {},
    computed: {},
    mounted() { },
    watch: {
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    methods: {
      greet(val){
        console.log(val)
        var data = val;
         this.$emit('changePosition',val); //通知父组件改变。
      },
      selectItemOp: function(index, ev){
        console.log(ev.target.className)
        this.childrenInde = index;
        if(ev.target.className =="txt"){ //判断选择的是文字还是图片
          var data ={index:index,type:"txt"}
        }else{
           var data ={index:index,type:"pic"}
        }
        
        this.$emit('selectIndex',data); //通知父组件改变。
      },
      openMenu(e, item) {
      this.rightClickItem = item;
      let x = e.clientX;
      let y = e.clientY;
      this.top = y;
      this.left = x;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
    delItem(){
      this.$emit('delChildren',this.childrenInde);
    }
    }
};
</script>

<style lang="scss" scoped>
.view-content{
  position: relative;
  .phone_screen {
    width: 100%;
    height: 603px;
    position: relative;
    .edit_mode_cont {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        -webkit-user-select: none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        border: 2px dashed green;
        pointer-events: none;
        .edit_mode_layer {
          position: relative;
          z-index: 800;
          -webkit-user-select: none;
          -webkit-user-drag: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          width: 100%;
          height: 100%;
          > div {
            position: absolute;
            width: 10px;
            height: 10px;
            background: green;
            border: 1px solid green;
            z-index: 888;
            box-sizing: border-box;
          }
          .edit_mode_radius_t_l {
            cursor: nw-resize;
            left: -5px;
            top: -5px;
            border-radius: 50%;
          }
          
          .edit_mode_radius_t_r {
              cursor: ne-resize;
              right: -5px;
              top: -5px;
              border-radius: 50%;
          }
          
          .edit_mode_radius_b_r {
              cursor: se-resize;
              right: -5px;
              bottom: -5px;
              border-radius: 50%;
          }
          .edit_mode_radius_b_l {
              cursor: sw-resize;
              bottom: -5px;
              left: -5px;
              border-radius: 50%;
          }
        }
      }
    > div {
      display: inline-block;
      position: absolute;
      cursor: pointer;
      .phone_content {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 5px 8px;
        img  {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: block;
          background-color: rgba(0,0,0,0);
        }
        .txt,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            display: inline;
            font-weight: normal;
        }
      }
    }
  }
  .context_menu {
    width: 120px;
    background: #08a1ef;
    position: fixed;
    z-index: 999;
    padding: 1px;
    box-shadow: 0 0 4px;
    li {
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      transition: all ease .2s;
      -webkit-transition: all ease .2s;
      cursor: pointer;
    }
  }
}




</style>