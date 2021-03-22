<template>
  <div class="tool_bar" v-show="toolbarStatus">
    <ul>
      <li>
        <el-button type="info" icon="el-icon-picture" plain size="small" @click="setBg">背景</el-button>
      </li>
      <li>
        <el-button type="info" icon="el-icon-picture" plain size="small" @click="insertImg">图片</el-button>
      </li>
      <li>
        <router-link :to="'/h5/' + $route.params.id" target="_blank"  tag="a">       
          <el-button type="info" icon="el-icon-view" plain size="small">预览</el-button>
        </router-link>
      </li>
      <li>
        <el-button type="info" icon="el-icon-document" plain size="small" @click="addText">文本</el-button>
      </li>
      <li>
        <el-button type="primary" icon="el-icon-folder-add"  size="small" @click="save">保存</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      dropDown: false
    };
  },
  created() {},
  props: ['toolbarStatus'],
  components: {   },
  computed: {},
  mounted() {},
  methods: {
    setBg(){
      this.$emit('showPicBox',"bg"); //通知父组件改变。
    },
    insertImg(){
      this.$emit('showPicBox',"pic"); 
    },
    addText(){
    this.$emit('addText'); 
    },
    save(){
      this.$emit('saveH5'); 
    }
  }
};


</script>
<style lang="scss" scoped>
.tool_bar {
  position: fixed;
  top: 110px;
  left: 50%;
  margin-left: 245px;
  transform: translateX(-50%);
  z-index: 9;
  ul {
    li {
        color: #fff;
        width: 75px;
        height: 34px;
        cursor: pointer;
        text-align: center;
        line-height: 34px;
        display: block;
        margin: 10px 0;
    }
  }
}
</style>