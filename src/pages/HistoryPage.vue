<template>
  <q-page class="q-pa-md">
    <div class="text-h6">示例列表</div>
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
            icon="edit"
            @click="editItem(index)"
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
export default {
  name: "ListExample",
  data() {
    return {
      listItems: [
        {
          title: "列表项 1",
          subtitle: "子标题 1",
        },
        {
          title: "列表项 2",
          subtitle: "子标题 2",
        },
        {
          title: "列表项 3",
          subtitle: "子标题 3",
        },
      ],
    };
  },
  methods: {
    editItem(index) {
      console.log(`编辑列表项 ${index}`);
    },
    deleteItem(index) {
      this.listItems.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
