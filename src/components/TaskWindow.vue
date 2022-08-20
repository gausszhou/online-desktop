<template>
  <VueDragResize
    class-name-dragging="dragging"
    :active="true"
    :drag-handle="'.drag-handle'"
    :draggable="true"
    :resizable="false"
    :x="x"
    :y="y"
    :w="w"
    :h="h"
    :z="zIndex"
    @dragging="onDragging"
    @dragstop="onDragstop"
  >
    <div class="app-window">
      
      <TaskWindowHeader
        class="app-window-header"
        :name="appName"
        :size="size"
        @minimize="minimize"
        @maximize="maximize"
        @close="close"
      />
      <div class="app-window-body">
        <div class="app-window-mask" v-if="isDragging"></div>
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
      back_x: 0,
      back_y: 0,
      back_w: 800,
      back_h: 600,
      windowWidth: 1920,
      windowHeight: 1080,
      isDragging: false
    }
  },
  watch: {
    size() {
      this.onSizeChagne()
    },
    runMode() {
      this.onModeChange()
    }
  },
  mounted() {
    this.onWindowResize()
    this.onSizeChagne()  // 调用一次
    window.addEventListener("resize", () => {
      this.onWindowResize()
    })
  },
  methods: {
    onWindowResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    onSizeChagne() {
      console.log("size")
      const size = this.size
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
      this.back_x = this.x
      this.back_y = this.y
      this.back_w = this.w
      this.back_h = this.h
    },
    onModeChange() {
      console.log("mode")
      const index = this.index
      const mode = this.runMode
      const DOCK_WIDTH = 45
      const MAX_HEIGHT = this.windowHeight - 40
      if (mode == "back") {
        this.x = DOCK_WIDTH * (index + 3)
        this.y = MAX_HEIGHT
        this.w = 1
        this.h = 1
      } else {
        this.x = this.back_x
        this.y = this.back_y
        this.w = this.back_w
        this.h = this.back_h
      }
    },
    onDragging() {
      this.isDragging = true
    },
    onDragstop(x, y) {
      this.isDragging = false
      this.back_x = x
      this.back_y = y
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
  height: 100%;
  position: relative;
  height: calc(100% - 40px);
}
.app-window-mask {
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

</style>
