<template>
  <div class="login-wrap">
    <div id="stars"></div>
    <div class="ms-login">
      <div class="ms-title">胖虎H5拖拽系统 V1.0</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="login-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username">
            <template slot="prepend">账号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"  v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, payMoney } from "@/api/api.js";
import axios from 'axios'
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {},
  created() {},
  computed: {},
  mounted() {
    this.appendStar();
  },
  methods: {
    appendStar() {
      var stars = document.getElementById("stars");
      var star = document.getElementsByClassName("star");
      // js随机生成流星
      for (var j = 0; j < 100; j++) {
        var newStar = document.createElement("div");
        newStar.className = "star";
        newStar.style.top = randomDistance(30, -30) + "px";
        newStar.style.left = randomDistance(150, 20) + "px";
        document.getElementById("stars").appendChild(newStar);
      }
      // 封装随机数方法
      function randomDistance(max, min) {
        var distance = Math.floor(Math.random() * (max - min + 1) * 10 + min);
        return distance;
      }
      // 给流星添加动画延时
      for (var i = 0, len = star.length; i < len; i++) {
        if (i % 6 == 0) {
          star[i].style.animationDelay = "0s";
        } else {
          star[i].style.animationDelay = i * 0.3 + "s";
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // dataGet("/login",{username: this.username,password: this.password},(data, all) => {
            // localStorage.setItem("ms_username", this.ruleForm.username);

            localStorage.setItem('Roles', this.username)
            this.$router.push("/list");
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../../statics/images/main.jpg") no-repeat;
  background-size: 100% 100%;
  .ms-login {
    position: absolute;
    width: 380px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: -150px;
    z-index: 1000;
    .ms-title {
      margin-bottom: 10px;
      padding-top: 45px;
      padding-left: 88px;
      line-height: 24px;
      text-align: left;
      color: #fff;
      font-size: 22px;
      background: url("../../../../statics/images/logo.gif") no-repeat left top;
      background-size: auto 100%;
    }
    .login-ruleForm{
      height: 220px;
      background: rgba(0,0,0,0.2);
      padding: 25px 20px 25px 20px;
      border-radius: 5px;
      .login-btn{
        text-align: center;
      }
    }
  }
}
</style>
