<template>
  <div id="app" class="desktop-background">
    <DesktopShortcut :list="appList" @openAppWindow="openAppWindow" />
    <DesktopDock :list="taskList" @recoveryAppWindow="recoveryAppWindow" />
    <TaskWindow
      v-for="item in taskList"
      :key="item.key"
      :appKey="item.key"
      :appName="item.name"
      :appUrl="item.url"
      :zIndex="item.z"
      :size="item.size"
      @changeSize="changeWindow"
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
          dock: require("@/assets/images/dock/dock-netease.png"),
          size: "default" // mini default max
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
        let ZIndexMax = Math.max(...this.taskList.map((item) => item.z), 0)
        if (index == -1) {
          this.taskList.push({
            key,
            name: app.name,
            url: app.url,
            size: app.size,
            dock: app.dock,
            shortcut: app.shortcut,
            z: ZIndexMax + 1
          })
        } else {
          this.recoveryAppWindow(key)
        }
      }
    },
    changeWindow(key, size) {
      console.log(key, size)
      let index = this.taskList.findIndex((item) => (item.key = key))
      this.taskList[index].size = size
    },
    recoveryAppWindow(key) {
      let index = this.taskList.findIndex((item) => (item.key = key))
      this.taskList[index].size = "default"
    },
    closeAppWindow(key) {
      this.taskList = this.taskList.filter((item) => item.key !== key)
    }
  }
}
</script>
