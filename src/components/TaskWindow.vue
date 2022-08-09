<template>
  <VueDragResize
    :active="true"
    :prevent-deactivation="true"
    :draggable="true"
    :drag-handle="'.drag-handle'"
    :resizable="true"
    :x="100"
    :y="50"
    :z="z"
    :w="1020"
    :h="576"
    :min-width="1024"
    :min-height="576"
  >
    <div class="app-window">
      <TaskWindowHeader class="app-window-header" :name="name" />
      <div class="app-window-body">
        <iframe :src="url" width="100%" height="100%"></iframe>
      </div>
    </div>
  </VueDragResize>
</template>

<script>
import TaskWindowHeader from "./TaskWindowHeader.vue"
export default {
  name: "TaskWindow",
  components: {
    TaskWindowHeader
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    z: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 最小化
    // 关闭
    minimize() {
      this.$emit("minmize")
    },
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.app-window {
  width: 100%;
  height: 100%;
}
.app-window-body {
  height: calc(100% - 40px);
}

</style>
