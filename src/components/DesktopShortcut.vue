<template>
  <div class="desktop-shortcut">
    <div
      class="shortcut-icon"
      v-for="(item, index) in list"
      :key="index"
      @dblclick="openAppWindow(item)"
    >
      <img class="icon-image" :src="item.shortcut" :alt="item.name" />
 </div>
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
    openAppWindow(item) {
      this.$emit("openAppWindow", item)
    }
  }
}
</script>
