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
            v-model="password"
            label="密码"
            type="password"
            clearable
            :rules="[(val) => !!val || '密码不能为空']"
            lazy-rules
          />

          <q-input
            outlined
            v-model="confirmPassword"
            label="重复密码"
            type="password"
            clearable
            :rules="[(val) => !!val || '重复密码不能为空']"
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
            <!-- 用于显示错误消息的元素 -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "密码和确认密码不匹配，请重新输入。";
          return;
        }

        const response = await axios.post("/api/register", {
          userID: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });

        if (response.data && response.data.token) {
          this.setCookie("token", response.data.token, 7);
          this.$router.push({ name: "record" });
        } else {
          this.errorMessage = response.data.message || "注册失败，请重试。";
        }
      } catch (error) {
        console.error(error);
        this.errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          "网络错误，请重试。";
      }
    },
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
