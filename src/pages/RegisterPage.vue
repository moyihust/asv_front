<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">注册</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm" ref="registerForm">
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
            v-model="email"
            label="邮箱"
            clearable
            :rules="[(val) => !!val || '邮箱不能为空']"
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
              label="注册"
              :loading="loading"
            />
            <q-btn
              flat
              color="primary"
              label="登录"
              @click="gotoLoginPage"
            ></q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      if (!this.$refs.registerForm.validate()) {
        return;
      }

      this.loading = true;
      try {
        // 动态模拟注册延迟
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 注册成功，跳转到其他页面
        this.$router.push({ name: "record" });
      } catch (error) {
        // 处理注册错误
        console.error("注册失败:", error);
      } finally {
        this.loading = false;
      }
    },
    gotoLoginPage() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
}
</style>
