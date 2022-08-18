<template>
  <div class="desktop-shortcut">
    <img
      v-for="(item, index) in list"
      :key="index"
      :src="item.shortcut"
      alt=""
      @click="openAppWindow(item.key)"
    />
  </div>
</template>

<script>
export default {
  name: "DesktopShortcut",
  props: {
    list: {
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
