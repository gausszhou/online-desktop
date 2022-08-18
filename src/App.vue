<template>
  <div id="app" class="desktop-background">
    <DesktopShortcut :list="appList" @openAppWindow="openAppWindow" />
    <DesktopDock :list="taskList" @changeRunMode="changeRunMode" />
    <TaskWindow
      v-for="(item, index) in taskList"
      :key="item.key"
      :index="index"
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

import DesktopShortcut from "@/components/DesktopShortcut"
import DesktopDock from "@/components/DesktopDock"
import TaskWindow from "@/components/TaskWindow"

export default {
  name: "App",
  components: {
    DesktopShortcut,
    DesktopDock,
    TaskWindow
  },
  data() {
    return {
      isAgree: true,
      taskList: [],
      appList: [
        {
          key: "netease",
          name: "网易云音乐",
          url: "//www.gausszhou.top/online-music/",
          shortcut: require("@/assets/images/shortcut/netease.png"),
          dockForeg: require("@/assets/images/dock/dock-netease-foreg.png"),
          dockBack: require("@/assets/images/dock/dock-netease-back.png"),
          size: "default", // default max
          runMode: "foreg" // foreg back
        },
        {
          key: "gausszhou",
          name: "我的笔记",
          url: "//www.gausszhou.top/",
          shortcut: require("@/assets/images/shortcut/chrome.png"),
          dockForeg: require("@/assets/images/dock/dock-chrome-foreg.png"),
          dockBack: require("@/assets/images/dock/dock-chrome-back.png"),
          size: "default", // default max
          runMode: "foreg" // foreg back
        }
      ]
    }
  },
  methods: {
    openAppWindow(app) {
      const { key } = app
      let index = this.taskList.findIndex((item) => item.key === key)
      if (index == -1) {
        let zIndexMax = Math.max(...this.taskList.map((item) => item.z), 0)
        this.taskList.push({
          ...app,
          z: zIndexMax + 1
        })
      } else {
        this.changeRunMode(key, "foreg")
      }
      console.log(this.taskList)
    },
    closeAppWindow(key) {

      this.taskList = this.taskList.filter((item) => item.key !== key)
    },
    changeSize(key, size) {
      console.log(key, size)
      let index = this.taskList.findIndex((item) => (item.key === key))
      this.taskList[index].size = size
    },
    changeRunMode(key, runMode) {
      console.log(key, runMode)
      const index = this.taskList.findIndex((item) => (item.key === key))
      this.taskList[index].runMode = runMode
    }
  }
}
</script>
