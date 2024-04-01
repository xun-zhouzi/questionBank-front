<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import router from "./router";
import { onMounted } from "vue";
onMounted(() => {
  router.push("/login");
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>