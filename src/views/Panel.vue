<template>
  <div class="wrapper">
    <div class="btn_closesystem" @click="handleCloseSystem"></div>
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
      list: ['SUNROOF', 'INTERIOR', 'LIGHTING', 'THERMALMANAGEMENT', 'FUELPOWER', 'PIPELINE', 'EXTERIOR', 'SEAT', 'HARNESS', 'EICSYSTEM', 'CHASSIS']
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
      width: 150px;
      height: 40px;

      &.SUNROOF { top: 208px; left: 125px; }
      &.INTERIOR { top: 323px; left: 120px; }
      &.LIGHTING { top: 452px; left: 120px; }
      &.THERMALMANAGEMENT { top: 584px; left: 130px; width: 188px }
      &.FUELPOWER { top: 680px; left: 130px; width: 200px }
      &.PIPELINE { top: 798px; left: 130px; }

      &.EXTERIOR { top: 470px; left: 1590px; }
      &.SEAT { top: 562px; left: 1590px; }
      &.HARNESS { top: 690px; left: 1590px; }
      &.EICSYSTEM { top: 805px; left: 1600px; }
      &.CHASSIS { top: 915px; left: 1590px; }
    }
  }
}
</style>