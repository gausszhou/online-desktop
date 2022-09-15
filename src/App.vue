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
          url: "//gausszhou.github.io/online-music/",
          shortcut: require("@/assets/images/shortcut/netease.png"),
          dockForeg: require("@/assets/images/dock/dock-netease-foreg.png"),
          dockBack: require("@/assets/images/dock/dock-netease-back.png"),
          size: "default", // default max
          runMode: "foreg" // foreg back
        },
        {
          key: "gausszhou",
          name: "我的笔记",
          url: "//gausszhou.github.io/",
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
      let index = this.taskList.findIndex((item) => item.key === key)
      this.taskList[index].size = size
    },
    changeRunMode(key, runMode) {
      // 这一块逻辑有点复杂 // windows 专门有一个栈用于存储之前打开过的前台窗口
      const index = this.taskList.findIndex((item) => item.key === key)
      this.taskList[index].runMode = runMode
      if (runMode === "foreg") {
        // 和当前最上层交换位置
        let zIndexMax = Math.max(...this.taskList.map((item) => item.z))
        this.$set(this.taskList[index],"z",zIndexMax+1)
      }
    }
  }
}
</script>
