<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <!-- 添加顶部导航栏（可选） -->
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout",
  // ...
};
</script>
