<template>
  <div class="window-header">
    <h2 class="window-name drag-handle" @dblclick.stop="maximize"></h2>
    <div class="window-button-group">
      <img
        class="window-button-image minimize"
        :src="require('@/assets/images/window/window-minimize.png')"
        @click.stop="minimize"
      />
      <img
        class="window-button-image maximize"
        :src="
          size == 'default'
            ? require('@/assets/images/window/window-maximize.png')
            : require('@/assets/images/window/window-default.png')
        "
        @click.stop="maximize"
      />
      <img
        class="window-button-image close"
        :src="require('@/assets/images/window/window-close.png')"
        @click.stop="close"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskWindowHeader",
  props: {
    size: {
      type: String,
      default: "default"
    },
    name: {
      type: String,
      default: ""
    }
  },
  methods: {
    minimize() {
      this.$emit("minimize")
    },
    maximize() {
      this.$emit("maximize")
    },
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss">
.window-header {
  height: 37px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  background-color: #dee1e6;
  overflow: hidden;
}
.window-name {
  flex: 1;
  height: 100%;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #1d3233;
}
.window-button-group {
  display: flex;
  align-items: center;
}
.window-button-image:hover {
  filter: invert(10%);
}
</style>
