<template>
  <div class="desktop-dock">
    <img :src="require('@/assets/images/dock/dock-windows.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-search.png')" alt="" />
    <div class="dock-list">
      <img v-for="item in list" :key="item.key" :src="calcDock(item)" alt="" @click="recoveryAppWindow(item.key)">
    </div>
    <img :src="require('@/assets/images/dock/dock-battery.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-network.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-volume.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-time.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-message.png')" alt="" />
  </div>
</template>

<script>
export default {
  name: "DesktopDock",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    calcDock(item){
      if(item.size == "mini") return item.dockBack
      return item.dock
    },
    recoveryAppWindow(key) {
      this.$emit("recoveryAppWindow", key)
    }
  }
}
</script>

<style>
.desktop-dock {
  position: fixed;
  z-index: 111;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #233942 0%, #192640 100%);
}
.dock-list {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
