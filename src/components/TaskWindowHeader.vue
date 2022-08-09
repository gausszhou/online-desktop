<template>
  <div class="window-header">
    <h2 class="window-name drag-handle">{{ name }}</h2>
    <div class="window-button-group">
      <button @click="minimize">最小化</button>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskWindowHeader",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  methods:{
    minimize(){
      this.$emit("minimize")
    },
    close(){
      this.$emit("close")
    }
  }
}
</script>

<style>
.window-header {
  height: 36px;
  width: 100%;
  display: flex;
  padding: 0 1rem;
  box-sizing: border-box;
  align-items: center;
  background-color: #e7eaed;
}
.window-name {
  flex:1;
  height: 100%;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #1d3233; 
}
.window-button-group{
  display: flex;
  align-items: center;
}
</style>
