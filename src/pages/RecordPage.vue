<template>
  <q-page class="flex flex-center flex-column">
    <q-btn
      round
      color="primary"
      icon="add"
      @click="onButtonClick"
      size="52px"
      class="q-mb-md"
      style="margin-top: 20px"
    />
    <div class="column items-center justify-center" style="width: 100%">
      <q-input
        outlined
        v-model="text"
        label="返回结果"
        clearable
        style="max-width: 300px"
        readonly
      />
    </div>
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
  margin-top: -300px;
}
</style>
