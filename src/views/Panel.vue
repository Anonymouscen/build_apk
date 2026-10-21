<template>
  <div class="wrapper">
    <!-- <div class="btn_closesystem" @click="handleCloseSystem"></div> -->
    <div class="controls">
      <div :class="['control_item', item]" v-for="item in list" :key="item" @click="handleClickControl(item)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      list: ['f1', 'f2', 'f3', 'f4', 'f5']
    };
  },
  methods: {
    handleClickControl (type) {
      this.$router.push(`/preview/${type}`)
    },
    handleCloseSystem () {
      console.log('btn_closesystem')
      let userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") != -1 ||
        userAgent.indexOf("Chrome") != -1
      ) {
        location.href = "about:blank";
      } else {
        window.opener = null;
        window.open("", "_self");
      }
      window.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/panel_bg.jpg') no-repeat center center;
  background-size: 100% 100%;

  .btn_closesystem {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    margin: auto;
    width: 450px;
    height: 40px;
    // background: red;
    z-index: 5;
  }

  .controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .control_item {
      position: absolute;
      width: 730px;
      height: 180px;

      &.f1 { top: 208px; left: 180px; }
      &.f2 { top: 208px; left: 990px; }
      &.f3 { top: 495px; left: 180px; }
      &.f4 { top: 495px; left: 990px; }
      &.f5 { top: 770px; left: 180px; }
    }
  }
}
</style>