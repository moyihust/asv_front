<template>
  <q-page class="q-pa-md">
    <div class="text-h6">历史记录</div>
    <q-list bordered separator>
      <q-item v-for="(item, index) in listItems" :key="index">
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.subtitle }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            dense
            color="primary"
            :icon="index === playingIndex ? 'pause' : 'play_arrow'"
            @click="togglePlayback(index)"
          />
          <q-btn
            round
            dense
            color="negative"
            icon="delete"
            class="q-ml-sm"
            @click="deleteItem(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "ListExample",
  data() {
    return {
      listItems: [],
      playingIndex: null,
      audio: null,
    };
  },
  methods: {
    async getHistory() {
      try {
        this.token = this.getCookie("token");
        const response = await axios.get("http://127.0.0.1:8081/api/history", {
          headers: {
            token: this.token,
          },
        });

        this.listItems = response.data.result;
      } catch (error) {
        console.error("获取历史记录失败:", error);
      }
    },
    async deleteItem(index) {
      try {
        console.log(this.listItems);
        const response = await axios.delete(
          `http://127.0.0.1:8081/api/audio?linkID=${this.listItems[index].linkID}`,
          {
            headers: {
              token: this.token,
            },
          }
        );
        this.getHistory();
      } catch (error) {
        console.error("删除记录失败:", error);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },
    togglePlayback(index) {
      if (this.playingIndex === index) {
        this.pauseAudio();
      } else {
        this.playAudio(index);
      }
    },
    async playAudio(index) {
      if (this.audio) {
        this.pauseAudio();
      }
      const linkID = this.listItems[index].linkID;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8081/api/audio?linkID=${linkID}`,
          {
            headers: {
              token: this.token,
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(blob);

        this.audio = new Audio(audioUrl);
        this.audio.play();
        this.audio.addEventListener("ended", () => {
          this.playingIndex = null;
        });

        this.playingIndex = index;
      } catch (error) {
        console.error("获取音频文件失败:", error);
      }
    },
    pauseAudio() {
      if (this.audio) {
        this.audio.pause();
        this.playingIndex = null;
      }
    },
  },
  mounted() {
    this.getHistory(); // 在组件挂载后立即获取历史记录
  },
};
</script>

<style scoped></style>
