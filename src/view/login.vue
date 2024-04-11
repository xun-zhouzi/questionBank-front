<template>
  <div class="app">
    <div class="main">
      <div style="padding: 5%; display: flex">
        <!-- 头像信息 -->
        <div>
          <img
            src="../assets/avatar.jpg"
            style="height: 150px; width: 150px; border: 2px solid lightblue"
            alt="头像信息"
          />
        </div>
        <!-- 个人信息 -->
        <div style="margin-left: 5%; color: gray; line-height: 45px">
          <p>webmaster : <span style="font-weight: 100">Jackzhou.</span></p>
          <p>
            description :
            <span style="font-weight: 100"
              >Developers who love the front-end.</span
            >
          </p>
          <p>
            achievement :
            <span style="font-weight: 100">Open source creator.</span>
          </p>
          <el-divider />
        </div>
      </div>
      <!-- 中间内容 -->
      <div
        style="
          padding-left: 10%;
          padding-top: 4%;
          height: 50%;
          color: cadetblue;
          line-height: 40px;
        "
      >
        <p>在网上搜了很多版本的前端面试题，很难找到自己需要的文档</p>
        <p>所以想结合各路问题与答案加入到题库中方便浏览阅读</p>
        <p>
          于是有了这个功能
          <!-- 进入按钮 -->
          <el-button plain class="btn" @click="loginBtn">点这里</el-button
          >查看你所需要的内容.
        </p>
      </div>
      <!-- 底部内容 -->
      <div style="padding-left: 5%; font-weight: 100">
        <span style="padding-left: 3%; position: relative; top: -6px;"> you can find me here </span>
        <span style="padding-left: 5%"
          ><img
            @click="githubBtn"
            src="../assets/github.png"
            style="height: 30px; width: 30px" /></span
        ><span style="padding-left: 5%"
          ><img @click="biliBtn" src="../assets/bilibili.png" style="height: 30px; width: 30px"
        /></span>
        <span style="padding-left: 5%"
          ><img @click="csdnBtn" src="../assets/csdn.png" style="height: 30px; width: 30px"
        /></span>
        <span style="padding-left: 5%"
          ><img @click="weiboBtn" src="../assets/weibo.png" style="height: 30px; width: 30px"
        /></span>
      </div>
    </div>
    <!-- 版权 -->
    <div style="color: gray; font-size: 15px; margin-top: 2%">
      Copyright ◎ 2024 JackZhou. All rights reserved.
    </div>
  </div>
</template>

<script setup>
import router from "../router";

function loginBtn() {
  router.push("/index");
}

// github链接
function githubBtn() { 
  window.open('https://github.com/xun-zhouzi');
}

// bilibili链接
function biliBtn() { 
  window.open('https://space.bilibili.com/411042070?spm_id_from=333.1007.0.0');
}

// csdn链接
function csdnBtn() { 
  window.open('https://blog.csdn.net/weixin_52046027?spm=1000.2115.3001.5343');
}

// 微博链接
function weiboBtn() { 
  window.open('https://weibo.com/u/5886614982');
}
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/login.jpg");
  background-size: cover;
}

.btn {
  color: rgb(143, 143, 143);
  position: relative;
  top: -2px;
  font-size: 20px;
  height: 45px;
  border: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.main {
  background-image: url("../assets/bgc.png");
  background-size: cover;
  box-shadow: 0 0 22px rgb(116, 196, 214);
  height: 700px;
  width: 800px;
}
</style>