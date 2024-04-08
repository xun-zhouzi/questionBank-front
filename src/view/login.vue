<template>
  <div class="app">
    <div>

      <el-button type="primary" plain class="btn" @click="loginBtn">click to enter</el-button>
    
    </div>
  </div>
</template>

<script setup>
import router from "../router";

function loginBtn() {
  router.push("/index");
}
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/login.jpg");
  background-size: cover;
}

.btn {
  font-size: 20px;
  height: 40px;
}
</style>