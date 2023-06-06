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
  name: "IndexPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "", // 存储错误消息
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://127.0.0.1:8081/api/login", {
          userID: this.username,
          password: this.password,
        });

        console.log(response.data);

        if (response.data && response.data.token) {
          this.setCookie("token", response.data.token, 7); // 设置 cookie 有效期为 7 天
          this.$router.push({ name: "record" });
        } else {
          // 设置错误消息
          this.errorMessage = response.data.message || "登录失败，请重试。";
        }
      } catch (error) {
        console.error(error);
        // 设置错误消息
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
