<template>
  <!-- :prevent-deactivation="true" -->
  <VueDragResize
    :active="true"
    :drag-handle="'.drag-handle'"
    :draggable="true"
    :resizable="false"
    :x="x"
    :y="y"
    :w="w"
    :h="h"
    :z="zIndex"
    :min-width="0"
    :min-height="0"
  >
    <div class="app-window">
      <TaskWindowHeader
        class="app-window-header"
        :name="appName"
        @dblclick.native="maximize"
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
    },
    size: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      x: 100,
      y: 20,
      w: 800,
      h: 600,
      windowWidth: 1920,
      windowHeight: 1080
    }
  },
  watch: {
    size(newV) {
      this.calcSize(newV)
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener("resize", () => {
      this.onResize()
    })
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.calcSize(this.size)
    },
    calcSize(size) {
      const MAX_WIDTH = this.windowWidth
      const MAX_HEIGHT = this.windowHeight - 40
      const MARGIN = 50
      switch (size) {
        case "mini":
          this.x = -1
          this.y = -1
          this.w = 1
          this.h = 1
          break
        case "default":
          const w = Math.min(1200, MAX_WIDTH - MARGIN * 2)
          const x = (MAX_WIDTH - w) / 2
          const h = Math.min(675, MAX_HEIGHT - MARGIN * 2)
          const y = (MAX_HEIGHT - h) / 2
          this.x = x
          this.y = y
          this.w = w
          this.h = h
          break
        case "max":
          this.x = 0
          this.y = 0
          this.w = MAX_WIDTH
          this.h = MAX_HEIGHT
          break
        default:
          break
      }
    },
    minimize() {
      this.$emit("changeSize", this.appKey, "mini")
    },
    maximize() {
      let size = ""
      if (this.size == "default") size = "max"
      if (this.size == "max") size = "default"
      if (this.size == "mini") size = "default"
      this.$emit("changeSize", this.appKey, size)
    },
    close() {
      this.$emit("close", this.appKey)
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
