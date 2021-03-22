<template>
  <div class="pages_con left">
    <el-button type="primary" icon="el-icon-plus" size="small" @click="addPage()">添加新页</el-button>
    <div class="item pages_list">
      <div class="head">页面列表</div>
        <ul>
          <li v-for="item in pagesData" :class="{'active':currentPage == item}">
            <span  @click="selectPage(item)">第{{item}}页</span>
            <label class="del_page close"  @click="delPage(item)">&times;</label>
          </li>
        </ul>
      </div>  
    </div>
</template>
<script>

//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      
    };
  },
  
  created(){},
  props: ["pagesData","currentPage"],
  components: {   },
  computed: {},
  mounted() {},
  methods: {
    addPage(){
      this.$emit('addPage'); //通知父组件改变。
    },
    delPage(index){
      this.$emit('delPage',index);
    },
    selectPage(index){
      this.$emit('selectPage',index);
    }
  }
};


</script>
<style lang="scss" scoped>
.pages_con {
    position: fixed;
    left: 10px;
    top: 80px;
    bottom: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    width: 240px;
    box-sizing: border-box;
    .item {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid #d8d8de;
      border-radius: 5px;
      &.pages_list {
        flex: 1;
        ul {
          position: relative;
          width: 240px;
          max-height: 770px;
          padding: 0 20px;
          box-sizing: border-box;
          overflow-y: auto;
          flex: 1;
          li {
            position: relative;
            display: block;
            width: 100%;
            height: 36px;
            line-height: 36px;
            margin-top: 10px;
            color: #666;
            border-radius: 4px;
            text-align: center;
            background: #dcdcdc;
            cursor: pointer;
            font-size: 16px;
            span{
              display: inline-block;
              width: 180px;
              float: left;
              text-indent: 20px;
            }
            
            &:last-child {
              margin-bottom: 10px;
            }
            &.active {
              background: #409eff;
              color: #fff;
            }
            .del_page {
              position: absolute;
              display: block;
              color: #000;
              font-size: 18px;
              right: 7px;
              top:0;
              z-index: 9;
              opacity: 0.55;
              box-shadow: none;
              text-shadow: none;
              &:hover {opacity: 1; }
            }
          }
        }
      }
      .head {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #d8d8de;
        font-size: 16px;
        width: 100%;
      }
    }
}
</style>