<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <transition name="move" mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
// import vTags from './Tags.vue';
// import bus from './bus';
export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar
    //  vTags
  },
  created() {}
};
</script>
<style lang="scss">
.wrapper{
  
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content-box {
  height: calc( 100% - 70px );
    transition: left 0.3s ease-in-out;

    .content {
      height: calc( 100% - 20px );
      padding: 10px;
      overflow-y: auto;
    }
  }
}
</style>
