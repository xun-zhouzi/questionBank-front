<template>
  <div class="app">
    <div>
      <el-button class="btn" @click="loginBtn"
        >点击进入面试题刷题系统(*￣︶￣)</el-button
      >
    </div>
  </div>
</template>

<script setup>
import router from "../router";

function loginBtn() {
  console.log("跳转");
  router.push("/index");
}
</script>

<style scoped> 
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/login.jpg');
  background-size: cover;
}

.btn{
 font-size: 20px;
 height: 40px;
}
</style>