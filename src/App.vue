<template>
  <div id="app" class="fake-desktop-background">
    <div class="fake-desktop-icon">
      <div id="recovery" @dblclick="trick"></div>
      <div id="netease" @dblclick="openAppWindow('netease')"></div>
      <div id="gausszhou" @dblclick="openAppWindow('gausszhou')"></div>
    </div>
    <div class="fake-desktop-bottom"></div>
    <TaskWindow
      v-for="item in taskList"
      :key="item.name"
      :name="item.name"
      :url="item.url"
      :z="item.z"
    />
    <DesktopMask v-if="!isAgree" @agree="agree" />
  </div>
</template>

<script>
// window.oncontextmenu = (e) => {
//   e.preventDefault()
// }

import TaskWindow from "@/components/TaskWindow"
import DesktopMask from "@/components/DesktopMask"

export default {
  name: "App",
  components: {
    DesktopMask,
    TaskWindow
  },
  data() {
    return {
      isAgree: true,
      taskList: [],
      appMap: {
        netease: {
          name: "网易云音乐",
          url: "//start.gausszhou.top/netease/"
        },
        gausszhou: {
          name: "Gauss Zhou",
          url: "//gausszhou.top"
        }
      }
    }
  },
  methods: {
    openAppWindow(key) {
      const app = this.appMap[key]
      if (app) {
        let index = this.taskList.findIndex((item) => item.key == key)
        let ZIndexMax = Math.max(...this.taskList.map((item) => item.z)) || 0
        if (index == -1) {
          this.taskList.push({
            key,
            name: app.name,
            url: app.url,
            z: ZIndexMax + 1
          })
          console.log(this.taskList)
        } else {
          // sort to top
        }
      }
    },
    trick() {
      document.exitFullscreen()
      this.$message.warning("什么也没有发生，这只是一个网页")
    },
    agree() {
      this.$el
        .requestFullscreen()
        .then(() => {
          this.isAgree = true
        })
        .catch(() => {
          window.alert("您没有内测资格")
        })
    }
  }
}
</script>
