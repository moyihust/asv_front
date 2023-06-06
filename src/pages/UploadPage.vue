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
      websocket: null,
      queuePosition: "",
      result: "",
      file: null,
    };
  },
  methods: {
    async onButtonClick() {
      // 创建 WebSocket 连接并将其保存到 data 中
      this.websocket = new WebSocket("ws://127.0.0.1:8080/api/connect");

      // 当 WebSocket 连接建立时
      this.websocket.onopen = async (event) => {
        console.log("WebSocket 连接已建立");

        // 添加 token 到请求头
        this.websocket.send(JSON.stringify({ token: "your_token_here" }));
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
          await this.uploadFile(data.id);
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
    async uploadFile(id) {
      // 创建一个 FormData 对象以存储要上传的文件
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        // 发送 POST 请求以上传文件
        const response = await axios.post(
          `http://127.0.0.1:8080/api/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${"your_token_here"}`,
            },
          }
        );

        console.log("文件已成功上传:", response);
      } catch (error) {
        console.error("文件上传失败:", error);
      }
    },
    onFileInputChange(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.q-input {
  margin-top: -300px;
}
</style>
