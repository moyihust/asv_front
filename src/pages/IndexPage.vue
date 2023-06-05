<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">登录</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm" ref="loginForm">
          <q-input
            outlined
            v-model="username"
            label="用户名"
            clearable
            :rules="[(val) => !!val || '用户名不能为空']"
            lazy-rules
          />

          <q-input
            outlined
            v-model="password"
            label="密码"
            type="password"
            clearable
            :rules="[(val) => !!val || '密码不能为空']"
            lazy-rules
          />

          <div class="q-mt-md">
            <q-btn
              color="primary"
              type="submit"
              label="登录"
              :loading="loading"
            />
            <q-btn
              flat
              color="primary"
              label="注册"
              @click="gotoRegisterPage"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.loading = true;
      try {
        // 动态模拟登录延迟
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 登录成功，跳转到其他页面
        this.$router.push({ name: "record" });
      } catch (error) {
        // 处理登录错误
        console.error("登录失败:", error);
      } finally {
        this.loading = false;
      }
    },
    gotoRegisterPage() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
}
</style>
