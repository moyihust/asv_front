<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <!-- 添加顶部导航栏（可选） -->
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="drawerOpen = !drawerOpen"
        ></q-btn>
        <q-toolbar-title> asv </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen">
      <!-- 添加侧边导航栏内容 -->
      <q-list>
        <q-item
          clickable
          tag="a"
          v-bind:href="$router.resolve({ name: 'record' }).href"
        >
          <q-item-section>录音并检测</q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          v-bind:href="$router.resolve({ name: 'upload' }).href"
        >
          <q-item-section>上传并检测</q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          v-bind:href="$router.resolve({ name: 'history' }).href"
        >
          <q-item-section>历史记录</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "SiderbarLayout",
  data() {
    return {
      drawerOpen: false,
    };
  },
  // ...
};
</script>
