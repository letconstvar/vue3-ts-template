<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { postLoginApi } from '@/api/login';

const test = async () => {
  const results = await postLoginApi({
    username: 'admin',
    password: 'admin',
    rememberMe: true,
  });
  console.log(results);
};
</script>

<template>
  <button @click="test()">http test</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
