<template>
  <q-layout view="lHh Lpr lFf">
    <div class="side-bar">
      <img src="/images/logo.webp" alt="">
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style lang="scss" scoped>
.side-bar {
  max-width: 20rem;
  width: 100%;
  height: 100vh;
  background-color: $backgroundPrimary;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 20%;
    max-width: 14rem;
  }
}
</style>
