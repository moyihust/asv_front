<template>
  <input
    type="file"
    ref="fileInput"
    @change="onFileSelected"
    style="display: none"
  />
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
import axios from "axios";
export default {
  name: "SphericalButtonWithInput",
  data() {
    return {
      text: "",
      websocket: null,
      queuePosition: "",
      result: "",
      token: "",
      file: null,
    };
  },
  methods: {
    async onButtonClick() {
      // 获取 token
      this.token = this.getCookie("token");

      // 创建 WebSocket 连接并将其保存到 data 中
      this.websocket = new WebSocket(`/ws/connect?token=${this.token}`);

      // 当 WebSocket 连接建立时
      this.websocket.onopen = (event) => {
        console.log("WebSocket 连接已建立");
        this.$refs.fileInput.click();
      };

      // 当 WebSocket 接收到消息时
      this.websocket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket 接收到消息:", data);

        if (data && data.id) {
          // 获取排队次序和结果
          this.queuePosition = data.queuePosition;
          this.result = data.result;

          // 上传文件
          this.id = data.id;
        }

        if (data && data.message) {
          this.text = data.message;
        }
      };

      // 当 WebSocket 连接关闭时
      this.websocket.onclose = (event) => {
        console.log("WebSocket 连接已关闭");
      };

      // 当发生错误时
      this.websocket.onerror = (event) => {
        console.error("WebSocket 出现错误:", event);
      };
    },
    async uploadFile() {
      // 创建一个 FormData 对象以存储要上传的文件
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", this.id);

      try {
        // 发送 POST 请求以上传文件
        const response = await axios.post(`/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${this.token}`,
          },
        });

        console.log("文件已成功上传:", response);
      } catch (error) {
        console.error("文件上传失败:", error);
      }
    },
    onFileSelected(event) {
      this.file = event.target.files[0];
      this.uploadFile();
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },
  },
};
</script>

<style scoped>
.q-input {
  margin-top: -300px;
}
</style>
