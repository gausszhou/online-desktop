<template>
  <!-- :prevent-deactivation="true" -->
  <VueDragResize
    :active="true"
    :drag-handle="'.drag-handle'"
    :draggable="true"
    :resizable="false"
    :x="100"
    :y="50"
    :z="zIndex"
    :w="1200"
    :h="675"
    :min-width="1024"
    :min-height="576"
  >
    <div class="app-window">
      <TaskWindowHeader
        class="app-window-header"
        :name="appName"
        @minimize="minimize"
        @maximize="maximize"
        @close="close"
      />
      <div class="app-window-body">
        <iframe :src="appUrl" width="100%" height="100%"></iframe>
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
    appKey: {
      type: String,
      default: ""
    },
    appName: {
      type: String,
      default: ""
    },
    appUrl: {
      type: String,
      default: ""
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    minimize() {
      this.$emit("minimize", this.appKey)
    },
    maximize() {
      this.$emit("maximize", this.appKey)
    },
    close() {
      this.$emit("closeAppWindow", this.appKey)
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
