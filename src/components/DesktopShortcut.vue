<template>
  <div class="desktop-shortcut">
    <img
      v-for="(shortcut, index) in shortcutList"
      :key="index"
      :src="shortcut.shortcut"
      alt=""
      @click="openAppWindow(shortcut.key)"
    />
  </div>
</template>

<script>
export default {
  name: "DesktopShortcut",
  props: {
    shortcutList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openAppWindow(key) {
      this.$emit("openAppWindow", key)
    }
  }
}
</script>
