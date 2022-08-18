<template>
  <div class="desktop-dock">
    <img :src="require('@/assets/images/dock/dock-windows.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-search.png')" alt="" />
    <div class="dock-list">
      <img
        v-for="item in list"
        :key="item.key"
        :src="calcDock(item)"
        @click="changeRunMode(item)"
      />
    </div>
    <img :src="require('@/assets/images/dock/dock-battery.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-network.png')" alt="" />
    <img :src="require('@/assets/images/dock/dock-volume.png')" alt="" />
    <!-- <img :src="require('@/assets/images/dock/dock-time.png')" alt="" /> -->
    <div style="color: #fff">
      {{ time }}
    </div>
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
  data() {
    return {
      time: new Date().toLocaleString().slice(10, 15),
      timer: null
    }
  },
  created() {
    this.setTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.time = new Date().toLocaleString().slice(10, 15)
      }, 10 * 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    calcDock(item) {
      if (item.runMode == "back") return item.dockBack
      if (item.runMode == "foreg") return item.dockForeg
      console.log(item.runMode)
      console.error("runMode Error")
    },
    changeRunMode(item) {
      let { key, runMode } = item
      runMode = runMode == "foreg" ? "back" : "foreg"
      this.$emit("changeRunMode", key, runMode)
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
