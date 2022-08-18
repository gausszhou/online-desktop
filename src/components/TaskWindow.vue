<template>
  <VueDragResize
    :active="true"
    :drag-handle="'.drag-handle'"
    :draggable="true"
    :resizable="false"
    class-name-dragging="dragging"
    :x="x"
    :y="y"
    :w="w"
    :h="h"
    :z="zIndex"
  >
    <div class="app-window">
      <TaskWindowHeader
        class="app-window-header"
        :name="appName"
        :size="size"
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
    index: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "default"
    },
    runMode: {
      type: String,
      default: "foreg"
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
    size() {
      this.onResize()
    },
    runMode() {
      this.onResize()
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
      this.calcSize()
    },
    calcSize() {
      const size = this.size
      const mode = this.runMode
      const index = this.index
      const DOCK_WIDTH = 45
      const MAX_WIDTH = this.windowWidth
      const MAX_HEIGHT = this.windowHeight - 40
      const MARGIN = 20
      switch (size) {
        case "default":
          const w = Math.min(1200, MAX_WIDTH - MARGIN * 2)
          const h = Math.min(675, MAX_HEIGHT - MARGIN * 2)
          const x = (MAX_WIDTH - w) / 2
          const y = (MAX_HEIGHT - h) / 2
          this.x = x
          this.y = y
          this.w = w
          this.h = h
          break
        case "max":
          this.w = MAX_WIDTH
          this.h = MAX_HEIGHT
          this.y = 0
          this.x = 0
          break
        default:
          console.error("size Error")
          break
      }
      if (mode == "back") {
        this.x = DOCK_WIDTH * (index + 3)
        this.y = MAX_HEIGHT
        this.w = 0
        this.h = 1
      }
      console.log(this.x, this.y)
    },
    minimize() {
      this.$emit("changeRunMode", this.appKey, "back")
    },
    maximize() {
      let size = this.size
      size = size == "default" ? "max" : "default"
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
