<template>
  <div id="app" class="desktop-background">
    <DesktopShortcut :list="appList" @openAppWindow="openAppWindow" />
    <DesktopDock :list="taskList" @changeRunMode="changeRunMode" />
    <TaskWindow
      v-for="(item,index) in taskList"
      :index="index"
      :key="item.key"
      :appKey="item.key"
      :appName="item.name"
      :appUrl="item.url"
      :zIndex="item.z"
      :size="item.size"
      :runMode="item.runMode"
      @changeSize="changeSize"
      @changeRunMode="changeRunMode"
      @close="closeAppWindow"
    />
  </div>
</template>

<script>
window.oncontextmenu = (e) => {
  e.preventDefault()
}

// import DesktopMask from "@/components/DesktopMask"

import DesktopShortcut from "@/components/DesktopShortcut"
import DesktopDock from "@/components/DesktopDock"
import TaskWindow from "@/components/TaskWindow"

export default {
  name: "App",
  components: {
    // DesktopMask,
    DesktopShortcut,
    DesktopDock,
    TaskWindow
  },
  data() {
    return {
      isAgree: true,
      taskList: [],
      appMap: {
        netease: {
          key: "netease",
          name: "网易云音乐",
          url: "//music.gausszhou.top/netease/",
          shortcut: require("@/assets/images/shortcut/netease.png"),
          dockForeg: require("@/assets/images/dock/dock-netease-foreg.png"),
          dockBack: require("@/assets/images/dock/dock-netease-back.png"),
          size: "default", // default max
          runMode: "foreg" // foreg back
        }
      }
    }
  },
  computed: {
    appList() {
      return Object.keys(this.appMap).map((key) => this.appMap[key])
    }
  },
  methods: {
    openAppWindow(key) {
      const app = this.appMap[key]
      if (app) {
        let index = this.taskList.findIndex((item) => item.key == key)
        let zIndexMax = Math.max(...this.taskList.map((item) => item.z), 0)
        if (index == -1) {
          this.taskList.push({
            ...app,
            key,
            z: zIndexMax + 1
          })
        } else {
          this.changeRunMode(key, "foreg")
        }
      }
    },
    closeAppWindow(key) {
      this.taskList = this.taskList.filter((item) => item.key !== key)
    },
    changeSize(key, size) {
      console.log(key, size)
      let index = this.taskList.findIndex((item) => (item.key = key))
      this.taskList[index].size = size
    },
    changeRunMode(key, runMode) {
      console.log(key, runMode)
      const index = this.taskList.findIndex((item) => (item.key = key))
      this.taskList[index].runMode = runMode
    }
  }
}
</script>
