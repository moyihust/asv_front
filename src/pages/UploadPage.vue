<template>
  <q-page class="flex flex-center flex-column">
    <q-btn
      round
      color="primary"
      icon="add"
      @click="onButtonClick"
      size="52px"
      class="q-mb-md"
    />
    <q-input outlined v-model="text" label="返回结果" clearable />
  </q-page>
</template>

<script>
export default {
  name: "SphericalButtonWithInput",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onButtonClick() {
      console.log("球形按钮被点击");
    },
  },
};
</script>

<style scoped>
.q-input {
  margin-top: 200px;
}
</style>
