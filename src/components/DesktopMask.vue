<template>
  <div id="mask" >
    <div class="mask-content">
      <div class="mask-title">Link Start</div>
      <span class="agree-button-group" @click="agree()">
        <button>马上</button>
        <button>同意</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:"DesktopMask",
  methods:{
    agree(){
      this.$emit("agree")
    }
  }
}
</script>

