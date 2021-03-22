<template>
    <div class="content">
        <div class="crumbs">作品列表</div>
        <div class="container">
            <div class="handle-box">
              <div class="demo-input-suffix fl">
                <el-button type="primary" @click="dialogFormVisible = true">
                  <router-link to="/add" class="add">创作新作品</router-link>
                </el-button>
              </div>
            </div>
            <el-row :gutter="24">
            <el-col :span="6" v-for="(o, index) in 1" :key="o">
              <el-card :body-style="{ padding: '0px' }">
                <div class="card-cover">
                  <span class="status status-1">草稿</span>
                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                </div>
                <div class="card-meta">
                  <div class="card-meta-title">标题：好吃的汉堡</div>
                  <time class="card-meta-time">时间: 2021-03-03</time>
                  <div class="card-meta-description">描述: 描述......</div>
                  <div class="card-button clearfix">
                    <el-button type="primary" icon="el-icon-sort" size="small" plain>上架</el-button>
                    <router-link :to="'/h5/' + o" target="_blank"  tag="a">
                    <el-button type="info" icon="el-icon-view" size="small" plain>预览</el-button>
                    </router-link>
                    <router-link :to="'/edit/' + o">
                      <el-button type="primary" icon="el-icon-edit" size="small" plain>修改</el-button> 
                    </router-link>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
            <div class="pagination" v-if="PageCount > 0">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="PageCount" ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
    data: function () {
        return {
            state: 1,
            type: "",
            pageSize: 12,
            cur_page: 1,
            PageCount: 0,
            NewsList: [],
        };
    },
    created() {
    },
    computed: {},
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
        },
        getNewsList() {
            if (this.type == "") {
                dataGet(
                    "/news/getList?size=" + this.pageSize + "&page=" + this.cur_page,
                    {},
                    (data, all) => {
                        this.NewsList = data.List;
                        this.PageCount = data.PageCount;
                    }
                );
            } else {
                dataGet(
                    "/news/getList?size=" +
                    this.pageSize +
                    "&page=" +
                    this.cur_page +
                    "&type=" +
                    this.type,
                    {},
                    (data, all) => {
                        this.NewsList = data.List;
                        this.PageCount = data.PageCount;
                    }
                );
            }
        },
    
        ChangeState(StateName, row) {
            if (StateName == "UpState") {
                //上线
                var state = 1;
            } else if (StateName == "DownState") {
                //下架
                var state = 0;
            }
            dataGet(
                "/news/updateState?id=" + row.id + "&state=" + state,
                {},
                (data, all) => {
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                    this.getNewsList();
                });
        },
        
    },
};
</script>

<style lang="scss" scoped>
.content {
      width: 1200px;
          background: #f0f0f0;
    .crumbs {
        padding: 10px  15px;
        margin-bottom: 10px;
        font-size: 20px;
        color: #333;
        font-weight: bold;
        background: #fff;
    }
    .container {
        padding: 20px;
        background: #fff;
        border: 1px solid #d8d8de;
        border-radius: 5px;
        .handle-box {
            display: inline-block;
            width: 100%;
            margin-bottom: 20px;
        }
        .demo-input-suffix {
            margin-right: 35px;
            display: inline-block;
        }
        .card-cover{
          position: relative;
          padding: 10px 0;
          text-align: center;
          .status {
            display: block;
            position: absolute;
            width: 120px;
            height: 24px;
            color: #fff;
            font-size: 12px;
            line-height: 24px;
            transform: rotate( -45deg );
            -webkit-transform: rotate( 45deg );
            text-align: center;
            right: -36px;
            top: 8px;
          }
          .status-1{
            background: #aaa;
          }
          .status-2{
            background: #01d7b2;
          }
        }
        .card-meta{
          padding: 10px;
          .card-meta-title{
            font-size: 16px;
            font-weight: bold;
          }
          .card-meta-time,
          .card-meta-description{
            color: #666;
          }
          .card-button{
            padding-top: 15px;
            text-align: center;
          }
        }
        
        .pagination {
            margin-top: 40px;
        }
    }
}
</style>